"use client";
import React, { useRef, useEffect, use } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default function Hero() {
  const canvas = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentCanvas = canvas.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / (window.innerHeight / 3),
        0.1,
        1000
      );
      const light = new THREE.AmbientLight(0xffffff);
      scene.add(light);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight / 3);

      currentCanvas?.appendChild(renderer.domElement);
      camera.position.z = 200;

      // Load the 3D model
      var model;
      const loader = new GLTFLoader().setPath("models/earth/");
      loader.load("scene.gltf", async function (gltf) {
        model = gltf.scene;

        // wait until the model can be added to the scene without blocking due to shader compilation

        await renderer.compileAsync(model, camera, scene);
        model.rotation.x = 0.5;
        scene.add(model);
        renderer.render(scene, camera);
      });

      // Render the scene and camera
      renderer.render(scene, camera);
      const animateScene = () => {
        if (typeof model !== "undefined") {
          model.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(animateScene);
      };
      animateScene();
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / (height / 3);
        camera.updateProjectionMatrix();

        renderer.setSize(width, height / 3);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        currentCanvas?.removeChild(renderer.domElement);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return <div ref={canvas}></div>;
}
