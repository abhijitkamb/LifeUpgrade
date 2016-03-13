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


var anyValue = '*';

var PeopleFilter = React.createClass({
	render: function() {
		return (
			
			<Card initiallyExpanded={true} >
				<CardHeader title="Filter" subtitle="by place" actAsExpander={true} showExpandableButton={true}
				avatar={
					<Avatar backgroundColor={Colors.teal500} icon={
						<FontIcon className="fa fa-filter"></FontIcon>
					}>
					</Avatar>
				}/>

				<CardText expandable={true} style={{paddingTop: 0}} >
					<SelectField value={this.state.place} onChange={this.onChangePlace} floatingLabelText="Place">
						<MenuItem value = {anyValue} primaryText="(Any)" />
						<MenuItem value = "India" primaryText="India" />
						<MenuItem value = "China" primaryText="China" />
						<MenuItem value = "Canada" primaryText="Canada" />
					</SelectField>
					&nbsp; 
					<RaisedButton label="Apply" onTouchTap={this.submit} />
				</CardText>
			</Card>
		);
	},

	getInitialState: function() {
		var initFilter = this.props.initFilter;
    	return {place: initFilter.place || anyValue};
  	},

  	componentWillReceiveProps: function(newProps) {
  		var newFilter = {place: newProps.initFilter.place || anyValue};
  		if (newFilter.place === this.state.place) {
  			console.log("Filter: componentWillReceiveProps, no change");
  			return;
  		}

  		console.log("Filter: componentWillReceiveProps, new change: ", newFilter);
  		this.setState({place: newFilter.place});
  	},

  	onChangePlace: function(e, index, value) {
  		console.log("on change PLACE:: ", e.target.value)
  		this.setState({place: value});
  	},

	submit: function(e){
		var newFilter = {};
		console.log(this.state.place, "submitted on click apply");
		if (this.state.place != anyValue) {
			newFilter.place = this.state.place;
		}
		this.props.submitHandler(newFilter);
	}
});

module.exports = PeopleFilter;