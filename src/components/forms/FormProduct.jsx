import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import InputFile from './InputFile';
import ActionsForm from './ActionsForm';
import useForm from '@hooks/useForm';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { inputProductProps, productInitialForm } from './consts';
import validateProduct from '@validations/validateProduct';
import { generateInputs } from './utils';
import { useProductsContext } from '@contexts/products/ProductsContext';

const FormProduct = () => {
	const {
		form,
		files,
		pathImage,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleArrayFilesChange,
		handleReset,
		handleSubmitProduct,
	} = useForm(productInitialForm);
	const { dataToEdit } = useGlobalContext();
	const { categories, subCategories } = useProductsContext();
	const [inputFileFocused, setInputFileFocused] = useState(false);

	useEffect(() => {
		const productErrors = validateProduct(
			form,
			files,
			dataToEdit,
			subCategories,
		);
		setErrors(productErrors);
	}, [form, files]);

	const inputProps = inputProductProps(categories, subCategories);

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmitProduct}
			sx={{ mt: 1, gap: 3 }}
		>
			<InputFile
				pathImage={pathImage}
				files={files}
				focused={inputFileFocused}
				errors={errors}
				onChange={handleArrayFilesChange}
			/>
			<Grid container spacing={3}>
				{inputProps.map(input =>
					generateInputs(input, {
						form,
						errors,
						handleInputChange,
						handleSelectChange,
					}),
				)}
			</Grid>
			<ActionsForm
				handleReset={handleReset}
				errors={errors}
				label={dataToEdit ? 'Edit' : 'Add'}
				setInputFileFocused={setInputFileFocused}
			/>
		</Stack>
	);
};

export default FormProduct;
