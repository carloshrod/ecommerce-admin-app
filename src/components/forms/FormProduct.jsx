import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import InputFile from './InputFile';
import InputSelect from './InputSelect';
import ActionsForm from './ActionsForm';
import useForm from '@hooks/useForm';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import Input from './Input';
import { inputProductProps, ITEMS_WIDTH } from './consts';
import validateProduct from '@validations/validateProduct';

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
				{inputProductProps.map(input => (
					<Grid
						item
						xs={12}
						sm={ITEMS_WIDTH[input.name + 'Sm'] ?? 6}
						key={input.id}
					>
						{input.type !== 'select' ? (
							<Input
								{...input}
								value={form[input.name]}
								onChange={handleInputChange}
								errors={errors}
							/>
						) : (
							<InputSelect
								{...input}
								value={form[input.name]}
								onChange={handleSelectChange}
								errors={errors}
							/>
						)}
					</Grid>
				))}
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
