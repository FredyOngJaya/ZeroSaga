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
            this.el.style.webkitAnimation = "zero-stand 1s steps(2, end) infinite";
            this.running = false;
        }
    },
    moveRight: function () {
        var posX   = this.getPosX(),
            newPos = posX + 3;
        
        if (posX > 600) {
            return;
        }
        
        if (!this.running) {
			this.el.style.webkitAnimation = "zero-run-init 0.8s steps(5, end) 1";
            this.running = true;
        } else {
			this.el.style.webkitAnimation = "zero-run 1s steps(13, end) infinite";
		}
        
        if (this.transformed) {
            this.el.style.webkitTransform = "";
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";
    },
    moveLeft: function () {
        var posX   = this.getPosX(),
            newPos = posX - 3;
        
        if (posX < 0) {
            return;
        }
        
        if (!this.running) {
			this.el.style.webkitAnimation = "zero-run-init 0.8s steps(5, end) 1";
            this.running = true;
        } else {
            this.el.style.webkitAnimation = "zero-run 1s steps(13, end) infinite";
		}
        
        if (!this.transformed) {
            this.el.style.webkitTransform = "rotateY(180deg)";
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";
    }
};

window.addEventListener("keydown", function (e) {
    var code = e.keyCode;
    
    switch (code) {
    case 37:
        zero.moveLeft();
        break;
    case 39:
        zero.moveRight();
        break;
    }
});

window.addEventListener("keyup", function () {
    zero.standStill();
});
