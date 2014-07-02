var Main = Main || {};

(function (Main) {

var map = Xin.Stage('viewport'),
    fog = Xin.Stage('fog'),
    zero = Xin.Player('zero', map),
    keys_ = [],
    world,
    riding = false,
    direction = -1;

var run = function () {
  if (keys_[Key.LEFT] || keys_[Key.A]) {
    zero.moveLeft();
    direction = 1;
  } else if (keys_[Key.RIGHT] || keys_[Key.D]) {
    zero.moveRight();
    direction = -1;
  }

  if (keys_[Key.DOWN] || keys_[Key.S]) {
    riding = true;
  } else if (keys_[Key.UP] || keys_[Key.W]) {
    riding = false;
    zero.unride();
  }

  if (keys_[Key.SPACE]) {
    zero.jump();
  }

  if (riding) {
    zero.ride();
    fog.move(10 * direction);
  } else {
    fog.move(1 * direction);
  }
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
