var S = require("string");
var pluralize = require("pluralize");

module.exports = function(app, handler){
	return {
		addResource : function(name){
			app.use("/" + pluralize(name), function(req, res, next){
				handler.findAll(S("_" + name).camelize().s)
				.then(function(records){
					res.json(records);
				})
				.catch(next);
			});
		}
	};
};