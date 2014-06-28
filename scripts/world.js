var Main = Main || {};

(function (Main) {

var map = Xin.Stage('viewport'),
    fog = Xin.Stage('fog'),
    zero = Xin.Player('zero', map),
    keys_ = [],
    world;

var run = function () {
  if (keys_[37] || keys_[65]) {
    zero.moveLeft();
  } else if (keys_[39] || keys_[68]) {
    zero.moveRight();
  }

  if (keys_[32]) {
    zero.jump();
  }

  fog.move(1);
};

Main.startAnimate = function () {
  world = requestAnimationFrame(Main.startAnimate);
  run();
};

Main.stopAnimate = function () {
  cancelAnimationFrame(world);
};

addEventListener('keydown', function (evt) {
  keys_[evt.keyCode] = true;
});

addEventListener('keyup', function (evt) {
  keys_[evt.keyCode] = false;
  zero.standStill();
});

})(Main);

Main.startAnimate();
