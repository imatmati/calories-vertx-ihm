import 'whatwg-fetch';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../fetchTools';

export const fetchAliments = () => {
  const url = "http://127.0.0.1:8080/api/aliments";
  const options = {mode: 'cors'};

  return fetch(url,options)
    .then(checkStatus)
    .then(parseJSON);
};

export const fetchAlimentsNames = () => {
  const url = "http://127.0.0.1:8080/api/aliments/names";
  const options = {mode: 'cors'};

  return fetch(url,options)
    .then(checkStatus)
    .then(parseJSON);
};

export const fetchAlimentById = (id) => {
  const url = `http://127.0.0.1:8080/api/aliments/${id}`;
  const options = {mode: 'cors'};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
};

export const calculateCalorie =  (id) =>{

  const url = `http://127.0.0.1:8080/api/aliments/calorie/${id}`;
  const options = {mode: 'cors'};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)

}
