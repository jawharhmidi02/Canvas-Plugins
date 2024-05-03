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
        this.x += Math.cos(this.i) *5;
        this.y += Math.sin(this.i) *5;
        
        this.draw();
    }
}

/* ******************************* Functions ******************************* */

function animate(){
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.1)";
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

function getParticules(){
    for(let i = 0; i < 20; i++){
        let x = mouse.x + Math.cos(i)*50;
        let y = mouse.y + Math.sin(i)*50;
        particles.push(new Particule(x, y, 3, `hsl(${color},50%,50%)`, i));
    }   
    setTimeout(getParticules, 100);
}

function changeColor(){
    color += 10;
    setTimeout(changeColor, 1000);
}
/* ******************************* Implimentations ******************************* */

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

var mouse = {x: canvas.width/2, y: canvas.height/2};

var particles = [];
var color = 0;
getParticules();
changeColor();
animate();