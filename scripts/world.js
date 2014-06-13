var map = Xin.Stage('viewport');
var zero = Xin.Player('zero');

window.addEventListener('keydown', function (e) {
  var code = e.keyCode;

  switch (code) {
  case 37:
  case 65:
    zero.moveLeft();
    break;
  case 39:
  case 68:
    zero.moveRight();
    break;
  }
});

window.addEventListener('keyup', function () {
  zero.standStill();
});
