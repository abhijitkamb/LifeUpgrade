var React = require('react');
var ReactDOM = require('react-dom');

//Material UI components
var RaisedButton = require('material-ui/lib/raised-button');
var FloatingActionButton = require('material-ui/lib/floating-action-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var TextField = require('material-ui/lib/text-field');

var FlatButton = require('material-ui/lib/flat-button');
var anyValue = '*';

var PeopleAdd = React.createClass({
 
	getInitialState: function(){
		return {name: '', photo: '', place: '', problem: '', solution: '', data_uri: null};
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
					<br/><div>
					
					<form onSubmit={this.handleSubmit} encType="multipart/form-data">
						<span>
						<p style={{color: '#cccccc' ,fontSize: 17}}> Photo: </p>
  						<input type="file" id="imageButton" onChange={this.handleFile}></input>
  						</span>
  					</form>
  					</div>
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
	handleChangePlace: function (e) {  this.setState({place: e.target.value});	},
	handleChangeProblem: function (e) {  this.setState({problem: e.target.value});	},
	handleChangeSolution: function (e) {  this.setState({solution: e.target.value});	},
	handleFile: function (e) { 
		var self = this;
		var reader = new FileReader();
		var file = e.target.files[0]; 

    	console.log(file);
		reader.onload = function(upload) {
      		self.setState({
        			data_uri: upload.target.result,
      		});
    	}
    	reader.readAsDataURL(file)
    	this.setState({
			photo: file.name
		});

	},

	handleSubmit: function(){
		var name = this.state.name.trim();
		var photo = this.state.photo.trim();
		var place = this.state.place.trim();
		var problem = this.state.problem.trim();
		var solution = this.state.solution.trim();

		if(!name || !photo || !place || !problem || !solution){
			return;
		}

		this.props.addperson({name: name, photo: photo, place: place, problem: problem, solution: solution});
		this.setState({name: "", photo: "", place: "", problem: "", solution: ""});
	}
		

});

module.exports = PeopleAdd;