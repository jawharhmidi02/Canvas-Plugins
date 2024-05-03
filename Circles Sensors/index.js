class Bubble{
    constructor(x,y,r,colour,type=false){
        this.x = x;
        this.y = y;
        this.r = r;
        this.colour = colour;
        this.type = type;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.strokeStyle = 'white'
        ctx.stroke();
    }
    update(){
        if(this.type){
            this.x = mouseXY.x;
            this.y = mouseXY.y;
            if(calculateDistance(this.x,this.y,bubble.x,bubble.y)-bubble.r-this.r <= 0){
                bubble.colour = 'black';
            }
            else{
                bubble.colour = 'red';
            }
        }
    }
}
const canvas = document.querySelector('.canvas');   
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

var bubble = new Bubble(canvas.width/2,canvas.height/2,120,'red');

var mouseXY ={x:-100,y:-100};
var mouse = new Bubble(mouseXY.x,mouseXY.y,30,'black',true);

animate();


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    bubble.draw();
    mouse.draw();
    bubble.update();
    mouse.update();

    requestAnimationFrame(animate);
}
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
document.addEventListener('mousemove',(e)=>{
    mouseXY.x = e.clientX;
    mouseXY.y = e.clientY;
})