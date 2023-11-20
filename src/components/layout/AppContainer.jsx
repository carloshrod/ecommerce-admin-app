import Header from './Header';
import Sidebar from './Sidebar';
import MainLayout from './MainLayout';
import { useRouter } from 'next/router';

const AppContainer = ({ Component, pageProps }) => {
	const { pathname } = useRouter();
	const isPrivate = pathname.includes('admin');

	return (
		<main>
			{isPrivate ? (
				<>
					<Header />
					<Sidebar />
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</>
			) : (
				<Component {...pageProps} />
			)}
		</main>
	);
};

export default AppContainer;
