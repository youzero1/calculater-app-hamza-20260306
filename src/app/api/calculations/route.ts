import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '../../../lib/database';
import { Calculation } from '../../../entities/Calculation';
import { v4 as uuidv4 } from 'uuid';
import { Like } from 'typeorm';

export async function GET(req: NextRequest) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Calculation);
    const search = req.nextUrl.searchParams.get('search') || '';

    let calculations;
    if (search) {
      calculations = await repo.find({
        where: [
          { expression: Like(`%${search}%`) },
          { result: Like(`%${search}%`) },
        ],
        order: { createdAt: 'DESC' },
        take: 100,
      });
    } else {
      calculations = await repo.find({
        order: { createdAt: 'DESC' },
        take: 100,
      });
    }

    return NextResponse.json({ calculations });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch calculations' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { expression, result } = body;

    if (!expression || !result) {
      return NextResponse.json({ error: 'Missing expression or result' }, { status: 400 });
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(Calculation);

    const calc = repo.create({
      id: uuidv4(),
      expression,
      result,
      isShared: false,
      shareId: null,
    });

    await repo.save(calc);
    return NextResponse.json({ calculation: calc }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to save calculation' }, { status: 500 });
  }
}
