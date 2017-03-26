# MMM-Voice-Control
Magic Mirror Module - Voice Control

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror) to allow use of voice commands. Currently it is a very minimal module with support only for [MMM-Dublin-Bus](https://github.com/dr4ke616/MMM-Dublin-Bus)

## Installation
1. Navigate into your MagicMirror's `modules` folder
2. Execute `git clone https://github.com/dr4ke616/MMM-Voice-Control.git`
3. Execute `npm install` in that folder to download external libraries
4. Navigate back to MagicMirror's root directory
5. Start magic mirror

## Supported Commands:

- Go to sleep
- Wake up
- Dublin bus

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```javascript
modules: [
    {
        module: 'MMM-Voice-Control',
        position: 'lower_third', // If you want to see the prompt and recognised speech, omit otherwise
        config: {
            // See 'Configuration options' for more information.
        }
    }
]
```

## Configuration Options

The following properties can be configured:

| Option 							| Default 	| Description 																																								|
|-----------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`language`							| `en`		|The language used.																																							|
|`voiceTextRestTimeout`				| `3000`	|Tell the module to restart its listening process. Lower the value means it could reset mid sentence. Higher, means it could take longer time between each speech attempt.	|
|`listOfCommandsNotificationTime` 	| `10000`	|The time in which the "list of commands" notification will be displayed on screen.																							|

## Extending

Its quite simple to add more custom commands.

- Add the extra needed local values to any of the files in the `MMM-Voice-Control/translations/`.
- The behaviour can then be defined in the `MMM-Voice-Control/commands.js` file. It is recommended to interface with other modules using MagicMirror's default alert module.
