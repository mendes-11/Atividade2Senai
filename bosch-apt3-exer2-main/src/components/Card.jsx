/* eslint-disable react/prop-types */
import style from '../App.module.css'
export const Card = (props) => {
  const status = props.status === "True" ? style.circuloGreen : style.circuloRed
  return (
    <div className={style.card}>
      <h1 className={status}></h1>
      <h1>{props.name}</h1>
      <h2>{props.desc}</h2>
      <p>{props.value}</p>
      <img src={props.image} alt={props.name} width={150} height={150} /> 
    </div>

  )
}