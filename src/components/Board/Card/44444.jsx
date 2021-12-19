import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import './Card.scoped.scss';
import { deleteCard, editTextCard } from '../../../store/slices/boardSlice';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { BorderContext } from '../Board';


function Card({ card, columnIndex, cardIndex }) {
  const [value, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const borderRef = useContext(BorderContext);


  useEffect(() => {
    setValue(card.text);
  }, [card.text]);

  const handleChangeEditText = (event, columnIndex, cardIndex) => {
    dispatch(editTextCard({ text: value, columnIndex: columnIndex, cardIndex: cardIndex }));
  };
  const handleDelete = (columnIndex, cardIndex) => {
    dispatch(deleteCard({ columnIndex: columnIndex, cardIndex: cardIndex }));
  };

  const handleToggle = () => {
    setIsEdit(!isEdit);
  };

  const handleEditTitleCard = (event) => {
    const value = event.target.value;
    setValue(value);
  };


  // -----------------------------

  const [dragging, setDragging] = useState(false);


  const [originalCoord, setOriginalCoord] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const startDragPos = useRef({ x: 0, y: 0 });
  const curentRef = useRef(null);


  const xPos = originalCoord.x + delta.x;
  const yPos = originalCoord.y + delta.y;
  curentRef.current.style.left = xPos + 'px';
  curentRef.current.style.top = yPos + 'px';


  const handleParentMouseMove = useCallback((event) => {
    setDelta({
      x: event.clientX - startDragPos.current.x,
      y: event.clientY - startDragPos.current.y,
    });

  }, []);

  const handleMouseDown = (event) => {
    setDragging(true);
    startDragPos.current = { x: event.clientX, y: event.clientY };
    borderRef.current.addEventListener('mousemove', handleParentMouseMove);
    event.currentTarget.style.position = 'absolute';

  };

  const handleMouseUp = (event) => {
    setDragging(false);
    setOriginalCoord({ x: xPos, y: yPos });
    startDragPos.current = { x: 0, y: 0 };
    setDelta({ x: 0, y: 0 });
    borderRef.current.removeEventListener('mousemove', handleParentMouseMove);
  };


  // const fill = dragging ? 'red' : 'green';


  return (
    <div
      id={`draggable-${card.id}`}
      className='card draggable'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={curentRef}
    >
      <div className={classNames({
        title: true, hide: isEdit,
      })}>
        <span className='text'>{card.text}</span>
        <span className='nav'>
        <i className='far fa-pen' onClick={handleToggle} />
        <i className='far fa-trash-alt' onClick={() => {
          handleDelete(columnIndex, cardIndex);
        }} />
      </span>
      </div>

      <div
        className={classNames({
          form: true, show: isEdit,
        })}
      >
        <div className='textarea'>
        <textarea type='text' value={value} placeholder='Ввести заголовок для этой карточки'
                  onChange={handleEditTitleCard} />
        </div>
        <div className='nav'>
          <button type='button' onClick={(event) => {
            handleChangeEditText(event, columnIndex, cardIndex);
          }}>
            Сохранить
          </button>
          <i className='fal fa-times' onClick={handleToggle} />
        </div>
      </div>
    </div>);
}

export default Card;
