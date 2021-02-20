import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import Container from './styles';

export default function Input({ name, ...rest }) {
	const inputRef = React.useRef(null);
	const { fieldName, defaultValue, registerField, error } = useField(name);

	React.useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return (
		<Container>
			<input ref={inputRef} defaultValue={defaultValue} {...rest} />
			{error && <span className="error">{error}</span>}
		</Container>
	);
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
};
