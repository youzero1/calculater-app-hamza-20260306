'use client';

import React, { useState } from 'react';
import styles from './History.module.css';
import { CalculationRecord } from '../types';

interface HistoryProps {
  calculations: CalculationRecord[];
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function History({
  calculations,
  onDelete,
  onShare,
  loading,
  searchQuery,
  onSearchChange,
}: HistoryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareLinks, setShareLinks] = useState<Record<string, string>>({});

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const handleShare = async (id: string) => {
    await onShare(id);
  };

  const handleCopyLink = (shareId: string, id: string) => {
    const link = `${baseUrl}/shared/${shareId}`;
    setShareLinks(prev => ({ ...prev, [id]: link }));
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading history...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search calculations..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {calculations.length === 0 ? (
        <div className={styles.empty}>
          <p>No calculations found.</p>
          <p className={styles.hint}>Start calculating to see your history here!</p>
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
              <div className={styles.meta}>
                <span className={styles.date}>
                  {new Date(calc.createdAt).toLocaleString()}
                </span>
                {calc.isShared && calc.shareId && (
                  <span className={styles.sharedBadge}>Shared</span>
                )}
              </div>
              <div className={styles.actions}>
                {calc.isShared && calc.shareId ? (
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopyLink(calc.shareId!, calc.id)}
                  >
                    {copiedId === calc.id ? '✓ Copied!' : '🔗 Copy Link'}
                  </button>
                ) : (
                  <button
                    className={styles.shareBtn}
                    onClick={() => handleShare(calc.id)}
                  >
                    📤 Share
                  </button>
                )}
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(calc.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
