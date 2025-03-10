import {useMutation} from "@tanstack/react-query";
import {folderService} from "../folder-service.ts";

export const useFolderDelete = () => {
	const props = useMutation({
		mutationKey: ["folder", "delete"],
		mutationFn: (id: string) => folderService.delete(id),
	})

	return {deleteFolder: props.mutate, ...props};
 }