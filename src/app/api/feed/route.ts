import { NextResponse } from 'next/server';
import { getDataSource } from '../../../lib/database';
import { Calculation } from '../../../entities/Calculation';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Calculation);

    const calculations = await repo.find({
      where: { isShared: true },
      order: { createdAt: 'DESC' },
      take: 50,
    });

    return NextResponse.json({ calculations });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
}
