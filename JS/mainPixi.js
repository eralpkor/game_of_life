let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

const block = document.getElementById('canvas')
//Create a Pixi Application
// let app = new PIXI.Application({width: 256, height: 256});

let app = new PIXI.Application({
  width: 800, // default: 800
  height: 600, // default: 600
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1, // default: 1
  forceCanvas: true, // WebGL
});

app.renderer.backgroundColor = 0x3b3d43;
app.renderer.autoResize = true;
app.renderer.resize(800, 600);

// Rectangles
let rectangle = new PIXI.Graphics();

rectangle.lineStyle(4, 0xFF3300, 1);
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(10, 100, 64, 64);
rectangle.endFill();
// rectangle.x = 170;
// rectangle.y = 170;
app.stage.addChild(rectangle);

//Add the canvas that Pixi automatically created for you to the HTML document
block.appendChild(app.view);

function buildgrid() {
  const grid = new Array()
}

console.log(app)