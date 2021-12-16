import './AuthLayout.scss';

const AuthLayout = ({ children }) => {
  return (
    <div className='auth-layout'>
      <main className='main'>{children}</main>
    </div>
  );
};

export default AuthLayout;
