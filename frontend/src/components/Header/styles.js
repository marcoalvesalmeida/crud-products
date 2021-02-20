import styled from 'styled-components';

export const Container = styled.nav`
	height: 60px;
	background: linear-gradient(
		-90deg,
		${({ theme }) => theme.colors.primary},
		${({ theme }) => theme.colors.secondary}
	);
	box-shadow: 0px 1px 10px ${({ theme }) => theme.colors.darkMedium};
	display: flex;
	flex-direction: 'row';
	align-items: center;
	justify-content: space-between;
	padding-left: 50px;
	padding-right: 50px;

	button {
		font-size: 20px;
		color: ${({ theme }) => theme.colors.textLight};
		border: none;
		background: none;
		cursor: pointer;
	}
`;
