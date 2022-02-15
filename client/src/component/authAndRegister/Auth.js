import { Cancel } from '@material-ui/icons';
import React, { useRef, useState } from 'react';

import AuthIcon from '../../assets/auth.png';
import axios from 'axios';

import style from './auth.module.css';

const Auth = ({ setShowLogin, storage, setCurrentUser }) => {
  const [fail, setFail] = useState(false);
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post('/users/login', user);
      storage.setItem('token', response.data.username);
      setCurrentUser(response.data.username);
      setShowLogin(false);
      setFail(false);
    } catch (err) {
      setFail(true);
    }
  };

  return (
    <div className={style.auth__container}>
      <form onSubmit={handleSubmit}>
        <div className={style.logo}>
          <img src={AuthIcon} alt="register" />
          Sign In Form
        </div>
        <input type="text" placeholder="Username" ref={userNameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button>Sign In</button>
        {fail && <span className={style.failure}>Something wrong</span>}
      </form>
      <Cancel
        className={style.auth_cancel}
        onClick={() => setShowLogin(false)}
      />
    </div>
  );
};

export default Auth;
