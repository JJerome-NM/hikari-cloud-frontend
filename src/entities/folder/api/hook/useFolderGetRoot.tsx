import {useQuery} from "@tanstack/react-query";
import {folderService} from "../folder-service.ts";

export const useFolderGetRoot = () => {
	return useQuery({
		queryKey: ["folder", "root"],
		queryFn: () => folderService.getRoot(),
		select: (data) => data.data
	})
}