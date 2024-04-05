import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { Card2 } from './components/Card2';
import produtos from './constants/produtos.json';
import { api } from "./api/rmApi";
import style from './App.module.css';
import NotFound from './components/NotFoundPerson';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'


function App() {
  const [show, setShow] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState("");
  const [name, setName] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const position = [-25.424800640002506, -49.27243726439408]

  useEffect(() => {
    const Data = async () => {
      try {
        let response;
        if (name) {
          response = await api.get(`/character/?name=${name}`);
        } else {
          response = await api.get(`/character/?page=${page}`);
        }

        if (!response.data.results || response.data.results.length === 0) {
          console.log("Nenhum resultado encontrado.");
          setData([]);
        } else {
          setData(response.data.results);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          NotFound();
          setData([]);
        } else {
          console.error(error);
        }
      }
    };

    Data();
  }, [page, name]);

  const openModal = (characterData) => {
    setModalData(characterData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

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
              <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
              <div className={style.grid}>
                {data.map((item) => {
                  return (
                    <div key={item.id}>
                      <Card2 name={item.name} status={item.status} desc={item.species} type={item.type} value={item.gender} image={item.image} />
                      <button onClick={() => openModal(item)}>Info</button>
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
            
            <MapContainer style={{width:'50vh', height:"50vh"}} center={position} zoom={19} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          
          </>
        }
        {isModalOpen && modalData && (
          <div className={style.modal}>
            <button onClick={closeModal}>Fechar</button>
            <h2>{modalData.name}</h2>
            <p>Status: {modalData.status}</p>
            <p>Espécie: {modalData.species}</p>
            <p>Tipo: {modalData.type}</p>
            <p>Gênero: {modalData.gender}</p>
            <img src={modalData.image} alt={modalData.name} />
          </div>
        )}
      </div>
    </>
  )
}

export default App;
