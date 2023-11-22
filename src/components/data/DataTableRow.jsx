import {
	Checkbox,
	Chip,
	IconButton,
	Switch,
	TableCell,
	TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '@contexts/auth/AuthContext';
import ToolTip from '@components/ui/ToolTip';
import { COSTUMERS, STAFF } from '@utils/routes';
import { capFirstLetter } from '@components/utils';

const DataTableRow = ({ row, isItemSelected, handleSelectOne, labelId }) => {
	// const { dispatch } = useGlobalContext();
	const { isAdmin } = useAuthContext();
	const { pathname } = useRouter();
	// const { toggleStatus } = UserServices();
	const [checked, setChecked] = useState(!row.disabled);

	const handleChange = event => {
		setChecked(event.target.checked);
	};

	const isUser = pathname === COSTUMERS || pathname === STAFF;

	// const handleEdit = data => {
	// 	dispatch({
	// 		type: TYPES.SET_DATA_TO_EDIT,
	// 		payload: {
	// 			...data,
	// 			countryCode: data.phoneNumber.slice(0, -15),
	// 			phoneNumber: data.phoneNumber.slice(-14),
	// 		},
	// 	});
	// 	dispatch({
	// 		type: TYPES.OPEN_MODAL,
	// 		payload: {
	// 			state: true,
	// 			title: `Edit ${pathname === STAFF ? 'Staff' : 'Costumer'}`,
	// 			child: <FormUser />,
	// 		},
	// 	});
	// };

	// const handleStatus = data => {
	// 	toggleStatus(data);
	// };

	// const handleDetails = data => {
	// 	push(`${pathname}/${data.id}`);
	// };

	const actions = [
		{
			label: isAdmin ? 'Edit' : 'Allowed for admins only',
			icon: <EditIcon />,
			// onClick: isAdmin ? handleEdit : null,
		},
		{
			label: 'Details',
			icon: <ZoomInIcon />,
			// onClick: handleDetails,
		},
	];

	return (
		<TableRow
			hover
			role='checkbox'
			aria-checked={isItemSelected}
			tabIndex={-1}
			key={row.id}
			selected={isItemSelected}
		>
			<TableCell padding='checkbox'>
				<ToolTip title={!isAdmin ? 'Allowed for admins only' : null}>
					<span>
						<Checkbox
							onClick={event => handleSelectOne(event, row.id)}
							color='primary'
							checked={isItemSelected}
							inputProps={{
								'aria-labelledby': labelId,
							}}
							disabled={!isAdmin}
						/>
					</span>
				</ToolTip>
			</TableCell>
			<TableCell component='th' id={labelId} scope='row' padding='normal'>
				{isUser ? row.displayName : row.productName}
			</TableCell>
			<TableCell>{isUser ? row.email : `$ ${row.price}`}</TableCell>
			<TableCell>{isUser ? row.role : capFirstLetter(row.category)}</TableCell>
			<TableCell align='center'>
				{isUser ? (
					<ToolTip
						title={`${
							isAdmin
								? row.disabled
									? 'Enable user'
									: 'Disable user'
								: 'Allowed for admins only'
						}`}
					>
						<span>
							<Switch
								checked={checked}
								onChange={handleChange}
								// onClick={() => handleStatus(row)}
								color='success'
								disabled={!isAdmin}
							/>
						</span>
					</ToolTip>
				) : (
					<Chip
						label={row.stock > 0 ? 'In stock' : 'Out of stock'}
						color={`${row.stock > 0 ? 'success' : 'success'}`}
						sx={{
							'& .MuiChip-label': {
								color: '#f8fafc !important',
							},
						}}
					/>
				)}
			</TableCell>
			<TableCell align='center'>
				{actions
					.filter(action => (!isUser ? action.label !== 'Status' : action))
					.map((action, i) => (
						<ToolTip key={i} title={action.label}>
							<span>
								<IconButton
									// onClick={() => action.onClick(row)}
									disabled={!isAdmin && action.label !== 'Details'}
								>
									{action.icon}
								</IconButton>
							</span>
						</ToolTip>
					))}
			</TableCell>
		</TableRow>
	);
};

export default DataTableRow;
