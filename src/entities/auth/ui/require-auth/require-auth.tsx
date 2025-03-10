import {useAuth} from "react-oidc-context";
import {Loader} from "../../../../shared/ui/common/loader/loader.tsx";
import {Outlet} from "react-router-dom";

export const RequireAuth = () => {
	const {isAuthenticated, isLoading, signinRedirect} = useAuth()

	if (!isAuthenticated && isLoading) {
		return <Loader.LoaderWithWrapper/>
	}

	if (!isAuthenticated && !isLoading) {
		signinRedirect()
	}

	return <Outlet/>
}
