import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {folderPages, folderRoutes} from "../../pages/folder/folder-routes.tsx";
import {MainPageLayout} from "../../widgets/common/ui/mainPageLayout/mainPageLayout.tsx";
import {RequireAuth} from "../../entities/auth/ui/require-auth/require-auth.tsx";
import {HomePage} from "../../pages/home/home-page/home-page.tsx";

export const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: "/hikari-cloud-frontend",
			element: <MainPageLayout/>,
			children: [
				{
					index: true,
					element: <HomePage/>
				}, {
					index: false,
					element: <RequireAuth/>,
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

export const appPages = {
	home: () => `/hikari-cloud-frontend`,
	folder: folderPages,
}