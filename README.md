# MMM-Voice-Control
Magic Mirror Module - Voice Control

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror) to allow use of voice commands. Currently it is a very minimal module with support only for [MMM-Dublin-Bus](https://github.com/dr4ke616/MMM-Dublin-Bus)

## Installation
1. Navigate into your MagicMirror's `modules` folder
2. Execute `git clone https://github.com/dr4ke616/MMM-Voice-Control.git`
3. Navigate back to MagicMirror's root directory
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
        position: 'lower_third', // If you want to see the prompt and recognised speech, omit otherwise
        config: {
            // See 'Configuration options' for more information.
        }
    }
]
```

## Configuration Options

The following properties can be configured:

<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

		<tr>
			<td><code>language</code></td>
			<td>The language used.<br>
				<br><b>Example:</b> <code>en</code>
				<br><b>Default value:</b> <code>en</code>
			</td>
		</tr>

		<tr>
			<td><code>voiceTextRestTimeout</code></td>
			<td>Tell the module to restart its listening process. Lower the value means it could reset mid sentence. Higher, means it could take longer time between each speech attempt.<br>
				<br><b>Possible Values:</b> <code>int</code> value
				<br><b>Default value:</b> <code>3000</code> (3 seconds)
			</td>
		</tr>

		<tr>
			<td><code>listOfCommandsNotificationTime</code></td>
			<td>The time in which the "list of commands" notification will be displayed on screen.<br>
				<br><b>Possible Values:</b> <code>int</code>, <code>float</code> value
				<br><b>Default value:</b> <code>10000</code> (10 seconds)
			</td>
		</tr>

	</tbody>
</table>

## Extending

Its quite simple to add more custom commands. 

- Add the extra needed local values to any of the files in the `MMM-Voice-Control/translations/`.
- The behaviour can then be defined in the `MMM-Voice-Control/commands.js` file. It is recommended to interface with other modules using MagicMirror's default alert module. 
