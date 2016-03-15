# LifeExpress
--------------------------------

Prerequisites:
npm install -g babel-cli
npm install -g browserify

During development:

To run the app

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


TODO (in the order of priority):
---------------------------------

- figure out how to do images, videos and put them in mongodb

- accounts and authentication

- verification system to avoid fake posts and scams and security/privacy

- write own http library to abstract requests to backend (amazon etc...)
	- this includes converting responses from xml to json

- read and understand amazon product advertising api

- algorithm to sort items returned from amazon api (by relevance or price ...)

- currently uses hashHistory routing, might wanna consider browerHistory


Design and Architecture
--------------------------------

Tech Stack: MERN


Node and Express (Backend):



Reactjs (Frontend):

Pages:
	- PeopleList
		- PeopleFilter
		- PeopleTable
		- PeopleAdd
	- PeopleEdit



Mongodb (Database):
	- People Database
		- Name, photo, place, problem, solution


Workflow
--------------

1. Front page
	- opening image: title, tag line
	- bunch of tiles, each has its story, picture/video, "learn more and help out" button takes you to Main profile(3) page
		- this is sorted by need (rating) or location and have like a mini navbar: nearby, most popular, trending
	- sign in functionality, sign up takes you to Profile page(2)

2. Profile page (2 kinds of accounts)
	- Donaters
		- Your donations and status (in progress, in transit, reached)

	- Donation recepients (probably charities primarily to verify and validate):
		- Put up your story
		- Name, photo, what i need, why i need
	


3. Main profile
	- transferred from front page though link
	- detailed description
	- amazon suggested prices and ebay or alibaba
		- pay through amazon and 3rd party and figure out a way to hide shipping address for privacy
		



