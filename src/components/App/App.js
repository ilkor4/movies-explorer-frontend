import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import '../App/App.css';

export default function App() {
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
            <Header />
            <Movies isMain={true}/>
            <Footer />
          </>
        } />
        <Route path='/saved-movies' element={
          <>
            <Header />
            <Movies isMain={false}/>
            <Footer />
          </>
        } />
        <Route path='/profile' element={
          <>
            <Header />
            <Profile />
          </>
        } />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
    </div>
  )
}
