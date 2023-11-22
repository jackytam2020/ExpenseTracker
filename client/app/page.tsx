'use client';
import React, { useEffect } from 'react';
import axios from 'axios';
import loginStyles from './styles/Login.module.scss';

import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  async function loginCallback() {
    try {
      const res = await axios.get('http://localhost:8080/auth/profile', {
        withCredentials: true,
      });

      if (res.data) {
        router.push('/home');
      }
    } catch (error) {}
  }

  useEffect(() => {
    loginCallback();
  }, []);
  return (
    <div className={loginStyles.login}>
      <div className={loginStyles.login__container}>
        <h1>ExpenseTracker</h1>
        <h3>Log into your account </h3>
        <a
          className={loginStyles.login__googleBox}
          href="http://localhost:8080/auth/google"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className={loginStyles.login__googleIcon}
          />
          <p className={loginStyles.login__googleText}> Google</p>
        </a>
      </div>
    </div>
  );
}
