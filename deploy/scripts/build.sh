#!/bin/bash

# Memorin 项目自动化构建脚本
# 支持开发、测试、生产环境构建

set -e  # 遇到错误时退出

# 配置变量
PROJECT_NAME="memorin"
VERSION="1.0.0"
BUILD_TIME=$(date '+%Y%m%d_%H%M%S')
DIST_DIR="dist"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 输出函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 显示帮助信息
show_help() {
    echo "Memorin 构建脚本"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -e, --env ENV        构建环境 (dev|test|prod) [默认: dev]"
    echo "  -c, --clean          清理构建目录"
    echo "  -z, --zip            创建ZIP压缩包"
    echo "  -d, --docker         构建Docker镜像"
    echo "  -p, --publish        发布到静态托管平台"
    echo "  -h, --help           显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 -e prod -c -z     # 生产环境构建并打包"
    echo "  $0 -e dev -d         # 开发环境构建Docker镜像"
}

# 清理构建目录
clean_build() {
    log_info "清理构建目录..."
    if [ -d "$DIST_DIR" ]; then
        rm -rf "$DIST_DIR"
        log_success "构建目录已清理"
    fi
    mkdir -p "$DIST_DIR"
}

# 复制源文件
copy_source_files() {
    log_info "复制源文件到构建目录..."
    
    # 复制主要文件
    cp index.html "$DIST_DIR/"
    cp -r css "$DIST_DIR/"
    cp -r js "$DIST_DIR/"
    cp README.md "$DIST_DIR/"
    
    # 复制文档（如果存在）
    if [ -d "docs" ]; then
        cp -r docs "$DIST_DIR/"
    fi
    
    log_success "源文件复制完成"
}

# 优化构建（根据环境）
optimize_build() {
    local env=$1
    log_info "开始优化构建 (环境: $env)..."
    
    case $env in
        "prod")
            log_info "生产环境优化..."
            # 生产环境：压缩JS和CSS（使用Node.js工具）
            if command -v node &> /dev/null; then
                # 安装依赖并压缩
                if [ ! -d "node_modules" ]; then
                    npm install --silent
                fi
                # 这里可以添加具体的压缩逻辑
            fi
            
            # 替换CDN链接为生产版本
            sed -i.bak 's/Chart.js\/4.4.1\/chart.min.js/Chart.js\/4.4.1\/chart.min.js/g' "$DIST_DIR/index.html"
            rm -f "$DIST_DIR/index.html.bak"
            ;;
        "test")
            log_info "测试环境优化..."
            # 测试环境：保留调试信息但进行基本优化
            ;;
        "dev")
            log_info "开发环境：保持原始文件..."
            # 开发环境：不进行压缩，保留完整调试信息
            ;;
    esac
    
    # 创建版本信息文件
    cat > "$DIST_DIR/version.json" << EOF
{
    "name": "$PROJECT_NAME",
    "version": "$VERSION",
    "buildTime": "$BUILD_TIME",
    "environment": "$env",
    "commit": "$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
}
EOF
    
    log_success "构建优化完成"
}

# 创建ZIP压缩包
create_zip_package() {
    log_info "创建ZIP压缩包..."
    
    local zip_name="${PROJECT_NAME}_v${VERSION}_${BUILD_TIME}.zip"
    
    # 进入dist目录进行打包
    cd "$DIST_DIR"
    zip -r "../$zip_name" . -q
    cd ..
    
    local zip_size=$(du -h "$zip_name" | cut -f1)
    log_success "ZIP压缩包创建完成: $zip_name (大小: $zip_size)"
}

# 构建Docker镜像
build_docker() {
    log_info "构建Docker镜像..."
    
    local image_name="$PROJECT_NAME:$VERSION"
    local latest_name="$PROJECT_NAME:latest"
    
    docker build -f deploy/docker/Dockerfile -t "$image_name" -t "$latest_name" .
    
    log_success "Docker镜像构建完成: $image_name"
}

# 发布到静态托管平台
publish_to_hosting() {
    log_info "准备发布到静态托管平台..."
    
    # GitHub Pages
    if [ -d ".git" ] && git remote get-url origin | grep -q "github.com"; then
        log_info "检测到GitHub仓库，准备GitHub Pages发布..."
        
        # 创建gh-pages分支并推送
        git checkout -B gh-pages
        git add "$DIST_DIR"/*
        git commit -m "Deploy to GitHub Pages - $BUILD_TIME" || true
        git push origin gh-pages --force
        git checkout main || git checkout master
        
        log_success "已推送到GitHub Pages分支"
    fi
    
    # Netlify部署准备
    cat > "$DIST_DIR/_redirects" << 'EOF'
/*    /index.html   200
EOF
    
    cat > "$DIST_DIR/netlify.toml" << 'EOF'
[build]
  publish = "."
  
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
EOF
    
    log_success "静态托管配置文件已创建"
}

# 主函数
main() {
    local env="dev"
    local clean=false
    local zip=false
    local docker=false
    local publish=false
    
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -e|--env)
                env="$2"
                shift 2
                ;;
            -c|--clean)
                clean=true
                shift
                ;;
            -z|--zip)
                zip=true
                shift
                ;;
            -d|--docker)
                docker=true
                shift
                ;;
            -p|--publish)
                publish=true
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                log_error "未知选项: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # 验证环境参数
    if [[ ! "$env" =~ ^(dev|test|prod)$ ]]; then
        log_error "无效的环境: $env"
        exit 1
    fi
    
    log_info "🚀 开始构建 Memorin 项目"
    log_info "环境: $env | 版本: $VERSION | 时间: $BUILD_TIME"
    echo "=========================================="
    
    # 执行构建步骤
    if [ "$clean" = true ]; then
        clean_build
    else
        mkdir -p "$DIST_DIR"
    fi
    
    copy_source_files
    optimize_build "$env"
    
    if [ "$zip" = true ]; then
        create_zip_package
    fi
    
    if [ "$docker" = true ]; then
        build_docker
    fi
    
    if [ "$publish" = true ]; then
        publish_to_hosting
    fi
    
    echo "=========================================="
    log_success "🎉 构建完成！"
    log_info "构建目录: $DIST_DIR/"
    
    if [ "$zip" = true ]; then
        log_info "压缩包: ${PROJECT_NAME}_v${VERSION}_${BUILD_TIME}.zip"
    fi
    
    if [ "$docker" = true ]; then
        log_info "Docker镜像: $PROJECT_NAME:$VERSION"
    fi
}

# 执行主函数
main "$@" 