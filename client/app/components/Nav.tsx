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
  const currentUserID = useSelector((state: globalType) => state.user.googleId);
  const userPic = useSelector((state: globalType) => state.user.picture);

  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <nav className={currentUserID ? NavStyles.nav : NavStyles.navHidden}>
      <div className={NavStyles.nav__left}>
        <h1>ExpenseTracker</h1>
      </div>

      <div className={NavStyles.nav__right}>
        <UserProfilePic src={userPic} />
        <Button
          text={'Logout'}
          onClick={handleLogout}
          linkedButton={`${process.env.HOST}/auth/logout`}
        />
      </div>
    </nav>
  );
}
