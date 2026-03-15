import Image from "next/image";
import { useState } from "react";
// LoginPop.tsx
export const LoginPop = () => {
  // ...组件内容
};
import styles from "./LoginPop.module.css";

// 定义组件属性，接收 onClose 函数
interface LoginPopProps {
  onClose: () => void;
}

const LoginPops = ({ onClose }: LoginPopProps) => {
  return (
    <div className={styles.modalMask}>
      <div className={styles.loginBox}>
        <h3>用户登录</h3>
        <input type="text" placeholder="账号" className={styles.input} />
        <input type="password" placeholder="密码" className={styles.input} />
        <button className={styles.loginBtn}>登录</button>
        {/* 7. 点击关闭按钮，调用父组件传来的 onClose */}
        <button className={styles.closeBtn} onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
};

export default LoginPop;
