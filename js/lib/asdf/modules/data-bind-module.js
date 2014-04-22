define(['modules/pubsub'],function (ps){
	var ns = {};

	ns.InternalDataBindObj = function(){
		this.VariableSetFunctions = {
			string : function(val){
				console.log("it's a string!");
				console.log("val: ", val);
				console.log(this);
			},
			function: function(val){
				console.log("it's a function!");
				console.dir(val);
			},
			integer: function(val){
				console.log("it's a integer!");
				console.log("val: ", val);
			},
			object: function(val){
				console.log("it's an object!");
				console.dir(val);
			}
		}
	}

	ns.determineVarType = function(varValue){
		if(typeof varValue == 'function'){
			return 'function';
		}
		console.log("varValue: ",varValue);
		// console.dir(varValue.prototype);
		return 'standard';
	}

	ns.DataBindObject = function(){
		var self = this;

		this.__internal = new ns.InternalDataBindObj();

		this.newVar = function(varName, varValue){
			//create and initialize the internal object, that will store values of liveVariables

			// Add logic to determine what type of liveVar to use.
			var varType = ns.determineVarType(),
				self = this,
				liveVar = new ns.LiveVariable(varName, varValue, varType);

			//Add to the topics of pubsub
			ps.addToTopics(varName);

			Object.defineProperty(self.__internal, varName,{
				value: liveVar
			});
			self.__internal[varName] = liveVar;
			// define the liveVariable properties on the main DataBindObject.
			Object.defineProperty(self, varName, {
				get: function(){
					return self.__internal[varName];

				},
				set: function(val){
					console.log("set var");
					// console.log("typeof: ", typeof val);

					var internalObj = self.__internal[varName];

					// console.log(internalObj);

					internalObj.setVar(val);

					// self.__internal[varName].metaVal = val;
					ps.publish(varName);
				}
			})
		}
	}

	ns.LiveVariable = function(varName, varValue, varType){

		var tempFunc = function(){
			return tempFunc.metaVal;
		};

		Object.defineProperty(tempFunc, "metaVal", {
			get: function(){
				console.log("get metaVal");
				console.log(this.internalMetaVal);
				return this.internalMetaVal;
			},
			set: function(val){
				console.log("set metaVal");
				// tempFunc.internalMetaVal = val;
				this.setVar(val);
			}
		});

		tempFunc.internalMetaVal = varValue;
		tempFunc.previousVal = null;
		tempFunc.currentVal = varValue;
		tempFunc.metaID = varName;
		tempFunc.varType = varType;
		tempFunc.specialVarType = null;

		tempFunc.setVar = function(val){
			console.log("setVar: ", val);

			/*Update val properties*/
			this.previousVal = this.internalMetaVal;
			this.previousVarType = this.varType;
			this.currentVal = val;
			this.internalMetaVal = val;
			this.varType = val.varType || typeof this.currentVal;

			if(this.varType === 'function' ){
				console.log("feeding a function!!!!");
			}
		};

		return tempFunc;
	}


	
	return ns;

});