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

export default function App() {
  return (
    <div className="App">
      <MovieCard />
      <TimerComponent />
    </div>
  );
}

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

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const btnStyle = {
    cursor: "pointer",
    border: "none",
    height: "40px",
    width: "100px",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Timer</h3>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>{seconds} seconds</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={btnStyle} onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button style={btnStyle} onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button style={btnStyle} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
