import { SpeedDial, SpeedDialAction, styled } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import { useRouter } from 'next/router';
import { PRODUCTS } from '@utils/routes';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import FormRole from '@components/forms/FormRole';
import DataList from '@components/data/DataList';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
	'& .MuiButtonBase-root': {
		height: 40,
		width: 40,
		backgroundColor: '#e2e8f0',
	},
	'& .MuiButtonBase-root:hover': {
		backgroundColor: '#e2e8f0',
	},
	'&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	'&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
		top: theme.spacing(2),
		left: theme.spacing(2),
	},
}));

const HiddenOptions = () => {
	const { toggleModal } = useGlobalContext();
	const { pathname } = useRouter();
	const isProduct = pathname === PRODUCTS;
	const icon = (isProduct ? <CategoryIcon /> : <AccountBoxIcon />) ?? (
		<SpeedDialIcon />
	);

	const handleAdd = title => {
		toggleModal({
			title,
			child: isProduct ? 'FormCategory' : <FormRole />,
		});
	};

	const handleList = title => {
		toggleModal({
			title,
			child: <DataList />,
		});
	};

	const actions = [
		{
			icon: <AddBoxIcon />,
			name: `Add ${isProduct ? 'category' : 'user role'}`,
			onClick: handleAdd,
		},
		{
			icon: <ListIcon />,
			name: `${isProduct ? 'Categories' : 'User roles'}`,
			onClick: handleList,
		},
	];

	return (
		<StyledSpeedDial ariaLabel='SpeedDial' icon={icon} direction='right'>
			{actions.map(action => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
					onClick={() => action.onClick(action.name)}
				/>
			))}
		</StyledSpeedDial>
	);
};

export default HiddenOptions;
