var Xin = {};

Xin.Stage = function (map_id) {
  var _elem = document.getElementById(map_id),
      _style = getComputedStyle(_elem),
      _width = parseInt(_style.width, 10),
      _height = parseInt(_style.height, 10),
      _pos = 0;

  return {
    getWidth: function () {
      return _width;
    },
    getHeight: function () {
      return _height;
    },
    move: function (speed) {
      _pos += speed;

      if (_pos > _width) {
        _pos = 0;
      }
      else if (_pos < 0) {
        _pos = _width;
      }

      _elem.style.backgroundPositionX = _pos + 'px';
    }
  };
};

Xin.Player = function (id, map) {
  var _elem = document.getElementById(id),
      _style = getComputedStyle(_elem),
      _class = _elem.classList,
      _width = parseInt(_style.width, 10),
      _height = parseInt(_style.height, 10),
      _posX = parseInt(_style.left, 10),
      _posY = parseInt(_style.top, 10),
      _speed = 5,
      _power,
      _motion,
      _normalcap = _posY,
      _jumpcap = _posY - 100,
      _transformed = false,
      _running = false,
      _jumping = false;

  var _standStill = function () {
//        console.log('stand still');

        if (_running) {
          _class.remove('running');
          _class.add('standstill');
          _running = false;
        }
      },
      _moveRight = function () {
//        console.log('move right');

        if (!_running) {
          _class.remove('standstill');
          _class.add('running');
          _running = true;
        }

        if (_transformed) {
          _class.remove('go-left');
          _transformed = !_transformed;
        }

        map.move(-_speed);
      },
      _moveLeft = function () {
//        console.log('move left');

        if (!_running) {
          _class.remove('standstill');
          _class.add('running');
          _running = true;
        }

        if (!_transformed) {
          _class.add('go-left');
          _transformed = !_transformed;
        }

        map.move(_speed);
      },
      _jump = function () {
//        console.log('jump to %d', _posY);

        if (!_jumping) {
//          console.log('set jump');
          _jumping = true;
          _class.add('jump');
          _power = -5;
          console.time('jump');
          _moveTop();
        }
      },
      _moveTop = function () {
        _motion = requestAnimationFrame(_moveTop);

//        console.log('jumping');

        _posY += _power;
        _elem.style.top = _posY + 'px';
        if (_posY <= _jumpcap) {
          _power *= -1;
        }

        if (_posY > _normalcap) {
          _jumping = false;
          _class.remove('jump');
          console.timeEnd('jump');
          cancelAnimationFrame(_motion);
        }

      };

  return {
    standStill: _standStill,
    moveRight: _moveRight,
    moveLeft: _moveLeft,
    jump: _jump
  };
};
