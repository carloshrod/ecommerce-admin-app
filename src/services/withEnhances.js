import { toast } from 'react-hot-toast';
import { SwalConfirm } from './utils';

const withEnhances =
	(func, options = { confirm: false, text: 'Are you sure?' }) =>
	async (...args) => {
		try {
			const { confirm, text } = options;
			if (!confirm) {
				return await func(...args);
			} else {
				const resConfirm = await SwalConfirm(text);
				if (resConfirm.isConfirmed) {
					await func(...args);
					return resConfirm;
				}
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

export default withEnhances;
