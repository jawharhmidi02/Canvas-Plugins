/* ******************************* Classes ******************************* */

class Bubble{
    constructor(x,y,r,m,colour,type=false){
        this.x = x;
        this.y = y;
        this.r = r;
        this.mass = m;
        this.colour = colour;
        this.velocity = {
            x:(Math.round(Math.random()) === 1 ? 1 : -1),
            y:(Math.round(Math.random()) === 1 ? 1 : -1)
        };
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.strokeStyle = this.colour;
        // ctx.font = "5px serif";
        // ctx.fillText(this.mass,this.x,this.y);
        ctx.stroke();
        if(calculateDistance(this.x,this.y,mouse.x,mouse.y)<100){
            ctx.fillStyle = 'red';
            ctx.fill();
        }
    }
    update(){
        if(this.x + this.r > canvas.width || this.x - this.r < 0){
            this.velocity.x = -this.velocity.x;
        }

        if(this.y + this.r > canvas.height || this.y - this.r < 0){
            this.velocity.y = -this.velocity.y;
        }

        for (let i = 0; i < Circles.length; i++) {
            if(this != Circles[i]){
                if (checkCollision(this,Circles[i])) {
                    resolveCollision(this,Circles[i]);
                }
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

/* ******************************* Implimentation ******************************* */

const canvas = document.querySelector('.canvas');   
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

var Circles = [];
for (let x = 0; x < 300; x++) {
    const r = 15;
    let x = (Math.random() * (canvas.width - r * 2)) + r;
    let y = (Math.random() * (canvas.height - r * 2)) + r;
    // const m = Math.round((Math.random() * 2) + 1);
    const m = 2;
    const colour = 'red';

    if(x != 0){
        for (let i = 0; i < Circles.length; i++) {
            if(calculateDistance(x,y,Circles[i].x,Circles[i].y) < r + Circles[i].r){
                x = (Math.random() * (canvas.width - r * 2)) + r;
                y = (Math.random() * (canvas.height - r * 2)) + r;
                i=-1;
                continue;
            }
        }
    }
    Circles.push(new Bubble(x,y,r,m,colour));
}

var mouse = {x:0,y:0};
document.addEventListener('mousemove',(event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

animate();

/* ******************************* Functions ******************************* */

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    Circles.forEach(circle => { 
        circle.update();
        circle.draw();
    });

    requestAnimationFrame(animate);
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function checkCollision(bubble1, bubble2) {
    const distance = calculateDistance(bubble1.x, bubble1.y, bubble2.x, bubble2.y);             
    if (distance < bubble1.r + bubble2.r) {
        return true;
    }
    return false;
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}
