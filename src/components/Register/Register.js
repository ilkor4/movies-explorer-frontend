import { Link } from 'react-router-dom';

import logoImage from '../../images/headerLogo.svg';
import '../Register/Register.css';

export default function Register() {
  return(
    <main className='register'>
      <div className='register__container'>
        <img src={logoImage} alt='Логотип сайта' className='register__logo'/>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form'>
          <legend className='form__title'>Имя</legend>
          <input className='form__input' name="name" type="text" id="inputName" required minLength="2" maxLength="30"></input>
          <legend className='form__title'>E-mail</legend>
          <input className='form__input' name="email" type="email" id="inputEmail" required minLength="2" maxLength="30"></input>
          <legend className='form__title'>Пароль</legend>
          <input className='form__input form__input_type_password' name="password" type="password" id="inputPassword" required minLength="2" maxLength="30"></input>
          <p className='form__text-error'>Что-то пошло не так...</p>
          <button className="form__save-button" type="submit">Зарегистрироваться</button>
          <p className="form__caption">Уже зарегистрированы? <Link to="/signin" className='form__link'>Войти</Link></p>
        </form>
      </div>
    </main>
  )
}
