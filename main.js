/*
* setup canvas
*/

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

/*
* function to generate random number
*/
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

/*
* Ball Object
*/
function Ball(x, y, velX, velY, color, size) {
    this.x = x; //posición horizontal 
    this.y = y; //posición vertical 
    this.velX = velX; //velocidad horizontal
    this.velY = velY; //velocidad vertical
    this.color = color; //color
    this.size = size; //tamaño
}

/*
* diujar pelotas
*/
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

/*
* Actualizar moviemito de la pelota
*/
Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

/*
* Añadiendo la detección de colisiones
*/
Ball.prototype.collisionDetect = function () {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}

/*
* Animando las pelotas
*/
var balls = [];

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 30) {
        var size = random(10, 20);
        var ball = new Ball(
            // la posición de las pelotas, se dibujará al menos siempre
            // como mínimo a un ancho de la pelota de distancia al borde del
            // canvas, para evitar errores en el dibujo 
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-7, 7),
            random(-7, 7),
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            size
        );
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();
