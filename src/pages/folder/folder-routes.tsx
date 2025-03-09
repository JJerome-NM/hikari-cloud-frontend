import {RouteObject} from "react-router-dom";
import {FolderLayout} from "../../widgets/folder/ui/folder-layout/folder-layout.tsx";
import {RootFolderPage} from "./root-folder-page/root-folder-page.tsx";
import {FolderPage} from "./folder-page/folder-page.tsx";
import {ApplyShareToken} from "./apply-share-token/apply-share-token.tsx";
import {SharedItemsPage} from "./shared-items-page/shared-items-page.tsx";

export const folderRoutes: RouteObject[] = [
	{
		path: "folder",
		element: <FolderLayout/>,
		children: [
			{
				index: true,
				element: <RootFolderPage/>
			},{
				path: "shared",
				element: <SharedItemsPage/>
			}, {
				path: ":folderId",
				element: <FolderPage/>
			}
		]
	}, {
		path: "shared",
		children: [
			{
				index: true,
				element: <SharedItemsPage/>
			}, {
				path: "token/:shareToken",
				element: <ApplyShareToken/>
			}
		]
	}
]

export const folderPages = {
	root: () => `/folder`,
	folder: (id: string) => `/folder/${id}`,
	shared: () => `/folder/shared`
}

export const sharePages = {
	token: (token: string) => `/share/token/${token}`,
	buildFullTokenPath: (token: string) => `http://localhost:5173/shared/token/${token}`
}