import { adminAuth } from '@firebase/admin';

export default async (req, res) => {
	if (req.method === 'DELETE') {
		try {
			const {
				query: { id },
			} = req;
			await adminAuth.deleteUser(id);
			return res.status(200).send({ msg: 'User deleted succesfully' });
		} catch (error) {
			res.status(400).send({ msg: error.message });
		}
	}

	if (req.method === 'PUT') {
		try {
			const {
				query: { id },
			} = req;
			const { email } = req.body;
			const userRecord = await adminAuth.updateUser(id, { email });
			if (userRecord) {
				return res.status(200).send({ msg: 'User updated succesfully' });
			}
			return res.status(400).send();
		} catch (error) {
			res.status(400).send({ msg: error.message });
		}
	}
};
