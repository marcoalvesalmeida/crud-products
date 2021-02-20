import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

import { signIn } from '../../services/Auth';

function SignIn() {
	// eslint-disable-next-line no-unused-vars
	const [loading] = useState(false);
	const formRef = useRef(null);
	const history = useHistory();

	async function handleSubmit(data) {
		try {
			formRef.current.setErrors({});
			const schema = Yup.object().shape({
				email: Yup.string()
					.email('Insira um e-mail válido')
					.required('O e-mail é obrigatório'),
				password: Yup.string().required('A senha é obrigatória'),
			});
			await schema.validate(data, {
				abortEarly: false,
			});

			const response = await signIn(data);

			if (response.success) {
				toast(response.message);
				history.push('/dashboard');
			} else {
				toast.error(response.message);
			}
		} catch (err) {
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					validationErrors[error.path] = error.message;
				});
				formRef.current.setErrors(validationErrors);
			}
		}
	}

	return (
		<>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Logo />

				<Input name="email" type="email" placeholder="Seu e-mail" />
				<Input name="password" type="password" placeholder="Sua senha" />

				<Button>{loading ? 'Carregando...' : 'Acessar'}</Button>
				<Link to="/register">Criar conta gratuita</Link>
			</Form>
		</>
	);
}

export default SignIn;
