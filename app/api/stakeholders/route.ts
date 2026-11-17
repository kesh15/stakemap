import { NextResponse } from 'next/server';
import { guardApi } from '@/lib/dal';
import { db } from '@/db';
import { stakeholders } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  const { error } = await guardApi('stakeholder:read');
  if (error) return error;

  try {
    const data = await db
      .select()
      .from(stakeholders)
      .orderBy(desc(stakeholders.created_at));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching stakeholders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stakeholders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { error } = await guardApi('stakeholder:create');
  if (error) return error;

  try {
    const body = await request.json();
    const [newItem] = await db.insert(stakeholders).values(body).returning();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating stakeholder:', error);
    return NextResponse.json(
      { error: 'Failed to create stakeholder' },
      { status: 500 }
    );
  }
}
