import React from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../Logo';

import { Container } from './styles';

import { signOut } from '../../services/Auth';

function Header() {
	const history = useHistory();

	function exit() {
		signOut();
		history.push('/');
	}

	return (
		<Container>
			<Logo width="150px" />

			<button onClick={() => exit()} type="button">
				Sair
			</button>
		</Container>
	);
}

export default Header;
