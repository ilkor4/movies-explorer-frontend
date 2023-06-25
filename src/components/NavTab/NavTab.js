import { HashLink as Link } from 'react-router-hash-link';

import '../NavTab/NavTab.css';

export default function NavTab() {
  return(
    <div className='navTab' aria-label='Секция навигации по странице'>
      <nav>
        <ul className='navTab__menu'>
          <li><Link className='navTab__link' to="#aboutProject">О проекте</Link></li>
          <li><Link className='navTab__link' to="#techs">Технологии</Link></li>
          <li><Link className='navTab__link' to="#aboutMe">Студент</Link></li>
        </ul>
      </nav>
    </div>
  )
}
