import { useSelector } from 'react-redux';


function UseAuth() {
  const { email, token, id } = useSelector((state) => {
    return state.userReducer;
  });
  return {
    isAuthenticated: !!email,
    email,
    token,
    id,
  };
}

export default UseAuth;