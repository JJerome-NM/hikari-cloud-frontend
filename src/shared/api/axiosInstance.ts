import axios, {InternalAxiosRequestConfig} from "axios";

const useToken = (req: InternalAxiosRequestConfig) => {
	req.headers.set("Access-Control-Allow-Credentials", "true");
	req.headers.set("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token");
	req.headers.set("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
	req.headers.set("Access-Control-Allow-Origin", "https://jjerome-nm.github.io");
	req.headers.set("Access-Control-Max-Age", "600");
	req.headers.set("Access-Control-Allow-Credentials", "true");
	req.headers.Authorization = localStorage.getItem("id_token")
  return req;
}

export const axiosInstance = axios.create({})
axiosInstance.interceptors.request.use(useToken)

export const axiosFormDataInstance = axios.create({
	headers: {
		"Content-Type": "multipart/form-data",
	}
})
axiosFormDataInstance.interceptors.request.use(useToken)