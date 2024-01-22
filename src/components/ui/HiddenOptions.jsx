import { SpeedDial, SpeedDialAction, styled } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import FormGeneric from '@components/forms/FormGeneric';
import DataList from '@components/data/DataList';
import { PRODUCTS } from '@utils/routes';

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

	const actions = [
		{
			icon: <AddBoxIcon />,
			name: `Add ${isProduct ? 'category' : 'user role'}`,
			onClick: title => {
				toggleModal({
					title,
					child: <FormGeneric item={isProduct ? 'category' : 'role'} />,
				});
			},
		},
		{
			icon: <ListIcon />,
			name: `${isProduct ? 'Categories' : 'User roles'}`,
			onClick: title => {
				toggleModal({
					title,
					child: <DataList item={`${isProduct ? 'categories' : 'roles'}`} />,
				});
			},
		},
	];

	const filteredActions = actions.filter(action =>
		!isProduct ? action.name !== 'Add subcategory' : action,
	);

	return (
		<StyledSpeedDial ariaLabel='SpeedDial' icon={icon} direction='right'>
			{filteredActions.map(action => (
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
