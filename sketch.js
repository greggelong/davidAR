let capture;
let t =0;
let T=1000;
let TT =500
let x,y
let cre
let z =400
let gd;
let tp;
let sd;
let cnv;
let rcolumn =0
let rrow =0
let lasttouch= 0;
let trigrams =[]
let triGramOrder = [7,3,5,1,6,2,4,0]
let cx, xy
function preload(){
  gd =loadImage("blends.png")
  tp = loadImage("top.png")
  sd = loadImage("sid.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  cx = windowWidth/2-400 // 
  cy = windowHeight/2-400// to center the 800 size image
  pixelDensity(1); 
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }    
    //video: {
      //facingMode: "user"
    //} 
  };
  //if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
  capture = createCapture(VIDEO,constraints);
  //}else{
    // false for not mobile device
   //capture = createCapture(VIDEO)
  //}
  //
  //capture = createCapture(VIDEO)
  capture.size(width/5,height/5)
  capture.hide();
  
  tp.resize(700,100)
  sd.resize(100,700)
  gd.resize(800,800)
  //frameRate(1)
  for (let i =0; i<triGramOrder.length;i++){
    trigrams.push(binConvert(triGramOrder[i],3))

  }
}


 

 function draw(){
  image(capture, 0, 0,width,height); 
  push()
  scale(0.5)
  image(tp,cx+100,cy+0)
  image(sd,cx+0,cy+100)
  let column = rcolumn;//floor(random(8))
  let row = rrow;// floor(random(8))
  // rect around the top
  
  let hexagram = trigrams[column].concat(trigrams[row])
  noFill()
  stroke(255,0,0)
  strokeWeight(5)
  rect(cx+100+(rcolumn*85),cy+20,80,80)
  
  // rect around the bottom
  rect(cx+10,cy+100+(rrow*87),80,84)
  

  // the big picture
  let bigpic = gd.get(rcolumn*100,rrow*100,100,100)
  image(bigpic,cx+200,cy+200,500,500)

  // hexagram shadow
  showGram(hexagram)
  fill(0)
  textSize(25)
  text(hexagram.join(''),cx+640,cy+750)
 pop()

}


function touchStarted(){
  const currenttime = millis();
  const timesincelasttouch = currenttime - lasttouch;

  if (timesincelasttouch > 500) {
  rcolumn=floor(random(8))
  rrow = floor(random(8))
  }

  lasttouch = currenttime;
  
}

function mouseClicked(){
  touchStarted()
}


function binConvert(a, bitLen) {
  // takes in a decimal and a bit length and returns a list of ones and zeros binary for that number

  let b = a.toString(2); // converts it to binary but leading zeros, not 8 bits eg. 3 = "11"
  let mask = "0".repeat(bitLen); // a mask to get the extra zeros
  let c = mask.slice(0, bitLen - b.length); // slice to get the right number of zeros
  // eg. if b = "11" then c = "000000"
  let binstring = c + b; // binary string so 3 will give 00000011 8 bits

  let binArray = int(binstring.split("")); // is an aray of ints so [0,0,0,0,0,0,1,1]
  return binArray;
}

function showGram(narray){
  fill(255,0,0,80)
  stroke(255)
  let y = 170;
  for (let i =0; i<narray.length; i++){
    if (narray[i]===0){
      rect(cx+175,cy+y,210,50);
      rect(cx+515,cy+y,210,50);
    }else{
      rect(cx+175,cy+y,550,50)
    }
    y+=100
  }
}
 
 
