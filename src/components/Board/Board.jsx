import React, { createContext, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import './Board.scoped.scss';
import AddColumn from '../../components/Board/AddColumn';
import Column from '../../components/Board/Column/Column';
import { useSelector } from 'react-redux';

export const BorderContext = createContext(null);

function Board() {
  const columns = useSelector((state) => {
    return state.boardReducer.columns;
  });

  const borderRef = useRef();
  return (
    <BorderContext.Provider value={borderRef}>
      <div className='board' ref={borderRef}>
        {columns &&
          columns.map((column, columnIndex) => {
            return (
              <Column key={uuid()} column={column} columnIndex={columnIndex} />
            );
          })}
        <AddColumn />
      </div>
    </BorderContext.Provider>

  );
}

export default Board;
