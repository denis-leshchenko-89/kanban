import { Outlet } from 'react-router-dom';
import './DefaultLayout.scss';
import Header from '../../components/Header';

function DefaultLayout() {
  return (
    <div className='board-layout'>
      <Header />
      <main className='main'><Outlet /></main>
    </div>
  );
}

export default DefaultLayout;
