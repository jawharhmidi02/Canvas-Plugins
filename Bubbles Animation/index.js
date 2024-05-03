class Bubble{
    constructor(x,y,dx,dy,r,colour){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.colour = colour;

    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
    update(){
        if(this.x + this.r > canvas.width || this.x - this.r < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.r > canvas.height || this.y - this.r < 0){
            this.dy = -this.dy;
        } 
        if(this.x + this.r > canvas.width || this.x - this.r < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.r > canvas.height || this.y - this.r < 0){
            this.dy = -this.dy;
        } 
        if(this.x + this.r > canvas.width || this.x - this.r < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.r > canvas.height || this.y - this.r < 0){
            this.dy = -this.dy;
        }
        if(mouseXY.x - this.x < 50 && mouseXY.x - this.x > -50 && mouseXY.y - this.y < 50 && mouseXY.y - this.y > -50){
            if(this.r<50){
                this.r += 5;
                this.dx = 0;
                this.dy = 0;
            }
        }
        else if(this.r > 10){
            if(this.sr<2){
                this.r = Math.random()  + 10
            }
            else{
                this.r -=1
            }
            this.dx = (Math.random() + 0.5)  * (Math.round(Math.random()) === 1 ? 1 : -1);
            this.dy = (Math.random() + 0.5)  * (Math.round(Math.random()) === 1 ? 1 : -1);
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}
function animate(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < bubbleArray.length; i++){
        bubbleArray[i].update();
    }
    requestAnimationFrame(animate);
}
function rgb(){
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let o = Math.random()+0.3;
    return `rgb(${r},${g},${b},${o})`;
}

const canvas = document.querySelector('.canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
var bubbleArray = [];
for (let i = 0; i < 2000; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var dx = (Math.random() + 0.5)  * (Math.round(Math.random()) === 1 ? 1 : -1);
    var dy = (Math.random() + 0.5)  * (Math.round(Math.random()) === 1 ? 1 : -1);
    var r = Math.random()  + 10;
    x = x < r ? r : x;
    x = x > canvas.width - r ? canvas.width - r : x;
    y = y < r ? r : y;
    y = y > canvas.height - r ? canvas.height - r : y;

    var colour = rgb();
    bubbleArray[i] = new Bubble(x,y,dx,dy,r,colour);
}
var mouseXY = {x:-100,y:-100};
window.addEventListener('mousemove',function(e){
    // let clientXright = e.clientX+50;
    // let clientXleft = e.clientX-50;
    // let clientYtop = e.clientY-50;
    // let clientYbottom  = e.clientY+50;
    // for (let i = 0; i < bubbleArray.length; i++) {
    //     if(bubbleArray[i].x < clientXright && bubbleArray[i].x > clientXleft && bubbleArray[i].y < clientYbottom && bubbleArray[i].y > clientYtop){
    //         bubbleArray[i].r = 40;
    //         bubbleArray[i].dx = 0;
    //         bubbleArray[i].dy = 0;
    //     }
    // }
    mouseXY.x = e.clientX;
    mouseXY.y = e.clientY;
})
animate();
