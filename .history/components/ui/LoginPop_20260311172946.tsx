import Image from "next/image";
import { useState } from "react";
// LoginPop.tsx
export const LoginPop = () => {
  // ...组件内容
};

const LoginModal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  // 组件挂载后自动弹出
  useEffect(() => {
    setVisible(true);
  }, []);

  // 登录处理
  const handleLogin = () => {
    alert("登录成功");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={modalMaskStyle}>
      <div style={loginBoxStyle}>
        <h3 style={{ textAlign: "center", margin: 0 }}>用户登录</h3>
        <input style={inputStyle} type="text" placeholder="请输入账号" />
        <input style={inputStyle} type="password" placeholder="请输入密码" />
        <button style={btnStyle} onClick={handleLogin}>
          登录
        </button>
      </div>
    </div>
  );
};

// 样式
const modalMaskStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const loginBoxStyle: React.CSSProperties = {
  width: 320,
  padding: 24,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  margin: "8px 0",
  boxSizing: "border-box",
  border: "1px solid #ddd",
  borderRadius: 6,
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  background: "#409eff",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

export default LoginModal;
