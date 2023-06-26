import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import '../SearchForm/SearchForm.css';

export default function SearchForm() {
  return(
    <section className='searchForm'>
      <form className='searchForm__form'>
        <div className='searchForm__search'>
          <input className='searchForm__input' placeholder='Фильм' type='text' required name='movie'/>
          <button type='submit' className='searchForm__button'></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  )
}
