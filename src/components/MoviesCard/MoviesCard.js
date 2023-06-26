import React from 'react';
import '../MoviesCard/MoviesCard.css';

export default function MoviesCard(props) {
  const [saved, setSaved] = React.useState(false);
  const cardSaveButtonClassName = (`card__save-button ${saved && 'card__save-button_active'}`);

  return(
    <div className='card'>
      <img className='card__image' src={props.card.link} alt="Изображение фильма" />
      <div className='card__container'>
        <div className='card__description'>
          <h2 className='card__title'>{props.card.name}</h2>
          {props.isMain
            ? <button className={cardSaveButtonClassName} type='button' aria-label='Кнопка сохранения фильма' onClick={() => setSaved(!saved)}></button>
            : <button className='card__delete-button' type='button' aria-label='Кнопка удаления фильма'></button>
          }
        </div>
        <p className='card__duration'>{props.card.duration}</p>
      </div>
    </div>
  )
}
