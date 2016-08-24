
var redux = require('redux');

console.log("hi from redux");

const ADD_MOVIE = 'ADD_MOVIE';
const REMOVE_MOVIE = ' REMOVE_MOVIE';
const ADD_HOBBY = 'ADD_HOBBY';
const REMOVE_HOBBY = 'REMOVE_HOBBY';
const CHANGE_NAME = 'CHANGE_NAME';


let nameReducer = (state = 'Anonymous', action) => {

  switch(action.type){
    case CHANGE_NAME:
      return action.name;
    default:
      return state;
  }
  
};

let changeName = (name) => {
  return {
    type: CHANGE_NAME,
    name
  };
};

let nextHobbyId = 1;
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

let addHobby = (hobby) => {
  return {
    type: ADD_HOBBY,
    hobby
  };
};

let removeHobby = (id) => {
  return {
    type: REMOVE_HOBBY,
    id
  };
};

let nextMovieId = 1;
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

let addMovie = (genre, title) => {
  return {
    type: ADD_MOVIE,
    genre,
    title
  };
};

let removeMovie = (id) => {
  return {
    type: REMOVE_MOVIE,
    id
  };
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

store.dispatch(addHobby('Running'));

store.dispatch(addHobby('Walking'));
store.dispatch(addMovie('drama','go fish'));
store.dispatch(addMovie('action','Die Hard'));
store.dispatch(removeHobby(2));

store.dispatch(action);
