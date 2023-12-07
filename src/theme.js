import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#0e7490',
		},
		secondary: {
			main: '#155e75',
		},
		success: {
			main: '#10b981',
			contrastText: '#ffffff',
		},
		warning: {
			main: '#dc2626',
		},
		text: {
			primary: '#475569',
			secondary: '#0e7490',
			light: '#f8fafc',
			disabled: '#94a3b8',
		},
	},
	typography: {
		fontFamily: ['Public Sans', 'Roboto', 'sans-serif'].join(','),
	},
});
