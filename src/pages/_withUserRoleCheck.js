import NotAllowed from '@components/layout/NotAllowed';
import { useAuthContext } from '@contexts/auth/AuthContext';

const checkUserRole = (userRole, requiredRole) => {
	return requiredRole?.includes(userRole);
};

const withUserRoleCheck = (WrappedComponent, requiredRole) => {
	const Wrapper = props => {
		const { loggedUser, roles } = useAuthContext();
		const roleName = roles.find(r => r.id === loggedUser?.role)?.displayName;
		const isAllowed = checkUserRole(roleName, requiredRole);

		return isAllowed ? (
			<WrappedComponent {...props} />
		) : (
			<NotAllowed isFetched={roleName} />
		);
	};

	return Wrapper;
};

export default withUserRoleCheck;
