'use client';

import React from 'react';
import Link from 'next/link';
import styles from './SharedCalculation.module.css';
import { CalculationRecord } from '../types';

interface SharedCalculationProps {
  calculation: CalculationRecord;
}

export default function SharedCalculation({ calculation }: SharedCalculationProps) {
  const [copied, setCopied] = React.useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const shareUrl = `${baseUrl}/shared/${calculation.shareId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.badge}>Shared Calculation</span>
        </div>
        <div className={styles.calculation}>
          <div className={styles.expression}>{calculation.expression}</div>
          <div className={styles.equals}>=</div>
          <div className={styles.result}>{calculation.result}</div>
        </div>
        <div className={styles.date}>
          Calculated on {new Date(calculation.createdAt).toLocaleString()}
        </div>
        <div className={styles.actions}>
          <button className={styles.copyBtn} onClick={handleCopy}>
            {copied ? '✓ Link Copied!' : '🔗 Copy Share Link'}
          </button>
          <Link href="/" className={styles.calcBtn}>
            🔢 Open Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
