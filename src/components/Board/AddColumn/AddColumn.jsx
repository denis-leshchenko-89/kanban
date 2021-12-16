import React, { useState } from 'react';
import classNames from 'classnames';
import './AddColumn.scoped.scss';
import { useDispatch } from 'react-redux';
import { addColumn } from '../../../store/reducers/boardSlice';
import { v4 as uuid } from 'uuid';

function AddColumn() {
  const [isEdit, setIsEdit] = useState(false);
  const [columnTitle, setColumnTitle] = useState('');

  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsEdit(!isEdit);
    setColumnTitle('');
  };

  const handleChangeTitle = (event) => {
    setColumnTitle(event.target.value);
  };

  const handleAddColumn = () => {
    if (columnTitle !== '') {
      const column = { id: `column-${uuid()}`, title: columnTitle, cards: [] };
      dispatch(addColumn(column));
      setIsEdit(!isEdit);
    }
  };

  return (
    <div className='add-column'>
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
            <input type='text' value={columnTitle} onChange={handleChangeTitle} />
          </div>
          <div className='nav'>
            <button type='button' onClick={handleAddColumn}>
              Добавить список
            </button>
            <i className='fal fa-times' onClick={handleToggle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddColumn;
