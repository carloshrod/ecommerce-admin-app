import AuthProvider from '@contexts/auth/AuthContext';
import GlobalProvider from '@contexts/global/GlobalContext';
import ProductsProvider from '@contexts/products/ProductsContext';
import UsersProvider from '@contexts/users/UsersContext';
import { ThemeProvider } from '@mui/material';
import { theme } from '@theme';

const Providers = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<GlobalProvider>
					<UsersProvider>
						<ProductsProvider>{children}</ProductsProvider>
					</UsersProvider>
				</GlobalProvider>
			</AuthProvider>
		</ThemeProvider>
	);
};

export default Providers;
