import React, { useEffect } from "react";
import * as BABYLON from "babylonjs";


const BabylonCanvas = ({scene, engine, engineOptions ,adaptToDeviceRatio, width, height, onSceneMount}) => {
    let canvas;

    const onResizeWindow = () => {
        if (engine) {
            engine.resize();
        }
    };

    useEffect(() => {
        engine = new BABYLON.Engine(
            canvas,
            true,
            engineOptions,
            adaptToDeviceRatio
        );

        scene = new BABYLON.Scene(engine);

        if (typeof onSceneMount === "function") {
            onSceneMount({
                scene,
                engine,
                canvas
            });
        } else {
            console.error("onSceneMount function not available");
        }
        // Resize the babylon engine when the window is resized
        window.addEventListener("resize", onResizeWindow);
        return function cleanup() {
            window.removeEventListener("resize", onResizeWindow);
        }
    }, []);

    const onCanvasLoaded = (c) => {
        if (c !== null) {
            canvas = c;
        }
    };

    let opts = {};

    if (width !== undefined && height !== undefined) {
        opts.width = width;
        opts.height = height;
    }

    return (
        <canvas {...opts} id="babylonCanvas" ref={onCanvasLoaded} />
    )
}

export default BabylonCanvas;