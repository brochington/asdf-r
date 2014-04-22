/*
// init block to create global asdf object. 
TODO: 

*/

require(
	[	
		'polyfills',
		'modules/pubsub',
		'modules/asdf-module',
		'modules/data-bind-module'
	], function (polyfill, ps, ASDF, dataBind){

	window.asdf = new ASDF();
});