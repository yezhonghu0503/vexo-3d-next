import { FC } from "react";

interface LoginPopProps {
  visible: boolean;
  onClose: () => void;
}

const LoginPop: FC<LoginPopProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          width: "320px",
        }}
      >
        <h3>登录</h3>
        <input
          type="text"
          placeholder="账号"
          style={{ width: "100%", margin: "8px 0", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="密码"
          style={{ width: "100%", margin: "8px 0", padding: "8px" }}
        />
        <div style={{ marginTop: "16px" }}>
          <button>登录</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPop;
