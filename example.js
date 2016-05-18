var canvas=document.getElementById('canvas'),
    context=canvas.getContext('2d'),
    controls=document.getElementById('controls'),
    animateButton=document.getElementById('animateButton'),
    animationEffect=document.getElementById('AnimationEffectSelect'),
    paused=true,
    effect;

//虚线框
moveToFunction=CanvasRenderingContext2D.prototype.moveTo;
CanvasRenderingContext2D.prototype.lastMoveToLocation={};
CanvasRenderingContext2D.prototype.moveTo=function(x,y){
    moveToFunction.apply(context,[x,y]);
    this.lastMoveToLocation.x=x;
    this.lastMoveToLocation.y=y;
};
CanvasRenderingContext2D.prototype.dashedLineTo=
  function(x,y,dashLength){
    dashLength=dashLength===undefined?5:dashLength;
    var startX=this.lastMoveToLocation.x;
    var startY=this.lastMoveToLocation.y;
    var deltaX=x-startX;
    var deltaY=y-startY;
    var numDashes=Math.floor(Math.sqrt(deltaX*deltaX+deltaY*deltaY)/dashLength);

    for(var i=0;i<numDashes;++i){
        this[i%2===0?'moveTo':'lineTo'](startX+(deltaX/numDashes)*i,
            startY+(deltaY/numDashes)*i);
    }
    this.moveTo(x,y);
  };
context.lineWidth=3;
context.strokeStyle='rgba(255,190,67,0.75)';
context.moveTo(20,20);
context.dashedLineTo(context.canvas.width-20,20);
context.dashedLineTo(context.canvas.width-20,context.canvas.height-20);
context.dashedLineTo(20,context.canvas.height-20);
context.dashedLineTo(20,20);
context.dashedLineTo(canvas.width-20,canvas.height-20);
context.moveTo(canvas.width-20,20);
context.dashedLineTo(20,canvas.height-20);
context.moveTo(canvas.width/2,20);
context.dashedLineTo(canvas.width/2,canvas.height-20);
context.moveTo(20,canvas.height/2);
context.dashedLineTo(canvas.width-20,canvas.height/2);
context.stroke(); 
//

var x=20,y=20,x1=20,y1=20,x2=20,y2=canvas.height-20,
    x3=canvas.width-20,y3=canvas.height-20,x4=canvas.width-20,y4=20
    x5=canvas.width-20,y5=canvas.height-20;
var interval;    
function drawFrame(){
    if(effect=='noOverlap')
      context.clearRect(0,0,canvas.width,canvas.height);//不同效果
    context.save();
    context.beginPath();
    context.lineWidth=3;
    context.strokeStyle='rgba(255,190,67,0.75)';
    context.moveTo(20,20);
    context.dashedLineTo(context.canvas.width-20,20);
    context.dashedLineTo(context.canvas.width-20,context.canvas.height-20);
    context.dashedLineTo(20,context.canvas.height-20);
    context.dashedLineTo(20,20);
    context.dashedLineTo(canvas.width-20,canvas.height-20);
    context.moveTo(canvas.width-20,20);
    context.dashedLineTo(20,canvas.height-20);
    context.moveTo(canvas.width/2,20);
    context.dashedLineTo(canvas.width/2,canvas.height-20);
    context.moveTo(20,canvas.height/2);
    context.dashedLineTo(canvas.width-20,canvas.height/2);
    context.stroke(); 
    context.restore();
    context.strokeStyle='black';
    //1
    context.save();
    context.beginPath();
    var gradient=context.createLinearGradient(20,canvas.height/2,
        canvas.width-20,canvas.height/2);
    gradient.addColorStop(0,'blue');
    gradient.addColorStop(0.25,'white');
    gradient.addColorStop(0.5,'purple');
    gradient.addColorStop(0.75,'red');
    gradient.addColorStop(1,'yellow');
    context.fillStyle=gradient;
    context.arc(x,canvas.height/2,50,0,Math.PI*2,true);
    context.stroke();
    context.fill();
    if(x>canvas.width-20)
        x=20;
    x+=20;
    context.restore();
    //2
    context.save();
    context.beginPath();
    var gradient=context.createLinearGradient(20,canvas.height/2,
        canvas.width-20,canvas.height/2);
    gradient.addColorStop(1,'aqua');
    gradient.addColorStop(0.75,'fuchsia');
    gradient.addColorStop(0.5,'gray');
    gradient.addColorStop(0.25,'BlueViolet');
    gradient.addColorStop(0,'Brown');
    context.fillStyle=gradient;
    context.arc(x3,canvas.height/2,50,0,Math.PI*2,true);
    context.stroke();
    context.fill();
    if(x3<20)
        x3=canvas.width-20;
    x3-=20;
    context.restore();
    //3
    context.save();
    context.beginPath();
    var gradient=context.createLinearGradient(20,20,
        canvas.width-20,canvas.height-20);
    gradient.addColorStop(0,'aqua');
    gradient.addColorStop(0.25,'fuchsia');
    gradient.addColorStop(0.5,'gray');
    gradient.addColorStop(0.75,'BlueViolet');
    gradient.addColorStop(1,'Brown');
    context.fillStyle=gradient;
    context.arc(x1,y1,50,0,Math.PI*2,true);
    context.stroke();
    context.fill();
    if(y1>canvas.height-20||x1>canvas.width-20)
    {
         x1=20;
         y1=20;
    }
    x1+=30;   
    y1+=20;
    context.restore();

    context.save();
    context.beginPath();
    var gradient=context.createLinearGradient(20,20,
        canvas.width-20,canvas.height-20);
    gradient.addColorStop(0,'aqua');
    gradient.addColorStop(0.25,'fuchsia');
    gradient.addColorStop(0.5,'green');
    gradient.addColorStop(0.75,'BlueViolet');
    gradient.addColorStop(1,'silver');
    context.fillStyle=gradient;
    context.arc(x5,y5,50,0,Math.PI*2,true);
    context.stroke();
    context.fill();
    if(y5<20||x5<20)
    {
         x5=canvas.width-20;
         y5=canvas.height-20;
    }
    x5-=30;   
    y5-=20;
    context.restore();
    //4
    context.save();
    context.beginPath();
    var gradient=context.createLinearGradient(20,20,
        canvas.width-20,canvas.height-20);
    gradient.addColorStop(0,'aqua');
    gradient.addColorStop(0.25,'fuchsia');
    gradient.addColorStop(0.5,'green');
    gradient.addColorStop(0.75,'BlueViolet');
    gradient.addColorStop(1,'silver');
    context.fillStyle=gradient;
    context.arc(x2,y2,50,0,Math.PI*2,true);
    context.stroke();
    context.fill();
    if(y2<20||x2>canvas.width-20)
    {
         x2=20;
         y2=canvas.height-20;
    }
    x2+=30;   
    y2-=20;
    context.restore();
    //5
    context.save();
    context.beginPath();
    var gradient=context.createLinearGradient(canvas.width-20,20,
        20,canvas.height-20);
    gradient.addColorStop(1,'red');
    gradient.addColorStop(0.75,'blue');
    gradient.addColorStop(0.5,'gray');
    gradient.addColorStop(0.25,'orange');
    gradient.addColorStop(0,'silver');
    context.fillStyle=gradient;
    context.arc(x4,y4,50,0,Math.PI*2,true);
    context.stroke();
    context.fill();
    if(y4>canvas.height-20||x4<20)
    {
         x4=canvas.width-20;
         y4=20;
    }
    x4-=30;   
    y4+=20;
    context.restore();
    //6
    context.save();
    context.beginPath();
    var gradient=context.createLinearGradient(canvas.width/2,20,
        canvas.width/2,canvas.height-20);
    gradient.addColorStop(0,'aqua');
    gradient.addColorStop(0.25,'yellow');
    gradient.addColorStop(0.5,'teal');
    gradient.addColorStop(0.75,'orange');
    gradient.addColorStop(1,'aqua');
    context.fillStyle=gradient;
    context.arc(canvas.width/2,y,50,0,Math.PI*2,true);
    context.stroke();
    context.fill();
    if(y>canvas.height-20)
        y=20;
    y+=20;
    context.restore();
    //7
    context.save();
    context.beginPath();
    var gradient=context.createLinearGradient(canvas.width/2,20,
        canvas.width/2,canvas.height-20);
    gradient.addColorStop(0,'teal');
    gradient.addColorStop(0.25,'yellow');
    gradient.addColorStop(0.5,'navy');
    gradient.addColorStop(0.75,'orange');
    gradient.addColorStop(1,'teal');
    context.fillStyle=gradient;
    context.arc(canvas.width/2,y3,50,0,Math.PI*2,true);
    context.stroke();
    context.fill();
    if(y3<20)
        y3=canvas.height-20;
    y3-=20;
    context.restore();
}
animateButton.onclick=function(e){
    if(animateButton.value == 'Animate') {
        interval = setInterval(drawFrame, 1000 / 10);
        animateButton.value = 'Pause';
    }
    else {
        clearInterval(interval);
        animateButton.value = 'Animate';
    }
}; 
animationEffect.onchange = function (e) {
     effect=animationEffect.value;
};

