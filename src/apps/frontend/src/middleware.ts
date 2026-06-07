import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname.startsWith('/auth/login');
  const isLogoutRoute = request.nextUrl.pathname.startsWith('/auth/logout');
  const isRecoverRoute = request.nextUrl.pathname.startsWith('/auth/recover');

  // Se estiver na rota admin e não tem token, redireciona para login
  if (isAdminRoute && !token && !isLoginRoute && !isLogoutRoute && !isRecoverRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se estiver na rota login e já tem token, redireciona para admin
  if (isLoginRoute && token) {
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/login', '/auth/logout', '/auth/recover'],
};