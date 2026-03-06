import React from 'react';
import { getDataSource } from '../../../lib/database';
import { Calculation } from '../../../entities/Calculation';
import SharedCalculation from '../../../components/SharedCalculation';
import Link from 'next/link';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SharedPage({ params }: PageProps) {
  const { id } = await params;

  let calculation = null;
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Calculation);
    calculation = await repo.findOne({ where: { shareId: id, isShared: true } });
  } catch (e) {
    console.error('Failed to fetch shared calculation:', e);
  }

  if (!calculation) {
    return (
      <main className={styles.main}>
        <div className={styles.notFound}>
          <h1>404</h1>
          <p>This shared calculation was not found or has been removed.</p>
          <Link href="/" className={styles.homeLink}>Go to Calculator</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <SharedCalculation calculation={{
        id: calculation.id,
        expression: calculation.expression,
        result: calculation.result,
        isShared: calculation.isShared,
        shareId: calculation.shareId,
        createdAt: calculation.createdAt,
      }} />
    </main>
  );
}
