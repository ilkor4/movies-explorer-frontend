import { Route, Routes } from 'react-router-dom';
import React from 'react';
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

import '../App/App.css';

export default function App() {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  return(
    <div className='App'>
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        } />
        <Route path='/movies' element={
          <>
            <HeaderLanding onBurgerClick= {() => setIsBurgerOpen(true)} />
            <Movies isMain={true}/>
            <Footer />
            <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen}/>
          </>
        } />
        <Route path='/saved-movies' element={
          <>
            <HeaderLanding onBurgerClick= {() => setIsBurgerOpen(true)} />
            <Movies isMain={false}/>
            <Footer />
            <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen} />
          </>
        } />
        <Route path='/profile' element={
          <>
            <HeaderLanding onBurgerClick= {() => setIsBurgerOpen(true)} />
            <Profile />
            <Burger onClose= {() => setIsBurgerOpen(false)} isBurgerOpen={isBurgerOpen} />
          </>
        } />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
    </div>
  )
}
