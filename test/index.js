var demand = require("must");
var request = require("supertest");
var express = require("express");

var Restful = require("../");

describe("connect-restful", function(){
	it("must require the module", function(){
		Restful.must.exist();
	});

	it("must add all routes for resource", function(done){
		var app = express();

		var restful = Restful(app);

		restful.addResource("user");

		app.use(function(req, res){
			done();
		});

		app.use(function(err, req, res, next){
			done(err);
		});

		request(app)
		.get("/users")
		.expect(200)
		.end(done);
	});
});