
var redux = require('redux');

console.log('Starting redux todo example');

let stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

let reducer = (state = stateDefault, action) => {

  switch(action.type){
    case 'CHANGE_SEARCH_TEXT':
    return {
      ...state,
      searchText: action.searchText
    };
    default:
      return state;
  }
};

var store = redux.createStore(reducer);

let action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: "gym"
};


var currentState = store.getState();

console.log('currentState', currentState);

store.dispatch(action);


console.log('currentState', store.getState());
