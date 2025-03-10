import {useAuth} from "react-oidc-context";
import {Loader} from "../../../../shared/ui/common/loader/loader.tsx";
import {Navigate, Outlet} from "react-router-dom";
import {toast} from "react-toastify";
import {appPages} from "../../../../app/routers/app-router.tsx";

export const RequireAuth = () => {
	const {isAuthenticated, isLoading} = useAuth()

	if (!isAuthenticated && isLoading) {
		return <Loader.LoaderWithWrapper/>
	}

	if (!isAuthenticated && !isLoading) {
		toast.info("You need to be logged in to view this page")
		return <Navigate to={appPages.home()} replace/>
	}

	return <Outlet/>
}
