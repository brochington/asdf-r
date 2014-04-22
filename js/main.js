/*
// The window onload section makes sure that the asdf object is 
// created before continuing the start sequence.
// This will most likely go away once the everything is compiled/minified.
*/
window.onload = function startItUp(){

	if(window.asdf){
		continueStartup();
	} else{
		window.setTimeout(function(){
			startItUp();
		}, 20);
	}


	// place everything that you want to run after the asdf object is created here...
	function continueStartup(){

		var ns = {};

		window.d = new asdf.BodyObject();
		window.a = new asdf.DataBindObject();

		window.NS = ns;


		var tempEvent = new CustomEvent('testEvent');

		a.newVar("test", "This is a test");

		a.newVar("test2", "Another Test");

		a.newVar("test3", "Just one more Test");

		// a.test = a.test2;
	}
}