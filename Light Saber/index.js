import gsap from './node_modules/gsap/index.js';
/* ******************************* Classes ******************************* */

class Particule{
    constructor(x, y, radius, color, i){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.i = i;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        

    }
    update(){
        this.x = canvas.width/2 + (Math.cos(angle ) * this.i);
        this.y = canvas.height/2 + (Math.sin(angle ) * this.i);

        
        
        this.draw();
    }
}

/* ******************************* Functions ******************************* */

function animate(){
    requestAnimationFrame(animate);

    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0, canvas.width, canvas.height);

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
    gsap.to(mouse, {x: event.x - canvas.width/2, y: event.y - canvas.height/2, duration:1});
    // mouse.x = event.x - canvas.width/2;
    // mouse.y = event.y - canvas.height/2;

    angle = Math.atan2(mouse.y, mouse.x);
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

let angle ;

var particles = [];
let x = canvas.width/2;
let y = canvas.height/2;
let countParticles = 300
let color = 360/countParticles
for(let i = 0; i < countParticles; i++){
    

    particles.push(new Particule(x+i, y, 10, `hsl(${color * i},100%,50%)`, i));
}

animate();