import { db } from '@/db';
import { users } from '@/db/schema';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);

  const inserted = await db.insert(users).values({
    email,
    password: hashed,
  }).returning();

  const token = signToken({ userId: inserted[0].id });
  return NextResponse.json({ token });
}
