import { Link } from 'react-router-dom';

import '../NavTab/NavTab.css';

export default function NavTab() {
  return(
    <div className='navTab' aria-label='Секция навигации по странице'>
      <nav>
        <ul className='navTab__menu'>
          <li><Link className='navTab__link' to="#">О проекте</Link></li>
          <li><Link className='navTab__link' to="#">Технологии</Link></li>
          <li><Link className='navTab__link' to="#">Студент</Link></li>
        </ul>
      </nav>
    </div>
  )
}
