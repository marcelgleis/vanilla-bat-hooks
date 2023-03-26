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
        this.hookActionsMap[hookName] = this.hookActionsMap[hookName] || [];
        this.hookActionsMap[hookName].push(actionDef);
    }

    execute(hookName, value, ...args) {
        let isNotInternal = !hookName.startsWith('hooks_');
        let result = value;

        isNotInternal && this.execute.call(this, 'hooks_actions_execute', ...arguments);

        let actions = this.hookActionsMap[hookName] || [];
        for (var i = 0; i < actions.length; i++) {
            let actionDef = actions[i];

            let argsWithoutHookName = Array.from(arguments);
            argsWithoutHookName.shift();

            isNotInternal && this.execute.call(this, 'hooks_action_execute', actionDef, argsWithoutHookName);
            result = actionDef.callback.apply(this, argsWithoutHookName);
            isNotInternal && this.execute.call(this, 'hooks_action_executed', actionDef, result, argsWithoutHookName);
        }

        isNotInternal && this.execute.call(this, 'hooks_actions_executed', ...arguments);

        return result;
    }
}
