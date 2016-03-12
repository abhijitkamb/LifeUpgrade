var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var injectTapEventPlugin = require('react-tap-event-plugin');

//Material UI components

var Paper = require('material-ui/lib/paper');
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');
var AppBar = require('material-ui/lib/app-bar');

injectTapEventPlugin();

var PeopleFilter = require('./PeopleFilter');
var PeopleAdd = require('./PeopleAdd');

var PeopleRow = React.createClass({

	getStyle: function(width, person) {
		var style = {height: 24};
		if (width) style.width = width;
		//if (bug.priority == 'p1') style.color = 'red';
		return style;
	},

	render: function() {
		var person = this.props.people;
		return (
			<TableRow>
				<TableRowColumn style={this.getStyle(100, person)}>
					<Link to={'/people/' + this.props.people._id}>
						{this.props.people._id}
					</Link>
				</TableRowColumn >
				<TableRowColumn style={this.getStyle(40, person)}>{person.name}</TableRowColumn>
				<TableRowColumn style={this.getStyle(40, person)}>{person.photo}</TableRowColumn>
				<TableRowColumn style={this.getStyle(40, person)}>{person.place}</TableRowColumn>
				<TableRowColumn style={this.getStyle(60, person)}>{person.problem}</TableRowColumn>
				<TableRowColumn style={this.getStyle(undefined, person)}>{person.solution}</TableRowColumn>
			</TableRow>
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
			<Paper zDepth={1} style={{marginTop: 10, marginBottom: 10}}>
				<Table>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn style={{width: 40}}>ID</TableHeaderColumn>
							<TableHeaderColumn style={{width: 40}}>Name</TableHeaderColumn>
							<TableHeaderColumn style={{width: 40}}>Photo</TableHeaderColumn>
							<TableHeaderColumn style={{width: 40}}>Place</TableHeaderColumn>
							<TableHeaderColumn style={{width: 40}}>Problem</TableHeaderColumn>
							<TableHeaderColumn style={{width: 40}}>Solution</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody stripedRows={true}>
						{peoplerows}
					</TableBody>
				</Table>
			</Paper>
			
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
				<AppBar title="Help these people" showMenuIconButton={false}/>
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