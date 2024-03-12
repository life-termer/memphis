export class Paddle {
  w = 100;
  h = 10;
  x = 870 / 2 - 100 / 2; // 100 is paddle.w
  y = 400 - 20;
  speed = 6;

  get w() {
    return this._w;
  }
  get h() {
    return this._h;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get speed() {
    return this._speed;
  }

  set w(i) {
    this._w = i;
  }
  set h(i) {
    this._h = i;
  }
  set x(i) {
    this._x = i;
  }
  set y(i) {
    this._y = i;
  }
  set speed(i) {
    this._speed = i;
  }
}
