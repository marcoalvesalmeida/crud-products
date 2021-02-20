import React from 'react';

import logo from '../../assets/logo.png';

function Logo(props) {
	return <img src={logo} alt="logo" {...props} />;
}

export default Logo;
