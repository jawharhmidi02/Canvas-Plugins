import * as Dat from './dat.gui-master/build/dat.gui.module.js';

/* ******************************* Classes ******************************* */

class Wave{
    constructor(x, y, amplitude, waveLength){
        this.x = x;
        this.y = y;
        this.amplitude = amplitude;
        this.waveLength = waveLength;
        this.increment = 0.01;
        // this.h = 0;
        // this.plus = 6;
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.x-10, this.y);
        for(let i = 0; i< canvas.width; i++){
            ctx.lineTo(i, this.y + (Math.sin(i * this.waveLength + this.increment) * this.amplitude * Math.sin(this.increment)));
        }
        ctx.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(this.increment))}, ${strokeColor.s}%, ${strokeColor.l}%)`
        ctx.stroke();
    }
    update(){
        // this.h+=this.plus;
        // if(this.h>360 || this.h<0){
        //     this.plus*=-1;
        // }
        this.y = details.y;
        this.amplitude = details.amplitude;
        this.waveLength = details.waveLength;
        this.increment+=details.frequency;

        this.draw();
    }
}

/* ******************************* Functions ******************************* */
function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    wave.forEach(wave => {wave.update()});

}

/* ******************************* Implimentations ******************************* */

const dat = new Dat.GUI();

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');


var wave = [];
for (let i = 0; i < 1; i++) {
    wave.push(new Wave(0, canvas.height/2, 50, 0.01));
}

const details={
    y: canvas.height/2,
    waveLength: 0.01,
    amplitude: 100,
    frequency: 0.02
}
const strokeFolder = dat.addFolder('Stroke');
strokeFolder.add(details, 'y', 0, canvas.height);
strokeFolder.add(details, 'waveLength', 0.01, 0.1);
strokeFolder.add(details, 'amplitude', 0, 100);
strokeFolder.add(details, 'frequency', -0.1, 0.1);
strokeFolder.open();


const strokeColor = {
    h: 100,
    s: 50,
    l: 50
}
const colorFolder = dat.addFolder('Stroke Color');
colorFolder.add(strokeColor, 'h', 0, 255);
colorFolder.add(strokeColor, 's', 0, 100);
colorFolder.add(strokeColor, 'l', 0, 100);
colorFolder.open();


const backgroundColor = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.01
}
const backgroundFolder = dat.addFolder('Background Color');
backgroundFolder.add(backgroundColor, 'r', 0, 255);
backgroundFolder.add(backgroundColor, 'g', 0, 255);
backgroundFolder.add(backgroundColor, 'b', 0, 255);
backgroundFolder.add(backgroundColor, 'a', 0, 0.1);
backgroundFolder.open();


animate();