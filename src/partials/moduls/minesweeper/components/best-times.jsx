import React, { useState } from "react";

export default function BestTimes({
  showBestTimes,
  setShowBestTimes,
  restBestTimes,
  bestTimeBegginer,
  bestTimeInter,
  bestTimeExpert,
  bestUserBegginer,
  bestUserInter,
  bestUserExpert,
}) {
  return (
    <div className={"window windows-box-shadow best-times " + showBestTimes}>
      <div className="header">
        <div>Fastest Mine Sweepers</div>
        <div className="header-buttons">
          <div
            className="close windows-box-shadow"
            onClick={() => setShowBestTimes("")}
          >
            X
          </div>
        </div>
      </div>
      <div className="best-times-content">
        <div className="begginer">
          <span>Begginer:</span>
          <span>{bestTimeBegginer} seconds</span>
          <span>{bestUserBegginer}</span>
        </div>
        <div className="intermediate">
          <span>Intermediate:</span>
          <span>{bestTimeInter} seconds</span>
          <span>{bestUserInter}</span>
        </div>
        <div className="expert">
          <span>Expert:</span>
          <span>{bestTimeExpert} seconds</span>
          <span>{bestUserExpert}</span>
        </div>
        <div className="best-times-buttons">
          <div className="reset windows-box-shadow" onClick={restBestTimes}>
            Reset
          </div>
          <div
            className="ok windows-box-shadow"
            onClick={() => setShowBestTimes("")}
          >
            OK
          </div>
        </div>
      </div>
    </div>
  );
}
