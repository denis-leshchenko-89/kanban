import React, { useEffect, useState } from 'react';
import './Column.scoped.scss';
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

  const handleDeleteColumn = (columnIndex) => {
    dispatch(deleteColumn(columnIndex));
  };

  return (
    <div id={column.id} className='column'>
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
            handleDeleteColumn(columnIndex);
          }} />
        </div>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => {
          return (
            <div className='column-list'
                 ref={provided.innerRef}
                 {...provided.droppableProps}
            >
              {column.cards.length > 0 &&
                column.cards.map((card, cardIndex) => {
                  return <Card key={card.id} card={card} columnIndex={columnIndex} cardIndex={cardIndex}
                  />;
                })
              }
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      <div className='column-footer'>
        <AddCard columnIndex={columnIndex} />
      </div>
    </div>
  );
}

export default Column;
