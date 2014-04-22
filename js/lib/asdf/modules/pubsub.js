define(function (require){
	var ns = {},
		topics = {},
		uid = 0;

	ns.addToTopics = function(name, callback){
		console.log("addToTopics");
		topics[name] = [];

		if(callback){ callback(); };
	};

	ns.publish = function(name){
		console.log("publish");
		var subscribers = topics[name];

		for (var i = 0; i < subscribers.length; i++) {
			subscribers[i].functionToCall(/*figure out what is needed for arguments*/);
		};
	};

	ns.subscribe = function(name, functionToCall){
		console.log("subscribe");
		var token = ++uid;

		topics[name].push({
			token: token,
			functionToCall: functionToCall,
			name: name
		});

		return token;
	};

	ns.getTopics = function(){
		return topics;
	};

	ns.updateSubscribers = function(){

	}

	return ns;
});
