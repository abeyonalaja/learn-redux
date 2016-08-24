
var redux = require('redux');

console.log("hi from redux");

const ADD_MOVIE = 'ADD_MOVIE';
const REMOVE_MOVIE = ' REMOVE_MOVIE';
const ADD_HOBBY = 'ADD_HOBBY';
const REMOVE_HOBBY = 'REMOVE_HOBBY';
const CHANGE_NAME = 'CHANGE_NAME';

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

let nextHobbyId = 1;
let nextMovieId = 1;
let oldReducer = (state = stateDefault, action) => {
  // state = state || { name: 'Anonymous' };
  switch(action.type){
  case 'CHANGE_NAME':
    return {
      ...state,
      name: action.name
    };
  case 'ADD_HOBBY':
    return {
      ...state,
      hobbies: [
        ...state.hobbies,{
          id: nextHobbyId++,
          hobby: action.hobby}
      ]
    };
  case REMOVE_HOBBY:
    return {
      ...state,
      hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
    };
  case ADD_MOVIE:
    return {
      ...state,
      movies: [
        ...state.movies,{
          id: nextMovieId++,
          title: action.movie.title,
          genre: action.movie.genre
        }
      ]
    };
  default:
    return state;
  }
};

let nameReducer = (state = 'Anonymous', action) => {

  switch(action.type){
    case CHANGE_NAME:
      return action.name;
    default:
      return state;
  }
  
};

let hobbiesReducer = (state = [], action) => {

  switch(action.type){
    case ADD_HOBBY:
      return [ 
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case REMOVE_HOBBY:
      return [
        state.filter((hobby) => hobby.id !== action.id)
      ];
    default:
      return state;
  }
  
};

let moviesReducer = (state = [], action) => {

  switch(action.type){
    case ADD_MOVIE:
      return [
        ...state, {
          id: nextMovieId++,
          genre: action.genre,
          title: action.title
        }
      ];
    case REMOVE_MOVIE:
      return [
        state.filter((movie) => movie.id !== action.id)
      ];
  default:
      return state;
  }
};

let reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

let store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

let unsubscribe = store.subscribe(() => {
  let state = store.getState();

  console.log("Name is ", state.name);
  document.getElementById('app').innerHTML = state.name;

  console.log('New state', state);
});

let currentState = store.getState();


let action = {
  type: 'CHANGE_NAME',
  name: 'ABEY'
};

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Walking'
});



store.dispatch({
  type: ADD_MOVIE,
  genre: 'drama',
  title:"go fish"
});

store.dispatch({
  type: ADD_MOVIE,
  genre: 'action',
  title:'Die Hard'
});

store.dispatch({
  type: REMOVE_HOBBY,
  id: 2
});

store.dispatch(action);
