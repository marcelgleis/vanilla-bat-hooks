'use strict';

class Hooks {

    constructor() {
        this.hookActionsMap = [];
    }

    register(hookName, actionName, callback) {
        let isNotInternal = !hookName.startsWith('hooks_');

        let actionDef = {
            "hookName": hookName,
            "actionName": actionName,
            "callback": callback
        };

        isNotInternal && this.execute.call(this, 'hooks_action_register', actionDef);
        this.hookActionsMap.hasOwnProperty(hookName) || (this.hookActionsMap[hookName] = []);
        this.hookActionsMap[hookName].push(actionDef);
    }

    execute(hookName, value, ...args) {
        let isNotInternal = !hookName.startsWith('hooks_');
        let result = value;

        isNotInternal && this.execute.call(this, 'hooks_actions_execute', ...arguments);

        if (!this.hookActionsMap.hasOwnProperty(hookName))
            return;

        let argsWithoutHookName = Array.from(arguments);
        argsWithoutHookName.shift();

        let actions = this.hookActionsMap[hookName];
        for (var i = 0; i < actions.length; i++) {
            let actionDef = actions[i];

            isNotInternal && this.execute.call(this, 'hooks_action_execute', actionDef, argsWithoutHookName);
            result = actionDef.callback.apply(this, argsWithoutHookName);
            isNotInternal && this.execute.call(this, 'hooks_action_executed', actionDef, result, argsWithoutHookName);

            argsWithoutHookName[0] = result;
        }

        isNotInternal && this.execute.call(this, 'hooks_actions_executed', ...arguments);

        return result;
    }
}

if (typeof module !== "undefined")
    module.exports = Hooks;
