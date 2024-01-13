import { IconButton } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import useScreen from '@hooks/useScreen';

const ToggleSidebar = () => {
	const { hideMenu, toggleMenu } = useGlobalContext();
	const { width } = useScreen();

	return (
		<IconButton
			onClick={toggleMenu}
			sx={{ zIndex: 999, '@media (max-width: 599px)': { display: 'none' } }}
		>
			{(width < 1200 && hideMenu) || (width > 1200 && !hideMenu) ? (
				<MenuOpenIcon />
			) : (
				<MenuIcon />
			)}
		</IconButton>
	);
};

export default ToggleSidebar;
