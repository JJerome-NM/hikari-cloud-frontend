import {useMutation} from "@tanstack/react-query";
import {shareService} from "../shareService.ts";

export const useShareUseToken = () => {
	const {mutate: applyShareToken, ...props} = useMutation({
		mutationKey: ["share", "token"],
		mutationFn: (token: string) => shareService.useShareToken(token),
	})
	return {applyShareToken, ...props}
}