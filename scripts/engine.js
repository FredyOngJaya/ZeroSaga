var Xin = Xin || {};

(function (Xin) {

Xin.Stage = function (map_id) {
  var _elem = document.getElementById(map_id),
      _style = getComputedStyle(_elem),
      _width = parseInt(_style.width, 10),
      _height = parseInt(_style.height, 10),
      _pos = 0,

      _move = function (speed) {
        _pos += speed;

        if (_pos > _width) {
          _pos = 0;
        }
        else if (_pos < 0) {
          _pos = _width;
        }

        _elem.style.backgroundPositionX = _pos + 'px';
      };

  return {
    getWidth: function () { return _width; },
    getHeight: function () { return _height; },
    move: _move
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
      _rideSpeed = 10,
      _power,
      _motion,
      _normalcap = _posY,
      _jumpcap = _posY - 100,
      _transformed = false,
      _running = false,
      _jumping = false,
      _riding = false,
      _angle = 0,

      _standStill = function () {
//        console.log('stand still');

        if (_running) {
          _class.remove('running');
          _class.add('standstill');
          _running = false;
        }
      },

      _moveRight = function () {
//        console.log('move right');

        if (_transformed) {
          _class.remove('go-left');
          _transformed = !_transformed;
        }

        if (_riding) {
          _rideSpeed = 10;
        }
        else if (!_running) {
          _class.remove('standstill');
          _class.add('running');
          _running = true;
        }
        else if (_running) {
          map.move(-_speed);
        }
      },

      _moveLeft = function () {
//        console.log('move left');

        if (!_transformed) {
          _class.add('go-left');
          _transformed = !_transformed;
        }

        if (_riding) {
          _rideSpeed = -10;
        }
        else if (!_running) {
          _class.remove('standstill');
          _class.add('running');
          _running = true;
        }
        else if (_running) {
          map.move(_speed);
        }
      },

      _jump = function () {
//        console.log('jump to %d', _posY);

        if (!_jumping) {
//          console.log('set jump');
          _jumping = true;
          _class.add('jump');
          _power = -5;
//          console.time('jump');
          _moveTop();
        }
      },

      _ride = function () {
        if (!_riding) {
          _riding = true;
          _class.add('riding');
        }
        if (_transformed) {
            _rideSpeed = -10;
        } else {
            _rideSpeed = 10;
        }
        map.move(-_rideSpeed);
      },

      _unride = function () {
        if (_riding) {
          _riding = false;
          _class.remove('riding');
        }
        _jump();
      },

      _moveTop = function () {
        _motion = requestAnimationFrame(_moveTop);

        if (_angle >= 171) {
            cancelAnimationFrame(_motion);
            _angle = 0;
            _jumping = false;
            _posY = _normalcap;
            _elem.style.top = _posY + 'px';
            _class.remove('jump');
//            console.timeEnd('jump');
        } else {
//            console.log('jumping');
            _angle += 3;
            _posY = Math.round(_normalcap - (Math.sin(Math.PI * _angle / 180) * 100));

            _elem.style.top = _posY + 'px';
        }
      };

  return {
    standStill: _standStill,
    moveRight: _moveRight,
    moveLeft: _moveLeft,
    jump: _jump,
    ride: _ride,
    unride: _unride
  };
};

})(Xin);

var Key = Key || {
  'ESC': 27,
  'SPACE': 32,
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40,
  'A': 65,
  'B': 66,
  'C': 67,
  'D': 68,
  'E': 69,
  'F': 70,
  'G': 71,
  'H': 72,
  'I': 73,
  'J': 74,
  'K': 75,
  'L': 76,
  'M': 77,
  'N': 78,
  'O': 79,
  'P': 80,
  'Q': 81,
  'R': 82,
  'S': 83,
  'T': 84,
  'U': 85,
  'V': 86,
  'W': 87,
  'X': 88,
  'Y': 89,
  'Z': 90,
};
