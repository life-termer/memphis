import React, { useState } from "react";
import { createCookie } from "../../../utilities/cookies";

export default function SetBestTime({
  setBestScore,
  setShowBestTimes,
  setBestTime,
  setBestUser,
  timer,
  gameType,
}) {
  const [input, setInput] = useState("");

  const handleInputField = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitBestScore();
    }
  };

  const submitBestScore = () => {
    setBestScore("");
    setShowBestTimes("active");
    setBestUser(input);
    setBestTime(timer);
    if (gameType === "sm") {
      createCookie("bestTimeSm", timer, 3650);
      createCookie("bestUserSm", input, 3650);
    }
    if (gameType === "lg") {
      createCookie("bestTimeLg", timer, 3650);
      createCookie("bestUserLg", input, 3650);
    }
    if (gameType === "xl") {
      createCookie("bestTimeXl", timer, 3650);
      createCookie("bestUserXl", input, 3650);
    }
  };

  return (
    <div className={"window windows-box-shadow set-best-time"}>
      <div className="header">
        <div>Best Time!</div>
        <div className="header-buttons">
          <div
            className="close windows-box-shadow"
            onClick={() => setBestScore("")}
          >
            X
          </div>
        </div>
      </div>
      <div className="set-best-time-content">
        <p>Enter your name</p>
        <input
          type="text"
          className="inverse-windows-box-shadow"
          value={input}
          onChange={handleInputField}
          onKeyDown={handleKeyDown}
        />
        <div className="set-best-time-buttons">
          <div
            className="ok windows-box-shadow"
            onClick={() => submitBestScore()}
          >
            OK
          </div>
        </div>
      </div>
    </div>
  );
}
