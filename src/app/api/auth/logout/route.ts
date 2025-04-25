import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));

  // Clear the cookie by setting it with an expired date or maxAge 0
  response.cookies.set('authToken', '', {
    path: '/',
    maxAge: 0, // Set maxAge to 0 to expire immediately
    httpOnly: true, // Ensure it's HTTP-only for security
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // You can adjust this as needed
  });

  return response;
}
