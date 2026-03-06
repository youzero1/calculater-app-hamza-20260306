'use client';

import React from 'react';
import styles from './Display.module.css';

interface DisplayProps {
  expression: string;
  value: string;
}

export default function Display({ expression, value }: DisplayProps) {
  const fontSize = value.length > 9 ? '2rem' : value.length > 6 ? '2.8rem' : '3.5rem';

  return (
    <div className={styles.display}>
      <div className={styles.expression}>{expression || '\u00A0'}</div>
      <div className={styles.value} style={{ fontSize }}>
        {value || '0'}
      </div>
    </div>
  );
}
