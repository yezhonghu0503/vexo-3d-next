import React, { useState, useRef, useEffect } from "react";
import styles from "./TripoLayout.module.css";
import Image from "next/image";

// antd 核心组件
import { Popover, Modal } from "antd";

import {
  UserOutlined,
  ApiOutlined,
  AppstoreAddOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const WorkbenchHeader = () => {
  const [open, setOpen] = useState(false);
  {
    /* 鼠标移入弹出气泡菜单（Popover实现） */
  }
  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        backgroundColor: "#26292C",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
        onClick={() => setOpen(true)}
      >
        <UserOutlined />
        <span>个人信息</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
      >
        <ApiOutlined />
        <span>API</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
      >
        <AppstoreAddOutlined />
        <span>插件</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
      >
        <MessageOutlined />
        <span>联系我们</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
      >
        <LogoutOutlined />
        <span>登出</span>
      </div>
    </div>
  );

  {
    /* 顶部导航栏（通顶） */
  }
  return (
    <header className={styles.topNav}>
      <div className={styles.navLeft}>
        <div className={styles.logo}>Vexo</div>
        <nav className={styles.navMenu}>
          <a className={styles.navItemActive}>3D 工作台</a>
          <a className={styles.navItem}>首页</a>
          <a className={styles.navItem}>资产</a>
          <a className={styles.navItem}>推广计划</a>
        </nav>
      </div>
      <div className={styles.navRight}>
        <button className={styles.navBtn}>DCC Bridge</button>
        <div className={styles.userInfo}>
          <Image src="/image/sd.png" alt="avatar" width={25} height={25} />
          <span>280</span>
          <button className={styles.upgradeBtn}>
            <Image src="/image/xhj.png" alt="avatar" width={25} height={25} />
            升级
          </button>
          <Image src="/image/ld.png" alt="avatar" width={22} height={22} />
          <Image src="/image/dq.png" alt="avatar" width={22} height={22} />
          {/* 鼠标移入弹出气泡 */}
          <Popover content={content} trigger="hover" placement="bottomRight">
            <Image
              src="/image/grxx.png"
              width={22}
              height={22}
              style={{ cursor: "pointer", borderRadius: 8 }}
              alt="个人中心"
            />
          </Popover>

          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            title="用户头像"
            width={1000}
            footer={null}
            className={styles.userModal}
            bodyStyle={{
              height: "600px",
              overflow: "auto",
              backgroundColor: "#101115",
            }}
          >
            <div className={styles.modalBody}>
              {/* 圆形头像 */}
              <div className={styles.avatarCircle}>
                <UserOutlined style={{ fontSize: 48, color: "#fff" }} />
              </div>

              {/* 用户名 */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>用户头像</label>
                <div className={styles.inputWrapper}>
                  <input
                    defaultValue="请输入用户名"
                    className={styles.formInput}
                  />
                  <span className={styles.editIcon}>✎</span>
                </div>
              </div>

              {/* 邮箱 */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>邮箱</label>
                <input defaultValue="请输入邮箱" className={styles.formInput} />
              </div>

              {/* 按钮 */}
              <div className={styles.buttonGroup}>
                <button className={styles.btnCancel}>取消</button>
                <button className={styles.btnSave}>保存更改</button>
              </div>

              {/* 重置密码 */}
              <div className={styles.resetPasswordLink}>设置/重置密码</div>
            </div>
          </Modal>
        </div>
      </div>
    </header>
  );
};
export default WorkbenchHeader;
