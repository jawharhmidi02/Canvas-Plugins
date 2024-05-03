class Bubble{
    constructor(x,y,dy,dx,r,colour){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.colour = colour;
        this.friction = 0.7;
        this.gravity = 1; 
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
    update(){
        if(this.y + this.r > canvas.height){
            this.dy = -Math.abs(this.dy) * this.friction; 

           
            if (Math.abs(this.dy) < 1.5) {
                this.dy = 0;
                this.y = canvas.height - this.r;
                this.gravity = 0; 
            }
        }
        else{
            this.dy += this.gravity;
        }
        if(this.x + this.r > canvas.width || this.x - this.r < 0){
            this.dx = -this.dx;

        }
        if(Math.abs(this.dx) < 1.4){
            this.dx = 0;
        }
        this.dx*=0.999;
        this.y+=this.dy;
        // this.x+=this.dx  ;
    }
}
const canvas = document.querySelector('.canvas');   
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let bubble = new Bubble(canvas.width/2,canvas.height/2,7,10,40,'red');

animate();


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    bubble.draw();
    bubble.update();
    
    requestAnimationFrame(animate);
}