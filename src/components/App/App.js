
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import '../App/App.css';

export default function App() {
  return(
    <div className='App'>
      <>
        <Header />
        <Movies />
        <Footer />
      </>
    </div>
  )
}
