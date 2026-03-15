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
        <h2 className={styles.title}>登录</h2>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="请输入账号"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="请输入密码"
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.primaryBtn}>登录</button>
          <button className={styles.closeBtn} onClick={onClose}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPop;
