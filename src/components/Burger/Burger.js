import { Link } from 'react-router-dom';
import '../Burger/Burger.css';

export default function Burger(props) {
  const popupClassname = props.isBurgerOpen
  ? 'popup popup_opened'
  : 'popup';

  return(
    <div className={popupClassname}>
      <div className='popup__container'>
      <button className='popup__close-button' onClick={props.onClose}></button>
      <nav className="popup__navigation">
      <ul className="popup-navigation__list">
        <li><Link className="popup-navigation__link" to='/' onClick={props.onClose}>Главная</Link></li>
        <li><Link className="popup-navigation__link" to='/movies' onClick={props.onClose}>Фильмы</Link></li>
        <li><Link className="popup-navigation__link" to='/saved-movies' onClick={props.onClose}>Сохранённые фильмы</Link></li>
      </ul>
    </nav>
    <Link className='popup__link' to='/profile'>
        Аккаунт
        <span className='popup__link-image'></span>
    </Link>
      </div>
    </div>
  )
}
