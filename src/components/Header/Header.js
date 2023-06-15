import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg';
import '../Header/Header.css';

export default function Header() {
  return(
    <header className='header'>
      <img src={headerLogo} alt="Логотип сайта" />
      <nav className='header__menu'>
        <Link className='menu__link' to="#">Регистрация</Link>
        <button className='menu__button'>Войти</button>
      </nav>
    </header>
  )
}
