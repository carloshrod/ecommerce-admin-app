import { NextResponse } from 'next/server';

export default async function middleware(req) {
	const authToken = req.cookies.get('authToken');
	const publicRoutes = ['/', '/auth/signin', '/auth/forgot-password'];
	const requestedPage = req.nextUrl.pathname;

	if (!authToken && !publicRoutes.includes(requestedPage)) {
		return NextResponse.redirect(new URL('/auth/signin', req.url));
	}

	if (authToken && publicRoutes.includes(requestedPage)) {
		try {
			return NextResponse.redirect(new URL('/admin/dashboard', req.url));
		} catch (error) {
			return NextResponse.next();
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/auth/:path*', '/admin/:path*'],
};
