import api from '../api';

export async function register(body) {
	try {
		const { data } = await api.post('users', body, {
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

		return {
			message: 'Cadastro realizado com sucesso!',
			success: true,
			data,
		};
	} catch (error) {
		return {
			message: 'Erro ao realizar cadastro.',
			success: false,
			errors: error,
		};
	}
}
