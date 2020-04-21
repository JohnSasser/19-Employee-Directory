import React from 'react';

// prop gets inported from the props argument in the function component;
function Jumbotron(props) {
	return (
		<div
			className="jumbotron text-center"
			// style={{ backgroundColor: '#C3F3FF' }}
			style={{ backgroundColor: props.backgroundColor }}
		>
			<h1>{props.text}</h1>
		</div>
	);
}

export default Jumbotron;
