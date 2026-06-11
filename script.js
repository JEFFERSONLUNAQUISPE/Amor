// ==========================================
// CANVAS
// ==========================================

const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

function resize() {


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


}

resize();

window.addEventListener("resize", resize);

// ==========================================
// ESTRELLAS
// ==========================================

const stars = [];

const STAR_COUNT = 3500;

for(let i = 0; i < STAR_COUNT; i++){


stars.push({

    x: Math.random() * window.innerWidth,

    y: Math.random() * window.innerHeight,

    size: Math.random() * 2.5,

    opacity: Math.random(),

    speed: Math.random() * 0.05

});


}

// ==========================================
// GALAXIA
// ==========================================

const galaxyParticles = [];

const PARTICLES = 2500;

for(let i = 0; i < PARTICLES; i++){
const angle = Math.random() * Math.PI * 2;

const radius = Math.random() * 600;

galaxyParticles.push({

    angle,

    radius,

    size: Math.random() * 2,

    speed: 0.0003 + Math.random() * 0.0005

});


}

// ==========================================
// ESTRELLAS FUGACES
// ==========================================

const meteors = [];

function createMeteor(){


meteors.push({

    x: Math.random() * window.innerWidth,

    y: -100,

    length: 200 + Math.random()*100,

    speed: 8 + Math.random()*5,

    opacity: 1

});


}

setInterval(createMeteor, 4000);

// ==========================================
// DIBUJAR
// ==========================================

function drawBackground(){


ctx.fillStyle = "rgba(0,0,0,0.15)";

ctx.fillRect(

    0,
    0,
    canvas.width,
    canvas.height

);


}

// ==========================================
// ESTRELLAS
// ==========================================

function drawStars(){


stars.forEach(star => {

    ctx.beginPath();

    ctx.fillStyle =

    `rgba(255,255,255,${star.opacity})`;

    ctx.arc(

        star.x,
        star.y,
        star.size,
        0,
        Math.PI*2

    );

    ctx.fill();

    star.opacity +=

    (Math.random()-0.5) * 0.02;

    if(star.opacity > 1)
    star.opacity = 1;

    if(star.opacity < 0.1)
    star.opacity = 0.1;

});


}

// ==========================================
// GALAXIA ESPIRAL
// ==========================================

let galaxyRotation = 0;

function drawGalaxy(){

const cx = canvas.width/2;
const cy = canvas.height/2;

galaxyParticles.forEach(p => {

    p.angle += p.speed;

    const spiral =
    p.radius * 0.06;

    const x =

    cx +

    Math.cos(

        p.angle + galaxyRotation

    ) * p.radius +

    Math.cos(

        p.angle * 4

    ) * spiral;

    const y =

    cy +

    Math.sin(

        p.angle + galaxyRotation

    ) * p.radius * 0.55 +

    Math.sin(

        p.angle * 4

    ) * spiral;

    ctx.beginPath();

    const glow =

    Math.random()*0.5 + 0.5;

    ctx.fillStyle =

    `rgba(210,170,255,${glow})`;

    ctx.arc(

        x,
        y,
        p.size,
        0,
        Math.PI*2

    );

    ctx.fill();

});

galaxyRotation += 0.0002;

}

// ==========================================
// NÚCLEO GALAXIA
// ==========================================

function drawCore(){

const cx = canvas.width/2;
const cy = canvas.height/2;

const gradient =

ctx.createRadialGradient(

    cx,
    cy,
    0,

    cx,
    cy,
    350

);

gradient.addColorStop(
    0,
    "rgba(220,180,255,0.9)"
);

gradient.addColorStop(
    0.4,
    "rgba(180,90,255,0.4)"
);

gradient.addColorStop(
    1,
    "rgba(0,0,0,0)"
);

ctx.fillStyle = gradient;

ctx.beginPath();

ctx.arc(

    cx,
    cy,
    350,
    0,
    Math.PI*2

);

ctx.fill();

}

// ==========================================
// METEOROS
// ==========================================

function drawMeteors(){

meteors.forEach((meteor,index)=>{

    ctx.beginPath();

    const grad =

    ctx.createLinearGradient(

        meteor.x,
        meteor.y,

        meteor.x - meteor.length,
        meteor.y - meteor.length

    );

    grad.addColorStop(
        0,
        `rgba(255,255,255,
        ${meteor.opacity})`
    );

    grad.addColorStop(
        1,
        "transparent"
    );

    ctx.strokeStyle = grad;

    ctx.lineWidth = 2;

    ctx.moveTo(
        meteor.x,
        meteor.y
    );

    ctx.lineTo(

        meteor.x - meteor.length,

        meteor.y - meteor.length

    );

    ctx.stroke();

    meteor.x += meteor.speed;

    meteor.y += meteor.speed;

    meteor.opacity -= 0.003;

    if(meteor.opacity <= 0){

        meteors.splice(index,1);

    }

});

}

// ==========================================
// CONTADOR DE DIAS
// ==========================================

function updateCounter(){


const startDate =

new Date("2026-06-04");

const now = new Date();

const diff =

now - startDate;

const days =

Math.floor(

    diff / (1000*60*60*24)

);

const counter =

document.getElementById("days");

if(counter){

    counter.textContent =

    days;

}


}

setInterval(
updateCounter,
1000
);

updateCounter();

// ==========================================
// ANIMACIÓN
// ==========================================

function animate(){


requestAnimationFrame(
    animate
);

drawBackground();

drawStars();

drawGalaxy();

drawCore();

drawMeteors();

}

animate();
const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const music = document.getElementById("music");

startBtn.addEventListener("click", () => {


music.play();

welcome.classList.add("fade-out");

setTimeout(() => {

    welcome.style.display = "none";

}, 1500);


});
