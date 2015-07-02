var demand = require("must");
var request = require("supertest");
var express = require("express");

var Restful = require("../");
var Stub = require("../lib/express-restful-stub");

describe("connect-restful", function(){
	it("must require the module", function(){
		Restful.must.exist();
	});

	describe("basic routes", function(){
		before(function(){
			var app = express();

			var handler = Stub({User : {}});

			var restful = Restful(app, handler);

			restful.addResource("user");

			app.use(function(err, req, res, next){
				done(err);
			});

			this.app = app;
		});

		it("must add INDEX route for resource", function(done){
			request(this.app)
			.get("/users")
			.expect(200)
			.end(function(err, res){
				if(!!err) console.error(err);
				demand(err).not.exist();
				res.body.must.be.an.array();
				done();
			});
		});

		it("must add GET route for resource", function(done){
			request(this.app)
			.get("/users/1")
			.expect(200)
			.end(function(err, res){
				if(!!err) console.error(err);
				demand(err).not.exist();
				res.body.must.be.an.object();
				done();
			});
		});

		it("must add POST route for resource", function(done){
			var newUser = {};

			request(this.app)
			.post("/users")
			.send(newUser)
			.expect(200)
			.end(function(err, res){
				if(!!err) console.error(err);
				demand(err).not.exist();
				res.body.must.be.an.object();
				done();
			});
		});

		it("must add PUT route for resource", function(done){
			var updateAttributes = {};

			request(this.app)
			.put("/users/1")
			.send(updateAttributes)
			.expect(200)
			.end(function(err, res){
				if(!!err) console.error(err);
				demand(err).not.exist();
				res.body.must.be.an.object();
				done();
			});
		});

		it("must add DELETE route for resource", function(done){
			request(this.app)
			.delete("/users/1")
			.expect(200)
			.end(function(err, res){
				if(!!err) console.error(err);
				demand(err).not.exist();
				res.body.must.be.an.object();
				done();
			});
		});
	});
});