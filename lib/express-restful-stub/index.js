var Promise = require("bluebird");

module.exports = function(models){
	var stub = {};

	stub.findById = function(model, id){
		if(!models[model]) return Promise.reject();
		return Promise.resolve({});
	};

	stub.findOne = function(model, options){
		if(!models[model]) return Promise.reject();
		return Promise.resolve({});
	};

	stub.findAll = function(model, options){
		if(!models[model]) return Promise.reject();
		return Promise.resolve([]);
	};

	return stub;
};