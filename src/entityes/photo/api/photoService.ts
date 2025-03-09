import {AxiosResponse} from "axios";
import {Photo} from "../../../shared/api/folder/types.ts";
import {axiosInstance} from "../../../shared/api/axiosInstance.ts";

class PhotoService {
	private url = `${import.meta.env.VITE_HIKARI_CLOUD}/photo`;

	getById(id: string): Promise<AxiosResponse<{
		item: Photo,
		presignedUrl: string
		downloadUrl: string
	}>> {
		return axiosInstance.get(`${this.url}/${id}`);
	}

	delete(id: string): Promise<AxiosResponse<{ message: string }>> {
		return axiosInstance.delete(`${this.url}/${id}`);
	}
}

export const photoService = new PhotoService();
