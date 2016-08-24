
import { CHANGE_NAME,
         ADD_HOBBY,
         START_LOCATION_FETCH,
         COMPLETE_LOCATION_FETCH,
         REMOVE_HOBBY,
         ADD_MOVIE,
         REMOVE_MOVIE } from '../constants/index';

export let nameReducer = (state = 'Anonymous', action) => {

  switch(action.type){
    case CHANGE_NAME:
      return action.name;
    default:
      return state;
  }
  
};

let nextHobbyId = 1;
export let hobbiesReducer = (state = [], action) => {

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

let nextMovieId = 1;
export let moviesReducer = (state = [], action) => {

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

export let mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  
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

