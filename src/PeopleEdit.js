var React = require('react');
var ReadtDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var PeopleEdit = React.createClass({
		
	getInitialState: function() {
		return {};
	},

	render: function() {
		return (
			<div>
				Edit Person: {this.props.params.id}
				<br/>
				<form onSubmit={this.submit}>
					Name: <input type="text" name="name" value={this.state.name} onChange={this.onChangeName}/>
					Photo: <input type="text" name="photo" value={this.state.photo} onChange={this.onChangePhoto}/>
					Problem: <input type="text" name="problem" value={this.state.problem} onChange={this.onChangeProblem}/>
					Solution: <input type="text" name="solution" value={this.state.solution} onChange={this.onChangeSolution}/>
					<br/>
					Country:
					<select name="place" value={this.state.place} onChange={this.onChangePlace}>
						<option value="India">India</option>
						<option value="China">China</option>
						<option value="Canada">Canada</option>
					</select>
					<br/>
					<button type="submit">Submit</button>
					<Link to="/people">Back to people list</Link>

				</form>
			</div>
		);
	},

	componentDidMount: function() {
		this.loadData();
	},

	componentDidUpdate: function(prevProps) {
		console.log("Person Edit: componentDidUpdate ", prevProps.params.id, this.props.params.id);
		if (this.props.params.id != prevProps.params.id) {
			this.loadData();
		}
	}, 

	loadData: function() {
		$.ajax('/api/people/' + this.props.params.id).done(function(person) {
			console.log("loaded data: ", person);
			this.setState(person);
		}.bind(this));
	},

	onChangeName: function (e) {  this.setState({name: e.target.value});	},
	onChangePhoto: function (e) {  this.setState({photo: e.target.value});	},
	onChangePlace: function (e) {  this.setState({place: e.target.value});	},
	onChangeProblem: function (e) {  this.setState({problem: e.target.value});	},
	onChangeSolution: function (e) {  this.setState({solution: e.target.value});	},

	submit: function(e) {
		e.preventDefault();
		var person = { 
			name: this.state.name,
			photo: this.state.photo,
			place: this.state.place,
			problem: this.state.problem,
			solution: this.state.solution,
		};

		$.ajax({
			url: '/api/people/' + this.props.params.id,
			contentType: 'application/json',
			type: 'PUT',
			data: JSON.stringify(person),
			dataType: 'json',
			success: function(person) {
				console.log("submitted succesffully: ", person);
				this.setState(person);
			}.bind(this),
		});
	}
});

module.exports = PeopleEdit;