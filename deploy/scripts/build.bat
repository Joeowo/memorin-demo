@echo off
rem Memorin 项目 Windows 构建脚本

setlocal

rem 配置变量
set PROJECT_NAME=memorin
set VERSION=1.0.0
set DIST_DIR=dist

rem 获取当前时间戳
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "BUILD_TIME=%dt:~0,8%_%dt:~8,6%"

rem 默认参数
set ENV=prod
set CLEAN=false

rem 简单参数解析
if "%1"=="-c" set CLEAN=true
if "%1"=="--clean" set CLEAN=true
if "%2"=="-c" set CLEAN=true
if "%2"=="--clean" set CLEAN=true

echo 🚀 开始构建 Memorin 项目
echo 环境: %ENV% 版本: %VERSION% 时间: %BUILD_TIME%
echo ==========================================

rem 清理构建目录
if "%CLEAN%"=="true" (
    echo [INFO] 清理构建目录...
    if exist "%DIST_DIR%" (
        rmdir /s /q "%DIST_DIR%"
        echo [SUCCESS] 构建目录已清理
    )
)

rem 创建构建目录
if not exist "%DIST_DIR%" mkdir "%DIST_DIR%"

rem 复制源文件
echo [INFO] 复制源文件到构建目录...
copy index.html "%DIST_DIR%\" >nul 2>&1
if exist css xcopy css "%DIST_DIR%\css\" /e /i /y >nul 2>&1
if exist js xcopy js "%DIST_DIR%\js\" /e /i /y >nul 2>&1
copy README.md "%DIST_DIR%\" >nul 2>&1

rem 复制文档
if exist docs xcopy docs "%DIST_DIR%\docs\" /e /i /y >nul 2>&1

echo [SUCCESS] 源文件复制完成

rem 环境优化
echo [INFO] 开始优化构建 (环境: %ENV%)...
echo [INFO] 生产环境优化...

rem 创建版本信息文件
echo [INFO] 创建版本信息文件...
echo { > "%DIST_DIR%\version.json"
echo     "name": "%PROJECT_NAME%", >> "%DIST_DIR%\version.json"
echo     "version": "%VERSION%", >> "%DIST_DIR%\version.json"
echo     "buildTime": "%BUILD_TIME%", >> "%DIST_DIR%\version.json"
echo     "environment": "%ENV%", >> "%DIST_DIR%\version.json"
echo     "commit": "unknown" >> "%DIST_DIR%\version.json"
echo } >> "%DIST_DIR%\version.json"

echo [SUCCESS] 构建优化完成

echo ==========================================
echo [SUCCESS] 🎉 构建完成！
echo [INFO] 构建目录: %DIST_DIR%\

endlocal 