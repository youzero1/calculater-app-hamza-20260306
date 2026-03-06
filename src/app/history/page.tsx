'use client';

import React, { useState, useEffect, useCallback } from 'react';
import History from '../../components/History';
import { CalculationRecord } from '../../types';
import styles from './page.module.css';

export default function HistoryPage() {
  const [calculations, setCalculations] = useState<CalculationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCalculations = useCallback(async (query = '') => {
    setLoading(true);
    try {
      const url = query
        ? `/api/calculations?search=${encodeURIComponent(query)}`
        : '/api/calculations';
      const res = await fetch(url);
      const data = await res.json();
      setCalculations(data.calculations || []);
    } catch (e) {
      console.error('Failed to fetch calculations:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalculations();
  }, [fetchCalculations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCalculations(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchCalculations]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/calculations/${id}`, { method: 'DELETE' });
      setCalculations(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      console.error('Failed to delete calculation:', e);
    }
  };

  const handleShare = async (id: string) => {
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.calculation) {
        setCalculations(prev =>
          prev.map(c => (c.id === id ? data.calculation : c))
        );
      }
    } catch (e) {
      console.error('Failed to share calculation:', e);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className="page-title">Calculation History</h1>
      <p className="page-subtitle">View, search, and manage your past calculations</p>
      <History
        calculations={calculations}
        onDelete={handleDelete}
        onShare={handleShare}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </main>
  );
}
