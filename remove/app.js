
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var PeopleFilter = React.createClass({
	displayName: 'PeopleFilter',

	render: function () {
		return React.createElement(
			'div',
			{ className: 'peopleFilter' },
			'way to filter comes here'
		);
	}
});

var PeopleRow = React.createClass({
	displayName: 'PeopleRow',

	render: function () {
		return React.createElement(
			'tr',
			{ className: 'peopleRow' },
			React.createElement(
				'td',
				null,
				this.props.people._id
			),
			React.createElement(
				'td',
				null,
				this.props.people.name
			),
			React.createElement(
				'td',
				null,
				this.props.people.img
			),
			React.createElement(
				'td',
				null,
				this.props.people.problem
			),
			React.createElement(
				'td',
				null,
				this.props.people.solution
			)
		);
	}
});

var PeopleTable = React.createClass({
	displayName: 'PeopleTable',

	render: function () {
		//console.log("Rendering peopl table, num items:", this.props.peopledata.length);
		var peoplerows = this.props.peopledata.map(function (people) {
			return React.createElement(PeopleRow, { key: people._id, people: people });
		});

		return React.createElement(
			'table',
			null,
			React.createElement(
				'thead',
				null,
				React.createElement(
					'tr',
					null,
					React.createElement(
						'th',
						null,
						'ID'
					),
					React.createElement(
						'th',
						null,
						'Name'
					),
					React.createElement(
						'th',
						null,
						'Photo'
					),
					React.createElement(
						'th',
						null,
						'Problem'
					),
					React.createElement(
						'th',
						null,
						'Solution'
					)
				)
			),
			React.createElement(
				'tbody',
				null,
				peoplerows
			)
		);
	}
});

var PeopleAdd = React.createClass({
	displayName: 'PeopleAdd',


	getInitialState: function () {
		return { name: '', img: '', problem: '', solution: '' };
	},
	render: function () {
		return React.createElement(
			'div',
			{ className: 'peopleAdd' },
			React.createElement(
				'form',
				{ name: 'personAdd' },
				React.createElement('input', { type: 'text', name: 'name', placeholder: 'Name', value: this.state.name, onChange: this.handleChangeName }),
				React.createElement('input', { type: 'text', name: 'photo', placeholder: 'Photo', value: this.state.img, onChange: this.handleChangePhoto }),
				React.createElement('input', { type: 'text', name: 'problem', placeholder: 'Problem', value: this.state.problem, onChange: this.handleChangeProblem }),
				React.createElement('input', { type: 'text', name: 'solution', placeholder: 'Solution', value: this.state.solution, onChange: this.handleChangeSolution }),
				React.createElement(
					'button',
					{ onClick: this.handleSubmit },
					'Add Person'
				)
			)
		);
	},

	handleChangeName: function (e) {
		this.setState({ name: e.target.value });
	},
	handleChangePhoto: function (e) {
		this.setState({ img: e.target.value });
	},
	handleChangeProblem: function (e) {
		this.setState({ problem: e.target.value });
	},
	handleChangeSolution: function (e) {
		this.setState({ solution: e.target.value });
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var name = this.state.name.trim();
		var photo = this.state.img.trim();
		var problem = this.state.problem.trim();
		var solution = this.state.solution.trim();

		if (!name || !photo || !problem || !solution) {
			return;
		}

		this.props.addperson({ name: name, img: photo, problem: problem, solution: solution });
		this.setState({ name: "", img: "", problem: "", solution: "" });
	}

});

var PeopleList = React.createClass({
	displayName: 'PeopleList',


	getInitialState: function () {
		return { peopledata: [] };
	},
	componentDidMount: function () {
		$.ajax('/api/people').done(function (data) {
			this.setState({ peopledata: data });
		}.bind(this));

		//handle errors: https://facebook.github.io/react/docs/tutorial.html#updating-state
	},
	render: function () {
		return React.createElement(
			'div',
			{ className: 'peopleList' },
			React.createElement(
				'h1',
				null,
				'People'
			),
			React.createElement(PeopleFilter, null),
			React.createElement('hr', null),
			React.createElement(PeopleTable, { peopledata: this.state.peopledata }),
			React.createElement('hr', null),
			React.createElement(PeopleAdd, { addperson: this.addPerson })
		);
	},

	addPerson: function (person) {

		$.ajax({
			url: '/api/people',
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify(person),
			success: function (data) {
				var p = data;
				var peopleModified = this.state.peopledata.concat(p);
				this.setState({ peopledata: peopleModified });
			}.bind(this),
			error: function (xhr, status, err) {
				console.log("Error adding person: ", err.toString());
			}

		});
	}

});

ReactDOM.render(React.createElement(PeopleList, null), document.getElementById('main'));