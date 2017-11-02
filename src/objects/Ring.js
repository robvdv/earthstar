import RgbLed from './RgbLed';
import * as THREE from 'three';

export default class Ring extends THREE.Object3D {
  constructor(numberOfLeds, ledDiameter, r, g, b, plane) {
    super();
    this.leds = [];
    var led;
    for(var i = 0; i < numberOfLeds; i++) {
        var x = Math.cos(2 * Math.PI * i / numberOfLeds);
        var y = Math.sin(2 * Math.PI * i / numberOfLeds);
        if (plane && plane === "x") {
          led = new RgbLed(ledDiameter, r, g, b, 0, x, y);
        } else if (plane && plane === "y") {
          led = new RgbLed(ledDiameter, r, g, b, x, 0, y);
        } else {
          // assume z
          led = new RgbLed(ledDiameter, r, g, b, x, y, 0);
        }
        this.add(led);
        this.leds.push(led);
    }
  }
}
