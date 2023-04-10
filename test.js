'use strict';

const Hooks = require('./hooks');

//---> mini test framework
let GLOBAL_ERROR = false;
function it(should, beTrue) {
    console.log((beTrue ? '✓' : 'x') + ' it ' + should);
    beTrue || (GLOBAL_ERROR = true);
}
function done() {
    process.exit(GLOBAL_ERROR ? 1 : 0);
}
//<--- mini test framework

it('should increase counter by 1 with one action', function() {
    let counter = 0;

    var hooks = new Hooks();
    hooks.register('action', 'Increase by 1', function() { counter++; });
    hooks.execute('action');

    return counter == 1;
}());

it('should increase counter by 5 with two actions', function() {
    let counter = 0;

    var hooks = new Hooks();
    hooks.register('action', 'Increase by 1', function() { counter++; });
    hooks.register('action', 'Increase by 4', function() { counter += 4; });
    hooks.execute('action');

    return counter == 5;
}());

it('should add 1 to a 0 with a filter', function() {

    var hooks = new Hooks();
    hooks.register('filter', 'Increase by 1', function(value) { return value + 1; });
    let result = hooks.execute('filter', 0);

    return result == 1;
}());

it('should add 1+4 to a 0 with filters', function() {

    var hooks = new Hooks();
    hooks.register('filter', 'Increase by 1', function(value) { return value + 1; });
    hooks.register('filter', 'Increase by 4', function(value) { return value + 4; });
    let result = hooks.execute('filter', 0);

    return result == 5;
}());

done();
