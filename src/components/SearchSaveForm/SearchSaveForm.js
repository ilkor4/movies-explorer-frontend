import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import { filterMovies, getFromLocalStoradge, filterDuration } from '../../utils/SearchMovies';

export default function SearchSaveForm(props) {
  const [search, setSearch] = useState('');
  const [isShort, setIsShort] = useState(false);
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

    if (isShort) props.changeSaveMovies(filterDuration(filterMovies(search, JSON.parse(getFromLocalStoradge('saveMovies')))));
    else props.changeSaveMovies(filterMovies(search, JSON.parse(getFromLocalStoradge('saveMovies'))));
  }

  const handleShortStatus = () => {
    setIsShort(!isShort);

    if (!isShort) {
      if (search) props.changeSaveMovies(filterMovies(search, filterDuration(JSON.parse(getFromLocalStoradge('saveMovies')))));
      else props.changeSaveMovies(filterDuration(JSON.parse(getFromLocalStoradge('saveMovies'))));
    } else {
      if (search) props.changeSaveMovies(filterMovies(search, JSON.parse(getFromLocalStoradge('saveMovies'))));
      else props.changeSaveMovies(JSON.parse(getFromLocalStoradge('saveMovies')));
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
        <FilterCheckbox isShort={isShort} isSave={true} onShortClick={handleShortStatus} />
      </form>
      {error && <p className='searchForm__error'>{error}</p>}
    </section>
  )
}
