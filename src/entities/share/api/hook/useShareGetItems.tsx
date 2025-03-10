import {useQuery} from "@tanstack/react-query";
import {shareService} from "../shareService.ts";

export const useShareGetItems = () => {
	return useQuery({
		queryKey: ["share"],
		queryFn: () => shareService.getSharedItems(),
		select: (data) => data.data
	})
}