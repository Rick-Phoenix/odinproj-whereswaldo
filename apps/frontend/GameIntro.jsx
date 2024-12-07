import { useState } from "react";
import { useFetch } from "./src/utils.js";
import { redirect, useNavigate } from "react-router-dom";

export default function GameIntro() {
  const characters = useFetch("/characters");
  const [slideStart, setSlideStart] = useState(false);
  const [slideId, setSlideId] = useState(0);
  const navigate = useNavigate();

  if (!characters) return <h1>Loading...</h1>;

  function handleNext() {
    if (slideId === 0 && !slideStart) return setSlideStart(true);
    if (slideId === 4) return navigate("/game");

    setSlideId((previous) => previous + 1);
  }

  function handlePrevious() {
    if (slideId === 0) return setSlideStart(false);

    setSlideId((previous) => previous - 1);
  }

  const currentCharacter = characters[slideId];

  return (
    <>
      <h1>{!slideStart ? "Game Instructions" : currentCharacter.name}</h1>
      <div className="buttons">
        <button
          type="button"
          onClick={handlePrevious}
          style={{
            display: !slideStart ? "none" : "inline-block",
          }}
        >
          Previous
        </button>
        <button type="button" onClick={handleNext}>
          {slideId === 4
            ? "Start Game"
            : slideId === 0 && !slideStart
            ? "Let's see the characters"
            : "Next"}
        </button>
      </div>
      <div className="introContainer">
        <p className="intro">
          {!slideStart
            ? "In this game, you are going to be shown a very large image, full of many objects and people, often sharing the same color and shape patterns. In these somewhat chaotic illustrations, your job is to find the five characters that will be shown to you next. If you think you've seen one of them, select their name from the dropdown menu and click on the spot of the image where you think they are hiding. If your guess was correct, a circle will appear around them. Good luck and have fun!"
            : currentCharacter.description}
        </p>
        {slideStart && (
          <img className="introPic" src={characters[slideId].picUrl}></img>
        )}
      </div>
    </>
  );
}
