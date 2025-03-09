import {useMutation} from "@tanstack/react-query";
import {photoService} from "../photoService.ts";

export const usePhotoDelete = () => {
	const {mutate: deletePhoto, ...props} = useMutation({
		mutationKey: ["photo", "deletePhoto"],
		mutationFn: (id: string) => photoService.delete(id)
	})

	return {deletePhoto, ...props};
}