import { Link } from 'react-router-dom';

import { useState } from 'react';

import logoImage from '../../images/headerLogo.svg';
import '../Register/Register.css';

export default function Register(props) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }

    const handleSubmit = (evt) => {
      evt.preventDefault();

      props.onRegister(userInfo.name, userInfo.email, userInfo.password);

      setUserInfo({
        name: '',
        email: '',
        password: '',
      })
    }

  return(
    <main className='register'>
      <div className='register__container'>
        <img src={logoImage} alt='Логотип сайта' className='register__logo'/>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form' onSubmit={handleSubmit}>
          <legend className='form__title'>Имя</legend>
          <input className='form__input' onChange={handleChange} name="name" type="text" id="inputName" required minLength="2" maxLength="30"></input>
          <legend className='form__title'>E-mail</legend>
          <input className='form__input' onChange={handleChange} name="email" type="email" id="inputEmail" required minLength="2" maxLength="30"></input>
          <legend className='form__title'>Пароль</legend>
          <input className='form__input form__input_type_password' onChange={handleChange} name="password" type="password" id="inputPassword" required minLength="2" maxLength="30"></input>
          <p className='form__text-error'>Что-то пошло не так...</p>
          <button className="form__save-button" type="submit">Зарегистрироваться</button>
          <p className="form__caption">Уже зарегистрированы? <Link to="/signin" className='form__link'>Войти</Link></p>
        </form>
      </div>
    </main>
  )
}
