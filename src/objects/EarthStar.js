import Ring from './Ring';
import * as THREE from 'three';

export default class EarthStar extends THREE.Object3D {

  constructor(numberOfLeds) {
    super();
    window.THREE = THREE;

    const rad = 6.28319;
    const degs = rad / 360;

    const z0 = new Ring(numberOfLeds, 0.05, 255, 0, 0, "z");
    z0.rotateOnAxis( {x:1, y:0, z:0}, -36 * degs)
    const z1 = new Ring(numberOfLeds, 0.05, 255, 128, 128, "z");
    z1.rotateOnAxis( {x:1, y:0, z:0}, 36 * degs)

    this.add(z0);
    this.add(z1);

    const y0 = new Ring(numberOfLeds, 0.05, 0, 255, 0, "y");
    y0.rotateOnAxis( {x:0, y:0, z:1}, -36 * degs)
    const y1 = new Ring(numberOfLeds, 0.05, 128, 255, 128, "y");
    y1.rotateOnAxis( {x:0, y:0, z:1}, 36 * degs)

    this.add(y0);
    this.add(y1);

    const x0 = new Ring(numberOfLeds, 0.05, 0, 0, 255, "x");
    x0.rotateOnAxis( {x:0, y:1, z:0}, -36 * degs)
    const x1 = new Ring(numberOfLeds, 0.05, 128, 128, 255, "x");
    x1.rotateOnAxis( {x:0, y:1, z:0}, 36 * degs)

    this.add(x0);
    this.add(x1);

    this.rings = [];
    this.rings.push(x0, x1, y0, y1, z0, z1);
  }

  setLedRgb(ring, led, r, g, b) {
    this.rings[ring].leds[led].setRgb(r, g, b);
  }

}
