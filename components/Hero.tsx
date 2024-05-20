"use client";
import React, { useRef, useEffect, use } from "react";

import * as THREE from "three";

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
      renderer.setClearColor(0xffffff, 0);
      currentCanvas?.appendChild(renderer.domElement);
      camera.position.z = 5;
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Render the scene and camera
      renderer.render(scene, camera);
      const animateScene = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
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
