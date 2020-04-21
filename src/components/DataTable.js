import React from 'react';
import Card from './Card';
import Row from './Row';
import Col from './Col';

function DataTable(props) {
	// first check if props.filteredResults [] is not empty,
	// 	if not empty,
	// 		show filtered employees
	//  if is empty,
	// 		show all data on props.data

	return (
		<div>
			<Card>
				<Row>
					<Col size="md-3">
						<button className="btn btn-light btn-sm" disabled>
							{props.headShot}
						</button>
					</Col>
					<Col size="md-3">
						<button
							className="btn btn-light btn-sm"
							onClick={() => props.handleSort('name')}
						>
							{props.name}
						</button>
					</Col>
					<Col size="md-3">
						<button className="btn btn-light btn-sm" disabled>
							{props.phone}
						</button>
					</Col>
					<Col size="md-3">
						<button
							className="btn btn-light btn-sm"
							onClick={() => props.handleSort('email')}
						>
							{props.email}
						</button>
					</Col>
				</Row>
			</Card>
			{props.employees
				.filter((result) => result.email.includes(props.search))
				.map((employee) => {
					// console.log(employee);
					return (
						// outermost component in a loop needs a key value PROP.
						<Card key={employee.id.value}>
							<Row>
								<Col size="md-3">
									<img alt="head-shot" src={employee.picture.medium} />
								</Col>
								<Col size="md-3">
									{employee.name.first} {employee.name.last}
								</Col>
								<Col size="md-3">{employee.cell}</Col>
								<Col size="md-3">{employee.email}</Col>
							</Row>
						</Card>
					);
				})}
		</div>
	);
}

export default DataTable;
