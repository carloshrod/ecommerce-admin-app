import AuthProvider from '@contexts/auth/AuthContext';
import GlobalProvider from '@contexts/global/GlobalContext';
import { ThemeProvider } from '@mui/material';
import { theme } from '@theme';

function Providers({ children }) {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<GlobalProvider>{children}</GlobalProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default Providers;
