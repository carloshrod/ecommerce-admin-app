import AppContainer from '@components/layout/AppContainer';
import '@sass/Styles.scss';
import Providers from './Providers';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

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
