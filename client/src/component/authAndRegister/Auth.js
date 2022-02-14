import React from 'react';

import AuthIcon from '../../assets/auth.png';

import style from './auth.module.css';

const Auth = () => {
  return (
    <div className={style.auth__container}>
      <form>
        <div className={style.logo}>
          <img src={AuthIcon} alt="register" />
          Sign In Form
        </div>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Auth;
