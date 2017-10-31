import * as THREE from 'three';

export default class Torus extends Object3D {
  constructor() {
    super();

    // const geometry = new TorusKnotBufferGeometry(2, 0.25, 100, 16);
    // const material = new MeshStandardMaterial({color: 0xA197C9, roughness: 0.18, metalness: 0.5});
    // const mesh = new Mesh(geometry, material);

    var geometry = new THREE.TorusBufferGeometry( 10, 3, 16, 100 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var mesh = new THREE.Mesh( geometry, material );

    this.add(mesh);
  }
}
