import { SwalConfirm } from './utils';

const withEnhances =
	(
		func,
		options = { confirm: false, text: 'Are you sure?', loader: null, delay: 0 },
	) =>
	async (...args) => {
		const { confirm, text, loader, delay } = options;
		try {
			let html = text;
			if (typeof text === 'function') {
				html = text(...args);
			}
			if (!confirm) {
				if (loader) loader(true);
				return await func(...args);
			} else {
				const resConfirm = await SwalConfirm(html);
				if (resConfirm.isConfirmed) {
					if (loader) loader(true);
					return await func(...args);
				}
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			if (loader) {
				setTimeout(() => {
					loader(false);
				}, delay);
			}
		}
	};

export default withEnhances;
