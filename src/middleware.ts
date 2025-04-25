import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';



export function middleware(req: NextRequest) {
  console.log('🔥 Middleware triggered on:', req.nextUrl.pathname);
  const token = req.cookies.get('authToken')?.value;
  const isValid = token && verifyToken(token);
  console.log(token,isValid);

//   if (!isValid && req.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // You can add more paths like '/profile' etc.
};
