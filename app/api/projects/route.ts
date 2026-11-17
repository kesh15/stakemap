import { NextResponse } from 'next/server';
import { guardApi } from '@/lib/dal';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  const { error } = await guardApi('project:read');
  if (error) return error;

  try {
    const data = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.created_at));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { error } = await guardApi('project:create');
  if (error) return error;

  try {
    const body = await request.json();
    const [newItem] = await db.insert(projects).values(body).returning();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
