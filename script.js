let wCount = 4.55;
let colors = [];
let yoff = 0.0;
let waveTransition = 0;
let lastFootX = 0;
let lastFootY = 0;
let feet = [];
let minStrideDist = 60;
let footMirror = 0;
let bg = {
  r: 255,
  g: 255,
  b: 255,
  a: 0
};

function setup() {
  createCanvas(1112, 834);
  noCursor();
  setUpOceanColors();
  background(bg.r, bg.g, bg.b);
}

function draw() {
  background(bg.r, bg.g, bg.b, bg.a);
  let foot = getNewFoot();
  if (foot != null) {
    makeFootPrint(foot.x, foot.y, foot.mirror, foot.angle);
  }
  //startWaves(70);
}

function getNewFoot() {
  let curX = mouseX;
  let curY = mouseY
  if (mouseX > 0 && mouseY > 0 && dist(curX, curY, lastFootX, lastFootY) > minStrideDist) {
    let curAngle = Math.atan2(curY-lastFootY, curX-lastFootX) + radians(90);
    lastFootX = curX;
    lastFootY = curY;
    footMirror += 1;
    return {x: curX, y: curY, mirror: footMirror, angle: curAngle};
  }
  return null;
}

function makeFootPrint(x, y, mirror, angle) {
  push();
  translate(x, y);
  if (mirror%2 == 0) {
    scale(-0.1, 0.1, 0.1);
    rotate(-angle);
  } else {
    scale(0.1);
    rotate(angle);
  }
  stroke(0);
  fill(219, 190, 134);

  let ballWidth = 235;
  let ballLength = 200;
  let bridgeWidth = 150;
  let heelWidth = 160;
  let heelBaseWidth = 80;
  let footCenterX = 180;
  let bridgeY = 300;
  let points = []

  points.push({
    x: footCenterX + 10,
    y: bridgeY - 1.72 * ballLength
  }); // top middle
  points.push({
    x: footCenterX - ballWidth / 2.0 + 35,
    y: bridgeY - 1.7 * ballLength
  });
  points.push({
    x: footCenterX - ballWidth / 2.0,
    y: bridgeY - 1.2 * ballLength
  });
  points.push({
    x: footCenterX - bridgeWidth / 2.0 + 15,
    y: bridgeY - 70
  });
  points.push({
    x: footCenterX - heelWidth / 2.0,
    y: bridgeY + 100
  });
  points.push({
    x: footCenterX - heelBaseWidth / 2.0,
    y: bridgeY + 185
  });
  points.push({
    x: footCenterX + heelBaseWidth / 2.0,
    y: bridgeY + 185
  });
  points.push({
    x: footCenterX + heelWidth / 2.0,
    y: bridgeY + 120
  });
  points.push({
    x: footCenterX + bridgeWidth / 2.0 + 10,
    y: bridgeY - 20
  });
  points.push({
    x: footCenterX + ballWidth / 2.0,
    y: bridgeY - ballLength
  });
  points.push({
    x: footCenterX + ballWidth / 2.0 - 30,
    y: bridgeY - 1.45 * ballLength
  });

  let footprintOutline = 0.2;
  stroke(footprintOutline * bg.r, footprintOutline * bg.g, footprintOutline * bg.b);
  let footprintTransparency = 0.5;
  fill(footprintTransparency * bg.r, footprintTransparency * bg.g, footprintTransparency * bg.b);
  
  beginShape();
  curveVertex(points[points.length - 1].x, points[points.length - 1].y);
  for (let i = 0; i < points.length; i++) {
    curveVertex(points[i].x, points[i].y);
  }
  curveVertex(points[0].x, points[0].y);
  curveVertex(points[1].x, points[1].y);

  endShape();
  pop();
}

function setUpOceanColors() {
  let opac = 50;
  colors.push(color(223, 232, 239, 255));
  colors.push(color(161, 202, 218, opac));
  colors.push(color(57, 137, 184, opac));
  colors.push(color(23, 70, 125, opac));
  colors.push(color(5, 28, 69, opac));

  colors.push(color(5, 28, 69, opac));
}

function startWaves(oceanSpeed) {
  noStroke();
  if (oceanSpeed != 0) {
    oceanSpeed = 70;
  }
  let speed = oceanSpeed;
  waveRate = map(speed, 0, 155, 0.0005, 0.008);
  wCount += waveRate; //0.002

  for (var i = 0; i < colors.length; i++) {
    let y = i * 100 + 200;
    makeWaves(y, y + 100, colors[i], wCount + i * 0.2);
  }
}

function makeWaves(y1, y2, c, myCount) {
  // adapted from: https://p5js.org/examples/math-noise-wave.html
  push();
  rotate(0.2);
  fill(c);
  beginShape();
  let xoff = 0; 
  for (let x = 0; x <= width * 1.2; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, y1, y2) - sin(myCount) * 300 + (200 - waveTransition);
    vertex(x, y);
    xoff += 0.04;
  }
  yoff += 0.001;
  vertex(width * 1.2, height);
  vertex(0, height);
  endShape(CLOSE);
  pop();
}

function keyPressed(){
    save('pix.jpg');
}