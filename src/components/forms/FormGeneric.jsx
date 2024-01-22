import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import ActionsForm from './ActionsForm';
import {
	formCategoryProps,
	formPasswordProps,
	formRoleProps,
	formSubCategoryProps,
} from './consts';
import useForm from '@hooks/useForm';
import { generateInputs } from './utils';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { useProductsContext } from '@contexts/products/ProductsContext';
import ToggleButtons from '@components/ui/ToggleButtons';

const FORM_PROPS = {
	password: formPasswordProps,
	role: formRoleProps,
	category: formCategoryProps,
	subCategory: formSubCategoryProps,
};

const FormGeneric = ({ item }) => {
	const [itemToggled, setItemToggled] = useState(item);
	const { initialForm, inputProps, validateForm } = FORM_PROPS[itemToggled];
	const isSub = itemToggled === 'subCategory';
	const {
		form,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleSubmitCategory,
		handleSubmitRole,
		handleSubmitPassword,
		handleReset,
	} = useForm(initialForm, isSub);
	const { dataToEdit } = useGlobalContext();
	const { categories } = useProductsContext();

	const SUBMITS = {
		role: handleSubmitRole,
		password: handleSubmitPassword,
		category: handleSubmitCategory,
		subCategory: handleSubmitCategory,
	};
	const handleSubmit = SUBMITS[itemToggled];

	useEffect(() => {
		const roleErrors = validateForm(form);
		setErrors(roleErrors);
	}, [form]);

	const inputPropsWithOptions = isSub ? inputProps(categories) : inputProps;

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmit}
			sx={{ mt: 1, gap: 3, maxWidth: 320 }}
		>
			{(itemToggled === 'category' || isSub) && !dataToEdit ? (
				<ToggleButtons
					itemToggled={itemToggled}
					setItemToggled={setItemToggled}
				/>
			) : null}
			<Grid container spacing={3}>
				{inputPropsWithOptions.map(input =>
					generateInputs(
						input,
						{
							form,
							errors,
							handleInputChange,
							handleSelectChange,
						},
						true,
					),
				)}
			</Grid>
			<ActionsForm
				handleReset={handleReset}
				errors={errors}
				label={
					itemToggled !== 'password' ? (dataToEdit ? 'Edit' : 'Add') : undefined
				}
			/>
		</Stack>
	);
};

export default FormGeneric;
