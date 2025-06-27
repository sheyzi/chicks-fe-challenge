import { PUBLIC_API_BASE_URL } from '$env/static/public';

class ApiClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	async request<T>(
		method: string,
		endpoint: string,
		data?: unknown
	): Promise<{
		data?: T;
		error?: string;
		status?: number;
		headers: Headers;
	}> {
		const response = await fetch(`${this.baseURL}${endpoint}`, {
			method,
			headers: {
				'Content-Type': 'application/json'
				// Normally I will authenticate the api here and add any necessary header
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			return {
				error: response.statusText,
				status: response.status,
				headers: response.headers
			};
		}

		return {
			data: await response.json(),
			status: response.status,
			headers: response.headers
		};
	}

	get<T>(endpoint: string) {
		return this.request<T>('GET', endpoint);
	}

	post<T>(endpoint: string, data: unknown) {
		return this.request<T>('POST', endpoint, data);
	}
}

const client = new ApiClient(PUBLIC_API_BASE_URL);
export default client;
