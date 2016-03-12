var React = require('react');
var ReactDOM = require('react-dom');

var PeopleFilter = React.createClass({
	render: function() {
		return (
			
			<div>
				<h3>Filter</h3>
				<div>Place:</div>
				<select value={this.state.place} onChange={this.onChangePlace}>
					<option value="">(Any)</option>
					<option value="India">India</option>
					<option value="China">China</option>
					<option value="Canada">Canada</option>
				</select>
				<br/>

				<button onClick={this.submit}>Apply</button>
			</div>
		);
	},

	getInitialState: function() {
		var initFilter = this.props.initFilter;
    	return {place: initFilter.place};
  	},

  	componentWillReceiveProps: function(newProps) {
  		if (newProps.initFilter.place === this.state.place) {
  			console.log("Filter: componentWillReceiveProps, no change");
  			return;
  		}

  		console.log("Filter: componentWillReceiveProps, new change: ", newProps.initFilter);
  		this.setState({place: newProps.initFilter.place});
  	},

  	onChangePlace: function(e) {
  		console.log("on change PLACE:: ", e.target.value)
  		this.setState({place: e.target.value});
  	},

	submit: function(e){
		var newFilter = {};
		console.log(this.state.place, "submitted on clikck apply");
		if (this.state.place) {
			newFilter.place = this.state.place;
		}
		this.props.submitHandler(newFilter);
	}
});

module.exports = PeopleFilter;
