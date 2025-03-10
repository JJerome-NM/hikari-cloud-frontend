import {ComponentProps} from "react";
import {useFolderGetRoot} from "../../../entities/folder/api/hook/useFolderGetRoot.tsx";
import {FolderWidget} from "../../../widgets/folder/ui/folder-widget/folder-widget.tsx";
import {Loader} from "../../../shared/ui/common/loader/loader.tsx";

export const RootFolderPage = ({...props}: RootFolderPageProps) => {
	const {data, isLoading, refetch} = useFolderGetRoot()

	return (
		isLoading ? (
			<Loader.LoaderWithWrapper/>
		) : (
			<FolderWidget data={data} onListChanged={() => refetch()} {...props}/>
		)
	)
}

type RootFolderPageProps = {} & ComponentProps<"div">