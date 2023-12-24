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
			transparent: 'rgb(16, 185, 129, 0.2)',
		},
		warning: {
			main: '#dc2626',
			transparent: 'rgb(220, 38, 38, 0.2)',
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
