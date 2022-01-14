import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('./movies.json')
      .then((response) => response.json())
      .then(setMovies)
  }, []);

  return (
    <div className="App">
      <h1>Movie Reviews</h1>
      { movies.map( movie => { return <Movie info={movie}></Movie>}) }
    </div>
  );
}

function Movie(props) {
  console.log(props);
  return (
    <>
    <h2>{props.info.name}</h2>
    <p>{ JSON.stringify(props.info) }</p>
    </>
  )
}

export default App;
