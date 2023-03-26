# /\\^._.^/\ vanilla-bat-hooks ⤖ 

A ultra-lightweight Hooks Library written in vanilla javascript which allows you 
to make your software extensible.

The idea is based on the popular hook mechanism of the content management
system WordPress and implements both Actions and Filters with a unified interface:

    let hooks = new Hooks();

    // An action takes the information it receives, does something with it, 
    // and returns nothing. In other words, it executes something and then 
    // terminates without returning anything to the calling hook.
    hooks.register('welcome', 'Action example', function() { console.log('hello'); });

    hooks.execute('welcome'); // output: hello

    // A filter takes the information it receives, changes it somehow, 
    // and returns it. In other words, it filters something and returns it 
    // to the hook for further use. 
    hooks.register('modify', 'multiply by 2', function(value) { return value * 2; });
    hooks.register('modify', 'add 10', function(value) { return value + 10; });

    let v = hooks.execute('modify', 3);
    console.log(v); // output: 16

See chapter "Real World Examples" for more examples.

## __/\\^._.^/\ vanilla-bat-* series__
This library is part of the vanilla-bat-* series which contain only ultra-lightweight
(like a bat) scripts written in good old plain JavaScript (also called VanillaJS).
These can be used without any package manager by just including the javascript directly
via unpkg or by using npm if desired.

## How to install

### Direct usage via CDN / unpkg

> TODO

### npm

    const Hooks = require('./hooks');

    var hooks = new Hooks();
    hooks.register('welcome', 'Action example', function() { console.log('hello'); });
    hooks.execute('welcome'); // output: hello

## Real World Example

> TODO Cart Example


## Extensibility
On the one hand vanilla-bat-hooks contains only the bare minimum of functionalty, but on the other hand it uses the Hooks mechanism itself to make itself extensible.

The following Hooks are executed when using this library:

| Event                      | Description                                           |
|----------------------------|-------------------------------------------------------|
| hooks_action_register      | Before a hook is registered                           |
| hooks_actions_execute      | Before all the actions for a hook are executed        |
| hooks_action_execute       | Before an action is executed                          |
| hooks_action_executed      | Afer an action is executed                            |
| hooks_actions_executed     | After all the actions for a hook were executed |

> TODO document all provided parameters

This opens a lot of options for customization of this library (see next chapter).

## vanilla-bat-hooks-debugger: A Debugger project

Hooks promote the separation of concerns with the disadvantage of more difficult 
traceability. If you want to use this library, you should use the debugger 
project vanilla-bat-hooks-debugger at development time.

The debugger project contains different debuggers which make all the hooks definitions
and action executions visible. This makes it easy to hunt down bugs in distributed code
locations or make performance issues visible.

> TODO: Add external Link to the project.

