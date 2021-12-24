import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './assets/scss/global.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import './firebase';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './page/HomePage';
import RequireAuth from './HOC/RequireAuth';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import LoginPage from './page/LoginPage';
import AuthLayout from './layouts/AuthLayout';
import RegistrationnPage from './page/RegistrationnPage';


const persistor = persistStore(store);


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path='/' element={<DefaultLayout />}>
              <Route path='/' element={<RequireAuth><HomePage /></RequireAuth>} />;
            </Route>
            <Route path='/' element={<AuthLayout />}>
              <Route path='/login' element={<LoginPage />} />;
              <Route path='/registration' element={<RegistrationnPage />} />;
            </Route>
            <Route path='*' element={<LoginPage />} />;
          </Routes>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
