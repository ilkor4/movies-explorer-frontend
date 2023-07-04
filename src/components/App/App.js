import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
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
import Preloader from '../Preloader/Preloader';
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
import { getMovies } from '../../utils/MoviesApi';

import '../App/App.css';

export default function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [saveMovies, setSaveMovies] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    handleCheckToken();
  }, [navigate]);

  React.useEffect(() => {
    if (isLogged) {
      Promise.all([getMovies(), getUserMovies()])
      .then(([movies, saveMovies]) => {
        setMovies(movies);
        setSaveMovies(saveMovies);
      })
      .catch((err) => console.log(err))
    }
  }, [isLogged, navigate])

  const handleCheckToken = () => {
    checkToken()
      .then((user) => {
        setCurrentUser(user);

        setIsLogged(true);
      })
      .catch((err) => setIsLogged(false));
  }

  const handleRegisterUser = (name, email, password) => {
    register(name, email, password)
      .then(() => handleAuthorizedUser(email, password))
      .catch((err) => console.log(err));
  }

  const handleAuthorizedUser = (email, password) => {
    authorize(email, password)
      .then(() => {
        setIsLogged(true);

        navigate('/movies', { replace: true });
      })
      .catch((err) => console.log(err));
  }

  const handleSignoutUser = () => {
    signOut()
      .then(() => navigate('/', { replace: true }))
      .catch((err) => console.log(err));
  }

  const handleUpdateUser = (name, email) => {
    updateUser(name, email)
    return(<Preloader />)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
  }

  const handleUserMovies = () => {
    getUserMovies()
      .then((saveMovies) => setSaveMovies(saveMovies))
      .catch((err) => console.log(err));
  }

  const handleLikeMovie = (movie) => {
    getUserMovies()
      .then((saveMovies) => {
        if (!isSaveMovie(saveMovies, movie.id)) handleSaveMovie(movie);
        else handleDeleteMovie(getMyId(saveMovies, movie.id));
      })
      .catch((err) => console.log(err))
  }

  const handleSaveMovie = (movie) => {
    saveMovie(movie)
    .then(() => handleUserMovies())
    .catch((err) => console.log(err));
  }

  const handleDeleteMovie = (movieId) => {
    deleteMovie(movieId)
      .then(() => handleUserMovies())
      .catch((err) => console.log(err));
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
                <Movies isMain={true} movies={movies} saveMovies={saveMovies} onLike={handleLikeMovie}/>
                <Footer />
                <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen}/>
              </>
            }/>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute isLogged={isLogged} element={
              <>
                <HeaderLanding onBurgerClick= {() => setIsBurgerOpen(true)} />
                <Movies isMain={false} movies={saveMovies} saveMovies={saveMovies} onDelete={handleDeleteMovie}/>
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
          <Route path='/not-found' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider >
  )
}
