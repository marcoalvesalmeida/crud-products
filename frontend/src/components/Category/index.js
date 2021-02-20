import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import { Container } from './styles';

function Product({ category, editCategory }) {
	return (
		<Container>
			<h4>{category.name}</h4>
			<Button onClick={() => editCategory(category)}>Ver mais</Button>
		</Container>
	);
}

Product.propTypes = {
	category: PropTypes.shape({
		name: PropTypes.string.isRequired,
	}).isRequired,
	editCategory: PropTypes.func.isRequired,
};

export default Product;
