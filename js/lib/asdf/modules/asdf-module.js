/*
Object that is created, and attached to window as the only global variable. 
*/

define((function(){
	return [
		'modules/data-bind-module',
		'modules/dom-module',
		'modules/pubsub',
		'helpers'
	]
})(), function (db, dom, ps, _){

	var ASDF = function(){
		this.DataBindObject = function(){ return new db.DataBindObject(); };
		this.BodyObject = function(){return new dom.BodyObject(); };
		this._ = _;
		this.pubsub = ps;
	}

	return ASDF;
});