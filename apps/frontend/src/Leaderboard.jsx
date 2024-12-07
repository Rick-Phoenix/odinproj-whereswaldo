import { Link } from "react-router-dom";
import { calculateElapsedTime, useFetch } from "./utils.js";

export default function Leaderboard() {
  const leaderboard = useFetch("/leaderboard");

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  if (!leaderboard) return <h1>Loading...</h1>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Player</td>
            <td>Time</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((item) => {
            const formattedTime = calculateElapsedTime(item.time).result.slice(
              0,
              -1
            );
            return (
              <tr key={item.id}>
                <td>{item.nickname}</td>
                <td>{formattedTime}</td>
                <td>{formatDate(new Date(item.date))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Link to={"/"}>
          <button type="button">Back to the homepage</button>
        </Link>
      </div>
    </>
  );
}
