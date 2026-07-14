import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt, SESSION_COOKIE } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the session cookie
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  const session = cookie ? await decrypt(cookie) : null;
  const role = session?.role;

  // Protect /nexus (Organizer Only)
  if (pathname.startsWith('/nexus')) {
    if (role !== 'ORGANIZER') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect /tasks (Staff & Organizer Only)
  if (pathname.startsWith('/tasks')) {
    if (role !== 'STAFF' && role !== 'ORGANIZER') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Prevent logged-in users from accessing the login page
  if (pathname === "/login" && session) {
    if (role === "ORGANIZER") {
      return NextResponse.redirect(new URL("/nexus", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // API Security & Efficiency: Drop large payload attempts early
  if (pathname.startsWith('/api/')) {
    const contentLength = request.headers.get('content-length');
    // Reject payloads larger than 50KB to prevent easy DoS
    if (contentLength && parseInt(contentLength) > 50000) {
      return new NextResponse(
        JSON.stringify({ message: 'Payload Too Large' }),
        { status: 413, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

// Only run proxy on protected routes, APIs, and login
export const config = {
  matcher: ['/nexus/:path*', '/tasks/:path*', '/api/:path*', '/login'],
};

