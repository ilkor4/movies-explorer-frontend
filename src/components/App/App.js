import { Route, Routes, useNavigate } from 'react-router-dom';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import Header from '../Header/Header';
import HeaderLanding from '../HeaderLanding/HeaderLanding';
import Burger from '../Burger/Burger';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import {
  checkToken,
  register,
  authorize,
  signOut,
  updateUser,
  getUserMovies,
  saveMovie,
  deleteMovie,
} from '../../utils/MainApi';
import { getFromLocalStoradge, filterDuration, setToLocalStoradge, filterMovies } from '../../utils/SearchMovies';
import { getMovies } from '../../utils/MoviesApi';

import '../App/App.css';

export default function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [saveMovies, setSaveMovies] = React.useState([]);
  const [userMovies, setUserMovies] = React.useState(JSON.parse(getFromLocalStoradge('short'))
    ? filterDuration(JSON.parse(getFromLocalStoradge('movies')))
    : JSON.parse(getFromLocalStoradge('movies'))
  );
  const [saveUserMovies, setSaveUserMovies] = React.useState(JSON.parse(getFromLocalStoradge('saveShort'))
  ? filterDuration(JSON.parse(getFromLocalStoradge('saveMovies')))
  : JSON.parse(getFromLocalStoradge('saveMovies'))
);
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    handleCheckToken();
  }, [isLogged]);

  React.useEffect(() => {
    if (isLogged) {
      Promise.all([getMovies(), getUserMovies()])
      .then(([movies, saveMovies]) => {
        setMovies(movies);
        setSaveMovies(saveMovies);
      })
      .catch((err) => console.log(err));
    }
  }, [isLogged]);

  const handleCheckToken = () => {
    checkToken()
      .then((user) => {
        setCurrentUser(user);

        setIsLogged(true);
      })
      .catch(() => setIsLogged(false));
  }

  const handleRegisterUser = (name, email, password) => {
    register(name, email, password)
      .then(() => handleAuthorizedUser(email, password))
      .catch((err) => setMessage(err.message));
  }

  const handleAuthorizedUser = (email, password) => {
    authorize(email, password)
      .then(() => {
        setIsLogged(true);

        navigate('/movies', { replace: true });
      })
      .catch((err) => setMessage(err.message));
  }

  const handleSignoutUser = () => {
    signOut()
      .then(() => {
        setIsLogged(false);
        navigate('/', { replace: true });
      })
      .catch((err) => setMessage(err));
  }

  const handleUpdateUser = (name, email) => {
    updateUser(name, email)
      .then((user) => {
        setMessage('Данные пользователя успешно обновлены!')
        setCurrentUser(user);
      })
      .catch((err) => setMessage(err));
  }

  const handleUserMovies = () => {
    getUserMovies()
      .then((saveMovies) => {
        setSaveMovies(saveMovies);

        setToLocalStoradge('saveMovies', JSON.stringify(filterMovies(getFromLocalStoradge('search'), saveMovies)));

        setSaveUserMovies(JSON.parse(getFromLocalStoradge('saveMovies')));
      })
      .catch((err) => setMessage(err.message));
  }

  const handleLikeMovie = (movie) => {
    getUserMovies()
      .then((saveMovies) => {
        if (!isSaveMovie(saveMovies, movie.id)) handleSaveMovie(movie);
        else handleDeleteMovie(getMyId(saveMovies, movie.id));
      })
      .catch((err) => setMessage(err.message));
  }

  const handleSaveMovie = (movie) => {
    saveMovie(movie)
    .then(() => handleUserMovies())
    .catch((err) => setMessage(err));
  }

  const handleDeleteMovie = (movieId) => {
    deleteMovie(movieId)
      .then(() => {
        handleUserMovies();
      })
      .catch((err) => setMessage(err));
  }

  const isSaveMovie = (saveMovies, movieId) => {
    return saveMovies.some((movie) => movie.movieId === movieId);
  }

  const getMyId = (saveMovies, movieId) => {
    return (saveMovies.find((movie) => movie.movieId === movieId))._id;
  }

  return(
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Routes>
          <Route path='/' element={
            <>
            { isLogged ?
              <>
                <HeaderLanding isMain={true} onBurgerClick= {() => setIsBurgerOpen(true)} />
                <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen} />
              </> :
              <Header />
            }
            <Main />
            <Footer />
            </>
          } />
          <Route path='/movies' element={
            <ProtectedRoute isLogged={isLogged} element={
              <>
                <HeaderLanding onBurgerClick= {() => setIsBurgerOpen(true)} />
                <Movies isMain={true} movies={movies} saveMovies={saveMovies} userMovies={userMovies} changeUserMovies={setUserMovies} onLike={handleLikeMovie} isOpen={isPreloaderOpen}  />
                <Footer />
                <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen}/>
              </>
            }/>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute isLogged={isLogged} element={
              <>
                <HeaderLanding onBurgerClick= {() => setIsBurgerOpen(true)} />
                <Movies isMain={false} movies={saveMovies} saveMovies={saveMovies} saveUserMovies={saveUserMovies} changeSaveUserMovies={setSaveUserMovies} onDelete={handleDeleteMovie} isOpen={isPreloaderOpen} />
                <Footer />
                <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen} />
              </>
            } />
          } />
            <Route path='/profile' element={
              <ProtectedRoute isLogged={isLogged} element={
                <>
                  <HeaderLanding onBurgerClick= {() => setIsBurgerOpen(true)} />
                  <Profile onSignout={handleSignoutUser} onUpdate={handleUpdateUser} />
                  <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen} />
                </>
              } />
          } />
          <Route path='/signup' element={<Register  onRegister={handleRegisterUser} />} />
          <Route path='/signin' element={<Login onLogin={handleAuthorizedUser} />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <InfoTooltip onClose={() => setMessage('')} message={message} />
      </div>
    </CurrentUserContext.Provider >
  )
}
