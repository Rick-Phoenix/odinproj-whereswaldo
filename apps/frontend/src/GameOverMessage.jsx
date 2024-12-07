import { useState } from "react";
import { apiUrl } from "./utils.js";
import { useNavigate } from "react-router-dom";

export default function GameOverMessage({ playerTime }) {
  const { time, result } = playerTime;
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());

    const response = fetch(`${apiUrl}/leaderboard`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formObj),
    }).then(() => setHasSubmitted(true));
  }

  return (
    <div>
      <h3>{"You've done it!"}</h3>
      <p>You found all the characters in {result}</p>
      {!hasSubmitted && (
        <div>
          <div>Do you want to save your time?</div>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">Nickname: </label>
            <input type="hidden" name="time" value={time} />
            <input type="text" name="nickname" id="nickname" />
            <button type="submit">Submit Time</button>
          </form>
        </div>
      )}
      {hasSubmitted && (
        <div>
          <div>Thank you for submitting your time.</div>
          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                navigate("/leaderboard");
              }}
            >
              View Leaderboard
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
