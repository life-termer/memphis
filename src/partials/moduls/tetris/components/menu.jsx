import GameControls from "./gameControls";

const Menu = ({ onClick }) => {
  return (
    <div className="menu">
      <GameControls />
      <div className="menu-btn" onClick={onClick}>
        <p>Play Tetris</p>
      </div>
    </div>
  )
}
  
export default Menu;
