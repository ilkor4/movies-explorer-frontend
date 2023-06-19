import { Link } from 'react-router-dom';
import '../Footer/Footer.css';

export default function Footer() {
  return(
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__description'>
        <p className='footer__caption'>© 2023</p>
        <nav>
          <ul className='footer__links'>
            <li><Link  className='footer__link' to='#'>Яндекс.Практикум</Link></li>
            <li><Link  className='footer__link' to='#'>Github</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
