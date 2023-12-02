import { toast } from 'react-hot-toast';
import { SwalConfirm } from './utils';

const withEnhances =
	(func, options = { confirm: false, text: 'Are you sure?' }) =>
	async (...args) => {
		try {
			const { confirm, text } = options;
			let html = text;
			if (typeof text === 'function') {
				html = text(...args);
			}
			if (!confirm) {
				return await func(...args);
			} else {
				const resConfirm = await SwalConfirm(html);
				if (resConfirm.isConfirmed) {
					return await func(...args);
				}
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

export default withEnhances;
