import { useContext, useState  } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import '../Profile/Profile.css';

export default function Profile(props) {
  const currentUser = useContext(CurrentUserContext);


  const [userInfo, setUserInfo] = useState({
    name: currentUser.name,
    email: currentUser.email,
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

    props.onUpdate(userInfo.name, userInfo.email);

    setUserInfo({
      name: currentUser.name,
      email: currentUser.value,
    });

    setErrors('');

    setIsValid(false);
  }

  return(
    <main className='profile'>
      <div className='profile__container'>
        <h1 className='profile__title'>Привет, { currentUser.name }!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='form__input-container'>
            <legend className='form__profile-title'>Имя</legend>
            <input className='form__profile-input' onChange={handleChange} name="name" type="text" id="inputName" placeholder={ currentUser.name } required minLength="2" maxLength="30"></input>
          </div>
          <div className='form__input-container form__input-container_type_email'>
            <legend className='form__profile-title'>E-mail</legend>
            <input className='form__profile-input' onChange={handleChange} name="email" type="email" id="inputEmail" placeholder={ currentUser.email } required minLength="2" maxLength="30"></input>
          </div>
          <p className='form__text-error'>{errors}</p>
          { isValid
            ? <button className="form__save-button" type="submit">Редактировать</button>
            : <button className="form__save-button" disabled type="submit">Редактировать</button>
          }
          <Link to="/signin" onClick={props.onSignout} className='form__profile-link'>Выйти из аккаунта </Link>
        </form>
      </div>
  </main>
  )
}
