import { Link } from "react-router-dom";

import '../Navigation/Navigation.css';

export default function Navigation() {
  return(
    <nav className="navigation">
      <ul className="navigation__list">
        <li><Link className="navigation__link" to='/movies'>Фильмы</Link></li>
        <li><Link className="navigation__link" to='/saved-movies'>Сохранённые фильмы</Link></li>
      </ul>
    </nav>
  )
}
