import MoviesCard from '../MoviesCard/MoviesCard';

import '../MoviesCardList/MoviesCardList.css';

export default function MoviesCardList(props) {
  const buttonClassName = props.isMain
    ? 'cards__add-button'
    : 'cards__add-button cards__add-button_disabled';

  return(
    props.movies
      ? <section className='cards' aria-label='Секция с карточками фильмов'>
          {props.movies.length !== 0
            ? <>
                <ul className='cards__list'>
                  {props.movies.map((item) => {
                  return(
                    <li key={props.isMain
                      ? item.id
                      : item._id
                    }>
                      <MoviesCard card={item} saveMovies={props.saveMovies} isMain={props.isMain} onLike={props.onLike} onDelete={props.onDelete} />
                    </li>
                  )}
                  )}
                </ul>
                {props.optionalMovies && <button className={buttonClassName} type='button' onClick={() => props.onAddCards()}>Ещё</button>}
              </>
            : <h2 className='cards__title'>Ничего не найдено</h2>
          }
        </section>
      : <section className='cards_disabled'></section>
  )
}
