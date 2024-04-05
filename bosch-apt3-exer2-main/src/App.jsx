import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { Card2 } from './components/Card2';
import produtos from './constants/produtos.json';
import { api } from './api/rmApi';
import style from './App.module.css';
import NotFound from './components/NotFoundPerson';

function App() {
  const [show, setShow] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        if (name) {
          response = await api.get(`/character/?name=${name}`);
        } else {
          response = await api.get(`/character/?page=${page}`);
        }

        if (!response.data.results || response.data.results.length === 0) {
          console.log('Nenhum resultado encontrado.');
          setData([]);
        } else {
          setData(response.data.results);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          NotFound()
          setData([]);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, name]);

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow('prod')}>Produtos</button>
        <button onClick={() => setShow('api')}>API</button>
        <button onClick={() => setShow('map')}>Mapa</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === 'prod' && (
          <>
            <h2>Showroom de produtos</h2>
            <div>
              <div className={style.grid}>
                {produtos.map((item) => {
                  return <Card name={item.name} desc={item.desc} value={item.value} image={item.image} key={item.id} status={item.status} />;
                })}
              </div>
            </div>
          </>
        )}


        {show === "prod" &&
          <>
            <h2>Showroom de produtos</h2>
            <div>
              {produtos.map((item) => {
                return (
                  <Card name={item.name} desc={item.desc} value={item.value} image={item.image} key={item.id} />
                )
              })}
            </div>
          </>
        }
        {show === 'api' && (
          <>
            <h2>Rick and Morty API</h2>
            <div>
              <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} />
              <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <div className={style.grid}>
                  {data.map((item) => {
                    return (
                      <div key={item.id}>
                        <Card2 name={item.name} status={item.status} desc={item.species} type={item.type} value={item.gender} image={item.image} />
                        <button onClick={() => { }}>Info</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
        {show === 'map' && (
          <>
            <h2>Mapa</h2>
            <div>mapa aqui</div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
