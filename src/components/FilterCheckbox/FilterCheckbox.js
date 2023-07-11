import { getFromLocalStoradge } from '../../utils/SearchMovies';
import '../FilterCheckbox/FilterCheckbox.css';

export default function FilterCheckbox(props) {
  return(
    <div className='tumb'>
      <label className='tumb__title'>
        <input type='checkbox' className='tumb__checkbox' onClick={JSON.parse(getFromLocalStoradge('movies')) && JSON.parse(getFromLocalStoradge('saveMovies')) && (() => props.onShortClick())} name='shortFilm'/>
        {props.isShort
        ? <span className='tumb__visible-checkbox tumb__visible-checkbox_active' />
        : <span className='tumb__visible-checkbox' />
        }
        Короткометражки</label>
    </div>
  )
}
