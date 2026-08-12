# Huaxa125 · AI Builder

个人品牌静态主页：**AI Builder —— 公开构建 AI 产品，分享从 0 到 1 的增长过程**。

**Live:** [https://huaxa.pages.dev](https://huaxa.pages.dev)

## Features

- 深色主题品牌页（`#0B0B12` / accent `#7B6FE8`，Syne + Inter）
- SEO：canonical、OG / Twitter Card、JSON-LD Person、`zh-CN`
- 无障碍：skip link、landmarks、汉堡菜单 ARIA、焦点样式
- 性能：font preconnect / `display=swap`、avatar WebP + srcset、`content-visibility`
- 内容诚实：无真实落地页的资源 / 课程 / 文章标为「即将上线」，外链仅指向已验证的 [X](https://x.com/Huaxa125) 与 [GitHub](https://github.com/Huaxa125)

## Tech Stack

- HTML5 + CSS3 + Vanilla JS（无框架）
- 静态资源：`index.html`、`avatar*.{jpg,webp}`、`favicon.svg`

## Deploy

部署到 [Cloudflare Pages](https://pages.cloudflare.com)：连接本仓库根目录即可自动部署（纯静态，无需构建命令）。

```bash
# 本地预览
npx serve .
# 或
python3 -m http.server 8080
```

## Roadmap

- [x] Personal homepage
- [ ] Real article / course / resource URLs
- [ ] Newsletter signup
- [ ] Custom domain (e.g. huaxa125.com) once DNS is ready

## License

See [LICENSE](./LICENSE).
