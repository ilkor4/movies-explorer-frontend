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
        ? <SearchForm
            movies={props.movies}
            userMovies={props.userMovies}
            setMovies={props.setMovies}
            changeUserMovies={props.changeUserMovies}
            openPreloader={props.openPreloader}
            setMessage={props.setMessage}
            setOptionalMovies={props.setOptionalMovies}
            optionalMovies={props.optionalMovies} />
        : <SearchSaveForm saveMovies={props.saveMovies} changeSaveMovies={props.changeSaveMovies} />
        }
        <Preloader isOpen={props.isOpen} />
        <MoviesCardList
          movies={props.isMain
            ? props.userMovies
            : props.saveMovies
          }
          isMain={props.isMain}
          saveMovies={props.saveMovies}
          saveUserMovies={props.saveUserMovies}
          onLike={props.onLike}
          onDelete={props.onDelete}
          isOpen={props.isOpen}
          onAddCards={props.onAddCards}
          optionalMovies={props.optionalMovies}
          setOptionalMovies={props.setOptionalMovies}/>
      </>
    </main>
  )
}
