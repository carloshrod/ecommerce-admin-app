import AuthProvider from '@contexts/auth/AuthContext';
import GlobalProvider from '@contexts/global/GlobalContext';
import ProductsProvider from '@contexts/products/ProductsContext';
import UsersProvider from '@contexts/users/UsersContext';
import { ThemeProvider } from '@mui/material';
import { theme } from '@theme';

const Providers = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalProvider>
				<AuthProvider>
					<UsersProvider>
						<ProductsProvider>{children}</ProductsProvider>
					</UsersProvider>
				</AuthProvider>
			</GlobalProvider>
		</ThemeProvider>
	);
};

export default Providers;
