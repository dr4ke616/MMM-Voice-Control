
function CommandManager(scope) {

	scope.registerCommand('list', function() {
		console.debug("Here is a list of commands...");
		console.log(scope.annyangService.commands);
	})

	scope.registerCommand('home', function() {
		console.debug("Ok, going to default view...");
	})

	scope.registerCommand('sleep', function() {
		MM.getModules().enumerate(function(module) {
			module.hide(1000);
		});
	})

	scope.registerCommand('wake_up', function() {
		MM.getModules().enumerate(function(module) {
			module.show(1000);
		});
	})

}
