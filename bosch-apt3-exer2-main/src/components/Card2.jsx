import style from '../App.module.css'
export const Card2 = (props) => {
  return (
    <div className={style.card}>
      <h1>{props.name}</h1>
      <h2>{props.status}</h2>
      <p>{props.species}</p>
      <p>{props.type}</p>
      <p>{props.gender}</p>
      <img src={props.image} alt={props.name} width={150} height={150} /> 
    </div>

  )
}