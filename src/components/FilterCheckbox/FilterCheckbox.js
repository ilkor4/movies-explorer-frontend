import '../FilterCheckbox/FilterCheckbox.css';

export default function FilterCheckbox() {
  return(
    <div className='tumb'>
      <label className='tumb__title'>
        <input type='checkbox' className='tumb__checkbox' name='shortFilm'/>
        <span className='tumb__visible-checkbox' />
        Короткометражки</label>
    </div>
  )
}
