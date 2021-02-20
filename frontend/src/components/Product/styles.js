import styled from 'styled-components';

export const Container = styled.div`
	height: 140px;
	width: 200px;
	background-color: ${({ theme }) => theme.colors.background};
	box-shadow: ${({ theme }) => theme.shadows.primary};
	border-radius: 4px;
	margin-bottom: 30px;
	justify-self: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	* {
		padding: 5px;
	}

	span {
		font-size: 12px;
		color: ${({ theme }) => theme.colors.darkMedium};
	}

	button {
		width: 80%;
		margin-bottom: 0;
	}
`;
