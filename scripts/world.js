var Stage = function (id) {
  var _elem = document.getElementById(id),
      _style = window.getComputedStyle(_elem),
      _width = parseInt(_style.width, 10),
      _height = parseInt(_style.height, 10);
  
  return {
    getWidth: function () {
      return _width; 
    },
    getHeight: function () {
      return _height;
    }
  };
};

var Player = function (id) {
  var _elem = document.getElementById(id),
      _style = window.getComputedStyle(_elem),
      _class = _elem.classList,
      _width = parseInt(_style.width, 10),
      _height = parseInt(_style.height, 10),
      _posX = parseInt(_style.left, 10),
      _posY = _height - parseInt(_style.top, 10),
      _speed = 5,
      _transformed = false,
      _running = false;

  var _standStill = function () {
      if (_running) {
        _class.remove('start-running');
        _class.remove('running');
        _class.add('standstill');
        _running = false;
      }
    },
    _moveRight = function () {
      if (!_running) {
        _class.remove('standstill');
        _class.add('start-running');
        _running = true;
      } else {
        _class.remove('start-running');
        _class.add('running');
      }

      if (_transformed) {
        _class.remove('go-left');
        _transformed = !_transformed;
      }
      
      if (_posX >= map.getWidth() - _width) {
        return;
      }

      _posX += _speed;
      _elem.style.left = _posX + 'px';
    },
    _moveLeft = function () {
      if (!_running) {
        _class.remove('standstill');
        _class.add('start-running');
        _running = true;
      } else {
        _class.remove('start-running');
        _class.add('running');
      }

      if (!_transformed) {
        _class.add('go-left');
        _transformed = !_transformed;
      }
      
      if (_posX <= 0) {
        return;
      }

      _posX -= _speed;
      _elem.style.left = _posX + 'px';
    };

  return {
    standStill: _standStill,
    moveRight: _moveRight,
    moveLeft: _moveLeft
  };
};

var map = Stage('viewport');
var zero = Player('zero');

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
