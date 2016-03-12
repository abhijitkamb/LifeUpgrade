var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var PeopleFilter = require('./PeopleFilter');
var PeopleAdd = require('./PeopleAdd');

var PeopleRow = React.createClass({
	render: function() {
		return (
			<tr className="peopleRow">
				
				<td>
					<Link to={'/people/' + this.props.people._id}>
						{this.props.people._id}
					</Link>
				</td>
				<td>{this.props.people.name}</td>
				<td>{this.props.people.photo}</td>
				<td>{this.props.people.place}</td>
				<td>{this.props.people.problem}</td>
				<td>{this.props.people.solution}</td>

			</tr>
		);
	}
});
 
 
var PeopleTable = React.createClass({
	render: function() {
		//console.log("Rendering peopl table, num items:", this.props.peopledata.length);
		var peoplerows = this.props.peopledata.map(function(people){
			return (<PeopleRow key={people._id} people={people} />)
		});

		return (
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Photo</th>
						<th>Place</th>
						<th>Problem</th>
						<th>Solution</th>
					</tr>
				</thead>
				<tbody>
					{peoplerows}
				</tbody>
			</table>
			
		);
	}
});

var PeopleList = React.createClass({

	getInitialState: function() {
    	return {peopledata: []};
  	},

  	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},
  	
	render: function() {

		console.log("LOCAION QUERY:: ", this.props.location.query);
		return (
			<div className="peopleList">
				<h1>People</h1>
				<PeopleFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
				<hr />
				<PeopleTable peopledata={this.state.peopledata} />
				<hr />
				<PeopleAdd addperson={this.addPerson}/>
				
			</div>
		);
	},

	componentDidMount: function() {
		console.log("componentDidMount gets called");
		this.loadData();
  		//handle errors: https://facebook.github.io/react/docs/tutorial.html#updating-state
  	},

  	componentDidUpdate: function(prevProps) {


  		console.log("componentDidUpdate gets called");

  		var oldQuery = prevProps.location.query;
  		var newQuery = this.props.location.query;

  		console.log("PREV LOCATION QUERY: ", oldQuery);
		console.log("NEW LOCATION QUERY: ", newQuery);

  		if (oldQuery.place === newQuery.place) {
  			console.log("People List: componentDidUpdate, no change in filter, not updating");
  			return;
  		} else {
  			console.log("People List: componentDidUpdate, loading data with new filter");
  			this.loadData();
  		}
  	},

  	loadData: function () {
  		console.log("QUERY: ", this.props.location.query)
  		var query = this.props.location.query || {};
  		var filter = {place: query.place};

  		$.ajax('/api/people', {data: filter}).done(function (data) {
  			this.setState({peopledata: data});
  		}.bind(this));
  	},

  	changeFilter: function(newFilter){
  		console.log("change filter gets called");
  		//this.props.history.push({search: '?' + $.param(newFilter)});
  		this.context.router.push({search: '?' + $.param(newFilter)});
  		//this.loadData(newFilter);
  	},


	addPerson: function (person) {

		$.ajax({
			url: '/api/people',
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify(person),
			success: function (data){
				var p = data;
				var peopleModified = this.state.peopledata.concat(p);
				this.setState({peopledata: peopleModified});
			}.bind(this),
			error: function (xhr, status, err) {
				console.log("Error adding person: ", err.toString())
			}

		});
	}

});

module.exports = PeopleList;