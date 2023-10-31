import React from 'react';
import ButtonStyles from '../styles/Button.module.scss';

export default function Button({ text }: { text: string }) {
  return (
    <div className={ButtonStyles.button}>
      <p className={ButtonStyles.button__text}>{text}</p>
    </div>
  );
}
