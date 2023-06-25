import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg';
import '../Header/Header.css';

export default function Header() {
  return(
    <header className='header'>
      <Link to='/'><img src={headerLogo} alt="Логотип сайта" className='header__logo'/></Link>
      <nav className='header__menu'>
        <Link className='menu__link' to="/signup">Регистрация</Link>
        <Link to="/signin"><button className='menu__button'>Войти</button></Link>
      </nav>
    </header>
  )
}
