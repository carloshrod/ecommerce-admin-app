import { regex } from './regex';

const validateProduct = product => {
	const { price, stock, tags, description } = product;
	const errors = {};

	Object.keys(product).forEach(field => {
		if (!product[field]) {
			errors[field] = 'Field required!';
		} else if (field === 'tags' && tags.length === 0) {
			errors.tags = 'Field required!';
		} else if (field === 'price' && !regex.currency.test(price)) {
			errors.price = 'Enter a valid price (Ex: 99, 99.00)';
		} else if (field === 'stock' && !regex.stock.test(stock)) {
			errors.stock = 'Enter an integer!';
		} else if (field === 'description' && description.length > 500) {
			errors.description = 'Description must be less than 500 characters!';
		}
	});

	return errors;
};

export default validateProduct;
