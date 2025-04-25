import { db } from '@/db';
import { users } from '@/db/schema';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
  const { name,email, password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);

  const inserted = await db.insert(users).values({
    name,
    email,
    password: hashed,
  }).returning();

  const token = signToken({ userId: inserted[0].id });
  return NextResponse.json({ token,userid:inserted[0].id,name:inserted[0].name });
}
