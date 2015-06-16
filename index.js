var pluralize = require("pluralize");

module.exports = function(app){
	return {
		addResource : function(name){
			app.use("/" + pluralize(name), function(req, res, next){
				res.sendStatus(200);
			});
		}
	};
};