Module.register("MMM-Voice-Control", {

	// Default module config.
	defaults: {
		language: "en",
		voiceTextRestTimeout: 3000, // 3 seconds
		listOfCommandsNotificationTime: 10000 // 10 seconds
	},

	getScripts: function() {
		return [this.file('node_modules/annyang/annyang.js'), 'annyang-service.js', 'moment.js', 'commands.js'];
	},

	// Define required scripts.
	getStyles: function() {
		return ["style.css"];
	},

	getTranslations: function() {
		return {
			en: "translations/en.json",
			de: "translations/de.json",
			es: "translations/es.json",
			fr: "translations/fr.json",
			ko: "translations/ko.json"
		};
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "small light";
		wrapper.innerHTML = this.interimResult;
		return wrapper;
	},

	restCommand: function(scope) {
		scope.interimResult = Translator.translate(this, "home").commands;
		scope.updateDom(500);
	},

	setLanguage: function() {
		moment.locale(config.language);
		this.annyangService.setLanguage(config.language);
		this.interimResult = Translator.translate(this, "home").commands;
	},

	start: function() {
		Log.info("Starting module: " + this.name);

		this.annyangService = AnnyangService();
		this.isListening = false;
		this.setLanguage();
		this.readableCommands = {
			header: this.interimResult,
			commands: []
		};

		CommandManager(this);

		this.startAnnayang();
	},

	registerCommand: function(commandId, commandFunction) {
		var voiceTranslation = Translator.translate(this, "commands")[commandId].voice;
		var textTranslation = Translator.translate(this, "commands")[commandId].text;
		var descTranslation = Translator.translate(this, "commands")[commandId].description;
		this.readableCommands.commands.push(textTranslation + ": " + descTranslation);
		this.annyangService.registerCommand(voiceTranslation, commandFunction);
	},

	startAnnayang: function() {
		var self = this;
		var resetCommandTimeout;
		self.annyangService.start(
			function() {
				self.isListening = true;
			},
			function(interimResult) {
				self.interimResult = interimResult;
				window.clearTimeout(resetCommandTimeout);
				Log.info("Interim result: " + self.interimResult);
				self.updateDom(500);
			},
			function(result) {
				if (typeof result != 'undefined') {
					self.interimResult = result[0];
					Log.info("Acting on result: " + self.interimResult);
					self.updateDom(500);
					resetCommandTimeout = window.setTimeout(function() {
							self.restCommand(self);
						},
						self.config.voiceTextRestTimeout
					);
				}
			},
			function(error) {
				console.log(error);
				if (error.error == "network") {
					self.speechError = "Google Speech Recognizer is down :(";
					self.annyangService.abort();
					self.isListening = false;
				}
			}
		);
	},
});
