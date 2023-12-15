import {
	Avatar,
	Box,
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
import { PRODUCTS, STAFF } from '@utils/routes';
import { formatCategoryName, formatRoleName } from '@components/utils';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import FormUser from '@components/forms/FormUser';
import useUserServices from '@services/useUserServices';
import FormProduct from '@components/forms/FormProduct';
import { categories } from '@components/consts';

const DataTableRow = ({ row, isItemSelected, handleSelectOne, labelId }) => {
	const [checked, setChecked] = useState(!row.disabled);
	const { openModal } = useGlobalContext();
	const { roles, isAdmin } = useAuthContext();
	const { toggleUserStatus } = useUserServices();
	const { pathname, push } = useRouter();
	const isProduct = pathname === PRODUCTS;
	const roleName = (row?.role && formatRoleName(row?.role, roles)) ?? '';
	const categoryName =
		(row?.category && formatCategoryName(row?.category, categories)) ?? '';

	const handleChange = event => {
		setChecked(event.target.checked);
	};

	const handleEdit = data => {
		const modal = {
			title: `Edit ${
				isProduct ? 'Product' : pathname === STAFF ? 'Staff' : 'Customer'
			}`,
			child: isProduct ? <FormProduct /> : <FormUser />,
		};
		openModal(modal, data);
	};

	const handleDetails = data => {
		push(`${pathname}/${data.id}`);
	};

	const actions = [
		{
			label: isAdmin ? 'Edit' : 'Allowed for admins only',
			icon: <EditIcon />,
			onClick: isAdmin ? handleEdit : null,
		},
		{
			label: 'Details',
			icon: <ZoomInIcon />,
			onClick: handleDetails,
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
				{isProduct ? (
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Avatar
							src={row.productImage?.url}
							alt='Product image'
							variant='square'
							sx={{
								width: 50,
								height: 50,
								backgroundColor: 'azure',
								borderRadius: 2,
								mr: 1,
							}}
						/>
						<span>{row.displayName}</span>
					</Box>
				) : (
					row.displayName
				)}
			</TableCell>
			<TableCell>{isProduct ? `$ ${row.price}` : row.email}</TableCell>
			<TableCell>{isProduct ? categoryName : roleName}</TableCell>
			<TableCell align='center'>
				{isProduct ? (
					<Chip
						label={row.stock > 0 ? 'In stock' : 'Out of stock'}
						color={`${row.stock > 0 ? 'success' : 'success'}`}
						sx={{
							'& .MuiChip-label': {
								color: '#f8fafc !important',
							},
						}}
					/>
				) : (
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
								onClick={() => toggleUserStatus(row)}
								color='success'
								disabled={!isAdmin}
							/>
						</span>
					</ToolTip>
				)}
			</TableCell>
			<TableCell align='center'>
				{actions.map((action, i) => (
					<ToolTip key={i} title={action.label}>
						<span>
							<IconButton
								onClick={() => action.onClick(row)}
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
