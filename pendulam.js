var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var length;
var radius = 40;
var centerX = 750;
var centerY = 200;
var positionX = 750;
var positionY = 500;

var cancelReq;

var angleDegree;
var angleRadian; 

var g = 10;
var AngularAcc = 0;
var AngularRate = 0;
var damping = 0;

function animate() {

    cancelReq = requestAnimationFrame(animate);

    // clearing the canvas after each time of calling
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    // The ceiling
    c.beginPath();
    c.moveTo(505, 200);
    c.lineTo(1005, 200);
    c.lineWidth = 10;
    c.lineCap = 'round';
    c.strokeStyle = "black";
    c.stroke();

    // to represent it as ceiling
    for(var i = 500; i <= 1000 ; i += 25) {
        c.beginPath();
        c.moveTo(i, 200);
        c.lineTo(i + 20, 180);
        c.lineWidth = 2;
        c.strokeStyle = "black";
        c.stroke();
    }

    // central line
    c.beginPath()
    c.moveTo(750, 150);
    c.lineTo(750, 550);
    c.strokeStyle = 'grey';
    c.lineWidth = 1;
    c.stroke();

    // main calculation of Simple Pendulum
    AngularAcc = g * Math.sin(angleRadian) / length;
    AngularRate += AngularAcc / 3;
    angleRadian -= AngularRate / 3;

    // Damping
    AngularRate *= 0.9997;

    var DisplayDeg = (angleRadian * 180) / Math.PI;

    if(Math.abs(DisplayDeg) == 0) {
        DisplayDeg = 0;
    }

    document.querySelector('#angleSpan').innerHTML = DisplayDeg.toFixed(2);

    // Updating the position of center of the bob
    positionX = centerX + length * (Math.cos(Math.PI / 2 - angleRadian));
    positionY = centerY + length * (Math.sin(Math.PI / 2 - angleRadian));

    // String
    c.beginPath();
    c.moveTo(centerX, centerY);
    c.lineTo(positionX, positionY);
    c.lineWidth = 4;
    c.strokeStyle = "black";
    c.stroke();

    // Bob 
    c.beginPath();
    c.arc(positionX, positionY, radius, 0, Math.PI * 2, false);
    c.strokeStyle = "black";
    c.lineWidth = 7;
    c.stroke();
    c.fillStyle = "grey";
    c.fill();
}

document.getElementById('go').addEventListener('click', function() {
    
    length = Number(document.getElementById('length').value);
    length *= 300;
    
    angleDegree = Number(document.getElementById('angleDeg').value);
    angleRadian = ((angleDegree * Math.PI) / 180)

    g = 10;
    AngularRate = 0;
    AngularAcc = 0;

    window.cancelAnimationFrame(cancelReq);
    animate();
});

document.getElementById('pause').addEventListener('click', function() {
    window.cancelAnimationFrame(cancelReq);
});

document.getElementById('play').addEventListener('click', function() {
    window.cancelAnimationFrame(cancelReq);
    animate();
});

