"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import styles from "./page.module.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Workbench() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 辅助网格
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // 灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // 用来保存模型，方便旋转
    let modelRef: THREE.Group | null = null;

    const loader = new GLTFLoader();
    loader.load(
      "/magic circle diorama 3d model.glb",
      (gltf) => {
        console.log("✅ 模型加载成功！", gltf);
        modelRef = gltf.scene; // 保存模型
        scene.add(modelRef);

        // 自动适配相机，让模型完整显示
        const box = new THREE.Box3().setFromObject(modelRef);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
        camera.position
          .copy(center)
          .add(new THREE.Vector3(0, 0, cameraZ * 1.5));
        camera.lookAt(center);
      },
      (xhr) => console.log(`📊 加载进度: ${(xhr.loaded / xhr.total) * 100}%`),
      (error) => console.error("❌ 模型加载失败:", error),
    );

    // 动画循环 + 自动旋转
    function animate() {
      requestAnimationFrame(animate);
      // 让模型绕竖轴慢慢转
      if (modelRef) {
        modelRef.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100vw",
            height: "100vh",
            display: "block",
            backgroundColor: "#000",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      </main>
    </div>
  );
}
