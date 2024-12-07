import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Welcome to Where&apos;s Waldo!</h1>
      <div className="buttons">
        <Link to={"/gameIntro"}>
          <button type="button">Start Game</button>
        </Link>
        <Link to={"/leaderboard"}>
          <button type="button">View Leaderboard</button>
        </Link>
      </div>
    </>
  );
}

export default App;
