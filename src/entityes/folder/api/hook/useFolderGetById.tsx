import {useQuery} from "@tanstack/react-query";
import {folderService} from "../folder-service.ts";

export const useFolderGetById = (id: string) => {
	return useQuery({
		queryKey: ["folder", id],
		queryFn: () => folderService.getById(id),
		select: (data) => data.data,
		enabled: !!id && id !== "",
	})
}