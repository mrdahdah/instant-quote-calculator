import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!_next|api/stripe/webhook).*)']
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';
  // Attach tenant host to headers for server routes and pages
  url.searchParams.set('tenant_host', host);
  return NextResponse.rewrite(url, {
    request: {
      headers: new Headers({ ...Object.fromEntries(req.headers), 'x-tenant-host': host })
    }
  });
}
