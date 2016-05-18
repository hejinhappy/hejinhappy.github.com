// 定义canvas元素
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

// 定义变量
var FONT_HEIGHT = 15,
    MARGIN = 30,//申请变量
    HAND_TRUNCATION = canvas.width / 25,
    HOUR_HAND_TRUNCATION = canvas.width / 10,
    NUMERAL_SPACING = 20,
    RADIUS = canvas.width / 2 - MARGIN,
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;
//  定义其他所需变量

// Functions.....................................................
function drawCircle() {
    context.save();
    //   画钟面的圆
    context.beginPath();
    context.arc(canvas.width / 2,canvas.height / 2,150,0,Math.PI * 2,true);
    context.lineWidth = 2.0;    //线宽
    context.strokeStyle = 'rgb(123, 0, 180)';   //线的颜色
    context.stroke();   //描边
    context.fillStyle = 'rgba(54,122,123,0.5)';
    context.fill();
    context.restore();
}

function drawNumerals() {
    var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        angle = 0,
        numeralWidth = 0;
    context.fillStyle = '#111';
    numerals.forEach(function (numeral) {
    angle = Math.PI / 6 * (numeral - 3);
    numeralWidth = context.measureText(numeral).width;
    context.fillText(numeral,
    canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2,
    canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3);
    });
}

function drawCenter() {
    //    画钟面正中的圆点
    context.save();
    context.beginPath();
    context.arc(canvas.width / 2,canvas.height / 2,10,RADIUS,0,Math.PI * 2,true);
    context.fillStyle = 'rgb(0, 234, 255)';
    context.fill();   //填充
    context.restore();

}

function drawHand(loc, isHour) {
    var angle = loc / 360*(Math.PI * 2),
        handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION : RADIUS - HAND_TRUNCATION;
    context.save();
    context.beginPath();//路径开始
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2 + Math.sin(angle) * handRadius,
    canvas.height / 2 - Math.cos(angle) * handRadius);
    context.stroke();
    context.restore();
}
function drawTicks(){
    var angle;
    for(var i=0;i<60;++i)
    {
        angle=i*Math.PI/30;
        if(i%5==0)
        {
            context.save();
            context.beginPath();//路径开始
            context.lineWidth=3;
            context.moveTo(canvas.width / 2 + Math.sin(angle) * RADIUS,
            canvas.height / 2 - Math.cos(angle) * RADIUS);
            context.lineTo(canvas.width / 2 + Math.sin(angle) * (RADIUS-20),
            canvas.height / 2 - Math.cos(angle) * (RADIUS-20) );
            context.strokeStyle='black';
            context.stroke();
            context.restore();
        }
        else
        {
        
            context.save();
            context.beginPath();//路径开始
            context.lineWidth=1;
            context.moveTo(canvas.width / 2 + Math.sin(angle) * RADIUS,
            canvas.height / 2 - Math.cos(angle) * RADIUS);
            context.lineTo(canvas.width / 2 + Math.sin(angle) * (RADIUS-8),
            canvas.height / 2 - Math.cos(angle) * (RADIUS-8) );
            context.strokeStyle='black';
            context.stroke();
            context.restore();
        }

    }
}
function drawHands() {
    var date = new Date,
        hour = date.getHours(),
        minute=date.getMinutes(),
        second=date.getSeconds();

    hour = hour > 12 ? hour - 12 : hour;
    context.strokeStyle = 'rgb(255, 0, 0)';
    context.lineWidth = 5;
    drawHand(hour * (360 / 12)+minute * (360 / 720) + second /120, true, 0.5);
    context.strokeStyle = 'rgb(255, 255, 0)';
    context.lineWidth = 3;
    drawHand(minute * (360 / 60) + second /10, false, 0.2);
    context.strokeStyle = 'rgb(0, 255, 0)';
    context.lineWidth = 2;
    drawHand(second * (360 / 60),false, 0.2);
}
function drawBackground() {     
    var gra = context.createRadialGradient(canvas.width / 2, canvas.height/ 2
                                    , 0, canvas.width / 2, canvas.height / 2, RADIUS);
    gra.addColorStop(0, '#ffffff'); 
    gra.addColorStop(1, '#dddddf');
    context.save();
    context.fillStyle = gra;
    context.shadowColor='rgba(0,0,0,0.7)';
    context.shadowOffsetX=6;
    context.shadowOffsetY=6;
    context.shadowBlur=6;
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, RADIUS + 2, 0, Math.PI * 2, true);
    context.strokeStyle='rgba(0,0,0,0.5)';
    context.stroke();
    context.fill();
    context.restore();
}
function drawPicture() {
    var image = new Image();
    image.src = 'clock.png'; 
    image.onload = function() {
        context.drawImage(image, canvas.width / 2 - 40,canvas.height / 2 - 45);
    };
}
function drawClock() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground() ;
    drawCircle();
    drawCenter();
    drawNumerals();
    drawHands();
    drawTicks();
}


// Initialization................................................

context.font = FONT_HEIGHT + 'px Arial';
loop = setInterval(drawClock, 1000);
