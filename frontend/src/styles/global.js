import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    outline-color: ${({ theme }) => theme.colors.primary};
		font-family: 'Roboto', sans-serif;
  }
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.fonts.colors.dark};
		font-size: 16px;
		opacity: 0.8;
		&:hover {
			opacity: 1;
		}
	}
`;
