'use client';
import React from 'react';
import UserProfilePic from '../atoms/UserProfilePic';
import Button from '../atoms/Button';

import NavStyles from '../styles/Nav.module.scss';

//redux functions
import { setLogout } from '../state/global';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//Types
import { globalType } from '../utils/interfaces';

export default function Nav() {
  const dispatch = useDispatch();
  const globalStates = useSelector((state: globalType) => state);

  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <nav
      className={globalStates.user._id ? NavStyles.nav : NavStyles.navHidden}
    >
      <div className={NavStyles.nav__left}>
        <h1>ExpenseTracker</h1>
      </div>

      <div className={NavStyles.nav__right}>
        <UserProfilePic src={globalStates.user.picture} />
        <Button
          text={'Logout'}
          linkedButton={'http://localhost:8080/auth/logout'}
          onClick={handleLogout}
        />
      </div>
    </nav>
  );
}
