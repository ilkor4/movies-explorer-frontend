import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  return(
    <main className='movies'>
      <>
        <SearchForm />
        <MoviesCardList isMain={props.isMain}/>
      </>
    </main>
  )
}
