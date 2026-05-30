import { useState, useEffect } from 'react';
import "./MovieWatchlist.css"

const API_KEY = "a05a6fc4"

function MovieWatchlist () {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
   const [watchlist, setWatchlist] = useState([])
  
  
  async function fetchMovies () {
   try{
    const response = await fetch(`https://omdbapi.com/?s=${query}&apikey=${API_KEY}`)
    const data = await response.json()
    console.log(data)
    if (data.Search) { 
      setMovies(data.Search)
    }
    setQuery("")
   }catch(error){
    console.log("error")
   }
  }

 useEffect (() => {
    if(watchlist.length > 0) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }
   }, [watchlist])

  useEffect( () => {
     const saved = localStorage.getItem("watchlist")
      if(saved) {
        setWatchlist(JSON.parse(saved))
      }
  }, []);

  function handleAddToWatchlist (movie) {
      setWatchlist([...watchlist, movie])
  }
  function handleRemoveFromWatchlist(movieId) {
    setWatchlist(watchlist.filter((movie) => movie.imdbID !== movieId))
  }

  return (
    <div>
      <div className='container'>
        <h1 className='movie-heading'>✨ Cinematix ✨</h1> 
        <div className='input-container'>
      <input type="text"
      value={query}
      placeholder='Search movies... Superman, Avengers, Dune'
      onChange={(e) => setQuery(e.target.value)}
      />
      <button className='search-btn' onClick={fetchMovies}>Search</button>
      </div>
      </div>
    
      <div className='movie-container'>
      {movies.map((movie) => (
        <div key={movie.imdbID} className='movie-card'>
        <img src={movie.Poster} className='movie-img'/>
        <p className='movie-title'>{movie.Title}</p>
        <p className='movie-year'>{movie.Year}</p>
        <button className='Add-btn' onClick={() => handleAddToWatchlist(movie)}>Add To Watchlist</button>
        </div>
      ))}
       </div>

      <div className='watchlist-card'>
      <h1 className='watchlist-text'>My Watchlist</h1>
      {watchlist.map((movie)=> (
        <ul key={movie.imdbID} className='watchlist-container'>
        <li className='watchlist-title'><span>{movie.Title}</span> </li>
        <button className='delete-btn' onClick={
          () => handleRemoveFromWatchlist(movie.imdbID)
        }
        
        >delete</button>
       </ul>
      ))}
      </div>
    </div>
  )
}

export default MovieWatchlist;