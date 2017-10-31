import {
  Object3D,
  TorusKnotBufferGeometry,
  MeshStandardMaterial,
  Mesh
} from 'three';
import * as THREE from 'three';

export default class Torus extends Object3D {

  makeLight(r, g, b, x, y, z) {
    var geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
    //var geometry = new THREE.CylinderGeometry( 1, 1, 1, 16 );
    //var material = new THREE.MeshBasicMaterial( {color: 0xff00ff, opacity: 0.5, transparent: true  } );
    var material = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
    var shape = new THREE.Mesh( geometry, material );
    shape.position.set( x, y, z );
    // shape.material.color.setRGB( r / 255, g / 255, b / 255 );
    var that = this;
    setInterval(function() {
      //shape.material.color.setRGB( Math.random(), Math.random(), Math.random() );
      that.lastR = that.lastR ? that.lastR : Math.random();
      that.lastG = that.lastG ? that.lastG : Math.random();
      that.lastB = that.lastB ? that.lastB : Math.random();
      that.lastR = (that.lastR + (Math.random()/10));
      that.lastG = (that.lastG + (Math.random()/10));
      that.lastB = (that.lastB + (Math.random()/10));
      that.lastR -= Math.floor(that.lastR);
      that.lastG -= Math.floor(that.lastG);
      that.lastB -= Math.floor(that.lastB);
      shape.material.color.setRGB( that.lastR, that.lastG, that.lastB );
    }, 2000)

    return shape
  }

  constructor() {
    super();
    // var geometry = new THREE.TorusBufferGeometry( 3, 0.25, 100, 64 );
    // var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    // var mesh = new THREE.Mesh( geometry, material );

    for (var x = 0; x < 6; x++) {
      for (var y = 0; y < 45; y++) {
        this.add( this.makeLight( 32 * y, 32 * x, 255, x *2, y / 4, 1) );
      }
    }
  }
}
