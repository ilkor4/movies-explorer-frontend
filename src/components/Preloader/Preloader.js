import './Preloader.css'

export default function Preloader(props) {
  return (
    <div className={props.isOpen
      ? 'preloader preloader_opened'
      : 'preloader'}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
    )
};
