import {
	Box,
	Button,
	Checkbox,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
	alpha,
} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { normalizeName } from '@components/utils';
import ToolTip from '@components/ui/ToolTip';
import useRoleServices from '@services/useRoleServices';
import FormGeneric from '@components/forms/FormGeneric';

const DataList = () => {
	const [selected, setSelected] = useState([]);
	const { toggleModal } = useGlobalContext();
	const { roles } = useAuthContext();
	const { deleteRole } = useRoleServices();
	const closeModal = () => toggleModal();
	const numSelected = selected.length;

	const handleToggle = value => () => {
		const currentIndex = selected.indexOf(value);
		const newChecked = [...selected];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setSelected(newChecked);
	};

	const handleEdit = data => {
		closeModal();
		toggleModal(
			{
				title: 'Edit user role',
				child: <FormGeneric item='category' />,
			},
			{ ...data, displayName: normalizeName(data?.displayName) },
		);
	};

	const handleDelete = () => {
		deleteRole(selected);
		setSelected([]);
	};

	return (
		<List
			sx={{
				display: 'grid',
				placeItems: 'center',
				width: '100%',
				maxWidth: 400,
				p: 0,
			}}
		>
			<Box
				sx={{
					width: '90%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					...(numSelected > 0 && {
						bgcolor: theme =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.activatedOpacity,
							),
					}),
					px: 2,
				}}
			>
				{numSelected > 0 ? (
					<Typography color='inherit' variant='subtitle1' component='div'>
						{numSelected} selected
					</Typography>
				) : null}
				{numSelected > 0 ? (
					<ToolTip title='Delete'>
						<IconButton onClick={handleDelete}>
							<DeleteIcon />
						</IconButton>
					</ToolTip>
				) : null}
			</Box>

			{roles.map(role => {
				const labelId = `checkbox-list-label-${role.id}`;

				return (
					<ListItem
						key={role.id}
						secondaryAction={
							<IconButton
								edge='end'
								aria-label='comments'
								onClick={() => handleEdit(role)}
							>
								<EditIcon />
							</IconButton>
						}
						disablePadding
					>
						<ListItemButton
							role={undefined}
							onClick={handleToggle(role.id)}
							dense
						>
							<ListItemIcon>
								<Checkbox
									edge='start'
									checked={selected.indexOf(role.id) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText
								id={labelId}
								primary={normalizeName(role.displayName)}
							/>
						</ListItemButton>
					</ListItem>
				);
			})}
			<Button
				sx={{ width: 100, mt: 2 }}
				variant='outlined'
				color='warning'
				onClick={toggleModal}
			>
				Close
			</Button>
		</List>
	);
};

export default DataList;
