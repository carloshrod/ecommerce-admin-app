import Header from './Header';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import MainContainer from './MainContainer';
import Footer from './Footer';
import Modal from './Modal';
import Loader from '@components/ui/Loader';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { useEffect } from 'react';
import { DASHBOARD, SIGNIN } from '@utils/routes';

const AppContainer = ({ Component, pageProps }) => {
	const { pathname, push } = useRouter();
	const isPrivate = pathname.includes('admin');
	const { isLoading } = useGlobalContext();
	const { isAuth } = useAuthContext();

	useEffect(() => {
		if (!isLoading) {
			if (isAuth) {
				push(DASHBOARD);
			} else {
				push(SIGNIN);
			}
		}
	}, [isAuth, isLoading]);

	return (
		<main>
			{isPrivate ? (
				<>
					<Header />
					<Sidebar />
					<MainContainer>
						<Component {...pageProps} />
					</MainContainer>
				</>
			) : (
				<Component {...pageProps} />
			)}
			<Loader />
			<Modal />
			<Footer />
		</main>
	);
};

export default AppContainer;
