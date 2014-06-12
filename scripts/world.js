var zero = {
    el: document.getElementById("zero"),
    transformed: false,
    running: false,
    getPosX: function () {
        var style = window.getComputedStyle(this.el),
            left  = style.left,
            posX  = parseInt(left.substr(0, left.length - 2), 10);
        
        return posX;
    },
    standStill: function () {
        if (this.running) {
            this.el.setAttribute('class', 'standstill');
            this.running = false;
        }
    },
    moveRight: function () {
        var posX   = this.getPosX(),
            newPos = posX + 5;
        
        if (posX > 945) {
            return;
        }
        
        if (!this.running) {
            this.el.classList.remove('standstill');
			this.el.classList.add('start-running');
            this.running = true;
        } else {
            this.el.classList.remove('start-running');
			this.el.classList.add('running');
		}
        
        if (this.transformed) {
            this.el.classList.remove('go-left');
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";
    },
    moveLeft: function () {
        var posX   = this.getPosX(),
            newPos = posX - 5;
        
        if (posX < 0) {
            return;
        }
        
        if (!this.running) {
            this.el.classList.remove('standstill');
            this.el.classList.add('start-running');
            this.running = true;
        } else {
            this.el.classList.remove('start-running');
            this.el.classList.add('running');
		}
        
        if (!this.transformed) {
            this.el.classList.add('go-left');
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";
    }
};

window.addEventListener("keydown", function (e) {
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

window.addEventListener("keyup", function () {
    zero.standStill();
});
