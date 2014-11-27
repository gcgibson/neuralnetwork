
var trycatch = require('trycatch');
var hello = require('./hello.js');
var hellonew = require('./hellonew.js');
var fs = require('fs');

trycatch(function() {
	
  hello.f('hello');
}, function(err) {
  console.log("Error ------>" + err.stack);
  //console.log(err);
    // assign a new definition to f:
   
    
   
   	
   	function readDaFile(callback){
	   	fs.readFile('./hello.js', 'utf8', function (err,data) {
		 
		

		  callback(null,data);
		});
	}

	readDaFile(function (err, content) {
			var array = content.split('\n');
			console.log(array);
			for(var i =0; i <array.length; i++){
				if(array[i].indexOf('asdlog')>-1){
					array[i]='var f = function (x) {console.log(x)};';
				}
			}
			var energy = array.join(" \n ");
    		fs.writeFile('./hellonew.js', energy, function (err) {
	  if (err) {
	     console.log(err);
	  }

	  		hellonew.f('hello');
	})
	
	 


	});




})
 	
