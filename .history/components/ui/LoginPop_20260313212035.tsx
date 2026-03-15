import { FC } from "react";
import styles from "./LoginPop.module.css";

interface LoginPopProps {
  visible: boolean;
  onClose: () => void;
}

const LoginPop: FC<LoginPopProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    // 最外层盒子父组件
    <div className="bigbox"></div>
  );
};

export default LoginPop;
