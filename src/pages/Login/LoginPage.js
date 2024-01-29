import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Navigate  } from 'react-router-dom';
import './loginStyle.css'; // Импортируем стили

const LoginPage = () => {
  const { loginUser, user } = useContext(AuthContext);
  return (
    <div className="container">
        {user ? (<Navigate  to="/" />
        ):(
        <form className="form" onSubmit={loginUser}>

        <label className="label-style"> Username </label>
        <input className='input-style' type="text" name="username" placeholder="Enter Username" />

        <label className="label-style"> Password </label>
        <input className='input-style' type="password" name="password" placeholder="Enter Password" />

        <input type="submit" />
    </form>
    )}
    </div>
  );
};

export default LoginPage;
