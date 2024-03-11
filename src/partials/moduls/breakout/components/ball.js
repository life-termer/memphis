export class Ball {
  x = (870/2)-3;
  y = (400/2)-3;
  radius = 6;
  speedX = 0;
  speedY = 4;
  collisions = 0; 

  
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get radius() {
    return this._radius;
  }
  get speedX() {
    return this._speedX;
  }
  get speedY() {
    return this._speedY;
  }

  set x(i) {
    this._x = i;
  }
  set y(i) {
    this._y = i;
  }
  set radius(i) {
    this._radius = i;
  }
  set speedX(i) {
    this._speedX = i;
  }
  set speedY(i) {
    this._speedY = i;
  }

}