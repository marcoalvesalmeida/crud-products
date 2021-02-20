import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

import { register } from '../../services/User';

function SignUp() {
	// eslint-disable-next-line no-unused-vars
	const [loading, setLoading] = useState(false);
	const formRef = useRef(null);
	const history = useHistory();

	async function handleSubmit(data) {
		try {
			formRef.current.setErrors({});
			const schema = Yup.object().shape({
				name: Yup.string().required('O nome é obrigatório'),
				email: Yup.string()
					.email('Insira um e-mail válido')
					.required('O e-mail é obrigatório'),
				password: Yup.string().required('A senha é obrigatória'),
				password_confirm: Yup.string()
					.required('Confirmação de senha é obrigatória')
					.oneOf([Yup.ref('password'), null], 'A senhas não são iguais'),
			});
			await schema.validate(data, {
				abortEarly: false,
			});

			const response = await register(data);
			if (response.success) {
				toast(response.message);
				history.push('/');
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
				<Input name="name" type="text" placeholder="Seu nome" />
				<Input name="email" type="email" placeholder="Seu e-mail" />
				<Input name="password" type="password" placeholder="Sua senha" />
				<Input
					name="password_confirm"
					type="password"
					placeholder="Confirme sua senha"
				/>

				<Button>{loading ? 'Carregando...' : 'Cadastrar'}</Button>
				<Link to="/">Entre na sua conta</Link>
			</Form>
		</>
	);
}

export default SignUp;
