

let roots = [];
let numRoots = 20;
let numRootsAdd = 4;
let windowWidtht0 = 0;
let windowHeightt0 = 0;
let windowDiagonal = 0;
let fr = 16; // frame rate
let maxfr = fr*10;

let stepLengthRange = [4,24]; // range of length of step

function setup() {
  windowWidtht0 = windowWidth;
  windowHeightt0 = windowHeight-4;
  windowDiagonal = sqrt((windowWidtht0 ** 2)+(windowHeightt0 ** 2));
  createCanvas(windowWidtht0, windowHeightt0);
  angleMode(DEGREES);

  background(0,12,40);

  frameRate(fr);

  for (var i = 0; i < numRoots; i++) {
    roots.push([0,0]);
  }

  push();
  translate(windowWidtht0/2,windowHeightt0/2);
  stroke(0,0,0,0);
  fill(200,200,200,250);
  textSize(48);
  textFont('Georgia');
  text('Rotating Stochastic Paths', -270, -windowHeightt0/4);
  pop();
}

function draw() {

  if(frameCount % maxfr == 1 && frameCount / maxfr <= 15) { // for 15 regens
    for (var i = 0; i < numRootsAdd; i++) { // regen
      roots.push([0,0]);
    }
  }

  push();
  translate(windowWidtht0/2,windowHeightt0/2);
  fill(0,0,0,6);
  let rc = (frameCount*32) % windowDiagonal; //(frameCount % (windowDiagonal ** 0.5))**2 % windowDiagonal;
  if (rc > windowDiagonal)
    rc = windowDiagonal;
  stroke(50,50,50,55+200*(rc/windowDiagonal)**0.8);
  strokeWeight(1.5);
  ellipse(0,0,rc,rc);
  pop();

  push();
  let rs = (frameCount*32)%60;
  translate(mouseX,mouseY);
  rotate(frameCount*19);
  fill(0,0,0,32);
  stroke(250,255,100,100);
  strokeWeight(rs/12);
  if (! (mouseX == 0 && mouseY == 0)) // avoid annoying thing top left
      rect(-rs/2,-rs/2,rs,rs);
  pop();

  push();
  translate(windowWidtht0/2,windowHeightt0/2);
  rotate(frameCount*4);
  stroke(150+(127+frameCount*1.2)%105, frameCount%31, 100+(0.8*frameCount-79)%155);
  let lr = roots.length;
  for (var ir = 0; ir < lr; ir++) {
    strokeWeight((ir+frameCount)%5);
    let r = roots[ir];
    let stepLength = ((ir+frameCount) % stepLengthRange[1]) + stepLengthRange[0];
    let stepAngle = random(0,360);
    let rf = [r[0]+stepLength*cos(stepAngle),r[1]+stepLength*sin(stepAngle)]; // end vertex
    line(r[0],r[1],rf[0],rf[1]);
    roots[ir] = rf;
  }
	pop();
}
