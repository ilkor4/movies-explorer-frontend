import MoviesCard from '../MoviesCard/MoviesCard';

import { moviesCardsArray } from '../../utils/constants';
import '../MoviesCardList/MoviesCardList.css';

export default function MoviesCardList() {
  return(
    <section className='cards' aria-label='Секция с карточками фильмов'>
      <ul className='cards__list'>
        {moviesCardsArray.map((item, index) => {
          return(
            <li key={index}>
              <MoviesCard  card={item}/>
            </li>
          )}
          )}
      </ul>
      <button className='cards__add-button cards__add-button_disabled' type='button'>Ещё</button>
    </section>
  )
}
