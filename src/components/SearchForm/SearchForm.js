import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import { setToLocalStoradge, filterMovies, getFromLocalStoradge, filterDuration } from '../../utils/SearchMovies';
import { getMovies } from '../../utils/MoviesApi';
import { renderCards, optionalCards } from '../../utils/WindowResize';
import { naming } from '../../utils/constants';

import '../SearchForm/SearchForm.css';

export default function SearchForm(props) {
  const [search, setSearch] = useState( getFromLocalStoradge(naming.search)
    ? getFromLocalStoradge(naming.search)
    : ''
    );
  const [isShort, setIsShort] = useState(JSON.parse(getFromLocalStoradge(naming.short)));
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const {value, validationMessage} = evt.target;

    setSearch(value);

    setError(validationMessage);

    setIsValid(evt.target.closest('form').checkValidity());
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (!props.movies || props.movies.length === 0) { try {
      props.openPreloader(true)

      // Ожидание получения фильмов
      const movies  = await getMovies();

      props.openPreloader(false);
      props.setMovies(movies);

      // Загрузка данных в локальное хранилище
      setToLocalStoradge(naming.initialMovies, JSON.stringify(movies));
      setToLocalStoradge(naming.movies, JSON.stringify(filterMovies(search.toLowerCase(), movies)));
      setToLocalStoradge(naming.search, search);

      // Изменение стейтов сохранненых отрисованных и дполнительных фильмов
      props.changeUserMovies(renderCards(window.innerWidth, JSON.parse(getFromLocalStoradge(naming.movies))));
      props.setOptionalMovies(optionalCards(window.innerWidth, JSON.parse(getFromLocalStoradge(naming.movies))));
    } catch(err) {
        props.openPreloader(false);
        props.setMessage('Во время запроса произошла ошибка.');
    }
    } else {
      // Загрузка данных в локальное хранилище
      setToLocalStoradge(naming.movies, JSON.stringify(filterMovies(search.toLowerCase(), JSON.parse(getFromLocalStoradge(naming.initialMovies)))));
      setToLocalStoradge(naming.search, search);

      // Изменение стейтов сохранненых отрисованных и дполнительных фильмов
      props.changeUserMovies(renderCards(window.innerWidth, JSON.parse(getFromLocalStoradge(naming.movies))));
      props.setOptionalMovies(optionalCards(window.innerWidth, JSON.parse(getFromLocalStoradge(naming.movies))));
    }
  }

  const handleShortStatus = () => {
    setToLocalStoradge(naming.short, !isShort);
    setIsShort(!isShort);

    if (!isShort) {
      // Изменение стейтов сохранненых отрисованных и дполнительных фильмов в зависимости от состояния кнопки корткометражек
      props.changeUserMovies(renderCards(window.innerWidth, filterDuration(JSON.parse(getFromLocalStoradge(naming.movies)))));
      props.setOptionalMovies(optionalCards(window.innerWidth, filterDuration(JSON.parse(getFromLocalStoradge(naming.movies)))));
    } else {
      // Изменение стейтов сохранненых отрисованных и дполнительных фильмов в зависимости от состояния кнопки корткометражек
      props.changeUserMovies(renderCards(window.innerWidth, JSON.parse(getFromLocalStoradge(naming.movies))));
      props.setOptionalMovies(optionalCards(window.innerWidth, JSON.parse(getFromLocalStoradge(naming.movies))));
  }
  }


  return(
    <section className='searchForm'>
      <form className='searchForm__form' onSubmit={handleSubmit}>
        <div className='searchForm__search'>
          <input className='searchForm__input' onChange={handleChange} placeholder='Фильм' value={search} type='text' name='movie' />
          {isValid
          ? <button type='submit' className='searchForm__button'></button>
          : <button type='submit' disabled className='searchForm__button'></button>
          }
        </div>
        <FilterCheckbox isShort={isShort} isSave={false} onShortClick={handleShortStatus} />
      </form>
      {error && <p className='searchForm__error'>{error}</p>}
    </section>
  )
}
