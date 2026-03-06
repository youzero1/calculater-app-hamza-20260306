import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '../../../lib/database';
import { Calculation } from '../../../entities/Calculation';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(Calculation);

    const calc = await repo.findOne({ where: { id } });
    if (!calc) {
      return NextResponse.json({ error: 'Calculation not found' }, { status: 404 });
    }

    if (!calc.isShared) {
      calc.isShared = true;
      calc.shareId = uuidv4();
      await repo.save(calc);
    }

    return NextResponse.json({ calculation: calc });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to share calculation' }, { status: 500 });
  }
}
