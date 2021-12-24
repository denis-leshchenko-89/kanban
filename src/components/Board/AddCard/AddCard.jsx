import React, { useState } from 'react';
import './AddCard.scoped.scss';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addCard } from '../../../store/slices/boardSlice';
import TextareaAutosize from 'react-textarea-autosize';

function AddCard({ columnIndex }) {
  const dispatch = useDispatch();
  const [cardText, setCardText] = useState('');
  const [isEdit, setIsEdit] = useState(false);


  const handleToggle = () => {
    setIsEdit(!isEdit);
    setCardText('');
  };

  const handleEditTitleCard = (event) => {
    const value = event.target.value;
    setCardText(value);
  };

  const handleAddCard = () => {
    if (cardText !== '') {
      const card = { id: uuid(), text: cardText };
      dispatch(addCard({ card, columnIndex: columnIndex }));
      setIsEdit(!isEdit);
    }
  };


  return (
    <div className='add-card'>
      <div className='add-button'>
        <div
          className={classNames({
            placeholder: true,
            hide: isEdit,
          })}
          onClick={handleToggle}
        >
          <i className='far fa-plus' />Добавьте еще одну колонку
        </div>
        <div
          className={classNames({
            form: true,
            show: isEdit,
          })}
        >
          <div className='textarea'>
            <TextareaAutosize value={cardText} placeholder='Ввести заголовок для этой карточки'
                              onChange={handleEditTitleCard}/>
          </div>
          <div className='nav'>
            <button type='button' onClick={handleAddCard}>
              Добавить карточку
            </button>
            <i className='fal fa-times' onClick={handleToggle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
