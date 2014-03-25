/*
// init block to create global asdf object. 
TODO: 

*/

require(['pubsub'], function (pubsub){
	console.log("require is here!");

	// establish asdf global variable
	window.asdf = { snark: "snarky"};
});