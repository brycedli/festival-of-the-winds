// Example based on https://www.youtube.com/watch?v=urR596FsU68
// 5.17: Introduction to Matter.js - The Nature of Code
// by @shiffman

// module aliases

var Engine = Matter.Engine,
  //    Render = Matter.Render,
  World = Matter.World,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;

// let s3Url = "https://cstudiocoral.s3.amazonaws.com/";
let engine;
let world;
let words = [];
let ligatures = [];
let boundaries = [];
let kites = [];

let canvas;
let glCanvas;
let glShader;
let windDirection;
let glDensity = 5;
let kiteSpritesURL = ["/assets/kites/arrowblue.png", "/assets/kites/arroworange.png","/assets/kites/arrowlime.png",
                  "/assets/kites/boxblue.png", "/assets/kites/boxorange.png","/assets/kites/boxlime.png",
                  "/assets/kites/diamondblue.png", "/assets/kites/diamondorange.png","/assets/kites/diamondlime.png"];
let kiteSprites = [];
let kiteSpritesWhite = ["/assets/kites/arrowwhite.png", "/assets/kites/boxwhite.png","/assets/kites/diamondwhite.png"];

let festival = "https://cstudiocoral.s3.amazonaws.com/festivalwhite.png";
let of = "https://cstudiocoral.s3.amazonaws.com/ofwhite.png";
let the = "https://cstudiocoral.s3.amazonaws.com/thewhite.png";
let winds = "https://cstudiocoral.s3.amazonaws.com/windswhite.png";

let imageChange = false;

let transistionTo;
let transistionFrom;

function preload() {
  for (let i = 0; i < kiteSpritesURL.length; i++){
    kiteSprites[i] = loadImage(kiteSpritesURL[i]);
  }
  
  festival = loadImage(festival);
  of = loadImage(of);
  the = loadImage(the);
  winds = loadImage(winds);
  glShader = loadShader('/shaders/basic.vert', '/shaders/basic.frag');;
}
function setup() {
  document.querySelector('canvas').style.pointerEvents = 'auto';
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  glCanvas = createGraphics(canvas.width, canvas.height, WEBGL);
  glCanvas.pixelDensity(1/glDensity);

  // an initial color to look for
  colorToMatch = color(255,150,0);


  engine = Engine.create();
  // let elementTarget = document.getElementById("sketch-holder");
  world = engine.world;
  engine.gravity.y = 0;
  // let mouse = Mouse.create(elementTarget);
  let mouse = Mouse.create(canvas.elt.parentElement);
  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
  // mouse.pixelRatio = pixelDensity() // for retina displays etc
  let options = {
    mouse: mouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  mConstraint.constraint.stiffness = 0.01;
  mConstraint.constraint.damping = 0.1;
  World.add(world, mConstraint);
  words.push(new Word(533, height / 2, festival, "festival"));
  words.push(new Word(868, height / 2, of, "of"));
  ligatures.push(new Ligature(words[0], words[1]));
  words.push(new Word(1039, height / 2, the, "the"));
  ligatures.push(new Ligature(words[1], words[2]));
  words.push(new Word(1327, height / 2, winds, "winds"));
  ligatures.push(new Ligature(words[2], words[3]));
  boundaries.push(new Boundary(width / 2, height * -0.5 + 100, width*2, 100));
  boundaries.push(new Boundary(width / 2, height * 1.5, width*2, 100));
  windDirection = Matter.Vector.create(1,-0.5);

  transistionTo = [color(34, 82, 131), color(159, 190, 208)];
  transistionFrom = [color(34, 82, 131), color(159, 190, 208)]
}

function spawnWordGroup(x, y) {
  let festivalWord = new Word(x + 533, y, festival, "festival");
  let ofWord = new Word(x + 868, y, of, "of");
  let theWord = new Word(x + 1039, y, the, "the");
  let windsWord = new Word(x + 1327, y, winds, "winds");
  
  words.push(festivalWord);
  words.push(ofWord);
  words.push(theWord);
  words.push(windsWord);

  ligatures.push(new Ligature(festivalWord, ofWord));
  ligatures.push(new Ligature(ofWord, theWord));
  ligatures.push(new Ligature(theWord, windsWord));
}

function getUniform(inputColor){
  return [red(inputColor)/255, green(inputColor)/255, blue(inputColor)/255];
}

function getScrollPercent() {
  var h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
}


let count = 0;
let transistionTime = 0;
function setTime (target){
  transistionTime = millis();
  if (target=="11am"){
    transistionFrom = transistionTo;
    transistionTo = [color("#002761"), color("#BA7979")];
  }
  if (target=="3pm"){
    transistionFrom = transistionTo;
    transistionTo = [color(34, 82, 131), color(159, 190, 208)];
  }
}
function draw() {
  background("#91A9C2")
  // let brightness = 1-getScrollPercent();
  if (imageChange && frameCount%20==0){
    // kiteIndex = (kiteIndex + 1) % kiteSpritesURL.length;
    document.getElementById("changeKite").src = random(kiteSpritesURL);
  }
  glShader.setUniform('u_time', millis()/1000);
  glShader.setUniform('u_brightness',1);
  glShader.setUniform('u_resolution', [glCanvas.width/(glDensity*2), glCanvas.height/(glDensity*2)]);
  glShader.setUniform('u_mouse', [mouseX, mouseY]);
  let t = (millis()-transistionTime)/300;
  let finalColor0 = transistionTo[0];
  let finalColor1 = transistionTo[1];
  if (t < 1){
    finalColor0 = lerpColor(transistionFrom[0], transistionTo[0], t);
    finalColor1 = lerpColor(transistionFrom[1], transistionTo[1], t);
  }
  
  glShader.setUniform('u_color0', getUniform(finalColor0));
  glShader.setUniform('u_color1', getUniform(finalColor1));

  glCanvas.shader(glShader);
  glCanvas.rect(0,0,width, height);
  image(glCanvas, 0, 0, windowWidth, windowHeight);
  if (mouseIsPressed === true && random() < 0.4) {
    kites.push(new Kite(mouseX, mouseY));
  }
  
  Engine.update(engine);
  for (let word of words) {
    word.show();
  }
  for (let ligature of ligatures) {
    ligature.show();
  }
  noStroke();
  fill(0, (getScrollPercent())*255*0.9);
  rect(0, 0, width, height);

  for (let kite of kites){
    kite.show();
  }
  // windDirection = Matter.Vector.create(((width-mouseX)/width)*1.2, ((height-mouseY)/height-1)*1.2);

}

function keyPressed(){
  if (key == 'f'){
    fullscreen(true);
  }
  if (key == 'k'){
    kites.push(new Kite(mouseX, mouseY));
  }
}



function windowResized(){
  // for (let boundary of boundaries){
  //   World.remove(boundary.body);
  // }
  resizeCanvas(windowWidth, windowHeight);
  glCanvas.resizeCanvas(windowWidth, windowHeight);
}


window.smoothScroll = function(target) {
  var scrollContainer = target;
  do { //find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do { //find the top of target relatively to the container
      if (target == scrollContainer) break;
      targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function(c, a, b, i) {
      i++; if (i > 30) return;
      c.scrollTop = a + (b - a) / 30 * i;
      setTimeout(function(){ scroll(c, a, b, i); }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
let kiteIndex = 0;
// let kiteIcon = ["/assets/kites/diamondBW.svg", "/assets/kites/boxBW.svg","/assets/kites/arrowBW.svg"];
let kiteIcon = ["/assets/kites/diamondBW.svg", "/assets/kites/boxBW.svg","/assets/kites/arrowBW.svg"];

function startChangeImage(){
  imageChange = true;
}

function stopChangeImage(){
  imageChange = false;
}
