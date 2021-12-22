import React, { useState } from 'react';
import './RegistrationnPage.scoped.scss';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function RegistrationnPage() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    const { email, password } = event.target.elements;
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email.value, password.value)
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
      <div className='registration-page'>
        <div className='form'>
          <div className='nav'>
            <Link to='/login'>Логин</Link>
            <Link to='/registration' className='active'>Регистрация</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <input type='email' name='email' placeholder='Имя' />
            <input type='password' name='password' placeholder='Пароль' />
            <button type='submit'>Зарегистрироваться</button>
          </form>
          <div className='error-message'>{error}</div>
        </div>
      </div>
  );

}

export default RegistrationnPage;
