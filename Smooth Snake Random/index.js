import { noise } from './node_modules/@chriscourses/perlin-noise/index.js';
/* ******************************* Classes ******************************* */

class Particule{
    constructor(x, y, radius, color, delay){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.i= 0;
        this.delay = delay;
        
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
    update(){
        this.y = noise(this.i + this.delay + 20) * canvas.height;
        this.x = noise(this.i + this.delay) * canvas.width;
        this.i += 0.01; 
        this.draw();
    }
}

/* ******************************* Functions ******************************* */

function animate(){
    requestAnimationFrame(animate);

    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

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
for(let i = 0; i < 10; i++){
    let radius = Math.random() * 3 +20;
    let color = rgb();
    let x = canvas.width/2;
    let y = canvas.height/2;
    particles.push(new Particule(x, y, radius, color,i* 0.05));
}

animate();