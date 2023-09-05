export default function BindEvents (setSnakeDirection) {

  var keysToDirections = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  document.addEventListener('keydown', (event)=> {
    var key = event.which;
    var direction = keysToDirections[key];

    if (direction) {
      setSnakeDirection(direction);
      event.preventDefault();
    }
    else if (key === 32) {
      // restart();
    }
  })

};