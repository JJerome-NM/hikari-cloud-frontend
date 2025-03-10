import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {folderRoutes} from "../../pages/folder/folder-routes.tsx";
import {MainPageLayout} from "../../widgets/common/ui/mainPageLayout/mainPageLayout.tsx";
import {RequireAuth} from "../../entities/auth/ui/require-auth/require-auth.tsx";

export const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: "/hikari-cloud-frontend",
			element: <RequireAuth/>,
			children: [
				{
					index: false,
					element: <MainPageLayout/>,
					children: [
						{
							index: false,
							children: folderRoutes
						}
					]
				}
			]
		}
	])

	return (
		<RouterProvider router={router}/>
	)
}