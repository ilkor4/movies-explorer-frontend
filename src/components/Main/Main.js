import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

import '../Main/Main.css';


export default function Main() {
  return(
    <main className='content'>
      <>
        <Promo />
        <AboutProject />
      </>
    </main>
  )
}
