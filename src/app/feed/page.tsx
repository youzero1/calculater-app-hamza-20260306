'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { CalculationRecord } from '../../types';

export default function FeedPage() {
  const [calculations, setCalculations] = useState<CalculationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    fetch('/api/feed')
      .then(res => res.json())
      .then(data => {
        setCalculations(data.calculations || []);
        setLoading(false);
      })
      .catch(e => {
        console.error('Failed to fetch feed:', e);
        setLoading(false);
      });
  }, []);

  const handleCopyLink = (shareId: string, id: string) => {
    const link = `${baseUrl}/shared/${shareId}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <h1 className="page-title">Public Feed</h1>
        <p className="page-subtitle">Interesting calculations shared by users</p>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading feed...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className="page-title">Public Feed</h1>
      <p className="page-subtitle">Interesting calculations shared by users</p>

      {calculations.length === 0 ? (
        <div className={styles.empty}>
          <p>No shared calculations yet.</p>
          <p className={styles.hint}>Be the first to share a calculation from your history!</p>
          <Link href="/history" className={styles.historyLink}>Go to History</Link>
        </div>
      ) : (
        <ul className={styles.list}>
          {calculations.map(calc => (
            <li key={calc.id} className={styles.item}>
              <div className={styles.calcInfo}>
                <span className={styles.expression}>{calc.expression}</span>
                <span className={styles.equals}>=</span>
                <span className={styles.result}>{calc.result}</span>
              </div>
              <div className={styles.footer}>
                <span className={styles.date}>
                  {new Date(calc.createdAt).toLocaleString()}
                </span>
                <div className={styles.actions}>
                  <Link href={`/shared/${calc.shareId}`} className={styles.viewBtn}>
                    👁 View
                  </Link>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopyLink(calc.shareId!, calc.id)}
                  >
                    {copiedId === calc.id ? '✓ Copied!' : '🔗 Copy'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
