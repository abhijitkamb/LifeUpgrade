
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var browserHistory = require('react-router').browserHistory;
var hashHistory = require('react-router').hashHistory;

var PeopleList = require('./PeopleList');
var PeopleEdit = require('./PeopleEdit');
var PeopleDetail = require('./PeopleDetail');


//console.log("app.js loaded");
var NoMatch = React.createClass({
	render: function () {
		return (
			<h2>No match for the route</h2>
		);
	}
});



ReactDOM.render(
  //<PeopleList />,
  (
  	<Router history={hashHistory}>
  		<Route path="/people" component={PeopleList} />
      <Route path="/people/:id" component={PeopleDetail} />

  		<Redirect from="/" to="/people" />
  		<Route path="*" component={NoMatch} />
  	</Router>
  ), 
  document.getElementById('main')
); 
   
