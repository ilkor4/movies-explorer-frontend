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
import {
  checkToken,
  register,
  authorize,
  signOut,
  updateUser,
} from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';

import '../App/App.css';

export default function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    handleCheckToken();
  }, [navigate]);

  React.useEffect(() => {
    if (isLogged) {
      getMovies()
      .then((movies) => setMovies(movies))
      .catch((err) => console.log(err))
    }
  }, [])

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
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
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
                <Movies isMain={true} movies={movies}/>
                <Footer />
                <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen}/>
              </>
            }/>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute isLogged={isLogged} element={
              <>
                <HeaderLanding onBurgerClick= {() => setIsBurgerOpen(true)} />
                <Movies isMain={false} movies={movies}/>
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
