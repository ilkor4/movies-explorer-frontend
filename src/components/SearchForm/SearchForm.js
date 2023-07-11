import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import { setToLocalStoradge, filterMovies, getFromLocalStoradge, filterDuration } from '../../utils/SearchMovies';

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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setToLocalStoradge('movies', JSON.stringify(filterMovies(search.toLowerCase(), props.movies)));
    setToLocalStoradge('search', search);

    props.changeUserMovies(JSON.parse(getFromLocalStoradge('movies')));
  }

  const handleShortStatus = () => {
    setToLocalStoradge('short', !isShort);
    setIsShort(!isShort);

    if (!isShort) props.changeUserMovies(filterDuration(JSON.parse(getFromLocalStoradge('movies'))));
    else props.changeUserMovies(JSON.parse(getFromLocalStoradge('movies')));
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
        <FilterCheckbox isShort={isShort} onShortClick={handleShortStatus} />
      </form>
      {error && <p className='searchForm__error'>{error}</p>}
    </section>
  )
}
