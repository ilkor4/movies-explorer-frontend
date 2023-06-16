import { Link } from 'react-router-dom';
import aboutMeImage from '../../images/aboutMeImage.jpg'
import SectionTitle from '../SectionTitle/SectionTitle';
import '../AboutMe/AboutMe.css';

export default function AboutMe() {
  return(
    <section className='aboutMe'>
      <SectionTitle title="Студент" />
      <div className='aboutMe__profile'>
        <div className='profile__biography'>
          <h2 className='biography__title'>Илья</h2>
          <h3 className='biography__subtitle'>Фронтенд-разработчик, 22 года</h3>
          <p className='biography__text'>Я&nbsp;родился и&nbsp;живу в&nbsp;Крансодаре, закончил КГУФКСиТ. Я&nbsp;професcиональный баскетболист и&nbsp;параллельно занимаюсь программированием. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами.</p>
          <Link className='biography__link' to="#">Github</Link>
        </div>
        <img src={aboutMeImage}  className="profile__image" alt="Фотография профиля" />
      </div>
    </section>
  )
}
