
function AnnyangService(root) {
	var service = {};

	// COMMANDS
	service.commands = {};

	service.mergeRecursive = function(obj1, obj2) {
		for (var p in obj2) {
			try {
				// Property in destination object set; update its value.
				if ( obj2[p].constructor==Object ) {
					obj1[p] = MergeRecursive(obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}
			} catch(e) {
				// Property in destination object not set; create it and set its value.
				obj1[p] = obj2[p];
			}
		}
		return obj1;
	}

	service.registerCommand = function(phrase, callback) {
		var command = {};

		// Wrap annyang command in scope apply
		command[phrase] = function(arg1, arg2) {
			callback(arg1, arg2);
		};

		service.mergeRecursive(service.commands, command);

		// Add the commands to annyang
		annyang.addCommands(service.commands);
		console.debug('added command "' + phrase + '"', service.commands);
	};

	service.setLanguage = function(langCode) {
		annyang.setLanguage(langCode);
	};

	service.start = function(onListeningStarted, interimResult, result, error) {
		annyang.debug(true);
		// add specified callback functions
		if (typeof(onListeningStarted) == "function") {
			annyang.addCallback('start', function(){ onListeningStarted(true); });
			annyang.addCallback('end', function(data){ console.log("End", data) });
		};
		if (typeof(interimResult) == "function") {
			annyang.addCallback('interimResult', function(data){ interimResult(data); });
		};
		if (typeof(result) == "function") {
			annyang.addCallback('result', function(data){ result(data); });
		};
		if (typeof(error) == "function") {
			annyang.addCallback('error', function(data){ error(data); });
		};
		annyang.start();
	};

	service.abort = function(){
		annyang.abort();
	}

	return service;
}
