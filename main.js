var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var amazon = require('amazon-product-api');
//var aws = require("aws-lib");

var config = require('./config');

var url = config.database;

var app = express();
var db;

var awsclient = amazon.createClient({
  awsId: config.awsId,
  awsSecret: config.awsSecret,
  awsTag: config.awsTag
});

//var prodAdv = aws.createProdAdvClient(config.awsId, config.awsSecret, config.awsTag);

//onsole.log("DITNAME: ", __dirname + '\\static');
//FOR WINDOWS, USE 
app.use('/', express.static(__dirname + '\\static'));

//FOR LINUX, USE
//app.use('/', express.static(__dirname + '/static'));

app.use(bodyParser.json());

/*
Get a list of filtered records
*/
app.get('/api/people', function(req, res){

	console.log("Query string: ", req.query);

	var filter = {};
	if (req.query.place) {
		filter.place = req.query.place;
	}

	db.collection("people").find(filter).toArray(function(err, docs){
		//console.log(doc);
		res.json(docs);
	});

});


/*
Get a single record
*/
app.get('/api/people/:id', function(req, res){

	var person;
	var matchdetails = [];

	console.log("GET SINGLE RECORD: ", req.query);

	db.collection("people").findOne({_id: ObjectId(req.params.id)}, function(err, docs){
		
		//res.json(docs);
		person = docs;
		// console.log('++++++++++++++++');
		// console.log(person);
		// console.log('++++++++++++++++');

			//Use amazon api
		awsclient.itemSearch({
				//availability: 'Available',
				//keywords: 'folding truck',
				keywords: person.solution,
				itemPage: '1',
				responseGroup: 'ItemAttributes, Offers, Images',
			}, function (err, results) {
				if(err) {
					console.log(err);
				} else {
					console.log(results.length);
					//console.log(results);

					//results_parsed = JSON.parse(results);

					//console.log(results_parsed);
					//i<results.length
					for (i=0; i < 3; i++) {
						var itemdetail = {}
						itemdetail.name = results[i].ItemAttributes[0].Title[0];
						itemdetail.img = results[i].MediumImage[0].URL[0];
						itemdetail.price = results[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
						
						// console.log(itemdetail.name);
						// console.log(itemdetail.img);
						// console.log(itemdetail.price);

						matchdetails[i] = itemdetail;

						console.log("________________");
					}
				}

				person['matches'] = matchdetails;

				console.log('----------------');
				console.log(person);
				console.log('----------------');

				res.json(person);

			}

		);
		
	});

	


});

/*
Insert a record
*/
app.post('/api/people/', function(req, res){
	console.log("Req body:", req.body);
	var newPerson = req.body;

	db.collection("people").insertOne(newPerson, function(err, result){
		var newId = result.insertedId;
		db.collection("people").find({_id: newId}).next(function(err, doc){
			res.json(doc);
		});
	});

});


/*
Update a record, give ID
*/
app.put('/api/people/:id', function(req, res){
	console.log("Update req body:", req.body);
	var person = req.body;
	var oid = ObjectId(req.params.id);

	db.collection("people").updateOne({_id: oid}, person, function(err, result){
		db.collection("people").find({_id: oid}).next(function(err, doc){
			res.json(doc);
		});
	});

});


MongoClient.connect(url, function(err, dbconn) {
  assert.equal(null, err);
  db = dbconn;
  console.log("Connected correctly to mongo server.");

  var server = app.listen(3000, function(){
		var port = server.address().port;
		console.log('Server listening on port', port, '!');

	 //  	awsclient.itemSearch({
		// 	searchIndex: 'All',
		// 	keywords: 'tshirt',
		// 	sort: 'price',
		// 	responseGroup: 'ItemAttributes,Offers,Images'
		// }, function (err, results, response) {
		// 	if(err){
		// 		console.log("ERROR: ", err);
		// 	} else {
		// 		console.log("RESULTS");
		// 		console.log(results[0].ItemAttributes);
		// 		console.log("********");
		// 		console.log(results.length);
				
		// 		for (r in results) {
		// 			var itemAttr = results[r].ItemAttributes[0];
		// 			if('Title' in itemAttr)
		// 				console.log(itemAttr.Title[0]);
		// 			else
		// 				console.log("attr not found1");


		// 			if('ListPrice' in itemAttr && 'FormattedPrice' in itemAttr.ListPrice[0])
		// 				console.log(itemAttr.ListPrice[0].FormattedPrice[0]);
		// 			else
		// 				console.log("attr not found2");

		// 			console.log("-----");
					
					
		// 		}
				

		// 		console.log("RESPONSE");
		// 		console.log(typeof response);
		// 		// for (r in results) {
		// 		// 	console.log(r.ItemAttributes);
		// 		// }
		// 	}
		// });	

  });
 
  //db.close();
});

