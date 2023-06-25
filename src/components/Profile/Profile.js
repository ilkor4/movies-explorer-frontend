import { Link } from 'react-router-dom';

import '../Profile/Profile.css';

export default function Profile() {
  return(
    <main className='profile'>
      <div className='profile__container'>
        <h1 className='profile__title'>Привет, Виталий!</h1>
        <form className='profile__form'>
          <div className='form__input-container'>
            <legend className='form__profile-title'>Имя</legend>
            <input className='form__profile-input' name="name" type="text" id="inputName" placeholder='Виталий' required minLength="2" maxLength="30"></input>
          </div>
          <div className='form__input-container form__input-container_type_email'>
            <legend className='form__profile-title'>E-mail</legend>
            <input className='form__profile-input' name="email" type="email" id="inputEmail" placeholder='pochta@yandex.ru' required minLength="2" maxLength="30"></input>
          </div>
          <p className='form__text-error'>Что-то пошло не так...</p>
          <button className="form__profile-save-button" type="submit">Редактировать</button>
          <Link to="/signin" className='form__profile-link'>Выйти из аккаунта </Link>
        </form>
      </div>
  </main>
  )
}
