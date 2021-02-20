import styled from 'styled-components';

const Container = styled.div`
	text-align: left;
	select {
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
		border: 0;
		border-radius: 4px;
		height: 44px;
		padding: 0 15px;
		color: ${({ theme }) => theme.fonts.colors.dark};
		margin: 10px 0 5px;
		&::placeholder {
			color: rgba(0, 0, 0, 0.5);
		}
	}
	span {
		color: #ef5350;
		align-self: flex-start;
		margin: 10px 0 10px;
		font-weight: bold;
	}
`;

export default Container;
