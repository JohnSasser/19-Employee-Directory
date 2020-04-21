import React, { Component } from 'react';
import Container from './Container';
import Card from './Card';
import Jumbotron from './Jumbotron';
import API from '../utils/API';
import DataTable from './DataTable';

class EmpContainer extends Component {
	state = {
		results: [],
		// filteredResults: [],
		search: '',
		alphaOrder: true,
	};

	// when class gets mounted into the virtual dom, componentDidMount will run the function;
	componentDidMount() {
		this.searchEmployees();
	}

	searchEmployees = () => {
		API.search()
			// res is the data coming back from the axios call;
			.then((res) =>
				this.setState({ results: res.data.results }, () => this.search())
			)
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

	handleInputChange = (e) => {
		// Getting the value and name of the input which triggered the change
		const value = e.target.value.toLowerCase();
		const name = e.target.name;

		console.log(`name property: ${name}`, `value property: ${value}`);

		// Updating the input's state
		this.setState(
			{
				[name]: value,
			},
			() => {
				this.search();
			}
		);
	};

	search = () => {
		const filteredResults = this.state.results.filter((result) =>
			result.email.includes(this.state.search)
		);

		// console.log(filteredResults);
		this.setState({ filteredResults: filteredResults });
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
				{/* the prop property comes from where the component is called */}
				{/* <Jumbotron text="Text Text" /> */}
				<Jumbotron text="Employee Directory" backgroundColor="#c3f3ff" />

				<Card heading="Search">
					<input
						value={this.state.search}
						name="search"
						type="search"
						onChange={this.handleInputChange}
					/>
				</Card>

				<DataTable
					headShot="Head-Shot"
					name="Name"
					phone="Cell"
					email="Email"
					employees={this.state.results}
					handleSort={this.handleSort}
					// filteredEmployees={this.state.filteredResults}
					search={this.state.search}
				/>
			</Container>
		);
	}
}

export default EmpContainer;
