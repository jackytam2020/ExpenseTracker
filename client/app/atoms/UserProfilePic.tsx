import React from 'react';
import ProfileStyles from '../styles/UserProfilePic.module.scss';

export default function UserProfilePic({ src }: { src: string }) {
  return (
    <div className={ProfileStyles.container}>
      <img
        className={ProfileStyles.container__userImage}
        src={src}
        alt={'User-Profile-Pic'}
      />
    </div>
  );
}
