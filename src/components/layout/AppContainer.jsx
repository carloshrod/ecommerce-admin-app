import Header from './Header';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import MainContainer from './MainContainer';
import Footer from './Footer';

const AppContainer = ({ Component, pageProps }) => {
	const { pathname } = useRouter();
	const isPrivate = pathname.includes('admin');

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
			<Footer />
		</main>
	);
};

export default AppContainer;
