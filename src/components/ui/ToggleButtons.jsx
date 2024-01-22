import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ToolTip from './ToolTip';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { capFirstLetter } from '@components/utils';

const ToggleButtons = ({ itemToggled, setItemToggled }) => {
	const {
		modal: { title, child },
		toggleModal,
	} = useGlobalContext();
	const isForm = title.includes('Add');

	const handleToggled = (_event, newSelected) => {
		if (newSelected !== null) {
			toggleModal({ title, child });
			setItemToggled(newSelected);
			toggleModal({
				title: `${
					isForm
						? 'Add ' + newSelected.toLowerCase()
						: capFirstLetter(newSelected.toLowerCase())
				}`,
				child,
			});
		}
	};

	return (
		<Box sx={{ margin: 'auto' }}>
			<ToggleButtonGroup
				size='small'
				value={itemToggled}
				exclusive
				onChange={handleToggled}
				aria-label='text alignment'
			>
				<ToggleButton
					value={`${isForm ? 'category' : 'categories'}`}
					aria-label='form category'
				>
					<ToolTip title={`${isForm ? 'Add category' : 'Categories'}`}>
						<CategoryIcon />
					</ToolTip>
				</ToggleButton>
				<ToggleButton
					value={`${isForm ? 'subCategory' : 'subCategories'}`}
					aria-label='form subcategory'
				>
					<ToolTip title={`${isForm ? 'Add subcategory' : 'Subcategories'}`}>
						<CategoryOutlinedIcon />
					</ToolTip>
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
};

export default ToggleButtons;
