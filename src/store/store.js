import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/boardSlice';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';


export default configureStore({
  reducer: {
    boardReducer: boardReducer,
  },
  middleware: [thunk],

});
