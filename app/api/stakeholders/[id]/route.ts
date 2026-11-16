import { NextResponse } from 'next/server';
import { db } from '@/db';
import { stakeholders } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const [updatedItem] = await db
      .update(stakeholders)
      .set({ ...body, updated_at: new Date() })
      .where(eq(stakeholders.id, id))
      .returning();

    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Stakeholder not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating stakeholder:', error);
    return NextResponse.json(
      { error: 'Failed to update stakeholder' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [deletedItem] = await db
      .delete(stakeholders)
      .where(eq(stakeholders.id, id))
      .returning();

    if (!deletedItem) {
      return NextResponse.json(
        { error: 'Stakeholder not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedItem);
  } catch (error) {
    console.error('Error deleting stakeholder:', error);
    return NextResponse.json(
      { error: 'Failed to delete stakeholder' },
      { status: 500 }
    );
  }
}
