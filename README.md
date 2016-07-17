# MMM-Voice-Control
Magic Mirror Module - Voice Control

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror) to allow use of voice commands. Currently it is a very minimal module with support only for [MMM-Dublin-Bus](https://github.com/dr4ke616/MMM-Dublin-Bus)

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute 

```bash
git clone https://github.com/dr4ke616/MMM-Voice-Control.git
```

2. Execute `npm install` to install the node dependencies.
4. Start magic mirror

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
        config: {
            // See 'Configuration options' for more information.
        }
    }
]
```

## Configuration Options

- Set the `language`, default is set to `en`
- Setting the `voiceTextRestTimeout` in milliseconds will tell the module to restart its listening process. Lower the value means it could reset mid sentence. Higher, means it could take longer time between each speech attempt. Default is set to 3 seconds.
- `listOfCommandsNotificationTime` in milliseconds is the time in which the *list of commands* notification will be displayed on screen. Default is set to 10 seconds.

## Extending

Its quiet simple to add more custom commands. 

- Add the extra needed local values to any of the files in the `MMM-Voice-Control/translations/`.
- The behaviour can then be defined in the `MMM-Voice-Control/commands.js` file. It is recommended to interface with other modules using Smart Mirror's default alert module. 
