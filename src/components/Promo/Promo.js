import NavTab from '../NavTab/NavTab';
import '../Promo/Promo.css';

export default function Promo() {
  return(
    <section className='promo' aria-label='Секция вступления'>
      <div className='promo__description'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      </div>
      <NavTab />
    </section>
  );
}
