
var redux = require('redux');

var actions = require('./actions/index');
var store = require('./store/conigureStore').configure();
console.log("hi from redux");


// Map reducer and action generators
// --------



// Redux Combined Reducer
// -----
let unsubscribe = store.subscribe(() => {
  let state = store.getState();


  if(state.map.isFetching){
    
    document.getElementById('app').innerHTML = "Loading"; 
  }else if(state.map.url){
    
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">Get Your Location</a>'; 
  }
});

let currentState = store.getState();

store.dispatch( actions.fetchLocation() );

store.dispatch(actions.addHobby('Running'));

store.dispatch(actions.addHobby('Walking'));
store.dispatch(actions.addMovie('drama','go fish'));
store.dispatch(actions.addMovie('action','Die Hard'));
store.dispatch(actions.removeHobby(2));

