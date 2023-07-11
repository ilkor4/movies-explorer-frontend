import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import SearchSaveForm from '../SearchSaveForm/SearchSaveForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies(props) {
  return(
    <main className='movies'>
      <>
        {props.isMain
        ? <SearchForm movies={props.movies} userMovies={props.userMovies} changeUserMovies={props.changeUserMovies}/>
        : <SearchSaveForm saveMovies={props.saveMovies} saveUserMovies={props.saveUserMovies} changeSaveUserMovies={props.changeSaveUserMovies} />
        }
        <Preloader isOpen={props.isOpen} />
        <MoviesCardList isMain={props.isMain} movies={props.isMain
          ? props.userMovies
          : props.saveUserMovies
          } saveMovies={props.saveMovies} saveUserMovies={props.saveUserMovies} onLike={props.onLike} onDelete={props.onDelete} isOpen={props.isOpen} />
      </>
    </main>
  )
}
