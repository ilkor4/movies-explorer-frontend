export const setToLocalStoradge = (file, name) => localStorage.setItem(file, name);

export const getFromLocalStoradge = (name) => localStorage.getItem(name);

export const filterMovies = (search, movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(search));

export const filterDuration = (movies) => movies.filter((movie) => movie.duration <= 60);
