import { BASE_URL } from '../utils/constants';

export const register = (name, email, password) => {
  return fetch(BASE_URL + '/signup', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password,
    })
  })
    .then((res) => handleSubmitResponse(res));
}

export const authorize = (email, password) => {
  return fetch(BASE_URL + '/signin', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
    .then((res) => handleSubmitResponse(res));
}

export const checkToken = () => {
  return fetch(BASE_URL + '/users/me', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => handleSubmitResponse(res));
}

export const signOut = () => {
  return fetch(BASE_URL + '/signout', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => handleSubmitResponse(res));
}

export const updateUser = (name, email) => {
  return fetch(BASE_URL + '/users/me', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
    })
  })
    .then((res) => handleSubmitResponse(res));
}

export const getUserMovies = () => {
  return fetch(BASE_URL + '/movies', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => handleSubmitResponse(res));
}

export const saveMovie = (movieData) => {
  return fetch(BASE_URL + '/users/me', {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "country": movieData.country,
      "director": movieData.director,
      "duration": movieData.duration,
      "year": movieData.year,
      "description": movieData.description,
      "image": movieData.image,
      "trailerLink": movieData.trailerLink,
      "nameRU": movieData.nameRU,
      "nameEN": movieData.nameEN,
      "thumbnail": "https://www.google.com/url?sa",
      "movieId": movieData.id,
    })
  })
    .then((res) => handleSubmitResponse(res));
}

export const deleteMovien = (movieId) => {
  return fetch(BASE_URL + `/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then((res) => handleSubmitResponse(res));
}

export const handleSubmitResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}
