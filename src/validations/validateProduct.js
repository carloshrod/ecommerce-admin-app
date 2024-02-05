import { regex } from './regex';

const validateProduct = (product, files, dataToEdit, subCategories) => {
	const { price, stock, tags, description, category, subCategory } = product;
	const errors = {};

	const isProductImagesInvalid =
		(!dataToEdit && files?.length !== 5) ||
		(dataToEdit && files?.length >= 1 && files?.length < 5);

	if (isProductImagesInvalid) {
		errors.productImages = 'Product images required!';
	}

	const filteredSubCategories = subCategories.filter(
		subCategory => subCategory.mainCategory === category,
	);

	const isIn = filteredSubCategories.some(obj => {
		return obj.id === subCategory;
	});

	if (!isIn) {
		errors.subCategory = 'Does not match category!';
	}

	Object.keys(product).forEach(field => {
		if (product[field] === '') {
			errors[field] = 'Field required!';
		} else if (field === 'tags' && tags.length === 0) {
			errors.tags = 'Field required!';
		} else if (field === 'price' && !regex.currency.test(price)) {
			errors.price = 'Enter a valid price (Ex: 99, 99.00)';
		} else if (field === 'stock' && !regex.stock.test(stock)) {
			errors.stock = 'Enter a valid integer!';
		} else if (field === 'description' && description.length > 500) {
			errors.description = 'Description must be less than 500 characters!';
		}
	});

	return errors;
};

export default validateProduct;
