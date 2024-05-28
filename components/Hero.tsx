"use client";
import { Spinner } from "@nextui-org/react";
import React, { useRef, useEffect, useState } from "react";

import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

export default function Hero() {
  const canvas = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create the scene
      const currentCanvas = canvas.current;
      const scene = new THREE.Scene();
      // Create the camera
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / (window.innerHeight / 3),
        0.1,
        100
      );
      // Create the renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight / 3);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // Create the effect
      let effect = new AsciiEffect(renderer, " .:-+*=%@#", {
        invert: true,
      });
      effect.setSize(window.innerWidth, window.innerHeight / 3);
      effect.domElement.style.color = "gray";
      effect.domElement.style.backgroundColor = "#e0e5eb";
      // Append Ascii Effect to the DOM
      currentCanvas?.appendChild(effect.domElement);
      camera.position.z = 3.2;
      // Mouse Trail
      let mouse = new THREE.Vector3(0, 0, 1);
      const setPosition = (array: Float32Array) => {
        for (let i = 0; i < 150; i++) {
          const i3 = i * 3;

          const x = (i / (150 - 1) - 0.5) * 3;
          const y = Math.sin(i / 10.5) * 0.5;

          array[i3] = x;
          array[i3 + 1] = y;
          array[i3 + 2] = 4;
        }
        return array;
      };

      const trailGeometry = new THREE.BufferGeometry();

      const positions = setPosition(new Float32Array(150 * 3));

      trailGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      const trailMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.4,
      });
      const trailPoints = new THREE.Points(trailGeometry, trailMaterial);
      scene.add(trailPoints);

      //Toroid and Sphere
      const geometryTorus = new THREE.TorusGeometry(2.2, 0.2);
      const materialTorus = new THREE.MeshPhongMaterial({ flatShading: false });
      const geometrySphere = new THREE.SphereGeometry(1);
      const materialSphere = new THREE.MeshPhongMaterial({ flatShading: true });
      const torus = new THREE.Mesh(geometryTorus, materialTorus);
      const sphere = new THREE.Mesh(geometrySphere, materialSphere);
      // Lights
      const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
      const light2 = new THREE.DirectionalLight(0xffffff, 2);
      light2.position.set(-10, 5, -2);
      light1.position.set(10, -2, 2);
      // Add to scene
      scene.add(torus);
      scene.add(sphere);
      scene.add(light1);
      scene.add(light2);
      scene.add(trailPoints);

      // Render the scene and camera
      effect.render(scene, camera);

      // Animation
      let start = Date.now();
      const animateScene = () => {
        const tick = Date.now() - start;
        effect.render(scene, camera);
        torus.rotation.x += 0.001;
        torus.rotation.y += 0.006;
        sphere.rotation.x -= 0.001;
        sphere.rotation.y -= 0.006;
        sphere.position.y = Math.sin(tick * 0.0009) * 0.2;
        for (let i = 0; i < 150; i++) {
          const i3 = i * 3;
          const previous = (i - 1) * 3;

          if (i3 === 0) {
            positions[0] = mouse.x;
            positions[1] = mouse.y + 0.09;
            positions[2] = mouse.z;
          } else {
            const currentPoint = new THREE.Vector3(
              positions[i3],
              positions[i3 + 1],
              positions[i3 + 2]
            );

            const previousPoint = new THREE.Vector3(
              positions[previous],
              positions[previous + 1],
              positions[previous + 2]
            );

            const lerpPoint = currentPoint.lerp(previousPoint, 0.9);

            positions[i3] = lerpPoint.x;
            positions[i3 + 1] = lerpPoint.y;
            positions[i3 + 2] = mouse.z;
          }
        }
        trailGeometry.attributes.position.needsUpdate = true;
        window.requestAnimationFrame(animateScene);
      };
      animateScene();
      // Resize
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / (height / 3);
        camera.updateProjectionMatrix();

        effect.setSize(width, height / 3);
      };

      const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y =
          -(
            event.clientY /
            (window.innerHeight - (2 * window.innerHeight) / 3)
          ) *
            2 +
          1.46;
        mouse.z = 1;

        var vector = new THREE.Vector3(mouse.x, mouse.y, mouse.z);
        vector.unproject(camera);
        var dir = vector.sub(camera.position).normalize();
        var distance = -camera.position.z / dir.z;
        var pos = camera.position.clone().add(dir.multiplyScalar(distance));

        mouse = pos;
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      setLoading(false);
      return () => {
        currentCanvas?.removeChild(effect.domElement);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="w-screen h-1/3 text-center py-28 bg-[#e0e5eb] ">
          <Spinner size="lg">Loading...</Spinner>
        </div>
      )}
      <div ref={canvas} className="cursor-none">
        <div className=" font-semibold flex-col text-3xl w-screen h-1/3 justify-center items-center flex absolute text-center">
          {!loading && (
            <div className="lg:hover:scale-110 lg:hover:backdrop-blur-sm rounded-xl lg:hover:shadow-xl shadow-primary-700  transition-all ease-in-out p-10 lg:hover:border border-primary">
              <h1>Hi I&apos;m Juan Quintana</h1>
              <p className=" text-tiny">Welcome to my Website!</p>
            </div>
          )}
        </div>
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
