import React, { useEffect, useState } from 'react';
import './Column.scoped.scss';
import { v4 as uuid } from 'uuid';
import Card from '../Card';
import AddCard from '../AddCard/AddCard';
import { deleteColumn, editTitleColumn } from '../../../store/slices/boardSlice';
import { useDispatch } from 'react-redux';

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

  const handleMouseOver = (event) => {

    // console.log(event.target);
    // console.log(event.currentTarget);

  };

  return (
    <div id={column.id} className='column' onMouseOver={handleMouseOver}
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
      </div>
      <div className='column-footer'>
        <AddCard columnIndex={columnIndex} />
      </div>
    </div>
  );
}

export default Column;
