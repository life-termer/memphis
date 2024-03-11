export class Brick {
  x;
  y;
  w;
  h;
  color;
  collisions = 0;
  life;

  constructor (x, y, w, h, color, life) {
    this._x = x;
    this._y = y;
    this._w = w;
    this._h = h;
    this._color = color;
    this._life = life;
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
  get collisions() {
    return this._collisions;
  }
  get life() {
    return this._life;
  }


  set x(i) {
    this._x = i;
  }
  set y(i) {
    this._y = i;
  }
  set collisions(i) {
    this._collisions = i;
  }
  set color(i) {
    this._color = i;
  }
  set life(i) {
    this._life = i;
  }
}