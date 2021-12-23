import React, { createContext } from 'react';
import { v4 as uuid } from 'uuid';
import './Board.scoped.scss';
import AddColumn from '../../components/Board/AddColumn';
import Column from '../../components/Board/Column/Column';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { setColumns } from '../../store/slices/boardSlice';


export const BorderContext = createContext(null);

function Board() {

  const dispatch = useDispatch();

  const columns = useSelector((state) => {
    return state.boardReducer.columns;
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const columnSourceIndex = columns.findIndex((element) => {
        return element.id === source.droppableId;
      });
      const columnDestinationIndex = columns.findIndex((element) => {
        return element.id === destination.droppableId;
      });
      const sourceCards = [...columns[columnSourceIndex].cards];
      const destinationCards = [...columns[columnDestinationIndex].cards];
      const [removed] = sourceCards.splice(source.index, 1);
      destinationCards.splice(destination.index, 0, removed);
      dispatch(setColumns({ columnSourceIndex, columnDestinationIndex, sourceCards, destinationCards }));

    } else {
      const columnSourceIndex = columns.findIndex((element) => {
        return element.id === source.droppableId;
      });
      const sourceCards = [...columns[columnSourceIndex].cards];
      const [removed] = sourceCards.splice(source.index, 1);
      sourceCards.splice(destination.index, 0, removed);
      dispatch(setColumns({ columnSourceIndex, sourceCards }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board'>
        {columns && columns.map((column, columnIndex) => {
          return (
            <Column key={uuid()} column={column} columnIndex={columnIndex} />
          );
        })}
        <AddColumn />
      </div>
    </DragDropContext>
  );
};

export default Board;
