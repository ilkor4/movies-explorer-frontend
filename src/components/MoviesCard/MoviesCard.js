import React from 'react';
import { Link } from 'react-router-dom';
import '../MoviesCard/MoviesCard.css';

export default function MoviesCard(props) {
  const isLiked = () => {
    return props.saveMovies.some((movie) => movie.movieId === props.card.id);
  }

  const countDuration = (duration) => {
    console.log(props.card)
    if (((duration / 60) >= 1) && (duration % 60 === 0)) return `${Math.floor(duration / 60)}ч`;
    else if ((duration / 60) >= 1) return `${Math.floor(duration / 60)}ч${duration % 60}м`;
    else return `${duration}м`
  }

  const cardSaveButtonClassName = isLiked()
    ? 'card__save-button card__save-button_active'
    : 'card__save-button';

  return(
    <div className='card'>
      <Link to={props.card.trailerLink} className='card__link' target='blank'>
        <img className='card__image'
          src={props.isMain
            ? 'https://api.nomoreparties.co/' + props.card.image.url
            : props.card.image
          } alt="Изображение фильма" />
      </Link>
      <div className='card__container'>
        <div className='card__description'>
          <h2 className='card__title'>{props.card.nameRU}</h2>
          {props.isMain
            ? <button className={cardSaveButtonClassName} type='button' aria-label='Кнопка сохранения фильма' onClick={() => props.onLike(props.card)}></button>
            : <button className='card__delete-button' onClick={() => props.onDelete(props.card._id)} type='button' aria-label='Кнопка удаления фильма'></button>
          }
        </div>
        <p className='card__duration'>{countDuration(props.card.duration)}</p>
      </div>
    </div>
  )
}
