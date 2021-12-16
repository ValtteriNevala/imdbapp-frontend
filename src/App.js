import './App.css'
import { useState } from 'react'
import axios from 'axios';

const URL = 'http://localhost/imdb/'

function App() {
  const [spiderleffat, setSpiderleffat] = useState([]);
  const [elokuvat, setElokuvat] = useState([]);
  const [isLoaded, setIsLoaded] = useState(null)
  const [isLoaded1, setIsLoaded1] = useState(null)

  function etsi(e) {
    e.preventDefault();
    setIsLoaded(false)
    axios
      .get(URL + 'spider.php')
      .then(response => {
        setSpiderleffat(response.data)
        setIsLoaded(true)
        console.log(response.data)
      })
      .catch(error => {
        alert(error)
      })
  }

  function etsiElokuvat(e) {
    e.preventDefault();
    setIsLoaded1(false)
    axios
      .get(URL + 'elokuvat.php')
      .then(response => {
        setElokuvat(response.data)
        setIsLoaded1(true)
        console.log(response.data)
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <div className='container-fluid'>
      <h1 id="center">Tervetuloa!</h1>
      <div className="row">
        <div className="col-6">
          <br />
          <button id='etsi' onClick={etsi}>
            Tätä klikkaamalla saat tietoosi 10 parasta julkaisua joissa Spider-Man esiintyy!</button>
          <br />
          <ol>
            {isLoaded === false ? (
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Lataa... Odota hetki.</span>
              </div>
            ) : (
              (spiderleffat?.map(spiderleffa => (
                <li key={spiderleffa.title_id}>
                  <b><p>{spiderleffa.primary_title}</p></b>
                  <p>Julkaisuvuosi: {spiderleffa.start_year}</p>
                  <p>Arvosana: {spiderleffa.average_rating}</p>
                </li>
              )))
            )}
          </ol>
        </div>
        <div className="col-6">
          <br />
          <button onClick={etsiElokuvat} >Paina tästä löytääksesi pitkäkestoisimmat komedia elokuvat joita on julkaistu Suomessa!</button>
          <br />
          <ol>
            {isLoaded1 === false ? (
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Lataa... Odota hetki.</span>
              </div>
            ) : (
              (elokuvat?.map(elokuva => (
                <li key={elokuva.title_id}>
                  <b><p>{elokuva.primary_title}</p></b>
                  <p>Vuosi: {elokuva.start_year}</p>
                  <p>Kesto: {elokuva.runtime_minutes}m</p>
                </li>
              )))
            )}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App