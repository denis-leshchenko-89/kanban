import React, { useContext, useEffect, useRef, useState } from 'react';
import './Card.scoped.scss';
import { deleteCard, editTextCard } from '../../../store/slices/boardSlice';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { BorderContext } from '../Board';
import getCoords from '../../../utils/helper/getCoords';


function Card({ card, columnIndex, cardIndex }) {
  const [dragging, setDragging] = useState(false);
  const currentRef = useRef(null);
  const [value, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const borderRef = useContext(BorderContext);

  let shiftLeft = null;
  let shiftTop = null;


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


  const handleParentMouseMove = ((event) => {

    currentRef.current.style.top = event.pageY - shiftTop + 'px';
    currentRef.current.style.left = event.pageX - shiftLeft + 'px';

    // currentRef.current.style.left = event.pageX - currentRef.current.offsetWidth / 2 + 'px';
    // currentRef.current.style.top = event.pageY - currentRef.current.offsetHeight / 2 + 'px';


  });


  const handleMouseDown = (event) => {
    setDragging(true);
    console.log('handleMouseDown');
    let coords = getCoords(currentRef.current);
    shiftLeft = event.pageX - coords.left;
    shiftTop = event.pageY - coords.top;

    currentRef.current.style.width = currentRef.current.getBoundingClientRect().width + 'px';
    currentRef.current.style.height = currentRef.current.getBoundingClientRect().height + 'px';

    currentRef.current.style.zIndex = 1000;
    currentRef.current.style.position = 'fixed';
    document.querySelector('.board').appendChild(currentRef.current);

    handleParentMouseMove(event);

    borderRef.current.addEventListener('mousemove', handleParentMouseMove);
  };


  const handleMouseUp = (event) => {
    setDragging(false);
    console.log('handleMouseUp');
    borderRef.current.removeEventListener('mousemove', handleParentMouseMove);


  };


  return (
    <div
      id={`draggable-${card.id}`}
      className='card draggable'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={currentRef}
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
