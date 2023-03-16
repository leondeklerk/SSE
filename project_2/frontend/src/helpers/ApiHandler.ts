import type { ApiResponse } from "@/types/ResponseTypes";
import { useAuthStore } from "@/stores/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function get<T>(endpoint: string, requiresAuth = true): Promise<ApiResponse<T>> {
	let success: boolean = false;
	let result: T | null = null;
	let error: any | null = null;

	const store = useAuthStore();

	const access_token = store.accessToken;

	if (requiresAuth && !access_token) {
		return { success: false, result: null, error: "unauthorized" };
	}

	const request = {
		method: "GET",
		headers: {
			mode: "cors",
			"Content-Type": "application/json",
			credentials: "include",
			authorization: "",
		},
	};

	if (requiresAuth) {
		request.headers.authorization = `Bearer ${access_token}`;
	}

	await fetch(API_URL + endpoint, request)
		.then((res) => {
			success = res.status >= 200 && res.status < 400;
			return res.json();
		})
		.then((body) => {
			if (success) {
				result = body as T;
			} else {
				error = body.message;
			}
		})
		.catch((e) => {
			error = e;
		});

	return { success, result, error };
}

export async function post<T>(endpoint: string, data: string, requiresAuth = true): Promise<ApiResponse<T>> {
	let success: boolean = false;
	let result: T | null = null;
	let error: any | null = null;

	const store = useAuthStore();
	const access_token = store.accessToken;

	if (requiresAuth && !access_token) {
		return { success: false, result: null, error: "unauthorized" };
	}

	const request = {
		method: "POST",
		headers: {
			mode: "cors",
			"Content-Type": "application/json",
			credentials: "include",
			authorization: "",
		},
		body: data,
	};

	if (requiresAuth) {
		request.headers.authorization = `Bearer ${access_token}`;
	}

	await fetch(API_URL + endpoint, request)
		.then((res) => {
			success = res.status >= 200 && res.status < 400;
			return res.json();
		})
		.then((body) => {
			if (success) {
				result = body as T;
			} else {
				error = body.message;
			}
		})
		.catch((e) => {
			error = e;
		});

	return { success, result, error };
}
