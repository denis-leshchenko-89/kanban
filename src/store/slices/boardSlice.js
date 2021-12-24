import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  columns: [
    {
      id: uuid(), title: 'План на месяц', cards: [
        { id: uuid(), text: 'Пройти курс по React' },
        { id: uuid(), text: 'Отметить день рождения' },
      ],
    },
    {
      id: uuid(), title: 'План на день', cards: [
        { id: uuid(), text: 'Записаться на курс по React' },
        { id: uuid(), text: 'Забронировать тир на субботу' },
      ],
    },
  ],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    editTitleColumn: (state, action) => {
      state.columns[action.payload.columnIndex].title = action.payload.title;
    },
    addColumn: (state, action) => {
      state.columns.push(action.payload);
    },
    addCard: (state, action) => {
      console.log(action.payload);
      state.columns[action.payload.columnIndex].cards.push(action.payload.card);
    },
    editTextCard: (state, action) => {
      state.columns[action.payload.columnIndex].cards[action.payload.cardIndex].text = action.payload.text;
    },
    deleteCard: (state, action) => {
      state.columns[action.payload.columnIndex].cards.splice(action.payload.cardIndex, 1);
    },
    deleteColumn: (state, action) => {
      state.columns.splice(action.payload, 1);
    },
    setColumns: (state, action) => {
      if (action.payload.sourceCards && action.payload.destinationCards) {
        state.columns[action.payload.columnSourceIndex].cards = action.payload.sourceCards;
        state.columns[action.payload.columnDestinationIndex].cards = action.payload.destinationCards;
      } else {
        state.columns[action.payload.columnSourceIndex].cards = action.payload.sourceCards;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addColumn, addCard, editTitleColumn, editTextCard, deleteCard, deleteColumn, setColumns,
} = boardSlice.actions;

export default boardSlice.reducer;
