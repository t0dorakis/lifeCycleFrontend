import * as BABYLON from 'babylonjs'
import * as BabylonMaterials from  'babylonjs-materials'

export const Materials = {
    createWaterMaterial: (name, type, scene, waterBumpTexture, ) => {
        const waterMaterial = new BabylonMaterials.WaterMaterial(name, scene);
        waterMaterial.bumpTexture = new BABYLON.Texture(waterBumpTexture, scene);
        // waterMaterial.backFaceCulling = true;

        if (type === 'plane') {
            waterMaterial.windForce = -15;
            waterMaterial.waveHeight = 0;
            waterMaterial.windDirection = new BABYLON.Vector2(1, 1);
            waterMaterial.waterColor = new BABYLON.Color3(1, 0, 0);
            waterMaterial.colorBlendFactor = 0;
            waterMaterial.bumpHeight = 0.1;
            waterMaterial.waveLength = 0.8;
        } else if (type === 'sphere') {
            waterMaterial.windForce = 5;
            waterMaterial.waveHeight = 0.3;
            waterMaterial.bumpHeight = 3;
            waterMaterial.waveLength = 0.5;
            waterMaterial.waterColor = new BABYLON.Color3(0.1, 0.1, 0.3);
            waterMaterial.colorBlendFactor = 0.5;
            waterMaterial.alpha = 0.9;
        }

        // Water properties
        return waterMaterial
    },
    createSkyboxMaterial: (name, scene, texture ) => {
        const skyboxMaterial = new BABYLON.StandardMaterial(name, scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(texture, scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0.5, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(1, 0, 0);
        skyboxMaterial.disableLighting = false;
        return skyboxMaterial
    },
    createGlassMaterial: (name, scene, texture) => {
        const glass = new BABYLON.PBRMaterial(name, scene);
        glass.reflectionTexture = texture;
        glass.indexOfRefraction = 3;
        glass.alpha = 0.7;
        glass.directIntensity = 0.0;
        glass.environmentIntensity = 0.7;
        glass.cameraExposure = 0.66;
        glass.cameraContrast = 1.66;
        glass.microSurface = 1;
        glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        glass.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);
        return glass
    }
}
