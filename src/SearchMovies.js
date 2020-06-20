import React, { useState } from "react";
import MovieCard from "./MovieCard";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = (event) => {
    event.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Search Movies
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="Type a movie to search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}
