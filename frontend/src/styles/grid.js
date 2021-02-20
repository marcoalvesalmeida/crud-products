import styled from 'styled-components';

function getWidthGrid(value) {
	if (!value) return null;

	const width = (value / 12) * 100;
	return `width: ${width}%;`;
}

const Container = styled.div`
	max-width: 1360px;
	padding-right: 50px;
	padding-left: 50px;
	margin-right: auto;
	margin-left: auto;
	box-sizing: border-box;
	display: grid;
	&::before,
	&::after {
		content: '';
		display: table;
	}
	&after {
		clear: both;
	}
`;

const Row = styled.div`
	width: 100%;
	height: auto;
	float: left;
	box-sizing: border-box;
	margin-bottom: 30px;
	&::before,
	&::after {
		content: '';
		display: table;
	}
	&after {
		clear: both;
	}
`;

const Column = styled.div`
	width: 100%;
	min-height: 1px;
	padding: 0.25rem;
	float: left;
	box-sizing: border-box;

	&::before,
	&::after {
		content: '';
		display: table;
	}
	&after {
		clear: both;
	}

	@media only screen and (max-width: ${(props) =>
			props.theme.breakpoints.sm}px) {
		${({ sm }) => sm && getWidthGrid(sm)}
	}
	@media only screen and (min-width: ${(props) =>
			props.theme.breakpoints.sm}px) {
		${({ md }) => md && getWidthGrid(md)}
	}
	@media only screen and (min-width: ${(props) =>
			props.theme.breakpoints.lg}px) {
		${({ lg }) => lg && getWidthGrid(lg)}
	}
`;

export { Container, Row, Column };
