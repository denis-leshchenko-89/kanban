import { Outlet } from 'react-router-dom';
import './AuthLayout.scss';

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <main className='main'><Outlet /></main>
    </div>
  );
};

export default AuthLayout;
