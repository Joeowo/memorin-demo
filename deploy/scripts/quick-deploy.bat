@echo off
rem 快速部署脚本 - 一键构建和启动本地服务器

echo 🚀 Memorin 快速部署
echo ==========================================

rem 1. 构建项目
echo [1/3] 构建项目...
call deploy\scripts\build.bat -c
if errorlevel 1 (
    echo [ERROR] 构建失败！
    pause
    exit /b 1
)

rem 2. 检查构建结果
echo [2/3] 检查构建结果...
if not exist "dist\index.html" (
    echo [ERROR] 构建文件缺失！
    pause
    exit /b 1
)

rem 3. 启动本地服务器
echo [3/3] 启动本地服务器...
echo.
echo ✅ 构建完成！正在启动服务器...
echo 🌐 访问地址: http://localhost:8080
echo 📁 文件目录: %cd%\dist
echo.
echo 按 Ctrl+C 停止服务器
echo ==========================================

cd dist
python -m http.server 8080 2>nul || (
    echo [INFO] Python未安装，尝试使用Node.js...
    npx http-server -p 8080 -c-1 2>nul || (
        echo [ERROR] 无法启动服务器，请手动安装Python或Node.js
        pause
        exit /b 1
    )
) 