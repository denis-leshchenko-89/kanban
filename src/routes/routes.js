import {
  Navigate
} from 'react-router-dom';
import React from 'react';
import HomePage from '../page/HomePage';
import LoginPage from '../page/LoginPage';

const routes = [{
    path: '/',
    element: <HomePage /> ,
  },
  {
    path: '/login',
    element: <LoginPage /> ,
  },
  {
    path: '*',
    element: < Navigate to = '/login' /> ,
  },
];

export default routes;