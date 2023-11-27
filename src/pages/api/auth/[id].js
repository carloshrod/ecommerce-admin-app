import { adminAuth } from '@firebaseAdmin';

export default async (req, res) => {
	if (req.method === 'DELETE') {
		try {
			const {
				query: { id },
			} = req;
			await adminAuth.deleteUser(id);
			return res.status(200).send({ msg: 'User deleted!' });
		} catch (error) {
			res.status(400).send('Error!');
			console.error(error);
		}
	}
};
