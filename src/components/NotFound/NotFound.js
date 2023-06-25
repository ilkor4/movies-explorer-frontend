import { Link } from 'react-router-dom';

import '../NotFound/NotFound.css';

export default function NotFound() {
  return(
    <section className='not-found'>
      <div className='not-found__container'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__subtitle'>Страница не найдена</p>
        <Link className='not-found__link' to='/' >Назад</Link>
      </div>
    </section>
  )
}
