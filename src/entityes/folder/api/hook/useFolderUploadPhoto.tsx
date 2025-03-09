import {useMutation} from "@tanstack/react-query";
import {folderService} from "../folder-service.ts";

export const useFolderUploadPhoto = (id: string) => {
	const {mutate: uploadPhoto, ...props} = useMutation({
		mutationKey: ["folder", "uploadPhoto"],
		mutationFn: (file: File) => folderService.uploadPhoto(id, file),
	})

	return {uploadPhoto, ...props};
 }