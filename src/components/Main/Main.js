import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

import '../Main/Main.css';


export default function Main() {
  return(
    <main className='content'>
      <>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </>
    </main>
  )
}