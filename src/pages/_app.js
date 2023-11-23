import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import '@sass/Styles.scss';
import AppContainer from '@components/layout/AppContainer';
import Providers from './_Providers';

export default function App(appProps) {
	return (
		<Providers>
			<Head>
				<title>Ecommerce Management App</title>
			</Head>
			<AppContainer {...appProps} />
			<Toaster
				position='bottom-right'
				toastOptions={{ className: 'myToast' }}
			/>
		</Providers>
	);
}
