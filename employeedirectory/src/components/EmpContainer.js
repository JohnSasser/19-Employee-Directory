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
	};

	// when class gets mounted into the virtual dom, componentDidMount will run the function;
	componentDidMount() {
		this.searchEmployees();
	}

	searchEmployees = () => {
		API.search()
			// res is the data coming back from the axios call;
			.then((res) => this.setState({ results: res.data.results }))
			.catch((err) => console.log(err));
	};

	handleSort = () => {
		console.log('sorting hat');
	};

	handleInputChange = (event) => {
		// Getting the value and name of the input which triggered the change
		const value = event.target.value;
		const name = event.target.name;

		// update the state of the password to the rendered change
		// const pass = event.target.password;

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
		//
		if (this.state.results.length === 0) return <p>Loading...</p>;

		return (
			<Container>
				<Card className="justify-content-center">
					<Row heading="Your Awesome Company!!!">
						<Col size="md-3">
							<button
								className="btn btn-light btn-sm"
								onClick={this.handleSort}
								disabled
							>
								HEAD-SHOT
							</button>
						</Col>
						<Col size="md-3" className="btn btn-light btn-sm">
							<button
								className="btn btn-light btn-sm"
								onClick={this.handleSort}
							>
								NAME
							</button>
						</Col>
						<Col size="md-3">
							<button
								className="btn btn-light btn-sm"
								onClick={this.handleSort}
								disabled
							>
								CELL
							</button>
						</Col>
						<Col size="md-3">
							<button
								className="btn btn-light btn-sm"
								onClick={this.handleSort}
								disabled
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
