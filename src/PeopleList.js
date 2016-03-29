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



var Icon = require('react-fontawesome');

//React Bootstrap Components
var Nav = require('react-bootstrap/lib/Nav');
var Navbar = require('react-bootstrap/lib/Navbar');
var NavItem = require('react-bootstrap/lib/NavItem');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var Button = require('react-bootstrap/lib/Button');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Thumbnail = require('react-bootstrap/lib/Thumbnail')



injectTapEventPlugin();

var PeopleFilter = require('./PeopleFilter');
var PeopleAdd = require('./PeopleAdd');
//var PeopleUpload = require('./PeopleUpload');

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
		let imgsrc = "http://localhost:3000/images/"+this.props.people._id+this.props.people.ext;
		let imgsrc_ = "http://localhost:3000/n.png";
		console.log("image source: "+imgsrc);
			
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
				
				<CardMedia>
			      <img src="http://lorempixel.com/600/337/nature/" />
			    </CardMedia>
			</li>
						<Card>
				<CardHeader title="Salvation Army" subtitle="March 14, 2016" />
			    
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
			*/
		return (	
			<Col xs={6} md={4}>
				<Thumbnail src={imgsrc} alt="242x200">
			        <h3>{headertitle}</h3>
			        <p>PLorem ipsum dolor sit amet, consectetur adipiscing elit.
	      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi</p>
			        <p>
			          	<Link to={'/people/' + this.props.people._id}>
			          		<Button bsStyle="primary">Learn More</Button>
						</Link>
			        </p>
		        </Thumbnail>
			</Col>

			

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
			<Grid>
				<Row>
					{peoplerows}
				</Row>
			</Grid>
			
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
			    <Navbar inverse className="navbar-fixed-top">
				    <Navbar.Header>
				      <Navbar.Brand className="page-scroll">
				        <a href="#">Lift Us Up</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				    	<Nav>
				    		<NavItem eventKey={1} href="#">Discover</NavItem>
				    		<NavItem eventKey={2} href="#">How it works</NavItem>
				    	</Nav>
					    <Nav pullRight>
					      <NavItem eventKey={1} href="#">About Us</NavItem>
					      <NavItem eventKey={2} href="#">Sign Up</NavItem>
					      <NavItem eventKey={3} href="#">Log In</NavItem>
					      
					    </Nav>
					</Navbar.Collapse>
				</Navbar>
 				<Jumbotron>
				    <h1>Donate Any Item Now!</h1>
				    <p>Give people exactly what they only need from your favorite online store</p>
				    <p><Button bsStyle="primary" bsSize="large">Learn more</Button></p>
				</Jumbotron>

				<PeopleFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
				<hr />

				<PeopleTable peopledata={this.state.peopledata} />
				<hr />

				<Grid>
					<Row>
						<Col lg={3} md={6}>
							<div>
								<Icon name="filter" />
								<h3>Discover</h3>
								<p> Sample of a section that describes steps of how the app works. Im gonna fill a few more lines here with random words like blah. Thank You. Thats it.</p>
							</div>
						</Col>

						<Col lg={3} md={6}>
							<div>
								<Icon name="book" />
								<h3>Learn</h3>
								<p> Sample of a section that describes steps of how the app works. Im gonna fill a few more lines here with random words like blah. Thank You. Thats it.</p>
							</div>
						</Col>

						<Col lg={3} md={6}>
							<div>
								<Icon name="shopping-cart" />
								<h3>Donate</h3>
								<p> Sample of a section that describes steps of how the app works. Im gonna fill a few more lines here with random words like blah. Thank You. Thats it.</p>
							</div>
						</Col>

						<Col lg={3} md={6}>
							<div>
								<Icon name="plane" />
								<h3>Delivered</h3>
								<p> Sample of a section that describes steps of how the app works. Im gonna fill a few more lines here with random words like blah. Thank You. Thats it.</p>
							</div>
						</Col>
					</Row>
				</Grid>



				<PeopleAdd addperson={this.addPerson}/>
				<hr />
				
				
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

		console.log(person)

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