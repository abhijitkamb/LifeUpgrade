# LifeExpress
--------------------------------

Prerequisites:
npm install -g babel-cli
npm install -g browserify

During development:

1) Set mongdb credentials in main.js

2) in main.js

//FOR WINDOWS, USE 
app.use('/', express.static(__dirname + '\\static'));

//FOR LINUX, USE
//app.use('/', express.static(__dirname + '/static'));

3) To bundle packages

gulp bundle

4) To watch changes

gulp or gulp watch

5) To start the server

node main.js


TODO:

- currently uses hashHistory routing, might wanna consider browerHistory

Design and Architecture
--------------------------------




