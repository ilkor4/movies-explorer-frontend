import { techsCells } from '../../utils/constants';
import SectionTitle from '../SectionTitle/SectionTitle';

import '../Techs/Techs.css';

export default function Techs() {
  return(
    <section className='techs'>
      <SectionTitle title="Технологии" />
      <div className='techs__description'>
        <h3 className='techs__title'>7 технологий</h3>
        <p className='techs__subtitle'>На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
      </div>
      <ul className='techs__table'>
        {techsCells.map((item, index) => <li key={index} className='techs-table__cell'>{item}</li>)}
      </ul>
    </section>
  )
}
