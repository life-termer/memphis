import React, { useState } from "react";

export default function BestTimes({ showBestTimes, setShowBestTimes }) {

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
            <span>9 seconds</span>
            <span>unknown</span>
        </div>
        <div className="intermediate">
            <span>Intermediate:</span>
            <span>99 seconds</span>
            <span>unknown</span>
        </div>
        <div className="expert">
            <span>Expert:</span>
            <span>999 seconds</span>
            <span>unknown</span>
        </div>
        <div className="best-times-buttons">
            <div className="reset windows-box-shadow">Reset</div>
            <div className="ok windows-box-shadow" onClick={() => setShowBestTimes("")}>OK</div>
        </div>
      </div>
    </div>
  );
}
