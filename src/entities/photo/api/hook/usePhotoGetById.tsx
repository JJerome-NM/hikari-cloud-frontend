import {useMutation, useQuery} from "@tanstack/react-query";
import {photoService} from "../photoService.ts";


export const usePhotoGetById = (id: string) => {
	return useQuery({
		queryKey: ["photo", id],
		queryFn: () => photoService.getById(id),
		select: (data) => data.data,
		enabled: id !== undefined && id !== "",
	})
}

export const usePhotoLoadById = () => {
	const {mutate: loadPhoto, ...props} = useMutation({
		mutationKey: ["photo"],
		mutationFn: (id: string) => photoService.getById(id),
	})

	return {loadPhoto, ...props}
}