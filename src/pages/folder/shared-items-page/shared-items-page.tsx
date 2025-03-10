import {ComponentProps} from "react";
import {Loader} from "../../../shared/ui/common/loader/loader.tsx";
import {FolderWidget} from "../../../widgets/folder/ui/folder-widget/folder-widget.tsx";
import {useShareGetItems} from "../../../entities/share/api/hook/useShareGetItems.tsx";

export const SharedItemsPage = ({...props}: RootFolderPageProps) => {
	const {data, isLoading, refetch} = useShareGetItems()

	return (
		isLoading ? (
			<Loader.LoaderWithWrapper/>
		) : (
			<FolderWidget data={data} onListChanged={() => refetch()} {...props}/>
		)
	)
}

type RootFolderPageProps = {} & ComponentProps<"div">