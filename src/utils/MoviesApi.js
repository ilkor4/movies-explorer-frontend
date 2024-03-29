
export const getMovies = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => handleSubmitResponse(res));
}

export const handleSubmitResponse = (res) => {
  return res.ok ? res.json() : res.json()
    .then((err) => Promise.reject(err));
}
