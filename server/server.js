/*************************************
* Author: Christopher Connolly
* Date: November 2014
*
* Purpose:
* Genesys Twilio Adapter
**************************************/

var express = require('express'),
	http = require('http'),
	https = require('https'),
	cors = require('cors'),
	morgan  = require('morgan'),
	fs = require('fs'),
	request = require('request'),
	http = require('http'),
	nconf = require('nconf'),
	url = require('url'),
	crypto = require('crypto'),
	bodyParser = require('body-parser'),
	twilio = require('twilio');

var ConnoTwilioServer = function() {

	// First consider commandline arguments and environment variables, respectively.
	nconf.argv().env();

	// Then load configuration from a designated file.
	nconf.file({ file: 'config.json' });

	// Provide default values for settings not provided above.
	nconf.defaults({
	    'http': {
	        'port': 9994,
	        'securePort': 9995
	    }
	});

	var port = nconf.get('http:port');
	var securePort = nconf.get('http:securePort');
	var baseDir = __dirname;
	var app = express();

	app.use(cors());
	app.use(morgan('[:date] :method :url - :response-time'));
	app.use(express.static(baseDir + '/static/app'));
	app.use(express.json());
	app.use(express.cookieParser());
	app.use(express.session({secret: 'monkey'}));


	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())

	// parse application/vnd.api+json as json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

	// Twilio Options
	var accountSid = nconf.get('twilio:accountSid');
	var apiToken = nconf.get('twilio:apiToken');
	var agentRouterAppSid = nconf.get('twilio:agentRouterAppSid');
	var callRouterAppSid = nconf.get('twilio:callRouterAppSid');
	var webRouterAppSid = nconf.get('twilio:webRouterAppSid');
	var cli = nconf.get('twilio:cli');

	// Debug options
	var debug = true;
	var debugResponse = true;
	
	app.post('/debug/on', function(req, res) {
		debug = true;
		debugResponse = true;
		res.send("Debug on");
	});

	app.post('/debug/off', function(req, res) {
		debug = false;
		debugResponse = false;
		res.send("Debug off");
	});

	var debugPrint = function(req) {
		if(!debug) return;
		console.log("Header Parameters");
		for(var item in req.headers) {
   			console.log("\t" + item + ": " + req.headers[item]);
   		}

   		console.log("Body Parameters");
   		console.log(req.body);
	}

	//Twilio request authentication
	app.post('/test/twiml', function(req, res) {
		var resp = new twilio.TwimlResponse();
        resp.say('express sez - hello twilio!');
        res.type('text/xml');
        res.send(resp.toString());
	});


	//Twilio request authentication
	app.post('/test/callrouter', function(req, res) {
		console.log(">> Incoming Twilio request - *TEST* CALL ROUTER");
		debugPrint(req);

		var resp = new twilio.TwimlResponse();
        resp.say('Twilio sez - hello Genesis!');

        res.type('text/xml');
        res.send(resp.toString());

        if(debugResponse) console.log("** TARGET: " + req.body.Called);
	});


	//Calls originating from the web (Twilio PSTN -> Genesys)
	app.post('/pstn/router', function(req, res) {
		console.log(">> Incoming Twilio request - CALL ROUTER");
		debugPrint(req);

		var status = req.body.CallStatus;
   		console.log("Call [" + req.body.CallSid + "] status notification: " + status);

		var resp = new twilio.TwimlResponse();

		// Can also add ;transport=tcp to SIP URI
		resp.dial(function(node) {
            node.sip('sip:8002@69.204.255.92:5060');
    	});

        //resp.say('Twilio sez - hello Genesys!');
        res.type('text/xml');
        res.send(resp.toString());
        if(debugResponse) console.log(resp.toString());
	});


	//Calls originating from Twilio SIP (Twilio SIP -> Genesys)
	app.post('/sip/router', function(req, res) {
		console.log(">> Incoming Twilio request - SIP ROUTER");
		debugPrint(req);

   		var targetURI = req.body.To;
   		var targetDN = targetURI.match(/^([^@]*)@/)[1];

   		var status = req.body.CallStatus;

   		console.log("Call [" + req.body.CallSid + "] status notification: " + status);

   		if(status == 'ringing') {
			var resp = new twilio.TwimlResponse();
			
			// Can also add ;transport=tcp to SIP URI
			resp.dial(function(node) {
	            node.sip(targetDN + '@69.204.255.92:5060');
	    	});

	        //resp.say('Twilio sez - hello Genesys!');
	        res.type('text/xml');
	        res.send(resp.toString());
	        if(debugResponse) console.log(resp.toString());
   		} else {
   			// Completed call notification
   		}
	});


	//Calls originating from the web (Genesys -> Twilio WebRTC Agent)
	app.post('/agent/router', function(req, res) {
		console.log(">> Incoming Twilio request - AGENT ROUTER");
		debugPrint(req);

		var resp = new twilio.TwimlResponse();
		
		// Can also add ;transport=tcp to SIP URI
		resp.dial(function(node) {
            node.client('Christopher');
    	});

        //resp.say('Twilio sez - hello Genesys!');
        res.type('text/xml');
        res.send(resp.toString());
        if(debugResponse) console.log(resp.toString());
	});

	//Authentication token for calls originating from the web (Genesys -> Twilio -> Agent)
	app.get('/agent/auth/:client', function(req, res) {
		console.log(">> Incoming AUTH request");
		debugPrint(req);

		var client = req.params.client;
		var capability = new twilio.Capability(accountSid, apiToken);
		capability.allowClientIncoming(client);
		var token = capability.generate();
		res.send(token);

		console.log("Sending for client [" + client + "] capability token");
	});


	//Calls originating from the web (WebRTC Public -> Genesys)
	app.post('/agent/router', function(req, res) {
		console.log(">> Incoming Twilio request - WEB ROUTER");
		debugPrint(req);

		var resp = new twilio.TwimlResponse();
		
		// Can also add ;transport=tcp to SIP URI
		resp.dial({
			"callerId": cli
		},function(node) {
            node.sip('sip:8001@69.204.255.92:5060');
    	});

        //resp.say('Twilio sez - hello Genesys!');
        res.type('text/xml');
        res.send(resp.toString());
        if(debugResponse) console.log(resp.toString());
	});


	//Authentication token for calls originating from the web (WebRTC Public -> Genesys)
	app.get('/web/auth/:client', function(req, res) {
		console.log(">> Incoming AUTH request");
		debugPrint(req);

		var client = req.params.client;
		var capability = new twilio.Capability(accountSid, apiToken);
		capability.allowClientOutgoing(webRouterAppSid);
		var token = capability.generate();
		res.send(token);

		console.log("Sending for client [" + client + "] capability token");
	});


	var secureOptions = {
    	key: fs.readFileSync('./key.pem'),
    	cert: fs.readFileSync('./cert.pem'),
	};

	secureServer = https.createServer(secureOptions,app);
	secureServer.listen(securePort);

	server = http.createServer(app);
	server.listen(port);

	console.log("Conno Twilio Adapter is running at " + port + " SSL port " + securePort);
}

new ConnoTwilioServer();