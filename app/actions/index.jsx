
import axios from 'axios';
import { CHANGE_NAME,
         ADD_HOBBY,
         START_LOCATION_FETCH,
         COMPLETE_LOCATION_FETCH,
         REMOVE_HOBBY,
         ADD_MOVIE,
         REMOVE_MOVIE } from '../constants/index';

export let changeName = (name) => {
  return {
    type: CHANGE_NAME,
    name
  };
};

export let addHobby = (hobby) => {
  return {
    type: ADD_HOBBY,
    hobby
  };
};

export let removeHobby = (id) => {
  return {
    type: REMOVE_HOBBY,
    id
  };
};

export let addMovie = (genre, title) => {
  return {
    type: ADD_MOVIE,
    genre,
    title
  };
};

export let removeMovie = (id) => {
  return {
    type: REMOVE_MOVIE,
    id
  };
};

export let startLocationFetch = () => {
  return {
    type: START_LOCATION_FETCH
  };
};

export let completeLocationFetch = (url) => {
  return{
    type: COMPLETE_LOCATION_FETCH,
    url
  };
};

export let fetchLocation = () => {
  return(dispatch, getStore) => {
    dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then((res) =>{
      let loc = res.data.loc;
      let baseUrl = 'http://maps.google.com?q=';

      dispatch(completeLocationFetch(baseUrl + loc));
    });
  }
};

