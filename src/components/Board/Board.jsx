import React from 'react';
import { v4 as uuid } from 'uuid';
import './Board.scoped.scss';
import AddColumn from '../../components/Board/AddColumn';
import Column from '../../components/Board/Column/Column';
import { useSelector } from 'react-redux';

function Board() {
  const columns = useSelector((state) => {
    return state.boardReducer.columns;
  });

  return (
    <div className='board'>
      {columns &&
        columns.map((column, columnIndex) => {
          return (
            <Column key={uuid()} column={column} columnIndex={columnIndex} />
          );
        })}
      <AddColumn />
    </div>
  );
}

export default Board;
