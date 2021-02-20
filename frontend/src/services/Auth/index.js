import api from '../api';

export function isAuth() {
	const storage = localStorage.getItem('auth_token');

	return !!storage;
}

export async function signIn(body) {
	try {
		const { data } = await api.post('sessions', body, {
			headers: {
				auth: false,
				'Content-Type': 'application/json',
			},
		});

		if (!data.success) {
			return {
				message: data.message,
				success: data.success,
				error: data.error,
			};
		}

		localStorage.setItem('auth_token', data.token);
		localStorage.setItem('auth_name', data.user.name);

		return {
			message: 'Usuário logado com sucesso!',
			success: true,
			data,
		};
	} catch (error) {
		return {
			message: 'Erro ao realizar login.',
			success: false,
			errors: error,
		};
	}
}

export async function signOut() {
	localStorage.clear();
}
