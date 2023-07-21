import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import { setToLocalStoradge, filterMovies, getFromLocalStoradge, filterDuration } from '../../utils/SearchMovies';
import { getMovies } from '../../utils/MoviesApi';
import { renderCards, optionalCards } from '../../utils/WindowResize';

import '../SearchForm/SearchForm.css';

export default function SearchForm(props) {
  const [search, setSearch] = useState( getFromLocalStoradge('search')
    ? getFromLocalStoradge('search')
    : ''
    );
  const [isShort, setIsShort] = useState(JSON.parse(getFromLocalStoradge('short')));
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

      const movies  = await getMovies();

      props.openPreloader(false);
      props.setMovies(movies);

      setToLocalStoradge('initialMovies', JSON.stringify(movies));
      setToLocalStoradge('movies', JSON.stringify(filterMovies(search.toLowerCase(), movies)));
      setToLocalStoradge('search', search);

      props.changeUserMovies(renderCards(window.innerWidth, JSON.parse(getFromLocalStoradge('movies'))));
      props.setOptionalMovies(optionalCards(window.innerWidth, JSON.parse(getFromLocalStoradge('movies'))));
    } catch(err) {
        props.openPreloader(false);
        props.setMessage('Во время запроса произошла ошибка.');
    }
    } else {
      setToLocalStoradge('movies', JSON.stringify(filterMovies(search.toLowerCase(), JSON.parse(getFromLocalStoradge('initialMovies')))));
      setToLocalStoradge('search', search);

      props.changeUserMovies(renderCards(window.innerWidth, JSON.parse(getFromLocalStoradge('movies'))));
      props.setOptionalMovies(optionalCards(window.innerWidth, JSON.parse(getFromLocalStoradge('movies'))));
    }

    console.log(props.userMovies);
    console.log(props.optionalMovies);
  }

  const handleShortStatus = () => {
    setToLocalStoradge('short', !isShort);
    setIsShort(!isShort);

    if (!isShort) {
      props.changeUserMovies(renderCards(window.innerWidth, filterDuration(JSON.parse(getFromLocalStoradge('movies')))));
      props.setOptionalMovies(optionalCards(window.innerWidth, filterDuration(JSON.parse(getFromLocalStoradge('movies')))));
    } else {
      props.changeUserMovies(renderCards(window.innerWidth, JSON.parse(getFromLocalStoradge('movies'))));
      props.setOptionalMovies(optionalCards(window.innerWidth, JSON.parse(getFromLocalStoradge('movies'))));
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
