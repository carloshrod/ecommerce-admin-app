export const formatInputValue = (value, name) => {
	const FORMATS = {
		price: formatInputPrice(value),
		stock: formatInputStock(value),
		phoneNumber: formatInputPhoneNumber(value),
	};

	const formattedValue = FORMATS[name] ?? value;

	return formattedValue;
};

export const formatInputPrice = value => {
	let maskedValue = value.replace(/[^0-9.]/g, '');

	if (maskedValue.startsWith('0') && maskedValue.length > 1) {
		maskedValue = maskedValue.slice(1);
	}

	const parts = maskedValue.split('.');
	if (parts.length > 1) {
		const decimalPart = parts[1].slice(0, 2);
		maskedValue = `${parts[0]}.${decimalPart}`;
	}

	return maskedValue;
};

export const formatInputStock = value => {
	let maskedValue = value.replace(/[^0-9]/g, '');

	if (maskedValue.startsWith('0') && maskedValue.length > 1) {
		maskedValue = maskedValue.slice(1);
	}

	return maskedValue;
};

export const formatInputPhoneNumber = value => {
	const rawValue = value.replace(/[\s-]/g, '');
	const limitedValue = rawValue.slice(0, 12);
	const numericValue = limitedValue.replace(/\D/g, '');

	const maskedValue = numericValue.replace(
		/(\d{0,3})(\d{0,3})(\d{0,4})/,
		(_, part1, part2, part3) => {
			let formatted = '';
			if (part1) {
				formatted += `(${part1}`;
			}
			if (part2) {
				formatted += `) ${part2}`;
			}
			if (part3) {
				formatted += `-${part3}`;
			}
			return formatted;
		},
	);

	return maskedValue;
};
