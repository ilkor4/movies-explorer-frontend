import { useState } from 'react';
import { Link } from 'react-router-dom';

import logoImage from '../../images/headerLogo.svg';
import '../Login/Login.css';

export default function Login(props) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { name, value, validationMessage } = evt.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    setErrors(validationMessage);

    setIsValid(evt.target.closest('form').checkValidity());
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onLogin(userInfo.email, userInfo.password);

    setUserInfo({
      email: '',
      password: '',
    });

    setErrors('');

    setIsValid(false);
  }

  return(
    <main className='register'>
      <div className='register__container'>
        <img src={logoImage} alt='Логотип сайта' className='register__logo'/>
        <h1 className='register__title'>Рады видеть!</h1>
        <form className='register__form' onSubmit={handleSubmit}>
          <legend className='form__title'>E-mail</legend>
          <input className='form__input' onChange={handleChange}  name="email" type="email" id="inputEmail" required minLength="2" maxLength="30"></input>
          <legend className='form__title'>Пароль</legend>
          <input className='form__input form__input_type_password' onChange={handleChange} name="password" type="password" id="inputPassword" required minLength="2" maxLength="30"></input>
          <p className='form__text-error'>{errors}</p>
          { isValid
            ? <button className="form__save-button form__save-button_type_login" type="submit">Войти</button>
            : <button className="form__save-button form__save-button_type_login" disabled type="submit">Войти</button>
          }
          <p className="form__caption">Ещё не зарегистрированы?<Link to="/signup" className='form__link'>Регистрация</Link></p>
        </form>
      </div>
    </main>
  )
}
