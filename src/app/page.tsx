'use client';

import React from 'react';
import Calculator from '../components/Calculator';
import styles from './page.module.css';

export default function Home() {
  const handleCalculation = async (expression: string, result: string) => {
    try {
      await fetch('/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression, result }),
      });
    } catch (e) {
      console.error('Failed to save calculation:', e);
    }
  };

  return (
    <main className={styles.main}>
      <Calculator onCalculation={handleCalculation} />
    </main>
  );
}
