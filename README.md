# 香蕉球 · 个人主页

一个现代、干净、移动端优先的**多页静态个人主页**，使用 **纯 HTML + CSS + 原生 JavaScript** 构建，零依赖、零构建步骤，托管于 GitHub Pages。

**线上地址：https://xiangjiaoqiu.github.io/personal-site/**

## 页面结构

| 页面 | 文件 | 内容 |
| --- | --- | --- |
| 首页 | `index.html` | Hero（头像/姓名/身份/按钮）+ 五个板块入口卡片 |
| 关于 | `about.html` | 自我介绍 |
| 技能 | `skills.html` | 按语言/前端/后端/工具分类的技能卡片 |
| 项目 | `projects.html` | 项目卡片（名称/描述/技术栈/链接/截图占位） |
| 经历 | `experience.html` | 时间线形式的教育与成长经历 |
| 联系 | `contact.html` | 邮箱、社交链接、mailto 联系表单 |
| 404 | `404.html` | GitHub Pages 自动使用的自定义 404 页 |

全站共用导航栏（当前页自动高亮）与页脚；深色模式设置跨页面保持。

## 文件结构

```
personal-site/
├── index.html                      # 首页
├── about.html                      # 关于
├── skills.html                     # 技能
├── projects.html                   # 项目
├── experience.html                 # 经历
├── contact.html                    # 联系
├── 404.html                        # 自定义 404 页
├── styles.css                      # 样式（移动端优先，CSS 变量控制主题）
├── script.js                       # 交互（主题切换 / 菜单 / 滚动淡入 / 表单）
├── assets/
│   ├── avatar.svg                  # 占位头像（姓名首字生成）—— 待替换
│   ├── resume.pdf                  # 占位简历 —— 待替换
│   └── favicon.svg                 # 网站图标
├── .github/workflows/deploy.yml    # GitHub Pages 自动部署
└── README.md
```

## 本地运行

```bash
python -m http.server 8080
# 然后访问 http://localhost:8080
```

或直接双击 `index.html` 打开（子页面跳转同样有效）。

## 如何替换占位内容

所有待替换处都在 HTML 中以 `TODO(待替换)` 或 `【待替换】` 标注，搜索即可：

| 内容 | 位置 | 操作 |
| --- | --- | --- |
| 真实头像 | `assets/avatar.jpg`（新增） | 放入照片，把各页面 `hero__avatar` 的 `src` 改为 `assets/avatar.jpg` |
| 真实简历 | `assets/resume.pdf` | 覆盖占位文件；并把 `script.js` 中 `resume-link` 的 `data-ready` 设为 `"true"` |
| 技能 | `skills.html` | 替换 `tag--placeholder` 标签为真实技能 |
| 专业/入学年份/经历 | `about.html` + `experience.html` | 替换 `【待替换】` 文本 |
| GitHub / 社交链接 | `contact.html` | 替换"待替换"占位文本 |

## 部署到 GitHub Pages

仓库已配置 `.github/workflows/deploy.yml`，每次 push 到 `main` 自动部署。

```bash
git add .
git commit -m "更新内容"
git push
```

> 自定义域名说明：曾计划绑定 `bananaball.com`，但该域名已被他人注册且与本项目无关，
> 相关的 CNAME 配置已移除。当前使用过渡地址 `xiangjiaoqiu.github.io/personal-site`。
> 如以后要绑定自己的域名，在仓库根目录添加 `CNAME` 文件并在 DNS 添加解析即可。

## 技术说明

- **零依赖**：不使用任何框架、构建工具或付费服务。
- **多页架构**：导航高亮通过各页面 HTML 中的 `aria-current="page"` 静态标注，无需 JS。
- **深色模式**：`<head>` 内联脚本在 CSS 加载前读取 `localStorage` / 系统偏好，避免闪烁；设置跨页面共享。
- **动效**：仅淡入、悬停、平滑滚动，且尊重系统的"减少动效"设置（`prefers-reduced-motion`）。
- **无障碍**：语义化 HTML、`aria-*` 标签、`:focus-visible` 焦点样式、足够的颜色对比度。
- **性能**：单文件 JS/CSS、无外部请求、动效用 CSS transition 实现。

## License

仅供个人使用。页面中的文字内容归 香蕉球 所有。
