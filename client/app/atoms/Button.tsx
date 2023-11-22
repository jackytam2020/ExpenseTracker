'use client';
import React, { useState, useEffect } from 'react';
import ButtonStyles from '../styles/Button.module.scss';

export default function Button({
  text,
  type,
  onClick,
}: {
  text: string;
  type?: string;
  onClick?: () => void;
}) {
  const [buttonStyle, setButtonStyle] = useState(ButtonStyles.button);

  useEffect(() => {
    if (type === 'Cancel') {
      setButtonStyle(ButtonStyles.cancelButton);
    } else if (type === 'Delete') {
      setButtonStyle(ButtonStyles.deleteButton);
    }
  }, []);
  return (
    <div
      className={buttonStyle}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <p className={ButtonStyles.button__text}>{text}</p>
    </div>
  );
}
