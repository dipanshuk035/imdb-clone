import { useEffect, useState } from "react";

// const movie = {
//   imdbID: "tt1375666",
//   Title: "The Avengers",
//   Year: "2012",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg",
//   Rating: "7.8",
// };

function App() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?i=tt0944947&apikey=f28062cf&s=${query}`
          );
          const data = await res.json();
          if (data.Response === "False") return;
          if (data) setSearchedMovies((searchedMovies) => data.Search);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
      fetchMovies();
    },
    [query]
  );
  return (
    <div className="App">
      <Nav query={query} setQuery={setQuery} />
      <MovieList searchedMovies={searchedMovies} />
    </div>
  );
}

export default App;

function Nav({ query, setQuery }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

function MovieList({ searchedMovies }) {
  return (
    searchedMovies && (
      <ul>
        {searchedMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    )
  );
}

function MovieCard({ movie }) {
  return (
    <li className="movie-card">
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <div className="movie-details">
        <h3>{movie.Title}</h3>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
        <p>
          <span>⭐</span>
          {movie.Rating}
        </p>
      </div>
    </li>
  );
}
