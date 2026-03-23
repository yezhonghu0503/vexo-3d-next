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

    // 1. 初始化场景、相机、渲染器
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

    // 2. 设置渲染器尺寸为全屏
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 3. 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 4. 加载 public 下的 3D 模型（处理空格）
    const loader = new GLTFLoader();
    loader.load(
      "/I-shaped%20ruin%20diorama%203d.glb", // 用 %20 替换空格
      (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("模型加载失败:", error);
      },
    );

    // 5. 相机位置
    camera.position.z = 5;

    // 6. 动画循环
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // 7. 窗口 resize 监听
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 8. 清理函数
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
