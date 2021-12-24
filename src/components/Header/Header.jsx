import './Header.scoped.scss';
import { removeUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';


function Header() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(removeUser());
  };
  return (
    <header className='header'>
      <h1>Лого</h1>
      <button type='button' onClick={logOut}>Выйти</button>
    </header>
  );
}

export default Header;

