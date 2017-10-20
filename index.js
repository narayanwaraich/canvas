var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf, i ;
var lines = finishedLines = [];
var steps = 10; //  10 pixel per frame

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

function Line(x1, y1, lineLength, direction) {
    this.finished = false;
    this.step = 0;
    this.x1 = x1;
    this.y1 = y1;
    this.lineLength = lineLength;
    this.direction = direction;
    this.draw = function() {
      if (this.step === steps) {
        this.finished = true;
        return false;
      }
      ctx.beginPath();
      if (this.direction === 'vertical'){
        ctx.moveTo(this.x1, (this.y1+((this.lineLength / steps)*this.step)-1));
        ctx.lineTo(this.x1, (this.y1+((this.lineLength / steps)*(this.step+1))));
      } else {
        ctx.moveTo((this.x1+((this.lineLength / steps)*this.step)), this.y1);
        ctx.lineTo((this.x1+((this.lineLength / steps)*(this.step+1))), this.y1);
      }
      ctx.stroke();
      this.step++;
      return true;
    }
}


function draw(ts) {
  //console.log(ts);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'red';
  ctx.lineCap = 'butt';
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  i++;
  let x1 = getRandomInt(0, canvas.width);
  let y1 = getRandomInt(0, canvas.height);
  let lineLength = getRandomInt(25, 100);
  let direction = (i%2===0) ? 'horizontal' : 'vertical' ;
  lines.push(new Line(x1, y1, lineLength, direction));
  for (var j = 0; j < lines.length; j++) {
    let animStatus = lines[j].draw();
    if(!animStatus && (j > -1)){
      finishedLines.push(lines[j]);
      lines.splice(j, 1);
    }
  }
  if(i < 50){
    window.requestAnimationFrame(draw);
  }
}

function animate(){
  //ctx.clearRect(0, 0, canvas.width, canvas.width); // clear canvas
//  ctx.translate(canvas.width/2,0);
//  ctx.rotate(Math.PI/4);
  i = 0 ;
  draw();
//  raf = window.requestAnimationFrame(draw);
//  window.cancelAnimationFrame(raf);
}

animate();
