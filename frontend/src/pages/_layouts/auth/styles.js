import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100vh;
	background: linear-gradient(
		-90deg,
		${({ theme }) => theme.colors.primary},
		${({ theme }) => theme.colors.secondary}
	);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	width: 100%;
	max-width: 400px;
	text-align: center;
	form {
		display: flex;
		flex-direction: column;
		margin-top: 30px;
		padding: 60px;
		border-radius: 4px;
		background-color: ${({ theme }) => theme.colors.background};
	}

	a {
		margin-top: 15px;
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
		max-width: 300px;
	}
`;
