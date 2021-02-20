import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import Container from './styles';

export default function Select({ name, options, ...rest }) {
	const inputRef = React.useRef(null);
	const { fieldName, defaultValue, registerField, error } = useField(name);

	React.useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	function renderOption(option) {
		return (
			<option value={option.id} key={option.id}>
				{option.name}
			</option>
		);
	}

	return (
		<Container>
			<select ref={inputRef} defaultValue={defaultValue} {...rest}>
				{options.length > 0 && options.map((option) => renderOption(option))}
			</select>
			{error && <span className="error">{error}</span>}
		</Container>
	);
}

Select.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.func.isRequired,
};
