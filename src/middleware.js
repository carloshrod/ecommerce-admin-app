import { DASHBOARD, FORGOT_PASSWORD, HOME, SIGNIN } from '@utils/routes';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
	const authToken = req.cookies.get('authToken');
	const publicRoutes = [HOME, SIGNIN, FORGOT_PASSWORD];
	const requestedPage = req.nextUrl.pathname;

	if (!authToken && !publicRoutes.includes(requestedPage)) {
		return NextResponse.redirect(new URL(SIGNIN, req.url));
	}

	if (authToken && publicRoutes.includes(requestedPage)) {
		try {
			return NextResponse.redirect(new URL(DASHBOARD, req.url));
		} catch (error) {
			return NextResponse.next();
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/auth/:path*', '/admin/:path*'],
};
