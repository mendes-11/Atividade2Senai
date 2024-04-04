import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { Card2 } from './components/Card2'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'
import NotFound from './components/NotFoundPerson'

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [name, setName] = useState("")


  useEffect(() => {
    api.get(`/character/?page=${page}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        NotFound()
      }
      console.error(error)
    })
    api.get(`/character/?name=${name}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        NotFound()
      }
      console.error(error)
    })
  }, [page, name])

 


return (
  <>
    <div className={style.wrapBtns}>
      <button onClick={() => setShow("prod")}>Produtos</button>
      <button onClick={() => setShow("api")}>API</button>
      <button onClick={() => setShow("map")}>Mapa</button>
    </div>
    <div className={style.wrapPage}>
      <h1>Exercícios de manutenção</h1>
      {show === "prod" &&
        <>
          <h2>Showroom de produtos</h2>
          <div>
            <div className={style.grid}>
              {produtos.map((item) => {
                return (
                  <Card name={item.name} desc={item.desc} value={item.value} image={item.image} key={item.id} />
                )
              })}
            </div>
          </div>
        </>
      }
      {show === "api" &&
        <>
          <h2>Rick and Morty API</h2>
          <div>
            <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} />
          </div>
          <div>
            <div className={style.grid}>
              {data.map((item) => {
                return (
                  <div key={item.id}>
                    <Card2 name={item.name} status={item.status} desc={item.species} type={item.type} value={item.gender} image={item.image} />
                    {/* <button onClick={() => {}}>Info</button> */}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      }
      {show === "map" &&
        <>
          <h2>Mapa</h2>
          <div>
            mapa aqui
          </div>
        </>
      }
    </div>
  </>
)
}

export default App
