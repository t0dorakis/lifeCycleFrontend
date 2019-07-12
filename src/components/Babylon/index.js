import React from "react";
import * as BABYLON from "babylonjs";
import { Materials} from  './Materials';
import waterBumpTexture from './../../assets/waterbump.png';
import BabylonCanvas, { SceneEventArgs } from "./Canvas"; // import the component above linking to file we just created.
// import { WaterMaterial } from '@babylonjs/materials/WaterMaterial'
import { withFirebase } from '../Firebase';
import { getPictureForAge } from './pictureService'


const PageWithScene = (props) => {
    let age = 0;
    let character = 0;


    const initialSetup = (scene, canvas) => {

        scene.clearColor = new BABYLON.Color4(0,0,0,0);

        const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 100, BABYLON.Vector3.Zero(), scene);
        // camera.attachControl(canvas, true);
        camera.position = {x: -22.652192572134243, y: 19.320213941760528, z: -41.45327804047432}
        // // Skybox
        // const skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        // const skyboxTexture = new BABYLON.CubeTexture("./assets/skybox", scene);
        // const skyboxMaterial = Materials.createSkyboxMaterial('skyboxMaterial', scene, "./assets/skybox")


        //Light direction is up and left
        const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.groundColor = new BABYLON.Color3(1, 1, 1);

        // Canvas for changing pictures
        const pictureCanvas = BABYLON.MeshBuilder.CreatePlane("planeCanvas",{width: (22 / (window.innerHeight / window.innerWidth)), height:22}, scene);
        pictureCanvas.position.z = 3 // move behind front

        // Canvas for changing pictures
        // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 25, diameterX: 25}, scene);
        // sphere.position.x = -50 // move behind front
        // sphere.position.y = -50 // move behind front
        // sphere.position.z = -10 // move behind front


        // The background of the whole scene to hide the skybox
        const background = BABYLON.MeshBuilder.CreatePlane("planeCanvas",{width: window.innerWidth, height: window.innerHeight}, scene);
        background.position.z = 4 // move behind front


        const darkMaterial = new BABYLON.StandardMaterial("Image", scene);
        darkMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        background.material = darkMaterial

        // Water
        const waterMesh = BABYLON.MeshBuilder.CreatePlane("planeCanvas",{width: (50 / (window.innerHeight / window.innerWidth)), height:50}, scene);

        // const sphereWaterMaterial = Materials.createWaterMaterial( 'sphereWaterMaterial', 'sphere', scene, waterBumpTexture)
        const planeWaterMaterial = Materials.createWaterMaterial('planeWaterMaterial', 'plane', scene, waterBumpTexture)
        // sphereWaterMaterial.addToRenderList(skybox);
        // sphereWaterMaterial.addToRenderList(pictureCanvas);
        // planeWaterMaterial.addToRenderList(skybox);
        planeWaterMaterial.addToRenderList(pictureCanvas);
        //
        // sphere.material = sphereWaterMaterial
        waterMesh.material = planeWaterMaterial
        // const glass = Materials.createGlassMaterial('glassMaterial', scene, skyboxTexture)
        // glass.addToRenderList(pictureCanvas);
        // sphere.material = glass
        return { pictureCanvas, camera }
    }

    const update = (scene, pictureCanvas) => {
        const materialPicture = new BABYLON.StandardMaterial("Image", scene);
        materialPicture.diffuseTexture = new BABYLON.Texture(getPictureForAge(age), scene);
        materialPicture.specularTexture = new BABYLON.Texture(getPictureForAge(age), scene);
        pictureCanvas.material = materialPicture
    }


    const onSceneMount = (e) => {
        const { canvas, scene, engine } = e;

        const { pictureCanvas, camera  } = initialSetup(scene, canvas)

        engine.runRenderLoop(() => {
            props.firebase.creature()
                .orderBy("created", "desc")
                .limit(1)
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        age = doc.data().age
                        character = doc.data().character
                    });
                });
            if (scene) {
                // console.log(camera.position)
                update(scene, pictureCanvas)
                scene.render();
            }
        });
    };


    return (
        <div>
            <div className="scene-wrapper">
                <BabylonCanvas
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onSceneMount={onSceneMount}
                    className="babylon-scene"
                />
            </div>
        </div>
    );
}

export default withFirebase(PageWithScene);