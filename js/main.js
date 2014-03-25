console.log("main.js, yo");


/*
// The window onload section makes sure that the asdf object is 
// created before continuing the start sequence.
*/
window.onload = function startItUp(){
	console.log("startItUp!");

	if(window.asdf){
		continueStartup();
	} else{
		console.log("not yet...");
		window.setTimeout(function(){
			startItUp();
		}, 20);
	}


	//
	function continueStartup(){
		console.log("continueStartup");
	}
}