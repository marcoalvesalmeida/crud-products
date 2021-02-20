import styled from 'styled-components';

const Container = styled.div`
	text-align: left;
	input {
		width: 100%;
		background: ${({ theme }) => theme.colors.darkRgbaLight};
		border: 0;
		border-radius: 4px;
		height: 44px;
		padding: 0 15px;
		color: ${({ theme }) => theme.fonts.colors.dark};
		margin: 10px 0 5px;
		&::placeholder {
			color: ${({ theme }) => theme.colors.darkMediumRgba};
		}
	}
	span {
		color: ${({ theme }) => theme.colors.danger};
		align-self: flex-start;
		margin: 10px 0 10px;
		font-weight: bold;
	}
`;

export default Container;
