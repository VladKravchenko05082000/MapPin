import React, { useRef, useState } from 'react';
import axios from 'axios';

import RegIcon from '../../assets/register.png';

import style from './register.module.css';
import { Cancel } from '@material-ui/icons';

const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post('/users/register', newUser);
      setFail(false);
      setSuccess(true);
    } catch (err) {
      setFail(true);
    }
  };

  return (
    <div className={style.register__container}>
      <form onSubmit={handleSubmit}>
        <div className={style.logo}>
          <img src={RegIcon} alt="register" />
          Register Form
        </div>
        <input type="text" placeholder="Username" ref={userNameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button>Register</button>
        {success && (
          <span className={style.successfull}>Register successfull</span>
        )}
        {fail && <span className={style.failure}>Something wrong</span>}
      </form>
      <Cancel
        className={style.register_cancel}
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Register;
