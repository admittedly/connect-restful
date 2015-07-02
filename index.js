var S = require("string");
var pluralize = require("pluralize");

module.exports = function(app, handler){
	return {
		addResource : function(name){
			var resourceName = S("_" + name).camelize().s;

			var router = require("express").Router();

			router.param("id", function(req, res, next, id){
				handler.findById(resourceName, id)
				.then(function(record){
					if(!record) return next();
					req.params[name] = record;
					next();
				})
				.catch(next);
			});

			router.route("/")
			.get(function(req, res, next){
				handler.findAll(resourceName)
				.then(function(records){
					res.json(records);
				})
				.catch(next);
			})
			.post(function(req, res, next){
				handler.create(resourceName, req.body)
				.then(function(record){
					res.json(record);
				})
				.catch(next);
			});

			router.route("/:id")
			.get(function(req, res, next){
				res.json(req.params[name]);
			})
			.put(function(req, res, next){
				handler.update(resourceName, req.params.id, req.body)
				.then(function(record){
					res.json(record);
				})
				.catch(next);
			})
			.delete(function(req, res, next){
				handler.destroy(resourceName, req.params.id)
				.then(function(record){
					res.json(record);
				})
				.catch(next);
			});

			app.use("/" + pluralize(name), router);
		}
	};
};