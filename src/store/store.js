import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

import boardReducer from './slices/boardSlice';


export default configureStore({
  reducer: {
    boardReducer: boardReducer,
  },
  middleware: [thunk],

});
