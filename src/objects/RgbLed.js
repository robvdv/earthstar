import * as THREE from 'three';

export default class RgbLed extends THREE.Object3D {
  constructor(diameter, r, g, b, x, y, z) {
    super();
    var geometry = new THREE.SphereGeometry( diameter, 4, 4 );
    this.material = new THREE.MeshBasicMaterial();
    this.material.color.setRGB(r / 255, g / 255, b / 255);
    var mesh = new THREE.Mesh( geometry, this.material );
    mesh.position.set( x, y, z );
    this.add(mesh);
  }

  setRgb(r, g, b) {
    //this.material.color.setRGB(r / 255, g / 255, b / 255);
    this.material.color.setRGB(r / 255, g / 255, b / 255);
  }
}
