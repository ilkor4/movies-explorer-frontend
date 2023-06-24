import MoviesCard from '../MoviesCard/MoviesCard';

import { moviesCardsArray } from '../../utils/constants';
import '../MoviesCardList/MoviesCardList.css';

export default function MoviesCardList(props) {
  const buttonClassName = props.isMain
    ? 'cards__add-button'
    : 'cards__add-button cards__add-button_disabled';

  return(
    <section className='cards' aria-label='Секция с карточками фильмов'>
      <ul className='cards__list'>
        {moviesCardsArray.map((item, index) => {
          return(
            <li key={index}>
              <MoviesCard  card={item} isMain={props.isMain}/>
            </li>
          )}
          )}
      </ul>
      <button className={buttonClassName} type='button'>Ещё</button>
    </section>
  )
}
