var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var amazon = require('amazon-product-api');
//var aws = require("aws-lib");
var router  = express.Router();
var multer = require('multer');
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

 function decodeBase64Image(dataString) 
        {
          var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          var response = {};

          if (matches.length !== 3) 
          {
            return new Error('Invalid input string');
          }

          response.type = matches[1];
          response.data = new Buffer(matches[2], 'base64');

          return response;
        }

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

	console.log("GET SINGLE RECORD: ", req.query);

	db.collection("people").findOne({_id: ObjectId(req.params.id)}, function(err, docs){
		//console.log(doc);
		res.json(docs);
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

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '\\images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');
/*
app.post('/api/image', function(req, res) {
	  uploading(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
})
*/
var fs= require('fs')

app.post('/api/upload', function(req, res) {
	console.log(req.body.name);
    console.log('req received');
    var images = decodeBase64Image(req.body.image);

	fs.writeFile(__dirname +'\\images\\'+req.body.name, images.data, 'base64', function(err) {
  			console.log("Error: "+ err);
	});

    /*upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });*/
    res.redirect('/');
/*  fs.readFile(req.files.image.path, function (err, data) {
  	var image = req.body;
    var imageName = req.body.image.path;
    // If there's an error
    if(!imageName){
      console.log("There was an error")
      res.redirect("/");
      res.end();
    } else {
      var newPath = __dirname + "/images/" + imageName;
      // write file to uploads/fullsize folder
      fs.writeFile(newPath, data, function (err) {
        // let's see it
        res.redirect("/api/images/" + imageName);
      });
    }
  });*/
});

app.get('/api/upload', function(req, res) {
	console.log(JSON.stringify(req.files));
});
/*
app.get('/api/images/:file', function (req, res){
  file = req.params.file;
  var img = fs.readFileSync(__dirname + "/images/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});*/

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

