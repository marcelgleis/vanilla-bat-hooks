# /\\^._.^/\ vanilla-bat-hooks ⤖ 

Make your software extensible by Hooks with this ultra-lightweight javascript library.

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
(like a bat) scripts with less than 1kb zipped written in good old plain JavaScript 
(also called VanillaJS).
These can be used without any package manager by just including the javascript directly
via unpkg or by using npm if desired.

## How to install

### Direct usage via CDN / unpkg

    <script src="https://www.unpkg.com/vanilla-bat-hooks"></script>
    <script>
        let hooks = new Hooks();
        hooks.register('welcome', 'Action example', function() { console.log('hello'); });
        hooks.execute('welcome'); // output: hello
    </script>

### npm

Installation

    npm i vanilla-bat-hooks

Usage

    const Hooks = require('vanilla-bat-hooks');
    
    var hooks = new Hooks();
    hooks.register('welcome', 'Action example', function() { console.log('hello'); });
    hooks.execute('welcome'); // output: hello

## How to use

The class Hooks offers only two methods:

- `register(string hookName, string actionName, Closure callback)`

    Register your custom action named `actionName` with the callback `callback` which shall be executed
    when the hook `hookName` is executed.


- `execute(string hookName, any value, any ...args)`

    Executes all the previously registered actios for the hook `hookName`. The optional arguments `value`
    and `...args` are provided as arguments to the action callback functions. 

    If your Closue wants to manipulate some data, you can return a calculation from your Closue, which is
    then handed over to the next Action Closure.



## Real World Example

### Example 1: International Fee for E-Commerce Cart

Imagine you've developed a Cart in you app. Now a new business requirement has emerged: 
Each shopping cart should have an entry "10% International Fee". In the following example, 
this is achieved by the fact that we want to extend the addition of an cart item with a hook. 
After each added cart item we want to make sure that the intenational fee is calculated and added.

    class Cart {

        constructor(hooks) {
            this.hooks = hooks;
            this.items = [];
        }
        addItem(description, price) {
            let item = {
                "description": description,
                "price": price
            };
            this.items.push(item);
            this.hooks.execute('cart.item_added', item);        // CUSTOM HOOK
        }
        removeItem(description) {
            // find item with matching description and remove it
        }
        totalSum() {
            let sum = 0;
            for (let i = 0; i < this.items.length; i++) {
                sum += this.items[i].price;
            }
            return sum;
        }
    }

We can extend the code as follows to add the international fee.

    hooks.register('cart.item_added', 'Add International Fee', function(item) {
        let feeId = 'International Fee';
        if (item.description != feeId) {
            cart.removeItem(feeId);
            cart.addItem(feeId, Math.round(100 * cart.totalSum() * 0.1) / 100);
        }
    });

That code ensures that there is always an item with the international fee.


### Example 2: Individualization of product features

Imagine you run an e-commerce store and sell many different products with different 
product features (such as size, color, shape). Instead of hard-coding UI elements 
for all possible product features, you decide to take a dynamic approach with hooks.

> TODO


## Extensibility
On the one hand vanilla-bat-hooks contains only the bare minimum of functionalty, 
but on the other hand it uses the Hooks mechanism itself to make itself extensible.

The following Hooks are executed when using this library:

| Hook                   | Description                                           |
|------------------------|-------------------------------------------------------|
| hooks_action_register  | Before a hook is registered                           |
| hooks_actions_execute  | Before all the actions for a hook are executed        |
| hooks_action_execute   | Before an action is executed                          |
| hooks_action_executed  | Afer an action is executed                            |
| hooks_actions_executed | After all the actions for a hook were executed |

> TODO document all provided parameters

This opens a lot of options for customization of this library (see next chapter).

## vanilla-bat-hooks-debugger: A Debugger project

Hooks promote the separation of concerns with the disadvantage of more difficult 
traceability. If you want to use this library, you should use the debugger 
project vanilla-bat-hooks-debugger at development time.

The debugger project contains different debuggers which make all the hooks definitions
and action executions visible. This makes it easy to hunt down bugs in distributed code
locations or make performance issues visible.

See https://github.com/marcelgleis/vanilla-bat-hooks-debugger

