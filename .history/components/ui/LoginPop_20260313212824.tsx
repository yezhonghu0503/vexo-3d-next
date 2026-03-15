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
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}></div>
      <div>
        <Image src={"/image/tripo-logo1"} alt="logo" width={20} height={20} />
      </div>
    </div>
  );
};

export default LoginPop;
