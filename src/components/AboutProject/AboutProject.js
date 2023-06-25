import SectionTitle from '../SectionTitle/SectionTitle';

import '../AboutProject/AboutProject.css';

export default function AboutProject() {
  return(
    <section className='aboutProject' aria-label='Секция описания проекта' id='aboutProject'>
      <SectionTitle title="О проекте"/>
      <div className='aboutProject__description'>
        <div className='description__column'>
          <h3 className='description__title'>Дипломный проект включал 5&nbsp;этапов</h3>
          <p className='description__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        </div>
        <div className='description__column'>
          <h3 className='description__title'>На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
         <p className='description__text'>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <ul className='aboutProject__table'>
        <li className='table__cell'><p className='table__text'>1 неделя</p></li>
        <li className='table__cell'><p className='table__text'>4 недели</p></li>
        <li className='table__cell'><p className='table__text'>Back-end</p></li>
        <li className='table__cell'><p className='table__text'>Front-end</p></li>
      </ul>
    </section>
  )
}
