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

    props.onRegister(userInfo.name, userInfo.email, userInfo.password)

    setErrors('');

    setIsValid(false);
  }

  return(
    <main className='register'>
      <div className='register__container'>
        <Link to='/' className='register__logo'><img src={logoImage} alt="Логотип сайта" className='register__logo'/></Link>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form' onSubmit={handleSubmit}>
          <legend className='form__title'>Имя</legend>
          <input className='form__input' onChange={handleChange} pattern='[a-zA-Zа-яА-ЯёЁ \-]{1,30}'  name="name" type="text" id="inputName" required></input>
          <legend className='form__title'>E-mail</legend>
          <input className='form__input' onChange={handleChange} name="email" type="email" id="inputEmail" required minLength="2" maxLength="30"></input>
          <legend className='form__title'>Пароль</legend>
          <input className='form__input form__input_type_password' onChange={handleChange} name="password" type="password" id="inputPassword" required minLength="2" maxLength="30"></input>
          <p className='form__text-error'>{errors}</p>
          { isValid
            ? <button className="form__save-button" type="submit">Зарегистрироваться</button>
            : <button className="form__save-button" disabled type="submit">Зарегистрироваться</button>
          }
          <p className="form__caption">Уже зарегистрированы? <Link to="/signin" className='form__link'>Войти</Link></p>
        </form>
      </div>
    </main>
  )
}
