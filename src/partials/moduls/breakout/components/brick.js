export class Brick {
  x;
  y;
  w;
  h;
  color;

  constructor (x, y, w, h, color) {
    this._x = x;
    this._y = y;
    this._w = w;
    this._h = h;
    this._color = color;
  }
  
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get w() {
    return this._w;
  }
  get h() {
    return this._h;
  }
  get color() {
    return this._color;
  }

  // set x(i) {
  //   this._x = i;
  // }
  // set y(i) {
  //   this._y = i;
  // }
  // set radius(i) {
  //   this._radius = i;
  // }
  // set speedX(i) {
  //   this._speedX = i;
  // }
  // set speedY(i) {
  //   this._speedY = i;
  // }

}