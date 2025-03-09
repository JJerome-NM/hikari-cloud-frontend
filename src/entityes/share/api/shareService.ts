import {AxiosResponse} from "axios";
import {Folder, Item} from "../../../shared/api/folder/types.ts";
import {axiosInstance} from "../../../shared/api/axiosInstance.ts";


class ShareService {
	private url = `${import.meta.env.VITE_HIKARI_CLOUD}/share`;

	getSharedItems(): Promise<AxiosResponse<{items: Item[]}>> {
		return axiosInstance.get(`${this.url}`);
	}

	useShareToken(token: string): Promise<AxiosResponse<{ folder?: Folder }>> {
		return axiosInstance.post(`${this.url}/use-token`, {
			token: token,
		});
	}
}

export const shareService = new ShareService();
