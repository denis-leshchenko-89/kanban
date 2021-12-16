import React, { useEffect, useState } from 'react';
import './Card.scoped.scss';
import { editTextCard } from '../../../store/reducers/boardSlice';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

const onDragStart = (event) => {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.currentTarget.classList.add('dragging');
};


function Card({ card, columnIndex, cardIndex }) {
  const [value, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const handleChangeEditText = (event, columnIndex, cardIndex) => {
    const editText = { text: value, columnIndex: columnIndex, cardIndex: cardIndex };

    event.currentTarget.style.height = 'auto';
    event.currentTarget.height = (event.currentTarget.scrollHeight) + 'px';

    dispatch(editTextCard(editText));
  };
  useEffect(() => {
    setValue(card.text);
  }, [card.text]);


  const handleToggle = (event) => {
    event.stopPropagation();
    setIsEdit(!isEdit);
  };

  return (
    <div
      id={`draggable-${card.id}`}
      className='card'
      draggable='true'
      onDragStart={(event) => {
        onDragStart(event);
      }}
    >
      <div className={classNames({
        title: true,
        hide: isEdit,
      })}>
        <span>{card.text}</span><i className='far fa-pen' onClick={handleToggle} />
      </div>
      <div
        className={classNames({
          textarea: true,
          hide: !isEdit,
        })}
      >
        <textarea
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onBlur={(event) => {
            handleChangeEditText(event, columnIndex, cardIndex);
          }}
        />
        <i className='far fa-pen' onClick={handleToggle} />
      </div>
    </div>
  );
}

export default Card;
