type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function LoginPop({ visible, onClose }: Props) {
  // 隐藏就不渲染
  if (!visible) return null;

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h2>登录</h2>
        <input placeholder="账号" />
        <input placeholder="密码" type="password" />
        <button onClick={onClose}>关闭</button>
      </div>
    </div>
  );
}

// 简单样式
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContent = {
  background: "white",
  padding: "24px",
  borderRadius: "8px",
  width: "300px",
};
