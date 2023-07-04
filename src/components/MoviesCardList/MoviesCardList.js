import MoviesCard from '../MoviesCard/MoviesCard';

import '../MoviesCardList/MoviesCardList.css';

export default function MoviesCardList(props) {
  const buttonClassName = props.isMain
    ? 'cards__add-button'
    : 'cards__add-button cards__add-button_disabled';

  return(
    <section className='cards' aria-label='Секция с карточками фильмов'>
      <ul className='cards__list'>
        {props.movies.map((item, index) => {
          return(
            <li key={index}>
              <MoviesCard  card={item} saveMovies={props.saveMovies} isMain={props.isMain} onLike={props.onLike} onDelete={props.onDelete}/>
            </li>
          )}
          )}
      </ul>
      <button className={buttonClassName} type='button'>Ещё</button>
    </section>
  )
}
