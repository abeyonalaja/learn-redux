
var redux = require('redux');

console.log("hi from redux");

let reducer = (state = {name: 'Anonymous' }, action) => {
  // state = state || { name: 'Anonymous' };
  console.log('NEW Action', action);
  return state;
};

let store = redux.createStore(reducer);

let currentState = store.getState();

console.log('currentState', currentState);

let action = {
  type: 'CHANGE_NAME',
  name: 'ABEY'
};

store.dispatch(action);
