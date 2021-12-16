import React, { useEffect, useState } from 'react';
import './Column.scoped.scss';
import { v4 as uuid } from 'uuid';
import Card from '../Card';
import AddCard from '../AddCard/AddCard';
import { editTitleColumn } from '../../../store/reducers/boardSlice';
import { useDispatch } from 'react-redux';

function Column({ column, columnIndex }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(column.title);
  }, [column.title]);

  const handleChangeEditTitle = (event, columnIndex) => {
    const editTitle = { title: value, columnIndex: columnIndex };
    dispatch(editTitleColumn(editTitle));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    // event.currentTarget.style.backgroundColor = '#000';
  };

  const onDrop = (event) => {
    event.currentTarget.classList.remove('dragging');
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.currentTarget.querySelector('.column-list');
    dropzone.insertAdjacentElement('beforeend', draggableElement);
    event.dataTransfer.clearData();
  };


  return (
    <div id={column.id} className='column'
         onDragOver={(event) => {
           onDragOver(event);
         }}
         onDrop={(event) => {
           onDrop(event);
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
      </div>
      <div className='column-list'>
        {column.cards &&
          column.cards.map((card, cardIndex) => {
            return <Card key={uuid()} card={card} columnIndex={columnIndex} cardIndex={cardIndex} />;
          })}
      </div>
      <div className='column-footer'>
        <AddCard columnIndex={columnIndex} />
      </div>
    </div>
  );
}

export default Column;
