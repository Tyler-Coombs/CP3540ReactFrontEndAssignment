import React from "react";
import { useState, useEffect } from 'react';
import {Link, useLocation} from "react-router-dom";

export function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
    fetch('./movies.json')
      .then((response) => response.json())
      .then(setMovies)
    }, []);
    console.log(movies);

    function Movie( {name, date, actors, poster, rating, onRemove = f => f} ) {
        return (
          <>
          <div>
            <h2>{name}</h2>
            <img 
                src={process.env.PUBLIC_URL + poster} 
                alt={name + " Movie Poster"}>
            </img>
            <h3>Release Date: {date}</h3>
            <h3>Lead Actors: {(actors).join(", ")}</h3>
            <h3>IMDB Rating: {rating} Stars</h3>
            <button onClick={() => onRemove(name)}>Remove</button>
          </div>
          </>
        );
    }

    function MovieList( { movies = [], onRemoveMovie = f => f}) {
        if (!movies.length) return <div>No movies available.</div>;

        return (
            movies.map( movie => (
                <Movie key={movie.name} {...movie} onRemove={onRemoveMovie} />
            ))
        )
    }

    return (
        <>
            <Header />
            <MovieList 
                movies={movies} 
                onRemoveMovie={ name => {
                const newMovies = movies.filter(movie => movie.name !== name);
                setMovies(newMovies);
            }} />
            <Footer year={new Date().getFullYear()}/>
        </>
    );
}

export function AddReview() {

    return (
        <>
            <h1>Add A Review</h1>
            <nav>
            <Link to="/">Home</Link>
            </nav>
            <form>
                <div>
                    <label>Movie Title:<input name="movie_title" type="text" /></label>
                </div>
                <div>
                    <label>Release Date:<input name="release_date" type="text" /></label>
                </div>
                <div>
                    <label>Lead Cast:<input name="lead_cast" type="text" /></label>
                </div>
                <div>
                    <label>Movie Poster:<input type="file" name="poster" accept=".png,.jfif,.jpg,.jpeg" /></label>
                </div>
                <div>
                <label>Rating:<select name="rating">
                        <option value="1">1 star</option>
                        <option value="2">2 star</option>
                        <option defaultValue="3">3 star</option>
                        <option value="4">4 star</option>
                        <option value="5">5 star</option>
                    </select></label>
                </div>
                <div>
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
        </>
    );
}

function Header() {
    return (
    <>
      <header>
        <h1>Movie Reviews</h1>
        <nav>
            <Link to="addreview">Add A Review</Link>
        </nav>
      </header>
    </>
    );
}
  
function Footer(props) {
    return (
        <>
        <footer>
            <p>Copyright {props.year}</p>
        </footer>
        </>
    );
}

export function Whoops404() {
    let location = useLocation();
    return (
        <>
            <h1>Resource not found at {location.pathname}!</h1>
        </>
    )
}