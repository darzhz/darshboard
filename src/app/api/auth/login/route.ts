import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const found = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!found.length) return NextResponse.json({ error: 'User not found' }, { status: 401 });
  const user = found[0];

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = signToken({ userId: user.id });
  return NextResponse.json({ token });
}
