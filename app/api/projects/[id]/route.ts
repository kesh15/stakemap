import { NextResponse } from 'next/server';
import { guardApi } from '@/lib/dal';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await guardApi('project:update');
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    const [updatedItem] = await db
      .update(projects)
      .set({ ...body, updated_at: new Date() })
      .where(eq(projects.id, id))
      .returning();

    if (!updatedItem) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await guardApi('project:delete');
  if (error) return error;

  try {
    const { id } = await params;
    const [deletedItem] = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();

    if (!deletedItem) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(deletedItem);
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
