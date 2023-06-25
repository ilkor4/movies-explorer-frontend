import { Link } from 'react-router-dom';
import '../Portfolio/Portfolio.css';

export default function Portfolio() {
  return(
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <nav className='portfolio__navigation'>
        <ul className='portfolio__links'>
          <li><Link className='portfolio__link' to='https://ilkor4.github.io/aperture-studio/' target='blank'>Статичный сайт
            <span className='portfolio__arrow'>
            </span></Link></li>
          <li><Link className='portfolio__link' to='https://aperturestudio.ru' target='blank'>Адаптивный сайт
            <span className='portfolio__arrow'>
            </span></Link></li>
          <li className='p'><Link className='portfolio__link portfolio__link_type_no-border' to='https://ilkor4.github.io/kuda-ya-poedy/' target='blank'>Одностраничное приложение
            <span className='portfolio__arrow'>
            </span></Link></li>
        </ul>
      </nav>
    </section>
  )
}
