Module.register("voicecontrol", {

	// Default module config.
	defaults: {
		language: "en",
		restTimeout: 3000
	},

	getScripts: function() {
		return ['annyang.js', 'annyang-service.js', 'moment.js', 'commands.js']
	},

	// Define required scripts.
	getStyles: function() {
		return ["style.css"];
	},

	getTranslations: function() {
		return {
			en: "translations/en.json",
			de: "translations/de.json",
			de: "translations/es.json",
			de: "translations/fr.json",
			de: "translations/ko.json"
		}
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

		CommandManager(this)

		this.startAnnayang();
	},

	registerCommand: function(commandId, commandFunction) {
		var voiceTranslation = Translator.translations.voicecontrol.commands[commandId].voice;
		var textTranslation = Translator.translations.voicecontrol.commands[commandId].text;
		var descTranslation = Translator.translations.voicecontrol.commands[commandId].description;
		this.annyangService.registerCommand(voiceTranslation, commandFunction);
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
				Log.info("Interim result: " + self.interimResult)
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
