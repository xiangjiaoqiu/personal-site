# 香蕉球 · 个人主页

一个现代、干净、移动端优先的静态个人主页，使用 **纯 HTML + CSS + 原生 JavaScript** 构建，零依赖、零构建步骤。

## 预览

| 首屏 | 功能 |
| --- | --- |
| Hero / 关于 / 技能 / 项目 / 经历 / 联系 七大板块 | 深色模式（跟随系统 + 手动切换） |
| 移动端汉堡菜单、平滑滚动、滚动淡入动效 | SEO（meta / Open Graph / favicon） |
| 联系表单（mailto 方式，无需后端） | 无障碍（语义化标签、aria、键盘可操作） |

## 文件结构

```
personal-site/
├── index.html                      # 页面（全部内容都在这里，含"待替换"标注）
├── styles.css                      # 样式（移动端优先，CSS 变量控制主题）
├── script.js                       # 交互（主题切换 / 菜单 / 滚动淡入 / 表单）
├── assets/
│   ├── avatar.svg                  # 占位头像（姓名首字生成）—— 待替换
│   ├── resume.pdf                  # 占位简历 —— 待替换
│   └── favicon.svg                 # 网站图标
├── .github/workflows/deploy.yml    # GitHub Pages 自动部署
├── CNAME                           # 自定义域名 bananaball.com
└── README.md
```

## 本地运行

方式一：直接双击 `index.html` 用浏览器打开。

方式二（推荐，路径行为与线上一致）：在项目目录启动一个静态服务器：

```bash
# Python 3
python -m http.server 8080
# 然后访问 http://localhost:8080
```

或使用 VS Code 的 Live Server 插件。

## 如何替换占位内容

所有待替换处都在 `index.html` 中以 `TODO(待替换)` 或 `【待替换】` 标注，搜索即可：

| 内容 | 位置 | 操作 |
| --- | --- | --- |
| 真实头像 | `assets/avatar.jpg`（新增） | 放入照片，把 `index.html` 中 `hero__avatar` 的 `src` 改为 `assets/avatar.jpg` |
| 真实简历 | `assets/resume.pdf` | 覆盖占位文件；并把 `script.js` 中 `resume-link` 的 `data-ready` 设为 `"true"`（或删除第 5 节拦截逻辑） |
| 技能 | `index.html` 技能区 | 替换 `tag--placeholder` 标签为真实技能 |
| 专业/入学年份/经历 | 关于我 + 时间线区 | 替换 `【待替换】` 文本 |
| GitHub / 社交链接 | 项目卡片 + 联系区 | 替换 `your-username` 为你的 GitHub 用户名 |
| OG 图片绝对地址 | `<head>` 中 `og:image` | 部署后填完整 URL |

## 部署到 GitHub Pages

### 方式一：GitHub Actions（本仓库已内置）

1. 在 GitHub 新建仓库（如 `personal-site`），把本项目推送上去：

   ```bash
   git init
   git add .
   git commit -m "feat: 个人主页初版"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/personal-site.git
   git push -u origin main
   ```

2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 之后每次 push 到 `main`，`.github/workflows/deploy.yml` 会自动构建并发布。
4. 访问 `https://<你的用户名>.github.io/personal-site/`。

> 提示：纯静态站其实也可以直接把 Source 设为 `main` 分支根目录，无需 Actions；本仓库默认用 Actions，部署历史更清晰。

### 自定义域名（已配置为 bananaball.com）

仓库已包含 `CNAME` 文件（内容为 `bananaball.com`），只需完成两步：

1. **DNS 设置**（在你的域名服务商处）：

   | 记录类型 | 主机记录 | 记录值 |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME（可选，让 www 也能访问） | `www` | `<你的GitHub用户名>.github.io` |

2. **GitHub 设置**：仓库 **Settings → Pages → Custom domain** 填入 `bananaball.com` 保存，
   待 DNS 校验通过（打上绿勾）后勾选 **Enforce HTTPS**。

3. 之后访问 https://bananaball.com/ 即可。`index.html` 中的 `og:url`、`og:image`、
   `canonical` 已指向该域名，无需再改。

## 技术说明

- **零依赖**：不使用任何框架、构建工具或付费服务。
- **深色模式**：`<head>` 内联脚本在 CSS 加载前读取 `localStorage` / 系统偏好，避免闪烁（FOUC）。
- **动效**：仅淡入、悬停、平滑滚动，且尊重系统的"减少动效"设置（`prefers-reduced-motion`）。
- **无障碍**：语义化 HTML、`aria-*` 标签、`:focus-visible` 焦点样式、足够的颜色对比度。
- **性能**：单文件 JS/CSS、无外部请求、动效用 CSS transition 实现。

## License

仅供个人使用。页面中的文字内容归 香蕉球 所有。
