import accessFalseImage from '../../images/access-false.svg';
import accessTrueImage from '../../images/access-true.svg';

import "../InfoTooltip/InfoTooltip.css";

export default function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_info-tooltip ${((props.message) ? 'popup_opened' : '')}`}>
      <div className="popup__container popup__container_type_info-tooltip">
        <button className="popup__close-button popup__close-button_type_info-tooltip" type="button" onClick={props.onClose} aria-label="Кнопка закрытия попапа"></button>
        <img src={props.message === 'Данные пользователя успешно обновлены!'
          ? accessTrueImage
          : accessFalseImage
          } alt="Иконка ошибки"/>
        <h2 className='popup__title'>{props.message}</h2>
      </div>
    </div>
  )
}
