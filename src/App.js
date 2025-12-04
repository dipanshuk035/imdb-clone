import logo from "./logo.svg";
import "./App.css";

const movie = {
  imdbID: "tt1375666",
  Title: "The Avengers",
  Year: "2012",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg",
  Rating: "7.8",
};

function App() {
  return (
    <div className="App">
      <MovieCard />
    </div>
  );
}

export default App;

function MovieCard() {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <div>
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
    </div>
  );
}
