import styled from 'styled-components';

export const ProductContainer = styled.div`
	padding: 20px 60px;
	display: grid;
	align-items: center;
	grid-template-columns: repeat(5, 1fr);

	@media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 500px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const CategoryContainer = styled.div`
	padding: 0 60px;
	display: grid;
	align-items: center;
	grid-template-columns: repeat(7, 1fr);

	@media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
		grid-template-columns: repeat(5, 1fr);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 500px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const ActionsBox = styled.div`
	width: 100%;
	padding: 10px 50px 10px 50px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	h2 {
		color: ${({ theme }) => theme.colors.darkMedium};
	}

	button {
		padding: 10px;
		margin-left: 10px;
	}
`;

export const FormContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	form {
		width: 50%;
		display: grid;
		align-items: center;
		grid-template-columns: repeat(2, 1fr);

		.right {
			width: 100%;
			margin-left: 10px;
		}

		.remove {
			background-color: ${({ theme }) => theme.colors.danger};
		}
	}

	form.unique {
		grid-template-columns: repeat(1, 1fr);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
		form {
			width: auto;
			grid-template-columns: repeat(1, 1fr);

			.right {
				margin-left: auto;
			}
		}
	}
`;
