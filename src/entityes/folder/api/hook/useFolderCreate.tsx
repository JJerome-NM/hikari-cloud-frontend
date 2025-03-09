import {useMutation} from "@tanstack/react-query";
import {folderService} from "../folder-service.ts";
import {FolderCreateRequest} from "../../../../shared/api/folder/types.ts";

export const useFolderCreate = () => {
	const {mutate: createFolder, ...props} = useMutation({
		mutationKey: ["folder", "create"],
		mutationFn: (data: FolderCreateRequest) => folderService.create(data),
	})

	return {createFolder, ...props};
 }