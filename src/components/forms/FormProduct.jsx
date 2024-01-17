import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import InputFile from './InputFile';
import ActionsForm from './ActionsForm';
import useForm from '@hooks/useForm';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import { inputProductProps } from './consts';
import validateProduct from '@validations/validateProduct';
import { generateInputs } from './utils';

const initialForm = {
	displayName: '',
	price: '',
	stock: '',
	brand: '',
	category: '',
	subCategory: '',
	tags: [],
	description: '',
};

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
	} = useForm(initialForm);
	const { dataToEdit } = useGlobalContext();
	const [inputFileFocused, setInputFileFocused] = useState(false);

	useEffect(() => {
		const productErrors = validateProduct(form, files, dataToEdit);
		setErrors(productErrors);
	}, [form, files]);

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
				{inputProductProps.map(input =>
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
