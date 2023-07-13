import { getFromLocalStoradge } from '../../utils/SearchMovies';
import '../FilterCheckbox/FilterCheckbox.css';

export default function FilterCheckbox(props) {
  return(
    <div className='tumb'>
      <label className='tumb__title'>
        {props.isSave
          ? <input type='checkbox' className='tumb__checkbox' onClick={(() => props.onShortClick())} name='shortFilm'/>
          : <input type='checkbox' className='tumb__checkbox' onClick={JSON.parse(getFromLocalStoradge('movies')) && (() => props.onShortClick())} name='shortFilm'/>
        }
        {props.isShort
          ? <span className='tumb__visible-checkbox tumb__visible-checkbox_active' />
          : <span className='tumb__visible-checkbox' />
        }
        Короткометражки</label>
    </div>
  )
}
