"use client";

import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

/** 全站 Popover 面板与箭头填充色 */
const POPOVER_SURFACE = "#26292C";

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Popover: {
            colorBgElevated: POPOVER_SURFACE,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
