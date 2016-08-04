
function CommandManager(scope) {

	scope.registerCommand('list', function() {
		scope.sendNotification("SHOW_ALERT", {
			title: "",
			message: scope.readableCommands.commands.join("</p><p>"),
			timer: scope.config.listOfCommandsNotificationTime
		});
	});

	scope.registerCommand('sleep', function() {
		MM.getModules().enumerate(function(module) {
			module.hide(1000);
		});
	});

	scope.registerCommand('wake_up', function() {
		MM.getModules().enumerate(function(module) {
			module.show(1000);
		});
	});

	scope.registerCommand('dublinbus_start', function() {
		scope.sendNotification("DUBLINBUS_START");
	});

	scope.registerCommand('dublinbus_stop', function() {
		scope.sendNotification("DUBLINBUS_STOP");
	});
}
