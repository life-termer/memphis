import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Board from "./components/board"
import CreateBoard from "./utils/createBoard";
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
  let newBoard = CreateBoard(8, 8, 10);

  const [gameType, setGameType] = useState('sm');
  const [grid, setGrid] = useState([]);
  const [minecount,setMinecount]=useState(10);
  const [nonMinecount,setNonMinecount]=useState(0);
  const [mineLocation,setmineLocation]=useState([]);

  useEffect(() => {
    function freshBoard() {
      setGrid(newBoard.board);
      setNonMinecount(8*8-10);
      setmineLocation(newBoard.mineLocation);
      setGrid(newBoard.board);
    }
    freshBoard();
  }, []);

  const newGame = (size) => {
    if(size === "sm"){
      newBoard = CreateBoard(8, 8, 10);
      setMinecount(10);
      setNonMinecount(8*8-10);
      setmineLocation(newBoard.mineLocation);
      setGrid(newBoard.board);
    }
    if(size === "lg")
      newBoard = CreateBoard(20, 20, 15);
    if(size === "xl")
      newBoard = CreateBoard(40, 40, 30);
  }

  const [show, setShow] = useState(false);

  const updateFlag = (e,x,y) => {
    e.preventDefault();
    let mines = minecount;
    // deep copy of the object
    let newGrid=JSON.parse(JSON.stringify(grid));
    if(newGrid[x][y].flagged===false){
      newGrid[x][y].flagged=true;
      setMinecount(--mines);
    }
    else {
      setMinecount(++mines);
      newGrid[x][y].flagged=false;
    }
    
    setGrid(newGrid);
  }
  
  const revealcell=(x,y)=>{
    let newGrid=JSON.parse(JSON.stringify(grid));
    if(newGrid[x][y].value==="X"){
        alert("you clicked mine")
        for(let i=0;i<mineLocation.length;i++){
            newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed=true;
        }
        setGrid(newGrid);
    }
    else{
        let revealedboard=revealed(newGrid,x,y,nonMinecount);
        setGrid(revealedboard.arr);
        setNonMinecount(revealedboard.newNonMines);
    }
  }
  const handleMenuItemClick = () => {
    // setShow((myRef) => !myRef);
    
    newGame("sm");
    setGrid(newBoard.board);
    setGameType("sm");
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
          gameType
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
            <div
              id="close-22"
              className="close windows-box-shadow"
              onClick={setCloseProgram}
            >
              X
            </div>
          </div>
        </div>
        
        <div className="options line">
          <div className={
            show ? "show item active" : "item active"
          }
          onClick={handleMenuItemClick} ref={menuItem}>
            Game
            <div className="subitems line"></div>
          </div>
          <div className="item" ref={menuItem}>Help</div>
          <div className="item" ref={menuItem}>{minecount}</div>
        </div>
        <div className="content">
          <Board 
            grid={grid}
            updateFlag={updateFlag}
            revealcell={revealcell}
          />
        </div>
      </div>
    );
  }
}
