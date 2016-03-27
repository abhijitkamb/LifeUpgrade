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
var Card = require('material-ui/lib/card/card');
var CardActions = require('material-ui/lib/card/card-actions');
var CardHeader = require('material-ui/lib/card/card-header');
var CardMedia = require('material-ui/lib/card/card-media');
var CardTitle = require('material-ui/lib/card/card-title');
var FlatButton = require('material-ui/lib/flat-button');
var RaisedButton = require('material-ui/lib/raised-button');
var CardText = require('material-ui/lib/card/card-text');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var IconButton = require('material-ui/lib/icon-button');
var NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
var Menu = require('material-ui/lib/menus/menu');
var MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
var MenuItem = require('material-ui/lib/menus/menu-item');


//React Bootstrap Components
var Nav = require('react-bootstrap/lib/Nav');
var Navbar = require('react-bootstrap/lib/Navbar');
var NavItem = require('react-bootstrap/lib/NavItem');

injectTapEventPlugin();

var PeopleFilter = require('./PeopleFilter');
var PeopleAdd = require('./PeopleAdd');
var PeopleUpload = require('./PeopleUpload');

var PeopleRow = React.createClass({

	getStyle: function(width, person) {
		var style = {height: 50};
		if (width) style.width = width;
		//if (bug.priority == 'p1') style.color = 'red';
		return style;
	},

	render: function() {
		var person = this.props.people;
		var headertitle = "Buy "+ person.name +" a new pair of shoes";
		

			
			/*<TableRow>
				<TableRowColumn style={this.getStyle(40, person)}>
					<Link to={'/people/' + this.props.people._id}>
						{this.props.people._id}
					</Link>
				</TableRowColumn >
				<TableRowColumn style={this.getStyle(40, person)}>
					{person.name}
				</TableRowColumn>
				<TableRowColumn style={this.getStyle(40, person)}>
					{person.photo}
				</TableRowColumn>
				<TableRowColumn style={this.getStyle(40, person)}>{person.place}</TableRowColumn>
				<TableRowColumn style={this.getStyle(40, person)}>{person.problem}</TableRowColumn>
				<TableRowColumn style={this.getStyle(40, person)}>{person.solution}</TableRowColumn>
			
			<li>
				
			</li>*/
		return (	
			
			<Card>
				<CardHeader title="Salvation Army" subtitle="March 14, 2016" />
			    <CardMedia>
			      <img src="http://lorempixel.com/600/337/nature/" />
			    </CardMedia>
			    <CardTitle title={headertitle} subtitle={person.place} />
			    <CardText>
			      <p>
			      Problem<br />
			      {person.problem}<br />
			      Solution<br /> 
			      {person.solution}<br />
			      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
			      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
			      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
			      </p>
			    </CardText>
			    <CardActions>
			      <RaisedButton label="Learn More" primary={true} /> 
			    </CardActions>

			</Card>	

			

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
			// Change RowColumn 
			<Paper zDepth={1} style={{marginTop: 10, marginBottom: 10}}>


				<div>
					{peoplerows}
				</div>
			</Paper>
			
		);
	},

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
			    <Navbar inverse>
				    <Navbar.Header>
				      <Navbar.Brand>
				        <a href="#">Lift Us Up</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Nav pullRight>
				      <NavItem eventKey={1} href="#">About Us</NavItem>
				      <NavItem eventKey={2} href="#">Log In</NavItem>
				      <NavItem eventKey={3} href="#">Sign Up</NavItem>
				      
				    </Nav>
				</Navbar>


				<PeopleFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
				<hr />
				<PeopleUpload  />
				
				
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