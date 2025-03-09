import {ComponentProps} from "react";
import {useFolderGetById} from "../../../entityes/folder/api/hook/useFolderGetById.tsx";
import {useParams} from "react-router-dom";
import {Loader} from "../../../shared/ui/common/loader/loader.tsx";
import {FolderWidget} from "../../../widgets/folder/ui/folder-widget/folder-widget.tsx";

export const FolderPage = ({...props}: RootFolderPageProps) => {
	const {folderId} = useParams()
	const {data, isLoading, refetch} = useFolderGetById(folderId || "")

	return (
		isLoading ? (
			<Loader.LoaderWithWrapper/>
		) : (
			<FolderWidget data={data} onListChanged={() => refetch()} {...props}/>
		)
	)
}

type RootFolderPageProps = {} & ComponentProps<"div">