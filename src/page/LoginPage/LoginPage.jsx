import React, { useState } from 'react';
import './LoginPage.scoped.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function LoginPage() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    const { email, password } = event.target.elements;

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(({ user }) => {
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }));
        history('/');
      })
      .catch((error) => {
        setError(error.code.slice(5));
      });
  };

  return (
    isAuthenticated ? <Navigate to='/' /> :
      <div className='login-page'>
        <div className='form'>
          <div className='nav'>
            <Link to='/login' className='active'>Логин</Link>
            <Link to='/registration'>Регистрация</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <input type='email' name='email' placeholder='Имя' />
            <input type='password' name='password' placeholder='Пароль' />
            <button type='submit'>Вход</button>
          </form>
          <div className='error-message'>{error}</div>
        </div>
      </div>
  );
}

export default LoginPage;
