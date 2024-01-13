import { adminAuth } from '@firebase/admin';

export default async (req, res) => {
	if (req.method === 'PUT') {
		try {
			const {
				query: { id },
			} = req;
			const { email, displayName, countryCode, phoneNumber } = req.body;
			const userRecord = await adminAuth.updateUser(id, {
				displayName,
				email,
				phoneNumber: `${countryCode}${phoneNumber}`,
			});
			if (userRecord) {
				return res.status(200).send();
			}
			return res.status(400).send();
		} catch (error) {
			res.status(400).send(error.message);
		}
	}

	if (req.method === 'PATCH') {
		try {
			const {
				query: { id },
			} = req;
			const { disabled } = req.body;
			const userRecord = await adminAuth.updateUser(id, { disabled });
			if (userRecord) {
				return res.status(200).send();
			}
			return res.status(400).send();
		} catch (error) {
			res.status(400).send(error.message);
		}
	}

	if (req.method === 'DELETE') {
		try {
			const {
				query: { id },
			} = req;
			await adminAuth.deleteUser(id);
			return res.status(200).send();
		} catch (error) {
			res.status(400).send(error.message);
		}
	}
};
