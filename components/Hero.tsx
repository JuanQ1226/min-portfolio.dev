"use client";
import React, { useRef, useEffect, use } from "react";

import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

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
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight / 3);
      let effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });

      effect.setSize(window.innerWidth, window.innerHeight / 3);
      effect.domElement.style.color = "black";
      effect.domElement.style.backgroundColor = "#e0e5eb";
      currentCanvas?.appendChild(effect.domElement);
      camera.position.z = 2.2;
      const geometry = new THREE.TorusGeometry();
      const material = new THREE.MeshStandardMaterial();
      const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
      const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
      light2.position.set(-10, -10, -2);
      light1.position.set(10, 0, 2);
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      scene.add(light1);
      scene.add(light2);

      // Render the scene and camera
      effect.render(scene, camera);

      // Animation
      let start = Date.now();
      const animateScene = () => {
        const tick = Date.now() - start;
        cube.position.y = Math.sin(tick * 0.0009) * 1.5;
        cube.position.x = Math.cos(tick * 0.0009) * 1.2;
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        effect.render(scene, camera);
        requestAnimationFrame(animateScene);
      };
      animateScene();
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / (height / 3);
        camera.updateProjectionMatrix();

        effect.setSize(width, height / 3);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        currentCanvas?.removeChild(effect.domElement);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      <div ref={canvas} className="">
        <h1 className="absolute z-59 flex w-screen h-1/3 overflow-clip justify-center items-center font-semibold text-4xl">
          Hero
        </h1>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="w-full h-6 bg-[#e0e5eb] block"
      >
        <polygon className="fill-white" points="100 0 100 11 0 10" />
      </svg>
    </>
  );
}
