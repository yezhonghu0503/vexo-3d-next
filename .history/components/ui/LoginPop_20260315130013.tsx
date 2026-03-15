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
        <img
          src="/image/logo.png"
          alt="logo"
          width={35}
          height={35}
          style={{ borderRadius: "10px", marginTop: "-20px" }}
        />
        <span className={styles.logo}>Vexo</span>
        <div className={styles.loginye}>
          <h2 className={styles.ziti} style={{ paddingTop: "30px" }}>
            欢迎来到Vexo
          </h2>
          <p className={styles.ziti}>输入你的邮箱以继续</p>
          <input type="text" className={styles.shuru} value={"输入电子邮箱"} />
          <input type="text" className={styles.yzm} value={"6位验证码"} />
          <button className={styles.fsyzm}>发送验证码</button>
          <button className={styles.signup}>登录</button>
          <p className={styles.hz}>或</p>
          <button className={styles.qtyx}>
            <img
              src="/image/google.avif"
              alt="logo"
              width={25}
              height={25}
              style={{
                backgroundColor: "#E8E8E8",
                paddingTop: "5px",
                paddingRight: "5px",
              }}
            />
            使用Google登录
          </button>
          <p className={styles.bottomtip}>
            继续操作即表示您同意我们的<a href="#">使用条款</a>和
            <a href="#">隐私政策.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPop;
