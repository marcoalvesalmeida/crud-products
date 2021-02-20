import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import { Container } from './styles';

function Product({ product, editProduct }) {
	return (
		<Container>
			<span>{product.category.name}</span>
			<h4>{product.name}</h4>
			<p>R$ {product.price}</p>
			<Button onClick={() => editProduct(product)}>Ver mais</Button>
		</Container>
	);
}

Product.propTypes = {
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		category: PropTypes.shape({
			name: PropTypes.string.isRequired,
			id: PropTypes.number.isRequired,
		}).isRequired,
	}).isRequired,
	editProduct: PropTypes.func.isRequired,
};

export default Product;
