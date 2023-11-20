import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const NavLink = ({ href, children }) => {
	const { pathname } = useRouter();

	const isActive = pathname === href;
	const className = isActive ? 'activeNavLink' : '';

	return !href ? (
		<>{children}</>
	) : (
		<Link href={href} className={className}>
			{children}
		</Link>
	);
};

export default NavLink;
