'use strict';
var msgs = [];
var G = jsnx.Graph();
var firstTime = true;
// Declare app level module which depends on views, and components
var myApp = angular.module("myApp", []);
	var nodeMatrix = [[]];
	var edges = null;
myApp.controller('TrainController', ['$scope','graphMatrix', function($scope,graphMatrix) {
	 	$scope.result = 'thinking';
 		$scope.train = function(value) {
 			$scope.result =graphMatrix(value);
 			
 			
		};
 		
 			

}]);

myApp.controller('DoubleController', ['$scope','notify', function($scope,notify) {
	 
 		$scope.double = function(value) {
 			
			
			notify(value);
			return true;
		};
 		
 			

}]);
myApp.controller('EdgeController', ['$scope','edgeAdd', function($scope,edgeAdd) {
	 
 		$scope.edge = function(msg1,msg2) {
 			
			
			edgeAdd(msg1,msg2);
			return true;
		};
 		
 			

}]);
myApp.controller('DataController', ['$scope','notify', function($scope,dataAddTo) {
	 
 		$scope.addData = function(msg1,msg2) {
 			
			
			dataAddTo(msg1,msg2);
			return true;
		};
 		
 			

}]);
myApp.factory('edgeAdd', ['$window', function(win) {
 
    return function(msg1,msg2) {
    
     
   
			
			//for(var )				
 			G.add_edge(msg1,msg2);

				var color = 'd3.scale.category20()';
				jsnx.draw(G, {
				    element: '#chart3',
				    with_labels:true,
				    height: 500, 
				    layout_attr: {
				        charge: -120,
				        linkDistance: 20
				    },
				    node_attr: {
				        r: 5,
				        title: function(d) { return d.label;}
				    },
				    node_style: {
				        // fill: function(d) { 
				        //     return color(d.data.group); 
				        // },
				        // stroke: 'none'
				    },
				    edge_style: {
				        stroke: '#999'
				    }
				}, true);
			
      
    };
  }]);


myApp.factory('graphMatrix', ['$window', function(win) {
 
    return function(msg1) {
    		
			if(firstTime){
				edges = G.edges();
 			var nodes =G.nodes();
				console.log("FIRST TIME");
			for(var i =0; i < edges.length;i++){
				edges[i].push(Math.random());
				
			}
			//construct node mapping
		
			for(var i=0; i < nodes.length; i++){
				nodeMatrix.push([nodes[i],0]);
			}
			//construct edge list
			nodeMatrix.shift();
				nodeMatrix[0][1]=1;
			nodeMatrix[1][1]=1

				firstTime= false;
			}
			console.log("Edges : " +edges);
				console.log("Nodes : " +nodeMatrix);
			//Perform a foward pass on the network
		

			for(var i =0; i < nodeMatrix.length; i ++){
				for (var j=0; j< edges.length; j++){
					if(edges[j][1] ===nodeMatrix[i][0]){
						//console.log("hello" + i+ "  " +edges[j][2]+ "  " +nodeMatrix[edges[j][0]][1]);

						nodeMatrix[i][1]=edges[j][2]*nodeMatrix[edges[j][0]][1];
					}
				}
			}

			//console.log(nodeMatrix[nodeMatrix.length-1][1]);
			//backpropogation
			var error =  nodeMatrix[nodeMatrix.length-1][1]*(1-nodeMatrix[nodeMatrix.length-1][1])*(1-nodeMatrix[nodeMatrix.length-1][1]);
			console.log(error);
			for(var i =0; i < nodeMatrix.length; i ++){
				for (var j=0; j< edges.length; j++){
					if(edges[j][1] ===nodeMatrix[i][0]){
						//console.log("hello" + i+ "  " +edges[j][2]+ "  " +nodeMatrix[edges[j][0]][1]);

						edges[j][2]+= error *nodeMatrix[edges[j][1]][1];
					}
				}
			}
			console.log(nodeMatrix[nodeMatrix.length-1][1]);
			return nodeMatrix[nodeMatrix.length-1][1];
     
   
			
			
			
      
    };
  }]);


myApp.factory('notify', ['$window', function(win) {

    return function(msg) {
     
 				
 			G.add_node(msg);

				var color = d3.scale.category20();
				jsnx.draw(G, {
				    element: '#chart3',
				    with_labels:true,
				    height: 500, 
				    layout_attr: {
				        charge: -120,
				        linkDistance: 20
				    },
				    node_attr: {
				        r: 5,
				        title: function(d) { return d.label;}
				    },
				    node_style: {
				        // fill: function(d) { 
				        //     return color(d.data.group); 
				        // },
				        // stroke: 'none'
				    },
				    edge_style: {
				        stroke: '#999'
				    }
				}, true);
			
      
    };
  }]);
myApp.factory('dataAddTo', ['$window', function(win) {

    return function(msg1,msg2) {
     
 				
 			G.node.get(msg1).data = msg2;

				
			
      
    };
  }]);