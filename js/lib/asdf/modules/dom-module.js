define(['modules/pubsub'],function (ps){
	var ns = {},
		supportedElements = ['DIV', 'SPAN', 'UL', 'LI', 'H1'];

	ns.BodyObject = function(){
		var self = this,
			obj = {},
			internal = {},
			domNodeKeysArr = [],
			propsToAddArr = ['add', 'remove'],
			propFuncObj = new ns.PropFuncObject();

			console.time("test");
			obj.domNodesCollections = new ns.DomNodesCollectionObject();


			//adding functions to the obj in this manner for those that need getter/setters.
			propsToAddArr.forEach(function (v, i, arr){
				Object.defineProperty(obj, v, propFuncObj[v]());
			});

			// add properties that correspond to the those in domNodes

			domNodeKeysArr = Object.keys(obj.domNodesCollections.nodesObj);

			domNodeKeysArr.forEach(function (v, i, arr){
				Object.defineProperty(obj, v, {
					get: function(){
						var domNodes = obj.domNodesCollections.nodesObj[v].domNodes;

						if(domNodes.length > 1){
							return domNodes;	
						}
						return domNodes[0].domNode;
					},
					set: function(val){
						console.log("v: ", v);
					}
				})
			});
			console.timeEnd("test");

		return obj;
	}
	// These could easily be attributes classes. 
	ns.DomNodesCollectionObject = function(){
		var self = this;

		this.nodesObj = {};



		this.populateNodeArr = function(domNodes){
			for (var j = 0; j < domNodes.length; j++) {
				var node = domNodes[j];

				supportedElements.forEach(function (v, i, arr){
					if(v == node.tagName){
						var vlc = v.toLowerCase(),
						nodeObj = new ns.DomNodeObject(node);

						// console.log("nodeObj: ", nodeObj);

						// add properties that correlate to ids
						if(node.id && !self.nodesObj[node.id]){
							self.nodesObj[node.id] = new ns.DomNodesObject(nodeObj);
						}

						// add properties that correlate to classes
						if(node.classList.length){
							// console.log(node.classList);
							for (var k = 0; k < node.classList.length; k++) {
								var className = node.classList[k];
								if(self.nodesObj[className]){
									self.nodesObj[className].domNodes.push(nodeObj);
								} else {
									self.nodesObj[className] = new ns.DomNodesObject(nodeObj);
								}
							};
						}
						// recurse if children exist on current node.
						if(node.children.length){ self.populateNodeArr(node.children)};
					}
				});
			};
		};
		// load the nodesArr
		this.populateNodeArr(document.getElementsByTagName('body')[0].children);

		this.attrType = ''; // might use this to split up attribute type later. 

	}

	ns.DomNodesObject = function(nodes){
		var self = this;

		this.domNodes = [nodes];

		// add CSS style properties here...
		var styleKeys = Object.keys(self.domNodes[0].domNode.style);

		styleKeys.forEach(function (v, i, arr){
			Object.defineProperty(self, v, {
				get: function(){
					if(self.domNodes.length > 1){
						var tempObj = [];

						self.domNodes.forEach(function (v1, i1, arr1){
							tempObj.push({
								domNode : v1.domNode,
								attr: v,
								value: (v1.domNode.style[v] || getComputedStyle(v1.domNode)[v])
							});
						});
						return tempObj;
					} else {
						if(self.domNodes[0].domNode.style[v]){
							return self.domNodes[0].domNode.style[v];
						}
						return getComputedStyle(self.domNodes[0].domNode)[v];
					}
				},
				set: function(val){
					self.domNodes.forEach(function (v1, i1, arr1){
						v1.domNode.style[v] = val;
					});
				}
			})	
		})
		
	}

	ns.DomNodeObject = function(domNode){
		var self = this,
			obj = {},
			styleKeys = Object.keys(domNode.style);

			this.domNode = domNode; // individual domNode
	}

	// Function definitions for the properties that require getters/setters on the BodyObject.
	ns.PropFuncObject = function(data){
		var self = this;

		this.add = function(){
			return {
				get: function(){
					console.log("get add ", this);
				},
				set: function(val){
					console.log("set add", this);
				}
			};
		};

		this.remove = function(){
			return {
				get: function(){
					console.log("get remove");
				},
				set: function(val){
					console.log("set remove");
				}
			};
		};
	}

	return ns;
})