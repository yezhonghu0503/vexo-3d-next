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
          <h1>欢迎来到Vexo</h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPop;
