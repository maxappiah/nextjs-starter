// components/ProgressBar.js
import React from 'react';
import styles from './ProgressBar.module.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
