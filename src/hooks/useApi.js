import axios from 'axios';
import { useAuthContext } from '@contexts/auth/AuthContext';

const useApi = () => {
	const { idToken } = useAuthContext();

	axios.defaults.baseURL = '/api/auth';

	const apiRequest = axios.create({
		timeout: 5000,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${idToken}`,
		},
	});

	const authRegisterUser = async body => {
		return await apiRequest.post('/', body);
	};

	const authUpdateUser = async (param, body) => {
		return await apiRequest.put(`/${param}`, body);
	};

	const authDisableUser = async (param, body) => {
		return await apiRequest.patch(`/${param}`, body);
	};

	const authDeleteUser = async param => {
		return await apiRequest.delete(`/${param}`);
	};

	return {
		authRegisterUser,
		authUpdateUser,
		authDisableUser,
		authDeleteUser,
	};
};

export default useApi;
