"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function Workbench() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. 场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    // 2. 相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 10;

    // 3. 灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // 4. 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // 5. 加载模型
    const loader = new GLTFLoader();
    loader.load(
      "/magic circle diorama 3d model.glb",
      (gltf) => {
        console.log("✅ 模型加载成功", gltf);
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, 0, 0);
        scene.add(gltf.scene);
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        console.log(`📊 加载进度: ${percent.toFixed(2)}%`);
      },
      (error) => {
        console.error("❌ 模型加载失败", error);
      },
    );

    // 6. 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 7. 窗口 resize 处理
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 8. 清理
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}
    />
  );
}
