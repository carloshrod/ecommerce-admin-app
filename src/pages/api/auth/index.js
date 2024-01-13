import { adminAuth } from '@firebase/admin';

export default async (req, res) => {
	try {
		const { displayName, email, countryCode, phoneNumber } = req.body;
		const userRecord = await adminAuth.createUser({
			displayName,
			email,
			password: 'Test_1234',
			phoneNumber: `${countryCode}${phoneNumber}`,
		});
		if (userRecord) {
			return res.status(201).send(userRecord);
		}
		return res.status(400).send();
	} catch (error) {
		res.status(400).send(error.message);
	}
};
