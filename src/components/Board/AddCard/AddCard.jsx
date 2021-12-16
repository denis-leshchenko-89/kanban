import React, { useState } from 'react';
import './AddCard.scoped.scss';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addCard } from '../../../store/reducers/boardSlice';

function AddCard({ columnIndex }) {
  const dispatch = useDispatch();
  const [cardText, setCardText] = useState('');
  const [isEdit, setIsEdit] = useState(false);


  const handleToggle = () => {
    setIsEdit(!isEdit);
    setCardText('');
  };

  const handleAddTitleCard = (event) => {
    const value = event.target.value;
    setCardText(value);
  };

  const handleAddCard = () => {
    if (cardText !== '') {
      const card = { id: `card-${uuid()}`, text: cardText };
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
          <div className='input'>
            <input type='text' value={cardText} onChange={handleAddTitleCard} />
          </div>
          <div className='nav'>
            <button type='button' onClick={handleAddCard}>
              Добавить список
            </button>
            <i className='fal fa-times' onClick={handleToggle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
