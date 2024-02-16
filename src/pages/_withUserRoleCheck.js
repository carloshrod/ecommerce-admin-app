import NotAllowed from '@components/layout/NotAllowed';
import { useAuthContext } from '@contexts/auth/AuthContext';

const checkUserRole = (userRole, requiredRole) => {
	return requiredRole?.includes(userRole);
};

const withUserRoleCheck = (WrappedComponent, requiredRole) => {
	const Wrapper = props => {
		const { loggedUser, roles } = useAuthContext();
		const userRole = roles.find(r => r.id === loggedUser?.role);
		const isAllowed = checkUserRole(userRole?.displayName, requiredRole);

		return isAllowed ? <WrappedComponent {...props} /> : <NotAllowed />;
	};

	return Wrapper;
};

export default withUserRoleCheck;
