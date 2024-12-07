import { useEffect, useRef, useState } from "react";
import { calculateElapsedTime, useFetch } from "./utils.js";
import { useNavigate } from "react-router-dom";
import GameOverMessage from "./GameOverMessage.jsx";

const characters = ["waldo", "wilma", "wizard", "odlaw", "woof"];

export default function Game() {
  const navigate = useNavigate();
  const [picId, setPicId] = useState(1);
  const picData = useFetch(`/picture/${picId}`);
  const [character, setCharacter] = useState("waldo");
  const [found, setFound] = useState([]);
  const [header, setHeader] = useState("Where's Waldo?");

  const imgRef = useRef(null);
  const modalRef = useRef(null);
  const selectRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (picData && !timerRef.current) timerRef.current = Date.now();
  }, [picData]);

  if (!picData) return <h1>Loading...</h1>;

  function gameOverMessage() {
    const t = Date.now() - timerRef.current;
    const timeObj = calculateElapsedTime(t);
    return <GameOverMessage playerTime={timeObj} />;
  }

  function handleClick(e) {
    if (!character) return setHeader("Select a character.");
    const target = picData.coordinates[character];
    const ev = e.nativeEvent;
    if (
      Math.abs(ev.offsetX - target.x) <= (target?.width || 50) &&
      Math.abs(ev.offsetY - target.y) <= (target?.height || 50)
    ) {
      setHeader(
        `Found ${character.charAt(0).toUpperCase() + character.slice(1)}!`
      );
      const newFoundList = [...found, character];
      setFound(newFoundList);
      if (newFoundList.length === 5) {
        return modalRef.current?.showModal();
      }
      setCharacter(null);
    }
  }

  function handleSelect(e) {
    setCharacter(() => {
      const newVal = e.target.value;
      setHeader(`Where's ${newVal.charAt(0).toUpperCase() + newVal.slice(1)}?`);
      return newVal;
    });
  }

  function nextRound() {
    setPicId((previous) => previous + 1);
    setCharacter("waldo");
    setFound([]);
    setHeader("Where's Waldo?");
    selectRef.current.value = "waldo";
    modalRef.current.close();
  }

  return (
    <>
      <dialog open={false} ref={modalRef}>
        {picId < 4 && (
          <>
            <h3>You&apos;ve found all the characters!</h3>
            <button type="button" onClick={nextRound}>
              Next Round
            </button>
          </>
        )}
        {picId === 4 && gameOverMessage()}
      </dialog>
      <header>
        <h1>{header}</h1>
        <select
          name="characters"
          id="characters"
          onChange={handleSelect}
          defaultValue={"waldo"}
          ref={selectRef}
        >
          {characters.map((char) => {
            return (
              <option
                key={char}
                value={char}
                disabled={found.includes(char) ? true : false}
              >
                {char.charAt(0).toUpperCase() + char.slice(1)}
              </option>
            );
          })}
        </select>
      </header>
      <div className="imgDiv" ref={imgRef}>
        <img
          src={picData.url}
          onClick={handleClick}
          alt=""
          className="gamePic"
        />
        {characters.map((char) => {
          const coords = picData.coordinates[char];
          return (
            <div
              key={char}
              className="circle"
              style={{
                display: found.includes(char) ? "block" : "none",
                position: "absolute",
                left: coords.x + "px",
                top: coords.y + "px",
                width: coords?.width || 50 + "px",
                height: coords?.height || 50 + "px",
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}
