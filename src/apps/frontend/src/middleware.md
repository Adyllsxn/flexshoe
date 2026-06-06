import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('jwt');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname.startsWith('/auth/login');
  const isLogoutRoute = request.nextUrl.pathname.startsWith('/auth/logout');

  // Log para debug
  console.log('🔍 Middleware executando:', {
    path: request.nextUrl.pathname,
    isLoggedIn: !!isLoggedIn,
    cookieValue: isLoggedIn?.value
  });

  if (isAdminRoute && !isLoggedIn && !isLoginRoute && !isLogoutRoute) {
    console.log('🚫 Redirecionando para login');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};