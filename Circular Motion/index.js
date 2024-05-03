/* ******************************* Classes ******************************* */

class Particule{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = Math.random() * 0.01 + 0.02 ;
        this.radian = Math.random() * Math.PI *2;
        this.distanceFromCenter = (Math.random() * 50)+70;
        this.oldPoints = {x: x, y: y};
        this.lastPoints = {x: x, y: y};
    }
    draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(this.oldPoints.x, this.oldPoints.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }
    update(){
        this.oldPoints.x = this.x;
        this.oldPoints.y = this.y;
        
        this.radian += this.velocity;

        this.lastPoints.x += (mouse.x - this.lastPoints.x) * 0.04;
        this.lastPoints.y += (mouse.y - this.lastPoints.y) * 0.04;

        this.x = this.lastPoints.x + Math.cos(this.radian) * this.distanceFromCenter;
        this.y = this.lastPoints.y + Math.sin(this.radian) * this.distanceFromCenter;
        
        this.draw();
    }
}

/* ******************************* Functions ******************************* */

function animate(){
    requestAnimationFrame(animate);

    ctx.fillStyle = 'rgba(255,255,255,0.05)'
    ctx.fillRect(0,0,innerWidth,innerHeight);

    particles.forEach(particle => {
        particle.update();
    });
}

function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

document.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

function rgb(){
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

/* ******************************* Implimentations ******************************* */

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

var mouse = {x: canvas.width/2, y: canvas.height/2};

var particles = [];
for(let i = 0; i < 100; i++){
    let x = canvas.width/2;
    let y = canvas.height/2;
    let radius = Math.random() * 3 +1;
    let color = rgb();

    particles.push(new Particule(x, y, radius, color));
}

animate();