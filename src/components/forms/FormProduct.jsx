import { Grid, Stack } from '@mui/material';
import React from 'react';
import InputFile from './InputFile';
import InputSelect from './InputSelect';
import ActionsForm from './ActionsForm';
import useForm from '@hooks/useForm';
import { ITEMS_WIDTH, inputProductProps } from '@components/consts';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import Input from './Input';

const initialForm = {
	displayName: '',
	price: '',
	stock: '',
	brand: '',
	category: '',
	tags: [],
	description: '',
};

const FormProduct = () => {
	const {
		form,
		pathImage,
		errors,
		handleInputChange,
		handleSelectChange,
		handleFileChange,
		handleReset,
	} = useForm(initialForm);
	const { dataToEdit } = useGlobalContext();

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			// onSubmit={handleSubmitStaff}
			sx={{ mt: 1, gap: 3 }}
		>
			<InputFile pathImage={pathImage} onChange={handleFileChange} />
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
			/>
		</Stack>
	);
};

export default FormProduct;
