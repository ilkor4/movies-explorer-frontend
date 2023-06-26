import { Link } from 'react-router-dom';
import headerImage from '../../images/headerLogo.svg';

import Navigation from '../Navigation/Navigation';
import '../HeaderLanding/HeaderLanding.css';

export default function HeaderLanding(props) {
  return(
    <header className='header-landing'>
      <Link to='/'><img src={headerImage} className='header-landing__logo' alt='Логотип сайта'/></Link>
      <Navigation />
      <Link className='header-landing__link' to='/profile'>
        Аккаунт
        <span className='header-landing__link-image'></span>
      </Link>
      <button className='header-landing__burger-button' onClick={props.onBurgerClick}></button>
    </header>
  )
}
