'use client';
import React, { useState } from 'react';
import ToggleSwitchStyles from '../styles/Toggle.module.scss';

import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import TableRowsIcon from '@mui/icons-material/TableRows';

export default function ToggleSwitch({
  setSelectedView,
}: {
  setSelectedView: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isLeftActive, setIsLeftActive] = useState<boolean>(true);

  return (
    <div className={ToggleSwitchStyles.toggle}>
      <div className={ToggleSwitchStyles.toggle__container}>
        <div
          className={
            isLeftActive
              ? ToggleSwitchStyles.toggle__overlayLeft
              : ToggleSwitchStyles.toggle__overlayRight
          }
        ></div>
        <button
          type="button"
          className={ToggleSwitchStyles.toggle__toggleBtnLeft}
          onClick={() => {
            setIsLeftActive(true);
            setSelectedView('entries');
          }}
        >
          <TableRowsIcon
            className={
              isLeftActive
                ? ToggleSwitchStyles.toggle__rowIconActive
                : ToggleSwitchStyles.toggle__rowIconOff
            }
          ></TableRowsIcon>
        </button>
        <button
          type="button"
          className={ToggleSwitchStyles.toggle__toggleBtnRight}
          onClick={() => {
            setIsLeftActive(false);
            setSelectedView('charts');
          }}
        >
          <StackedLineChartIcon
            className={
              isLeftActive
                ? ToggleSwitchStyles.toggle__chartIconOff
                : ToggleSwitchStyles.toggle__chartIconActive
            }
          ></StackedLineChartIcon>
        </button>
      </div>
    </div>
  );
}
