import React from 'react';
import UserProfilePic from '../atoms/UserProfilePic';
import Button from '../atoms/Button';

import axios from 'axios';

import NavStyles from '../styles/Nav.module.scss';

export default function Nav() {
  async function handleLogOut() {
    axios.get('http://localhost:8080/auth/logout', { withCredentials: true });
  }
  return (
    <nav className={NavStyles.nav}>
      <div className={NavStyles.nav__left}>
        <h1>ExpenseTracker</h1>
      </div>
      <div className={NavStyles.nav__right}>
        <UserProfilePic />
        <Button
          text={'Logout'}
          onClick={handleLogOut}
          linkedButton={'http://localhost:8080/auth/logout'}
        />
      </div>
    </nav>
  );
}
