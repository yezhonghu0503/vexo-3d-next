import { FC } from "react";
import styles from "./LoginPop.module.css";

interface LoginPopProps {
  visible: boolean;
  onClose: () => void;
}

const LoginPop: FC<LoginPopProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className={styles.mask} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img src="/image/tripo-logo1.webp" alt="logo" width={30} height={30} />
        <img
          src="/image/tripo-text.png"
          alt="logo"
          width={55}
          height={30}
          style={{ marginLeft: "10px" }}
        />
        <div className={styles.loginye}>
          <h2 className={styles.ziti} style={{ paddingTop: "30px" }}>
            欢迎来到Vexo
          </h2>
          <p className={styles.ziti}>输入你的邮箱以继续</p>
          <input type="text" className={styles.shuru} value={"输入电子邮箱"} />
          <input type="text" className={styles.yzm} value={"6位验证码"} />
          <span>发送验证码</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPop;
