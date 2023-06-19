import { Link } from 'react-router-dom';
import '../Portfolio/Portfolio.css';

export default function Portfolio() {
  return(
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <nav className='portfolio__navigation'>
        <ul className='portfolio__links'>
          <li><Link className='portfolio__link'>Статичный сайт
            <span className='portfolio__arrow'>
            </span></Link></li>
          <li><Link className='portfolio__link'>Адаптивный сайт
            <span className='portfolio__arrow'>
            </span></Link></li>
          <li><Link className='portfolio__link portfolio__link_type_no-border'>Одностраничное приложение
            <span className='portfolio__arrow'>
            </span></Link></li>
        </ul>
      </nav>
    </section>
  )
}
