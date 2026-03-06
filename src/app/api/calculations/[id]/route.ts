import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '../../../../lib/database';
import { Calculation } from '../../../../entities/Calculation';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ds = await getDataSource();
    const repo = ds.getRepository(Calculation);

    const calc = await repo.findOne({ where: { id } });
    if (!calc) {
      return NextResponse.json({ error: 'Calculation not found' }, { status: 404 });
    }

    await repo.remove(calc);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete calculation' }, { status: 500 });
  }
}
