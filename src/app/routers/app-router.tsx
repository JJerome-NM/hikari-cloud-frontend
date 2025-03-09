import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {folderRoutes} from "../../pages/folder/folder-routes.tsx";
import {MainPageLayout} from "../../widgets/common/ui/mainPageLayout/mainPageLayout.tsx";
import {Test} from "./test.tsx";

export const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: "/hikari-cloud-frontend/",
			element: <MainPageLayout/>,
			children: [
				{
					index: false,
					children: folderRoutes
				}
			]
		}, {
			path: "/home",
			element: <Test/>
		}
	])

	return (
		<RouterProvider router={router}/>
	)
}