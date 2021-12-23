import React, { useEffect, useState } from 'react';
import './Column.scoped.scss';
import { v4 as uuid } from 'uuid';
import Card from '../Card';
import AddCard from '../AddCard/AddCard';
import { deleteColumn, editTitleColumn } from '../../../store/slices/boardSlice';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

function Column({ column, columnIndex }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');


  useEffect(() => {
    setValue(column.title);
  }, [column.title]);

  const handleChangeEditTitle = (event, columnIndex) => {
    dispatch(editTitleColumn({ title: value, columnIndex: columnIndex }));
  };


  const handleDelete = (columnIndex) => {
    dispatch(deleteColumn(columnIndex));
  };


  return (
    <Droppable
      droppableId={column.id}

    >
      {(provided, snapshot) => {
        return (
          <div
            id={column.id}
            className='column'
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver ? 'ligjtblue' : 'lightgrey',
            }}
          >
            <div className='column-header'>
              <div className='input'>
                <input
                  type='text'
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  onBlur={(event) => {
                    handleChangeEditTitle(event, columnIndex);
                  }}
                />
              </div>
              <div className='nav'>
                <i className='far fa-trash-alt' onClick={() => {
                  handleDelete(columnIndex);
                }} />
              </div>
            </div>
            <div className='column-list'>
              {column.cards.length > 0 &&
                column.cards.map((card, cardIndex) => {
                  return <Card key={uuid()} card={card} columnIndex={columnIndex} cardIndex={cardIndex}
                  />;
                })
              }
              {provided.placeholder}
            </div>
            <div className='column-footer'>
              <AddCard columnIndex={columnIndex} />
            </div>
          </div>
        );
      }
      }
    </Droppable>
  );

}

export default Column;
