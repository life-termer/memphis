import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Board from "./components/board";
import CreateBoard from "./utils/createBoard";
import PlaceMines from "./utils/placeMines";
import revealed from "./utils/reveal";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function Minesweeper({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
}) {
  const dragInstance = useRef();
  const dragWindow = useRef();
  const menuItem = useRef();
  const timeline = useRef(gsap.timeline());
  let newBoard = CreateBoard(8, 8);
  const [intervalId, setIntervalId] = useState(0);
  const [timer, setTimer] = useState(0);
  

  const revealAllCells = (direction) => {
    let tl = timeline.current;
    let ctx = gsap.context(() => {
      tl.to(".board-cell-closed", {
        opacity: 0,
      });
    });
    if(direction === 'forward')
      tl.play().timeScale(1);
    else {
      tl.timeScale(2).reverse();
    }
  }

  const counter = (value) => {
    if(value === 'start') {
      const interval = setInterval(() => {
      setTimer(timer => timer + 1);
        }, 1000);
      setIntervalId(interval);
    }
    else {
      clearInterval(intervalId);
      setTimer(0);
    }
  }

  const [gameType, setGameType] = useState([8, 8, 10, "sm"]);
  const [grid, setGrid] = useState([]);
  const [mineCount, setMinecount] = useState(10);
  const [nonMinecount, setNonMinecount] = useState(0);
  const [mineLocation, setmineLocation] = useState([]);
  const [clickCount, setClickCount] = useState(true);
  const [endGame, setEndgame] = useState("");

  useEffect(() => {
    function freshBoard() {
      setGrid(newBoard.board);
      setNonMinecount(8 * 8 - 10);
    }
    freshBoard();
  }, []);

  const newGame = (size) => {
    counter('stop');
    if (size === "sm") {
      // revealAllCells('back');
      setClickCount(true);
      setGameType([8, 8, 10, "sm"]);
      newBoard = CreateBoard(8, 8);
      setGrid(newBoard.board);
      setMinecount(10);
      setNonMinecount(8 * 8 - 10);
      setEndgame("");
      
    }
    if (size === "lg") 
    {
      revealAllCells('back');
      setClickCount(true);
      setGameType([16, 16, 40, "lg"]);
      newBoard = CreateBoard(16, 16);
      setGrid(newBoard.board);
      setMinecount(40);
      setNonMinecount(16 * 16 - 40);
      setEndgame("");
      
    }
    
    if (size === "xl") newBoard = CreateBoard(30, 16, 75);
  };

  const [show, setShow] = useState(false);

  const updateFlag = (e, x, y) => {
    e.preventDefault();
    let mines = mineCount;
    // deep copy of the object
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].flagged === false) {
      newGrid[x][y].flagged = true;
      setMinecount(--mines);
    } else {
      setMinecount(++mines);
      newGrid[x][y].flagged = false;
    }

    setGrid(newGrid);
  };

  const revealcell = (x, y) => {
    if (clickCount) {
      newBoard = PlaceMines(grid, gameType[0], gameType[1], gameType[2], x, y);
      setGrid(newBoard.board);
      setmineLocation(newBoard.mineLocation);
      setClickCount(false);
      setEndgame("");
      counter('start');
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].flagged === false) {
      if (newGrid[x][y].value === "X") {
        
        setEndgame("gameLost");
        // for (let i = 0; i < mineLocation.length; i++) {
        //   newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
        // }
        for (let i = 0; i < newGrid[0].length; i++) {
          for (let y = 0; y < newGrid[1].length; y++) {
            newGrid[i][y].revealed = true;
          }
        }
        // revealAllCells('forward');
        setGrid(newGrid);
      } else {
        let revealedboard = revealed(newGrid, x, y, nonMinecount);
        setGrid(revealedboard.arr);
        setNonMinecount(revealedboard.newNonMines);
        if (revealedboard.newNonMines === 0) {
          setEndgame("gameWon");
          for (let i = 0; i < newGrid[0].length; i++) {
            for (let y = 0; y < newGrid[1].length; y++) {
              
              newGrid[i][y].revealed = true;
            }
          }
          setGrid(newGrid);
        }
      }
    }
    
  };

  const handleMenuItemClick = () => {
    newGame("lg");
  };
  const handleResetClick = () => {
    if(gameType[3] === "sm")
      newGame("sm");
    if(gameType[3] === "lg")
      newGame("lg");
      if(gameType[3] === "xl")
      newGame("xl");
  };

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-minesweeper",
      edgeResistance: 1,
      type: "x,y",
      inertia: false,
      autoScroll: true,
      cursor: "auto",
    });
  }, []);
  
  {
    return (
      <div
        id="22"
        className={
          "window minesweeper windows-box-shadow " +
          items[1].programList[1].active +
          " " +
          items[1].programList[1].minimized +
          " " +
          gameType[3] +
          " " +
          endGame
        }
        onClick={setActiveProgram}
        ref={dragWindow}
      >
        <div className="header drag-target-minesweeper">
          <div>Minesweeper</div>
          <div className="header-buttons">
            <div
              id="min-22"
              className="minimize windows-box-shadow"
              onClick={setMinimizeWindow}
            ></div>
            <div className="maximize windows-box-shadow disabled"></div>
            <div
              id="close-22"
              className="close windows-box-shadow"
              onClick={setCloseProgram}
            >
              X
            </div>
          </div>
        </div>

        <div className="options">
          <div
            className={show ? "show item active" : "item active"}
            onClick={handleMenuItemClick}
            ref={menuItem}
          >
            Game
            <div className="subitems line"></div>
          </div>
          <div className="item" ref={menuItem}>
            Help
          </div>
          <div className="item" ref={menuItem}>
            {mineCount}
          </div>
          <div className="item" ref={menuItem}>
            {timer}
          </div>
        </div>
        <div className="content">
          <div className="inner-contert">
            <div className="content-header">
              <div className="timer">
                <div className="timer-1"></div>
                <div className="timer-2"></div>
                <div className="timer-3"></div>
              </div>
              <div className="reset" onClick={handleResetClick}></div>
              <div className="score">
                <div className="score-1"></div>
                <div className="score-2"></div>
                <div className="score-3"></div>
              </div>
            </div>
            <Board grid={grid} updateFlag={updateFlag} revealcell={revealcell} />
          </div>
        </div>
      </div>
    );
  }
}
