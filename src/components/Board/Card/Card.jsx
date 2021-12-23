import React, { useEffect, useState } from 'react';
import './Card.scoped.scss';
import { deleteCard, editTextCard } from '../../../store/slices/boardSlice';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';


function Card({ card, columnIndex, cardIndex, ...provided }) {
  const [value, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();


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


  return (
    <Draggable
      key={card.id}
      draggableId={card.id}
      index={cardIndex}
    >
      {(provided, snapshot) => {
        return (
          <div
            id={card.id}
            className='card'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...snapshot.isDragging,
              ...provided.draggableProps.style,
            }}
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
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
