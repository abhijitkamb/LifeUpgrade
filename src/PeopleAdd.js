var React = require('react');
var ReactDOM = require('react-dom');

var PeopleAdd = React.createClass({
 
	getInitialState: function(){
		return {name: '', img: '', place: '', problem: '', solution: ''};
	},
	render: function() {
		return (
			<div className="peopleAdd">
				<form name="personAdd">
					<input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChangeName}/>
					<input type="text" name="photo" placeholder="Photo" value={this.state.img} onChange={this.handleChangePhoto}/>
					<input type="text" name="place" placeholder="Place" value={this.state.place} onChange={this.handleChangePlace}/>
					<input type="text" name="problem" placeholder="Problem" value={this.state.problem} onChange={this.handleChangeProblem}/>
					<input type="text" name="solution" placeholder="Solution" value={this.state.solution} onChange={this.handleChangeSolution}/>
					<button onClick={this.handleSubmit}>Add Person</button>
				</form>
			</div>
		);
	},

	handleChangeName: function (e) {  this.setState({name: e.target.value});	},
	handleChangePhoto: function (e) {  this.setState({img: e.target.value});	},
	handleChangePlace: function (e) {  this.setState({place: e.target.value});	},
	handleChangeProblem: function (e) {  this.setState({problem: e.target.value});	},
	handleChangeSolution: function (e) {  this.setState({solution: e.target.value});	},

	handleSubmit: function(e){
		e.preventDefault();
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