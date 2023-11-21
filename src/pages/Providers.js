import AuthProvider from '@contexts/auth/AuthContext';
import GlobalProvider from '@contexts/global/GlobalContext';
import ProductsProvider from '@contexts/products/ProductsContext';
import { ThemeProvider } from '@mui/material';
import { theme } from '@theme';

function Providers({ children }) {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<GlobalProvider>
					<ProductsProvider>{children}</ProductsProvider>
				</GlobalProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default Providers;
