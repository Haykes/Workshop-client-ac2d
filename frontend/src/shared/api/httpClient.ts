import axios, { type AxiosInstance } from "axios";

export type HttpClient = AxiosInstance;

const baseURL: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const httpClient: HttpClient = axios.create({
	baseURL,
	withCredentials: true,
});


