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

    // 添加辅助网格（方便调试）
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      // 👇 这里改成你public里的模型文件名
      "/I-shaped ruin diorama 3d.glb",
      (gltf) => {
        console.log("模型加载成功！");
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(0.5, 0.5, 0.5); // 缩小模型
      },
      (xhr) => {
        console.log(`加载进度：${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => {
        console.error("模型加载失败：", error);
      },
    );

    camera.position.z = 8; // 拉远相机

    function animate() {
      requestAnimationFrame(animate);
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
          style={{ width: "100vw", height: "100vh", display: "block" }}
        />
      </main>
    </div>
  );
}
