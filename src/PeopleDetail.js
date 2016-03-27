var React = require('react');
var ReadtDOM = require('react-dom');
var $ = require('jquery');
//var Link = require('react-router').Link;

//Material UI components
var RaisedButton = require('material-ui/lib/raised-button');
var FlatButton = require('material-ui/lib/flat-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var CardActions = require('material-ui/lib/card/card-actions');
var CardMedia = require('material-ui/lib/card/card-media');
var CardTitle = require('material-ui/lib/card/card-title');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var TextField = require('material-ui/lib/text-field');
var Snackbar = require('material-ui/lib/snackbar');

var Button = require('react-bootstrap/lib/Button');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Thumbnail = require('react-bootstrap/lib/Thumbnail')


var PeopleDetail = React.createClass({ 


	render: function() {

		var headertitle = "Buy "+ this.state.name +" a new pair of shoes";
		return (
			<div>
				<Card>
					<CardHeader title="Salvation Army" subtitle="March 14, 2016" />
					<CardMedia>
			      		<img src="http://lorempixel.com/600/337/nature/" />
			    	</CardMedia>
				     
				    <CardTitle title={headertitle} subtitle={this.state.place} />
				    <CardText>
				      <p>
				      Problem<br />
				      {this.state.problem}<br />
				      Solution<br /> 
				      {this.state.solution}<br />
				      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
				      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
				      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
				      </p>
				    </CardText>
				    <CardActions>
				      	<Grid>
						    <Row>
						    <Col xs={6} md={4}>
						      <Thumbnail src="http://lorempixel.com/600/337/nature/" alt="242x200">
						        <h3>Thumbnail label</h3>
						        <p>Description</p>
						        <p>
						          <Button bsStyle="primary">Buy Now</Button>
						        </p>
						      </Thumbnail>
						    </Col>
						    <Col xs={6} md={4}>
						      <Thumbnail src="http://lorempixel.com/600/337/nature/" alt="242x200">
						        <h3>Thumbnail label</h3>
						        <p>Description</p>
						        <p>
						          <Button bsStyle="primary">Buy Now</Button>
						        </p>
						      </Thumbnail>
						    </Col>
						    <Col xs={6} md={4}>
						      <Thumbnail src="http://lorempixel.com/600/337/nature/" alt="242x200">
						        <h3>Thumbnail label</h3>
						        <p>Description</p>
						        <p>
						          <Button bsStyle="primary">Buy Now</Button>
						        </p>
						      </Thumbnail>
						    </Col>
						    </Row>
						  </Grid>
				    </CardActions>

				</Card>	
			</div>
		);
	},
		
	getInitialState: function() {
		return {successVisible: false, name: '', photo: '', place: '', problem: '', solution: '', data_uri: null};
	},
 
	componentDidMount: function() {
		this.loadData();
	},

	componentDidUpdate: function(prevProps) {
		console.log("Person Detail: componentDidUpdate ", prevProps.params.id, this.props.params.id);
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


	submit: function(e) {
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
				console.log("submitted succesfully: ", person);
				this.setState(person);
				this.showSuccessMessage();
			}.bind(this),
		});
	}
});

module.exports = PeopleDetail;