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
var Thumbnail = require('react-bootstrap/lib/Thumbnail');
var Image = require('react-bootstrap/lib/Image');



var ItemCol = React.createClass({

	render: function() {

		var thumb_style = {
			background: "#ecf0f1",
		};

		var text_style = {
			color: "#c0392b"
		};
		return (	
		    <Col xs={6} md={4}>
		        <Thumbnail style={thumb_style} src={this.props.itemimg} alt="300x200">
			        <h3 style={text_style}>{this.props.itemname}</h3><br/>
			        <h3 style={text_style}>Price: {this.props.itemprice}</h3>
			        <p>
			          <Button bsStyle="primary">Buy Now</Button>
			        </p>
		        </Thumbnail>
		    </Col>
		);
	}
});

var PeopleDetail = React.createClass({ 

	render: function() {
		//console.log(this.state.person);
		var headertitle = "Buy "+ this.state.person.name +" a " + this.state.person.solution + "!";
		var cols = [];
		var matches = this.state.person.matches;

		if(this.state.person){
			for (var i=0; i < matches.length; i++) {
				// pname = matches[i].name;
				// pimg = matches[i].img;
				// pprice = matches[i].price;
	    		cols.push(<ItemCol key={i} itemname={matches[i].name} itemimg={matches[i].img} itemprice={matches[i].price}/>);
	    	}
    	}

    	var text_style = {
			color: "#ecf0f1"
		};

		return (
			<div>
				<Image src="abdul.png" thumbnail />
				<Card>
					<CardHeader title="Posted By Abhijit's Charity" subtitle="March 31, 2016" />

				     
				    <CardTitle title={headertitle} subtitle={this.state.place} />
				    <CardText>
				      <p>
				      Problem<br />
				      {this.state.problem}<br />
				      Solution<br /> 
				      {this.state.solution}<br />
				      Help him receive what he needs to improve his life forever.
				      </p>
				    </CardText>

				</Card>	
				<h3>Results from amazon</h3>
				<Grid>
				    <Row>
				    	{cols}
				    </Row>
				</Grid>
			</div>
		);
	},
		
	getInitialState: function() {
		return {successVisible: false, person: '' };
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
		$.ajax('/api/people/' + this.props.params.id).done(function(persondetails) {
			console.log("loaded data: ", persondetails);
			this.setState({person: persondetails});
		}.bind(this));
	},


	// submit: function(e) {
	// 	var person = { 
	// 		name: this.state.name,
	// 		photo: this.state.photo,
	// 		place: this.state.place,
	// 		problem: this.state.problem,
	// 		solution: this.state.solution,
	// 	};

	// 	$.ajax({
	// 		url: '/api/people/' + this.props.params.id,
	// 		contentType: 'application/json',
	// 		type: 'PUT',
	// 		data: JSON.stringify(person),
	// 		dataType: 'json',
	// 		success: function(person) { 
	// 			console.log("submitted succesfully: ", person);
	// 			this.setState(person);
	// 			this.showSuccessMessage();
	// 		}.bind(this),
	// 	});
	// }
});

module.exports = PeopleDetail;