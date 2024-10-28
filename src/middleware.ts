import { auth } from '@/auth';
import { cookies } from '@configs/cookies';
import { fallbackLng, languages } from '@configs/i18n';
import { MiddlewareConfig, NextResponse } from 'next/server';
import { routes } from './configs/routes';

export const config: MiddlewareConfig = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default auth((req) => {
	const isLogout = !req.auth && !req.nextUrl.pathname.includes(routes['login']);
	const loginInUrl = new URL(routes['login'], req.nextUrl.origin);

	let lng;

	if (req.cookies.has(cookies.i18n) && req.cookies.get(cookies.i18n)?.value) {
		lng = req.cookies.get(cookies.i18n)?.value;
	}

	if (!lng) {
		lng = fallbackLng;
	}

	if (
		!languages.some((lng) => req.nextUrl.pathname.startsWith(`/${lng}`)) &&
		!req.nextUrl.pathname.startsWith('/_next')
	) {
		return isLogout
			? NextResponse.redirect(loginInUrl)
			: NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
	}

	if (req.headers.has('referer')) {
		const refererUrl = new URL(req.headers.get('referer')!);
		const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
		const response = NextResponse.next();

		if (lngInReferer) {
			response.cookies.set(cookies.i18n, lngInReferer);
		}

		return isLogout ? NextResponse.redirect(loginInUrl) : response;
	}

	return NextResponse.next();
});
