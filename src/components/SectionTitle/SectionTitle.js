import '../SectionTitle/SectionTitle.css';

export default function SectionTitle(props) {
  return (
    <div className='section-title__wrapper'>
      <h2 className='section-title__title'>{props.title}</h2>
    </div>
  )
}
