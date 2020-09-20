

let price;
let step = 0;
let direction = 1;
let perimetert0 = 0;
let windowWidtht0 = 0;
let windowHeightt0 = 0;
let xCoin = 0;
let yCoin = 0;

function setup() {
  windowWidtht0 = windowWidth;
  windowHeightt0 = windowHeight-4;
  perimetert0 = 2*(windowWidtht0+windowHeightt0);
  createCanvas(windowWidtht0, windowHeightt0);
  angleMode(DEGREES);

  background(20);

  price = windowHeight/2;
  frameRate(12);
}

function draw() {


  push();
  if(step*10>windowWidth)
    direction = -1;
  else if(direction == -1 && step < 1)
    direction = 1;

  step += direction;

  fill(0,0,0,3);
  stroke(0,0,0,3);
  rect(0,0,windowWidth,windowHeight-4);

  //translate(-10,0);
  let delta = random(-50,50);
  let newprice = price+delta;
  if(newprice < 0){
    newprice += 20;
    delta += 20;
  }
  if(newprice > windowHeight){
    newprice -= 20;
    delta -= 20;
  }
  let quantile1 = random(5,50);
  let quantile2 = random(0,quantile1/2);
  let quantile3 = random(0,quantile1/2);
  if(delta<0) {
    fill(0,220,20);
    stroke(0,220,20);
  } else {
    fill(240,20,0);
    stroke(240,20,0);
  }
  line(step*10 + 3,newprice-quantile1/2-quantile2,step*10 + 3,newprice+quantile1/2+quantile3);
  rect(step*10,newprice-quantile1/2,6,quantile1);
  price = newprice;
  pop();

	push();
	translate(mouseX,mouseY);
	rotate(0.1*frameCount);
  stroke(0,0,0,0);
  fill(240,220,0,100);
  for (var iCoin = 0; iCoin < 2; iCoin++) {
    let diameter = random(2,6);
    let distance = random(0,8)*random(0,8);
    let angle = random(1,360);
    ellipse(xCoin+distance*cos(angle),yCoin+distance*sin(angle),diameter,diameter);
  }
	pop();
}
