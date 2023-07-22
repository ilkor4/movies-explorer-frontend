export const setToLocalStoradge = (file, name) => localStorage.setItem(file, name); // Функция - поместить элемент в локальное хранилище

export const getFromLocalStoradge = (name) => localStorage.getItem(name); // Функция - получить элемент с локального хранилища

export const filterMovies = (search, movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(search)); // Функция - отфильтровать массив с фильмами по ключевому запросу поиска

export const filterDuration = (movies) => movies.filter((movie) => movie.duration <= 60); // Функция - отфильтровать массив с фильмами по короткометражности фильмов
