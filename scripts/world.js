var map = Xin.Stage('viewport'),
    fog = Xin.Stage('fog'),
    zero = Xin.Player('zero', map),
    KEYS = [];

var run = function () {
  if (KEYS[37] || KEYS[65]) {
    zero.moveLeft();
  }
  else if (KEYS[39] || KEYS[68]) {
    zero.moveRight();
  }

  if (KEYS[32]) {
    zero.jump();
  }

  fog.move(1);
};

var animate = function () {
  requestAnimationFrame(animate);
  run();
};

addEventListener('keydown', function (evt) {
  KEYS[evt.keyCode] = true;
//  console.time('keypress');
});

addEventListener('keyup', function (evt) {
  KEYS[evt.keyCode] = false;
  zero.standStill();
//  console.timeEnd('keypress');
});

animate();
