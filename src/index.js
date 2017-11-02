import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PointLight
} from 'three';
import loop from 'raf-loop';
import WAGNER from '@superguigui/wagner';
import BloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import resize from 'brindille-resize';
import Torus from './objects/Torus';
import RgbLed from './objects/RgbLed';
import Ring from './objects/Ring';
import EarthStar from './objects/EarthStar';
import OrbitControls from './controls/OrbitControls';
import {gui} from './utils/debug';

/* Custom settings */
const SETTINGS = {
  useComposer: false
};

/* Init renderer and canvas */
const container = document.body;
const renderer = new WebGLRenderer({antialias: true});
renderer.setClearColor(0x323232);
container.style.overflow = 'hidden';
container.style.margin = 0;
container.appendChild(renderer.domElement);

/* Composer for special effects */
const composer = new WAGNER.Composer(renderer);
const bloomPass = new BloomPass();
const fxaaPass = new FXAAPass();

/* Main scene and camera */
const scene = new Scene();
const camera = new PerspectiveCamera(50, resize.width / resize.height, 0.1, 1000);
const controls = new OrbitControls(camera, {element: renderer.domElement, distance: 10, phi: Math.PI * 0.5});

/* Lights */
const frontLight = new PointLight(0xFFFFFF, 1);
const backLight = new PointLight(0xFFFFFF, 0.5);
scene.add(frontLight);
scene.add(backLight);
frontLight.position.x = 20;
backLight.position.x = -20;

/* Actual content of the scene */
//const torus = new Torus();
//scene.add(torus);

//const rgbLed = new RgbLed(255, 0, 0, 1, 2, 3);
//scene.add(rgbLed);

// scene.add(new RgbLed(255, 255, 255, 0, 0, 0));
// scene.add(new RgbLed(255, 0, 0, -1, 0, 0));
// scene.add(new RgbLed(255, 255, 0, -1, -1, 0));
// scene.add(new RgbLed(255, 255, 255, -1, -1, -1));
 const earthStar = new EarthStar(450);
 scene.add(earthStar);

 window.earthStar = earthStar;

 let colour = [];
 for (var c = 0; c < 64; c++) {
   colour.push(c * 4);
 }
 for (var c = 0; c < 64; c++) {
   colour.push(255);
 }
 for (var c = 64; c > 0; c--) {
   colour.push(c * 4);
 }
 for (var c = 0; c < 64; c++) {
   colour.push(0);
 }

 let rainbow = [];
 for (var c = 0; c < colour.length; c++) {
   rainbow.push( [colour[c], colour[(c + 64) % colour.length], colour[(c + 128) % colour.length]] );
 }

 let counter = 0;
 var r, g, b, rgb;
 setInterval(function() {
    for (var s = 0; s < 6; s++) {
      for (var l = 0; l < 450; l++) {

        //r = Math.sin( (l / 3) * 1 )
        //g = Math.sin( (((s * 2) + l + counter) % 360) / Math.PI * 255 )
        //b = Math.sin( (((s * 4) + l + counter) % 360) / Math.PI * 255 )
        // r = (s + l + counter) % 255;
        // g = (s + ((l + counter) * 2)) % 255;
        // b = (s + ((l + counter) * 4)) % 255;

        rgb = rainbow[(s + l + counter) % 255];

        earthStar.setLedRgb(s, l, rgb[0], rgb[1], rgb[2]);
      }
    }
    if (counter > 360) {
      counter = 0;
    } else {
      counter++;
    }
    console.log(counter)
 }, 10);


/* Various event listeners */
resize.addListener(onResize);

/* create and launch main loop */
const engine = loop(render);
engine.start();

/* some stuff with gui */
gui.add(SETTINGS, 'useComposer');

/* -------------------------------------------------------------------------------- */

/**
  Resize canvas
*/
function onResize() {
  camera.aspect = resize.width / resize.height;
  camera.updateProjectionMatrix();
  renderer.setSize(resize.width, resize.height);
  composer.setSize(resize.width, resize.height);
}

/**
  Render loop
*/
function render(dt) {
  controls.update();
  if (SETTINGS.useComposer) {
    composer.reset();
    composer.render(scene, camera);
    composer.pass(bloomPass);
    composer.pass(fxaaPass);
    composer.toScreen();
  }
  else {
    renderer.render(scene, camera);
  }
}
