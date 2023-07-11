import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import { setToLocalStoradge, filterMovies, getFromLocalStoradge, filterDuration } from '../../utils/SearchMovies';

export default function SearchSaveForm(props) {
  const [search, setSearch] = useState( getFromLocalStoradge('saveSearch')
    ? getFromLocalStoradge('saveSearch')
    : ''
    );
  const [isShort, setIsShort] = useState(JSON.parse(getFromLocalStoradge('saveShort')));
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

    setToLocalStoradge('saveMovies', JSON.stringify(filterMovies(search.toLowerCase(), props.saveMovies)));
    setToLocalStoradge('saveSearch', search);

    props.changeSaveUserMovies(JSON.parse(getFromLocalStoradge('saveMovies')));
  }

  const handleShortStatus = () => {
    setToLocalStoradge('saveShort', !isShort);
    setIsShort(!isShort);

    if (!isShort) props.changeSaveUserMovies(filterDuration(JSON.parse(getFromLocalStoradge('saveMovies'))));
    else props.changeSaveUserMovies(JSON.parse(getFromLocalStoradge('saveMovies')));
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
