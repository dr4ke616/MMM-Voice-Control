Module.register("voicecontrol", {

	// Default module config.
	defaults: {
		language: "en",
		restTimeout: 3000
	},

	getScripts: function() {
		return ['annyang.js', 'annyang-service.js', 'moment.js']
	},

	// Define required scripts.
	getStyles: function() {
		return ["style.css"];
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "small light";
		wrapper.innerHTML = this.interimResult;
		return wrapper;
	},

	restCommand: function(scope) {
		scope.interimResult = "Say Something...";
		scope.updateDom();
	},

	start: function() {
		Log.info("Starting module: " + this.name);

		// Set locale.
		moment.locale(config.language);

		this.annyangService = AnnyangService();
		this.isListening = false;
		this.interimResult = "Say Something...";

		this.registerCommands();
		this.startAnnayang();
	},

	registerCommands: function() {
		this.annyangService.addCommand('what can I say', function() {
			Log.info("I ma here±!")
		})
	},

	startAnnayang: function() {
		var self = this
		var resetCommandTimeout;
		this.annyangService.start(
			function(){
				self.isListening = true;
			},
			function(interimResult){
				self.interimResult = interimResult;
				window.clearTimeout(resetCommandTimeout);
				Log.info("Interim result " + self.interimResult)
				self.updateDom()
			},
			function(result){
				if(typeof result != 'undefined'){
					self.interimResult = result[0];
					resetCommandTimeout = window.setTimeout(function() {
						self.restCommand(self)
					}, self.config.restTimeout);
				}
			},
			function(error){
				console.log(error);
				if(error.error == "network"){
					self.speechError = "Google Speech Recognizer is down :(";
					self.annyangService.abort();
					self.isListening = false;
				}
			}
		);
	},
});
