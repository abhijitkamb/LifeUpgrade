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
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var TextField = require('material-ui/lib/text-field');
var Snackbar = require('material-ui/lib/snackbar');


var PeopleEdit = React.createClass({ 


	render: function() {
		return (
			<div style={{maxWidth: 800}}>
				<Card>
					<CardHeader title="Edit Profile" subtitle={this.props.params.id}
					avatar={
						<Avatar backgroudColor={Colors.teal500} icon={
							<FontIcon className="fa fa-bug"></FontIcon>
						}/>
					}/>
					<CardText>
						<TextField fullWidth={true} floatingLabelText="Name" value={this.state.name} onChange={this.onChangeName}/>
						<br/>
						<TextField fullWidth={true} floatingLabelText="Photo" value={this.state.photo} onChange={this.onChangePhoto}/>
						<br/>
						<TextField fullWidth={true} floatingLabelText="Problem" value={this.state.problem} onChange={this.onChangeProblem}/>
						<br/>
						<TextField fullWidth={true} floatingLabelText="Solution" value={this.state.solution} onChange={this.onChangeSolution}/>
						<br/>
						<SelectField fullWidth={true} floatingLabelText="Country" value={this.state.place} onChange={this.onChangePlace}>
							<MenuItem value="India" primaryText="India" />
							<MenuItem value="China" primaryText="China" />
							<MenuItem value="Canada" primaryText="Canada" />
						</SelectField>
						<br/>
						<RaisedButton label="Save" primary={true} onTouchTap={this.submit} />
						<FlatButton label="Back to people list" linkButton={true} href="/#/people" style={{verticalAlign: 'top'}}/>
						<Snackbar open={this.state.successVisible} message="Changes saved, thank you." autoHideDuration={5000} action="ok" onActionTouchTap={this.dismissSuccessMessage} onRequestClose={this.dismissSuccessMessage} />
					</CardText>
				</Card>
			</div>
		);
	},
		
	getInitialState: function() {
		return {successVisible: false};
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
	onChangePlace: function (e, i, value) {  this.setState({place: value});	},
	onChangeProblem: function (e) {  this.setState({problem: e.target.value});	},
	onChangeSolution: function (e) {  this.setState({solution: e.target.value});	},

	showSuccessMessage: function() {
		this.setState({successVisible: true});
	},
	dismissSuccessMessage: function() {
		this.setState({successVisible: false});
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

module.exports = PeopleEdit;