import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Contoh proteksi berbasis role jika nanti ada rute khusus admin
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.rewrite(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/api/auth/signin',
    },
  }
);

export const config = {
  matcher: ['/proyek/:path*', '/stakeholder/:path*'],
};
