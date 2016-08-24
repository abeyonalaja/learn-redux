
var redux = require('redux');
import axios from 'axios';

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


// Map reducer and action generators
// --------
const START_LOCATION_FETCH = 'START_LOCATION_FETCH';
const COMPLETE_LOCATION_FETCH = 'COMPLETE_LOCATION_FETCH';

let mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  
  switch(action.type) {
  case START_LOCATION_FETCH:
    return {
      isFetching: true,
      url: undefined
    };
  case COMPLETE_LOCATION_FETCH:
    return {
      isFetching: false,
      url: action.url
    };
  default:
    return state;
  }
};

let startLocationFetch = () => {
  return {
    type: START_LOCATION_FETCH
  };
};

let completeLocationFetch = (url) => {
  return{
    type: COMPLETE_LOCATION_FETCH,
    url
  };
};

let fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then((res) =>{
    let loc = res.data.loc;
    let baseUrl = 'http://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc));
  });
};



// Redux Combined Reducer
// -----
let reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

let store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

let unsubscribe = store.subscribe(() => {
  let state = store.getState();


  if(state.map.isFetching){
    
    document.getElementById('app').innerHTML = "Loading"; 
  }else if(state.map.url){
    
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">Get Your Location</a>'; 
  }
});

let currentState = store.getState();

fetchLocation();

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
