import api from '../api';

export async function list() {
	try {
		const { data } = await api.get('categories', {
			headers: {
				auth: true,
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
			message: 'Categorias listadas com sucesso.',
			success: true,
			categories: data.categories,
		};
	} catch (error) {
		return {
			message: 'Erro ao listar categorias!',
			success: false,
			errors: error,
		};
	}
}

export async function create(body) {
	try {
		const { data } = await api.post('categories', body, {
			headers: {
				auth: true,
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

export async function update(body, id) {
	try {
		const { data } = await api.put(`categories/${id}`, body, {
			headers: {
				auth: true,
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
			message: 'Categoria atualizada com sucesso!',
			success: true,
			data,
		};
	} catch (error) {
		return {
			message: 'Erro ao atualizar categoria.',
			success: false,
			errors: error,
		};
	}
}

export async function remove(id) {
	try {
		const { data } = await api.delete(`categories/${id}`, {
			headers: {
				auth: true,
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
			message: 'Categoria removida com sucesso!',
			success: true,
			data,
		};
	} catch (error) {
		return {
			message: 'Erro ao remover categoria.',
			success: false,
			errors: error,
		};
	}
}
