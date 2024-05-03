/* ******************************* Classes ******************************* */

class Particule{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.friction = 0.99;
        this.gravity = 0.1;
        
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
    update(){
        this.x += this.velocity.x;
        this.velocity.x *= this.friction;
        this.y += this.velocity.y;
        this.velocity.y += this.gravity;
        if(this.y + this.radius > canvas.height){
            for (let i = 0 ; i < particles.length; i++){
                if(particles[i] === this){
                    particles.splice(i, 1);
                    break;
                }
            }
        }
        
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
addEventListener('click',(event)=>{
    const fireworksCount = 100;
    const angle = (Math.PI * 2) / fireworksCount;
    for(let i = 0; i < fireworksCount; i++){
        let x = event.pageX;
        let y = event.pageY ;
        let radius = Math.random() * 3 +3;
        let color = rgb();

        particles.push(new Particule(x, y, radius, color, {
            x: Math.cos(angle * i) * (Math.random() * 10),
            y: Math.sin(angle * i) * (Math.random() * 10)
        }));
    }
})


animate();