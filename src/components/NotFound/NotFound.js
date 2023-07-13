import { Link, useNavigate } from 'react-router-dom';

import '../NotFound/NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return(
    <section className='not-found'>
      <div className='not-found__container'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__subtitle'>Страница не найдена</p>
        <Link className='not-found__link' onClick={() => navigate(-1)} >Назад</Link>
      </div>
    </section>
  )
}
