'use client';
import React, { useState, useEffect } from 'react';
import ButtonStyles from '../styles/Button.module.scss';

export default function Button({
  text,
  type,
  onClick,
  linkedButton,
  disabled,
}: {
  text: string;
  type?: string;
  onClick?: () => void;
  linkedButton?: string;
  disabled?: boolean;
}) {
  const [buttonStyle, setButtonStyle] = useState(ButtonStyles.button);

  useEffect(() => {
    if (type === 'Cancel') {
      setButtonStyle(ButtonStyles.cancelButton);
    } else if (type === 'Delete') {
      setButtonStyle(ButtonStyles.deleteButton);
    } else if (type === 'Confirm') {
      setButtonStyle(ButtonStyles.confirmButton);
    } else if (type === 'Disabled') {
      setButtonStyle(ButtonStyles.disabled);
    }
  }, [type]);
  return (
    <button
      type="button"
      disabled={disabled ? disabled : false}
      className={buttonStyle}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {linkedButton ? (
        <a className={ButtonStyles.button__linkedText} href={linkedButton}>
          {text}
        </a>
      ) : (
        <p className={ButtonStyles.button__text}>{text}</p>
      )}
    </button>
  );
}
