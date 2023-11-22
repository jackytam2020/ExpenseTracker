import React from 'react';
import UserProfilePic from '../atoms/UserProfilePic';
import Button from '../atoms/Button';

import NavStyles from '../styles/Nav.module.scss';

export default function Nav() {
  return (
    <nav className={NavStyles.nav}>
      <div className={NavStyles.nav__left}>
        <h1>ExpenseTracker</h1>
      </div>
      <div className={NavStyles.nav__right}>
        <UserProfilePic />
        <Button text={'Logout'} />
      </div>
    </nav>
  );
}
