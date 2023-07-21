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
import { getFromLocalStoradge, filterDuration, setToLocalStoradge } from '../../utils/SearchMovies';
import { renderCards, optionalCards, changeOptional, renderOptional } from '../../utils/WindowResize';

import '../App/App.css';

export default function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth)
  const [movies, setMovies] = React.useState(JSON.parse(getFromLocalStoradge('initialMovies')));
  const [saveMovies, setSaveMovies] = React.useState([]);
  const [userMovies, setUserMovies] = React.useState(JSON.parse(getFromLocalStoradge('short'))
    ? renderCards(windowSize, filterDuration(JSON.parse(getFromLocalStoradge('movies'))))
    : renderCards(windowSize, JSON.parse(getFromLocalStoradge('movies')))
  );
  const [saveUserMovies, setSaveUserMovies] = React.useState([]);
  const [optionalMovies, setOptionalMovies] = React.useState(JSON.parse(getFromLocalStoradge('short'))
  ? optionalCards(windowSize, filterDuration(JSON.parse(getFromLocalStoradge('movies'))))
  : optionalCards(windowSize, JSON.parse(getFromLocalStoradge('movies')))
);
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    handleCheckToken();
  }, [isLogged]);

  React.useEffect(() => {
    if (isLogged) handleUserMovies();
  }, [isLogged]);

  React.useEffect(() => {
    let timeout = null;
    window.addEventListener('resize', resizeChange);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', resizeChange);
    }
  })

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
        setMovies([]);
        setSaveMovies([]);
        setUserMovies([]);
        setOptionalMovies([]);

        localStorage.clear();

        navigate('/', { replace: true });
      })
      .catch((err) => setMessage(err.message));
  }

  const handleUpdateUser = (name, email) => {
    updateUser(name, email)
      .then((user) => {
        setMessage('Данные пользователя успешно обновлены!')
        setCurrentUser(user);
      })
      .catch((err) => setMessage(err.message));
  }

  const handleUserMovies = () => {
    getUserMovies()
      .then((saveMovies) => {
        setSaveMovies(saveMovies);
        setSaveUserMovies(saveMovies);
        setToLocalStoradge('saveMovies', JSON.stringify(saveMovies));
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
  const resizeChange = () => {
    setWindowSize(window.innerWidth);
    if (JSON.parse(getFromLocalStoradge('short'))) {
      setUserMovies(filterDuration(renderCards(windowSize, JSON.parse(getFromLocalStoradge('movies')))));
      setOptionalMovies(filterDuration(optionalCards(windowSize, JSON.parse(getFromLocalStoradge('movies')))));
    } else {
      setUserMovies(renderCards(windowSize, JSON.parse(getFromLocalStoradge('movies'))));
      setOptionalMovies(optionalCards(windowSize, JSON.parse(getFromLocalStoradge('movies'))));
    }
  }

  const handleOptionalCards = () => {
    setUserMovies([...userMovies, ...renderOptional(window.innerWidth, optionalMovies)]);
    setOptionalMovies(changeOptional(window.innerWidth, optionalMovies));
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
                <Movies isMain={true} movies={movies} openPreloader={setIsPreloaderOpen} saveMovies={saveUserMovies} userMovies={userMovies} setMovies={setMovies} changeUserMovies={setUserMovies} onLike={handleLikeMovie} onAddCards={handleOptionalCards} isOpen={isPreloaderOpen} setMessage={setMessage} optionalMovies={optionalMovies} setOptionalMovies={setOptionalMovies} />
                <Footer />
                <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen}/>
              </>
            }/>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute isLogged={isLogged} element={
              <>
                <HeaderLanding onBurgerClick= {() => setIsBurgerOpen(true)} />
                <Movies isMain={false} movies={saveMovies} saveMovies={saveMovies} changeSaveMovies={setSaveMovies} onDelete={handleDeleteMovie} isOpen={isPreloaderOpen} />
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
