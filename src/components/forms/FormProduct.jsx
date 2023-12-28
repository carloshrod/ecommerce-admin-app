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
	const [fileFocused, setFileFocused] = useState(null);
	const {
		form,
		file,
		pathImage,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleFileChange,
		handleReset,
		handleSubmitProduct,
	} = useForm(initialForm);
	const { dataToEdit } = useGlobalContext();

	useEffect(() => {
		const isValid = validateProduct(form, file, dataToEdit);
		setErrors(isValid);
	}, [form, file]);

	const isInputFileInvalid = fileFocused && !file && !dataToEdit;

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
				isInvalid={isInputFileInvalid}
				setFocused={setFileFocused}
				errors={errors}
				onChange={handleFileChange}
			/>
			<Grid container spacing={3}>
				{inputProductProps.map(input => (
					<Grid
						item
						xs={12}
						sm={ITEMS_WIDTH[input.name + 'Sm'] ?? 6}
						key={input.id}
					>
						{!input.mask ? (
							input.type !== 'select' ? (
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
							)
						) : // <InputMask
						// 	value={form[input.name]}
						// 	mask={input.mask}
						// 	maskPlaceholder=' '
						// 	onChange={handleInputChange}
						// >
						// 	<Input {...input} value={form[input.name]} errors={errors} />
						// </InputMask>
						null}
					</Grid>
				))}
			</Grid>
			<ActionsForm
				handleReset={handleReset}
				errors={errors}
				label={dataToEdit ? 'Edit' : 'Add'}
				setFocused={setFileFocused}
			/>
		</Stack>
	);
};

export default FormProduct;
