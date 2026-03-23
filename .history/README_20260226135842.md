# AI 3D Next.js 项目

这是一个基于 Next.js 14 的 AI 3D 模型生成器项目，使用 CSS Modules 进行样式管理。

## 项目结构

```
ai-3d-next/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── globals.css        # 全局样式
│   ├── page.tsx           # 首页 (/)
│   ├── page.module.css    # 首页样式
│   ├── not-found.tsx      # 404 页面
│   ├── not-found.module.css # 404 页面样式
│   └── workbench/         # 工作台页面目录
│       ├── page.tsx       # 工作台页面 (/workbench)
│       └── page.module.css # 工作台页面样式
├── components/            # 共享组件
│   ├── Header.tsx         # 头部组件
│   ├── Header.module.css  # 头部样式
│   ├── ModelCard.tsx      # 模型卡片组件
│   ├── ModelCard.module.css # 模型卡片样式
│   └── ui/                # UI 组件库
│       ├── Button.tsx
│       ├── Button.module.css
│       ├── Input.tsx
│       ├── Input.module.css
│       ├── Tabs.tsx
│       ├── Tabs.module.css
│       ├── Select.tsx
│       └── Select.module.css
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **CSS Modules** - 样式管理
- **lucide-react** - 图标库

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 页面说明

- `/` - 首页，展示 AI 3D 模型生成功能和模型画廊
- `/workbench` - 工作台页面，用于管理用户创建的 3D 模型
- 404 页面 - 当访问不存在的路由时显示

## 样式说明

所有样式都使用 CSS Modules，每个组件都有对应的 `.module.css` 文件。样式文件与组件文件存放在同一目录下，符合 Next.js 的最佳实践。

## 开发说明

- 所有页面组件都使用 `'use client'` 指令，因为使用了 React Hooks
- 组件使用 CSS Modules 进行样式隔离
- 使用 TypeScript 确保类型安全

