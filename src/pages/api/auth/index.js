import { adminAuth } from '@firebase/admin';

export default async (req, res) => {
	try {
		const { email } = req.body;
		const userRecord = await adminAuth.createUser({
			email,
			password: 'Test_1234',
			disabled: false,
		});
		if (userRecord) {
			return res.status(201).send(userRecord);
		}
		return res.status(400).send();
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
};
