import api from '../api';

export async function list() {
	try {
		const { data } = await api.get('products', {
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
			message: 'Produtos listados com sucesso.',
			success: true,
			products: data.products,
		};
	} catch (error) {
		return {
			message: 'Erro ao listar produtos!',
			success: false,
			errors: error,
		};
	}
}

export async function create(body) {
	try {
		const { data } = await api.post('products', body, {
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
		const { data } = await api.put(`products/${id}`, body, {
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
			message: 'Produto atualizado com sucesso!',
			success: true,
			data,
		};
	} catch (error) {
		return {
			message: 'Erro ao atualizar produto.',
			success: false,
			errors: error,
		};
	}
}

export async function remove(id) {
	try {
		const { data } = await api.delete(`products/${id}`, {
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
			message: 'Produto removido com sucesso!',
			success: true,
			data,
		};
	} catch (error) {
		return {
			message: 'Erro ao remover produto.',
			success: false,
			errors: error,
		};
	}
}
