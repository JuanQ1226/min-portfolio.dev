"use client";
import { Spinner } from "@nextui-org/react";
import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

export default function Hero() {
  const canvas = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const updateThemeColorsRef = useRef<{
    effect: any;
    objects: Array<{
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      originalColor: number;
      sphereMaterial?: THREE.MeshPhongMaterial;
      cubeMaterial?: THREE.MeshPhongMaterial;
    }>;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Separate effect for scene creation (only runs once when mounted)
  useEffect(() => {
    if (typeof window !== "undefined" && mounted) {
      // Clear previous content
      const currentCanvas = canvas.current;
      if (currentCanvas) {
        currentCanvas.innerHTML = "";
      }

      // Create the scene
      const scene = new THREE.Scene();
      // Create the camera
      const camera = new THREE.PerspectiveCamera(
        45, // Reduced FOV for better coverage
        window.innerWidth / (window.innerHeight / 3),
        0.1,
        100
      );
      // Create the renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight / 3);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create the ASCII effect with block characters - use neutral colors initially
      let effect = new AsciiEffect(renderer, " ░▒▓█▀▄▌▐■", {
        invert: true,
      });
      effect.setSize(window.innerWidth, window.innerHeight / 3);

      // Append ASCII Effect to the DOM
      currentCanvas?.appendChild(effect.domElement);
      camera.position.z = 15; // Adjusted camera distance for better field coverage

      // Calculate actual viewport boundaries based on camera settings
      const aspect = window.innerWidth / (window.innerHeight / 3);
      const fov = 45 * (Math.PI / 180); // Convert to radians
      const distance = 15;
      const height = 2 * Math.tan(fov / 2) * distance;
      const width = height * aspect;

      // Mouse position
      let mouse = new THREE.Vector2(0, 0);
      const mouseWorld = new THREE.Vector3(0, 0, 0);

      // Create bouncing objects
      const objects: Array<{
        mesh: THREE.Mesh;
        velocity: THREE.Vector3;
        originalColor: number;
        sphereMaterial?: THREE.MeshPhongMaterial;
        cubeMaterial?: THREE.MeshPhongMaterial;
      }> = [];

      // Boundaries for bouncing - calculated to match viewport
      const bounds = {
        x: width * 0.45, // Use 90% of actual viewport width
        y: height * 0.45, // Use 90% of actual viewport height
        z: 3, // Keep depth reasonable
      };

      // Create spheres and cubes - increase count for better coverage
      for (let i = 0; i < 16; i++) {
        let geometry: THREE.BufferGeometry;
        let material: THREE.MeshPhongMaterial;

        if (i % 2 === 0) {
          // Create sphere - much larger for ASCII visibility
          geometry = new THREE.SphereGeometry(1.2, 16, 16);
          material = new THREE.MeshPhongMaterial({
            color: 0x3b82f6, // Default color
            flatShading: false,
          });
        } else {
          // Create cube - much larger for ASCII visibility
          geometry = new THREE.BoxGeometry(2, 2, 2);
          material = new THREE.MeshPhongMaterial({
            color: 0x10b981, // Default color
            flatShading: true,
          });
        }

        const mesh = new THREE.Mesh(geometry, material);

        // Random starting position - spread across calculated viewport
        mesh.position.set(
          (Math.random() - 0.5) * bounds.x * 1.9, // Use full calculated width
          (Math.random() - 0.5) * bounds.y * 1.9, // Use full calculated height
          (Math.random() - 0.5) * bounds.z
        );

        // Random starting velocity - increased for more dynamic movement
        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.2
        );

        const objData: {
          mesh: THREE.Mesh;
          velocity: THREE.Vector3;
          originalColor: number;
          sphereMaterial?: THREE.MeshPhongMaterial;
          cubeMaterial?: THREE.MeshPhongMaterial;
        } = {
          mesh,
          velocity,
          originalColor: material.color.getHex(),
        };

        if (i % 2 === 0) {
          objData.sphereMaterial = material;
        } else {
          objData.cubeMaterial = material;
        }

        objects.push(objData);
        scene.add(mesh);
      }

      // Lights
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(ambientLight);
      scene.add(directionalLight);

      // Function to update theme colors
      const updateThemeColors = () => {
        const currentTheme = theme === "system" ? systemTheme : theme;
        const isDark = currentTheme === "dark";
        
        // Update ASCII effect colors
        effect.domElement.style.color = isDark ? "#9ca3af" : "#6b7280";
        effect.domElement.style.backgroundColor = isDark ? "#000000" : "#e0e5eb";
        
        // Update object colors
        objects.forEach((obj, i) => {
          if (i % 2 === 0 && obj.sphereMaterial) {
            obj.sphereMaterial.color.setHex(isDark ? 0x4f46e5 : 0x3b82f6);
          } else if (obj.cubeMaterial) {
            obj.cubeMaterial.color.setHex(isDark ? 0x059669 : 0x10b981);
          }
        });
      };

      // Initial theme application
      updateThemeColors();

      // Store the effect and objects for the theme effect
      updateThemeColorsRef.current = {
        effect,
        objects
      };

      // Render the scene and camera
      effect.render(scene, camera);

      // Animation
      let start = Date.now();
      const animateScene = () => {
        const tick = Date.now() - start;
        effect.render(scene, camera);

        // Update each object
        objects.forEach((obj) => {
          const { mesh, velocity } = obj;

          // Calculate repulsion from mouse - adjusted for larger area
          const distance = mesh.position.distanceTo(mouseWorld);
          const repulsionForce = 0.08; // Slightly stronger for larger area
          const repulsionRadius = 6; // Larger radius for wider coverage

          if (distance < repulsionRadius && distance > 0.1) {
            const repulsion = new THREE.Vector3()
              .subVectors(mesh.position, mouseWorld)
              .normalize()
              .multiplyScalar(
                (repulsionForce * (repulsionRadius - distance)) /
                  repulsionRadius
              );
            velocity.add(repulsion);
          }

          // Apply velocity to position
          mesh.position.add(velocity);

          // Bounce off boundaries
          if (mesh.position.x > bounds.x || mesh.position.x < -bounds.x) {
            velocity.x *= -0.8;
            mesh.position.x = Math.max(
              -bounds.x,
              Math.min(bounds.x, mesh.position.x)
            );
          }
          if (mesh.position.y > bounds.y || mesh.position.y < -bounds.y) {
            velocity.y *= -0.8;
            mesh.position.y = Math.max(
              -bounds.y,
              Math.min(bounds.y, mesh.position.y)
            );
          }
          if (mesh.position.z > bounds.z || mesh.position.z < -bounds.z) {
            velocity.z *= -0.8;
            mesh.position.z = Math.max(
              -bounds.z,
              Math.min(bounds.z, mesh.position.z)
            );
          }

          // Add slight rotation - reduced for less distraction
          mesh.rotation.x += 0.005;
          mesh.rotation.y += 0.005;

          // Apply friction - less friction for more movement
          velocity.multiplyScalar(0.995);
        });

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
        // Get the canvas element bounds for accurate mouse positioning
        const rect = currentCanvas?.getBoundingClientRect();
        if (!rect) return;

        // Normalize mouse coordinates relative to the canvas
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Convert to world coordinates with correct camera setup
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        mouseWorld.copy(camera.position).add(dir.multiplyScalar(distance));
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      setLoading(false);
      return () => {
        updateThemeColorsRef.current = null;
        currentCanvas?.removeChild(effect.domElement);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        renderer.dispose();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]); // Only depend on mounted, not theme

  // Separate effect for theme updates (only updates colors, doesn't recreate scene)
  useEffect(() => {
    if (mounted && updateThemeColorsRef.current) {
      const { effect, objects } = updateThemeColorsRef.current;
      const currentTheme = theme === "system" ? systemTheme : theme;
      const isDark = currentTheme === "dark";
      
      // Update ASCII effect colors
      effect.domElement.style.color = isDark ? "#9ca3af" : "#6b7280";
      effect.domElement.style.backgroundColor = isDark ? "#000000" : "#e0e5eb";
      
      // Update object colors
      objects.forEach((obj: any, i: number) => {
        if (i % 2 === 0 && obj.sphereMaterial) {
          obj.sphereMaterial.color.setHex(isDark ? 0x4f46e5 : 0x3b82f6);
        } else if (obj.cubeMaterial) {
          obj.cubeMaterial.color.setHex(isDark ? 0x059669 : 0x10b981);
        }
      });
    }
  }, [mounted, theme, systemTheme]);

  return (
    <>
      {loading && (
        <div className="w-screen h-1/3 text-center py-28 bg-background">
          <Spinner size="lg">Loading...</Spinner>
        </div>
      )}
      <div className="relative">
        <div ref={canvas} className="cursor-none"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
          {!loading && (
            <div className="p-8 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg border shadow-lg">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                Hi I&apos;m Juan Quintana
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Welcome to my Website!
              </p>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
      </div>
    </>
  );
}
