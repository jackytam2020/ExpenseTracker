'use client';
import React from 'react';
import axios from 'axios';

export default function Login() {
  async function login() {
    const res = axios.get('/auth/google');
    console.log(res);
  }
  return (
    <div>
      <h1>Sign in</h1>
      <a href="http://localhost:8080/auth/google">Sign in with Google</a>
    </div>
  );
}
