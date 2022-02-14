import React, { useRef, useState } from 'react';

import RegIcon from '../../assets/register.png';

import style from './register.module.css';

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div className={style.register__container}>
      <form>
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
    </div>
  );
};

export default Register;
