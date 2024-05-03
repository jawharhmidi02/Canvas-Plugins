/* ******************************* Classes ******************************* */

class Stars{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.distanceFromCenter = getDistance(x, y, canvas.width/2, canvas.height/2);
        // this.angle = Math.atan2(canvas.height/2 - y, canvas.width/2 - x);
        this.oldPoints = {x: x, y: y};
        this.lastPoints = {x: x, y: y};
        this.radian = Math.random() * Math.PI *2;
        this.velocity = 0.005
        this.slowdown = false
        
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
    update(){
        
        this.radian += this.velocity;

        if (this.slowdown) {
            if(this.velocity > 0.001){
                this.velocity = this.velocity * 0.99;
            }
            else{
                this.velocity = 0.001;
                this.slowdown = false;
            }
        }


        this.x =  canvas.width/2 + Math.cos(this.radian) * this.distanceFromCenter;
        this.y =  canvas.height/2 + Math.sin(this.radian) * this.distanceFromCenter;

        this.draw();
    }
}

/* ******************************* Functions ******************************* */

function animate(){
    requestAnimationFrame(animate);

    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });
}

function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

document.addEventListener('keydown', (event)=>{
    particles.forEach(particle => {
        particle.velocity = particle.velocity * 1.05;
        if (particle.velocity > 0.05) {
            particle.velocity = 0.05;
        }
    })
})
document.addEventListener('keyup', (event)=>{
    particles.forEach(particle => {
        particle.slowdown = true
    })
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
for(let i = 0; i < 400; i++){
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let radius = Math.random() * 2 ;
    let color = rgb();

    particles.push(new Stars(x, y, radius, color));
}

animate();