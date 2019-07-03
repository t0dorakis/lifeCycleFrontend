import React, { Component } from 'react';
import * as THREE from 'three';
// const OrbitControls = require('three-orbitcontrols');
import frag from '../../assets/shader/frag.frag'
import vertex from '../../assets/shader/vertex.vert'

class ThreeScene extends Component{
    componentDidMount(){


        this.init = () => {
            this.initGraphics();
        }


        this.initGraphics = () => {
            const FOV = 45;
            const NEAR = 0.1;
            const FAR = 1000;
            const width = this.mount.clientWidth
            const height = this.mount.clientHeight
            const ASPECT = width / height;

            this.renderer = new THREE.WebGLRenderer({alpha: true});
            // this.renderer = new THREE.WebGLRenderer({ alpha: true });
            this.renderer.setClearColor(0xffffff, 0);
            this.renderer.shadowMap.enabled = true;
            this.renderer.setSize(width, height)
            this.canvas = this.renderer.domElement;

            this.renderer.setPixelRatio( window.devicePixelRatio || 1);

            // const controls = new OrbitControls( this.camera, this.canvas );

            // // My float attribute
            // var attributes = {
            //     size: { type: 'f', value: [] },
            // };
            //
            // for (var i=0; i < numVertices; i++) {
            //     attributes.size.value[i] = 5 + Math.floor(Math.random() * 10);
            // }

            const shaderMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    myColor: { type: "c", value: new THREE.Color( 0xffffff ) },
                },
                attributes: {
                        size: { type: 'f', value: [] },
                    },
                vertexShader: vertex,
                fragmentShader: frag
            });


            this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            // this.camera.position.set(-2, 2, 2);
            this.camera.position.z = 5;
            this.light = new THREE.PointLight( 0xff0000, 1, 100 );
            // this.light.position.set( 50, 50, 50 );
            this.camera.target = new THREE.Vector3(0, 0, 0);
            this.scene = new THREE.Scene();

            const matNormal = new THREE.MeshNormalMaterial();

            const floorGeo = new THREE.PlaneBufferGeometry(5, 5);
            const floor = new THREE.Mesh(floorGeo, matNormal);
            floor.position.set(0, -0.5, 0);
            floor.rotation.x = THREE.Math.degToRad(-45);

            const sphereGeo = new THREE.SphereBufferGeometry(0.5, 32, 32);
            const sphere = new THREE.Mesh(sphereGeo, matNormal);

            this.scene.add(floor);
            this.scene.add(this.light);

            // this.scene.add(sphere);
            this.scene.add(this.camera);

            console.log(this.renderer.domElement)
            this.mount.appendChild(this.canvas)
            this.renderer.render(this.scene, this.camera)

            //
            // window.addEventListener( 'resize', onWindowResize, false );
        }

        this.init();
        this.animate();
    }


    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.canvas)
    }
    stop = () => {
        cancelAnimationFrame(this.frameId)
    }
    animate = () => {
        // this.cube.rotation.x += 0.01
        // this.cube.rotation.y += 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }
    renderScene = () => {
        // find intersections
        // this.raycast()

        this.renderer.render(this.scene, this.camera)
    }
    render(){
        return(
            <div
                style={{ width: window.innerWidth, height: window.innerHeight}}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}
export default ThreeScene