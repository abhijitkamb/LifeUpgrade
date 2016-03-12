var React = require('react');
var ReactDOM = require('react-dom');

//Material UI components
var RaisedButton = require('material-ui/lib/raised-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var TextField = require('material-ui/lib/text-field');

var anyValue = '*';

var PeopleAdd = React.createClass({
 
	getInitialState: function(){
		return {name: '', img: '', place: '', problem: '', solution: ''};
	},
	render: function() {
		return (
			<Card initiallyExpanded={true}>
				<CardHeader title="Create" subtitle="Tell your story" actAsexpander={true} showExpandableButton={true}
				avatar={
					<Avatar backgroundColor={Colors.teal500} icon={
						<FontIcon className="fa fa-plus"></FontIcon>
					} />
				} />
				<CardText expandable={true} style={{paddingTop: 0}}>
					<TextField hintText="Name" value={this.state.name} onChange={this.handleChangeName} />
					<br/>
					<TextField hintText="Photo" value={this.state.img} onChange={this.handleChangePhoto} />
					<br/>
					<TextField hintText="Place" value={this.state.place} onChange={this.handleChangePlace} />
					<br/>
					<TextField hintText="Problem" value={this.state.problem} onChange={this.handleChangeProblem} />
					<br/>
					<TextField hintText="Solution" value={this.state.solution} onChange={this.handleChangeSolution} />
					<br/>
					<RaisedButton label="Add Person" primary={true} onTouchTap={this.handleSubmit}/>
				</CardText>
			</Card>
		);
	},

	handleChangeName: function (e) {  this.setState({name: e.target.value});	},
	handleChangePhoto: function (e) {  this.setState({img: e.target.value});	},
	handleChangePlace: function (e) {  this.setState({place: e.target.value});	},
	handleChangeProblem: function (e) {  this.setState({problem: e.target.value});	},
	handleChangeSolution: function (e) {  this.setState({solution: e.target.value});	},

	handleSubmit: function(){
		var name = this.state.name.trim();
		var photo = this.state.img.trim();
		var place = this.state.place.trim();
		var problem = this.state.problem.trim();
		var solution = this.state.solution.trim();

		if(!name || !photo || !place || !problem || !solution){
			return;
		}

		this.props.addperson({name: name, img: photo, place: place, problem: problem, solution: solution});
		this.setState({name: "", img: "", place: "", problem: "", solution: ""});
	}
		

});

module.exports = PeopleAdd;