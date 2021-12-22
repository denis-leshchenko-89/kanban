import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import boardReducer from './slices/boardSlice';
import userReducer from './slices/userSlice';


const rootReducer = combineReducers({
  boardReducer: boardReducer,
  userReducer: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
