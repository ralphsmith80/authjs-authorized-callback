export { auth as middleware } from '@/auth'

// Optionally, don't invoke Middleware on some paths
export const config = {
  /*
   * Match all routes except for the following:
   * - api/* (API routes)
   * - _next/static/* (static files)
   * - _next/image* (image optimization files)
   * - favicon.ico
   * - robots.txt
   * - home page (root route)
   */
  matcher: [
    '/((?!api|_next/static|_next/image|images|fonts|favicon.ico|robots.txt|$).*)',
    // '/((?!api|_next/static|_next/image|images|fonts|favicon.ico|robots.txt|dashboard$).*)',
  ],
}
