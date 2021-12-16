import { Route, Routes, BrowserRouter } from 'react-router-dom';
import routes from './routes';
import './assets/scss/global.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DefaultLayout>
          <Routes>
            {routes &&
              routes.map((route) => {
                return <Route key={route.path} path={route.path} element={route.element} />;
              })}
          </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
