import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
});

api.interceptors.request.use(
	(request) => {
		if (request.headers) {
			if (request.headers.auth) {
				const auth_token = localStorage.getItem('auth_token');
				request.headers.authorization = `Bearer ${auth_token}`;

				delete request.headers.auth;
			} else {
				delete request.headers.auth;
			}
		}

		return request;
	},
	(error) => Promise.reject(error)
);

export default api;
