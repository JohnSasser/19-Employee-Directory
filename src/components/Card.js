import React from 'react';

function Card(props) {
	return (
		<div className="card text-center">
			{props.heading && (
				<div
					className="card-header"
					style={{ backgroundColor: props.headerBackgroundColor }}
				>
					<h2>{props.heading}</h2>
				</div>
			)}

			<div className="card-body" style={{ textAlign: 'center' }}>
				{props.children}
			</div>
		</div>
	);
}

export default Card;
