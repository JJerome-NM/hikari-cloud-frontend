import {AxiosResponse} from "axios";
import {
	FolderCreateRequest,
	FolderResponse,
	Photo,
} from "../../../shared/api/folder/types.ts";
import {axiosFormDataInstance, axiosInstance} from "../../../shared/api/axiosInstance.ts";

class FolderService{
	private url = `${import.meta.env.VITE_HIKARI_CLOUD}/folder`;

	getRoot(): Promise<AxiosResponse<FolderResponse>> {
		return axiosInstance.get("https://wrhhwcj390.execute-api.eu-central-1.amazonaws.com/prod/test");
	}

	create(data: FolderCreateRequest): Promise<AxiosResponse<FolderResponse>>{
		return axiosInstance.post(`${this.url}`, data)
	}

	getById(id: string): Promise<AxiosResponse<FolderResponse>>{
		return axiosInstance.get(`${this.url}/${id}`);
	}

	delete(id: string): Promise<AxiosResponse<{message: string}>>{
		return axiosInstance.delete(`${this.url}/${id}`);
	}

	uploadPhoto(id: string, file: File): Promise<AxiosResponse<Photo>>{
		return axiosFormDataInstance.post(`${this.url}/${id}/upload`, {
			file: file
		})
	}
}

export const folderService = new FolderService();
