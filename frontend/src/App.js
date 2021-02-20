import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import '../node_modules/react-toastify/dist/ReactToastify.css';

import history from './services/Navigate/history';
import Routes from './routes';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router history={history}>
				<Routes />
			</Router>
			<GlobalStyle />
			<ToastContainer />
		</ThemeProvider>
	);
}

export default App;
