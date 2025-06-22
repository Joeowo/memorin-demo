# Memorin 部署指南

## 📋 部署方案概览

Memorin 支持多种部署方式，可满足不同环境和需求：

### 🚀 支持的部署平台
- **GitHub Pages** - 免费静态网站托管
- **Netlify** - 现代化静态站点部署
- **Vercel** - 高性能前端托管平台
- **Docker** - 容器化部署
- **本地服务器** - 自建服务器部署

## 🛠️ 快速部署

### 1. 自动化构建

使用提供的构建脚本：

```bash
# 生产环境构建
./deploy/scripts/build.sh -e prod -c

# 生产环境构建并打包
./deploy/scripts/build.sh -e prod -c -z

# Docker构建
./deploy/scripts/build.sh -e prod -c -d
```

### 2. npm 脚本

```bash
# 安装依赖
npm install

# 开发环境
npm run dev

# 生产构建
npm run build

# Docker部署
npm run docker:build
npm run docker:run
```

## 🌐 平台部署指南

### GitHub Pages

1. **自动部署**（推荐）：
   - 将代码推送到 GitHub 仓库
   - GitHub Actions 自动构建和部署
   - 访问 `https://username.github.io/memorin`

2. **手动部署**：
   ```bash
   npm run deploy:github
   ```

### Netlify

1. **拖拽部署**：
   - 运行 `npm run build`
   - 将 `dist/` 文件夹拖拽到 Netlify

2. **Git 集成**：
   - 连接 GitHub 仓库
   - 设置构建命令：`chmod +x deploy/scripts/build.sh && ./deploy/scripts/build.sh -e prod -c`
   - 设置发布目录：`dist`

### Vercel

1. **CLI 部署**：
   ```bash
   npx vercel --prod
   ```

2. **Git 集成**：
   - 导入 GitHub 仓库
   - Vercel 自动识别配置

### Docker 部署

1. **构建镜像**：
   ```bash
   npm run docker:build
   ```

2. **运行容器**：
   ```bash
   npm run docker:run
   ```

3. **访问应用**：
   - 打开 `http://localhost:8080`

## 🔧 环境配置

### 环境变量

创建 `.env` 文件（如需要）：

```env
# 监控配置
MONITORING_ENDPOINT=https://your-monitoring-service.com/api/metrics

# CDN配置
CDN_BASE_URL=https://cdn.example.com

# 应用配置
APP_VERSION=1.0.0
APP_ENV=production
```

### 构建选项

| 环境 | 说明 | 特点 |
|------|------|------|
| `dev` | 开发环境 | 保留调试信息，未压缩 |
| `test` | 测试环境 | 基本优化，保留部分调试信息 |
| `prod` | 生产环境 | 完全优化，压缩文件，性能最佳 |

## 📊 监控和维护

### 健康检查

应用内置健康监控系统：

```javascript
// 获取应用状态
HealthMonitor.getStatus()

// 重置监控数据
HealthMonitor.reset()
```

### 性能监控

- 页面加载时间
- 内存使用情况
- 错误率统计
- 用户行为分析

### 日志收集

在生产环境中，可配置外部监控服务：

```javascript
window.MONITORING_ENDPOINT = 'https://your-service.com/api/logs';
```

## 🔒 安全配置

### HTTP 安全头

所有部署平台都配置了安全头：

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 缓存策略

- HTML: 不缓存
- CSS/JS: 1年缓存
- 图片: 1年缓存

## 🚨 故障排除

### 常见问题

1. **构建失败**：
   - 检查 Node.js 版本 (>= 14.0.0)
   - 确保脚本具有执行权限：`chmod +x deploy/scripts/build.sh`

2. **LocalStorage 问题**：
   - 确保在 HTTPS 或 localhost 环境下运行
   - 检查浏览器是否支持 LocalStorage

3. **Docker 问题**：
   - 确保 Docker 和 Docker Compose 已安装
   - 检查端口 8080 是否被占用

### 测试部署

```bash
# 运行测试
npm test

# 检查构建输出
npm run build
ls -la dist/

# 本地预览
npm run serve
```

## 📈 优化建议

### 性能优化

1. **CDN 配置**：
   - 将静态资源部署到 CDN
   - 配置合适的缓存策略

2. **代码分割**：
   - 按需加载模块
   - 懒加载非关键资源

3. **压缩优化**：
   - 开启 Gzip 压缩
   - 使用 Brotli 压缩（如支持）

### 用户体验

1. **离线支持**：
   - 考虑添加 Service Worker
   - 实现离线缓存策略

2. **加载优化**：
   - 预加载关键资源
   - 优化首屏渲染时间

## 🔄 更新策略

### 版本发布

1. **自动发布**：
   - 推送到 main 分支触发自动部署
   - GitHub Actions 处理构建和发布

2. **手动发布**：
   ```bash
   # 构建新版本
   npm run build

   # 创建发布包
   npm run build:zip

   # 手动部署到各平台
   ```

### 回滚策略

- GitHub Pages：回滚到前一个 commit
- Netlify：使用部署历史回滚
- Vercel：使用部署历史回滚
- Docker：切换到前一个镜像版本

---

📝 **注意事项**：
- 确保在部署前测试所有功能
- 定期检查和更新依赖
- 监控应用性能和错误
- 备份重要配置和数据 