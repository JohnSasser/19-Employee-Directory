import React, { Component } from 'react';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import Card from './Card';
import SearchForm from './SearchForm';
import MovieDetail from './MovieDetail';
import API from '../utils/API';

class EmpContainer extends Component {
	state = {
		results: [],
		search: '',
		alphaOrder: true,
	};

	// when class gets mounted into the virtual dom, componentDidMount will run the function;
	componentDidMount() {
		this.searchEmployees();
		// this.handleSort();
	}

	searchEmployees = () => {
		API.search()
			// res is the data coming back from the axios call;
			.then((res) => this.setState({ results: res.data.results }))
			.catch((err) => console.log(err));
	};

	// using alphaOrder to switch between ascending and deciding order;
	handleSort = (sortBy) => {
		console.log(sortBy);
		const { results, alphaOrder } = this.state;
		let sortedEmployees;

		if (sortBy === 'name') {
			if (alphaOrder === true) {
				sortedEmployees = results.sort((a, b) => {
					if (a.name.last < b.name.last) {
						return -1;
					}
					if (a.name.last > b.name.last) {
						return 1;
					}
					return 0;
				});
			} else {
				sortedEmployees = results.sort((a, b) => {
					if (a.name.last > b.name.last) {
						return -1;
					}
					if (a.name.last < b.name.last) {
						return 1;
					}
					return 0;
				});
			}
		} else if (sortBy === 'email') {
			if (alphaOrder === true) {
				sortedEmployees = results.sort((a, b) => {
					if (a.email < b.email) {
						return -1;
					}
					if (a.email > b.email) {
						return 1;
					}
					return 0;
				});
			} else {
				sortedEmployees = results.sort((a, b) => {
					if (a.email > b.email) {
						return -1;
					}
					if (a.email < b.email) {
						return 1;
					}
					return 0;
				});
			}
		}
		this.setState({ results: results, alphaOrder: !alphaOrder });
		console.log(sortedEmployees);
	};

	handleInputChange = (event) => {
		// Getting the value and name of the input which triggered the change
		const value = event.target.value;
		const name = event.target.name;

		// Updating the input's state
		this.setState({
			[name]: value,
		});
	};

	handleFormSubmit = (event) => {
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();
		this.searchEmployees(this.state.search);
	};

	render() {
		if (this.state.results.length === 0) return <p>Loading...</p>;

		return (
			<Container>
				<Card className="justify-content-center">
					<Row heading="Your Awesome Company!!!">
						<Col size="md-3">
							<button className="btn btn-light btn-sm" disabled>
								HEAD-SHOT
							</button>
						</Col>
						<Col size="md-3" className="btn btn-light btn-sm">
							<button
								className="btn btn-light btn-sm"
								onClick={() => this.handleSort('name')}
							>
								NAME
							</button>
						</Col>
						<Col size="md-3">
							<button className="btn btn-light btn-sm" disabled>
								CELL
							</button>
						</Col>
						<Col size="md-3">
							<button
								className="btn btn-light btn-sm"
								onClick={() => this.handleSort('email')}
							>
								EMAIL
							</button>
						</Col>
					</Row>
				</Card>
				{this.state.results.map((employee) => {
					console.log(employee);
					return (
						// outermost component in a loop needs a key value PROP.
						<Card key={employee.id.value}>
							<Row>
								<Col size="md-3">
									<img src={employee.picture.medium} />
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
			</Container>
		);
	}
}

export default EmpContainer;
