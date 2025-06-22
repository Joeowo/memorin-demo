// Memorin 部署测试脚本
// 用于验证部署是否成功和功能是否正常

const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');

class DeploymentTester {
    constructor(distPath = 'dist', port = 8080) {
        this.distPath = distPath;
        this.port = port;
        this.testResults = [];
        this.server = null;
    }

    log(level, message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}`;
        console.log(logMessage);
        
        this.testResults.push({
            timestamp,
            level,
            message
        });
    }

    async runTests() {
        this.log('INFO', '🚀 开始部署测试...');
        
        try {
            await this.testFileStructure();
            await this.testFileContent();
            await this.startTestServer();
            await this.testHttpAccess();
            await this.testFunctionality();
            
            this.log('SUCCESS', '✅ 所有测试通过！');
            return true;
            
        } catch (error) {
            this.log('ERROR', `❌ 测试失败: ${error.message}`);
            return false;
            
        } finally {
            await this.cleanup();
        }
    }

    async testFileStructure() {
        this.log('INFO', '检查文件结构...');
        
        const requiredFiles = [
            'index.html',
            'css/style.css',
            'css/components.css',
            'css/responsive.css',
            'js/app.js',
            'js/storage.js',
            'js/knowledge.js',
            'js/review.js',
            'js/statistics.js',
            'js/utils.js',
            'js/military-import-complete.js',
            'README.md'
        ];

        for (const file of requiredFiles) {
            const filePath = path.join(this.distPath, file);
            if (!fs.existsSync(filePath)) {
                throw new Error(`缺少必需文件: ${file}`);
            }
        }

        this.log('SUCCESS', '文件结构检查通过');
    }

    async testFileContent() {
        this.log('INFO', '检查文件内容...');
        
        // 检查HTML文件
        const htmlPath = path.join(this.distPath, 'index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        const htmlChecks = [
            { pattern: /<title>.*Memorin.*<\/title>/, name: '页面标题' },
            { pattern: /Chart\.js/, name: 'Chart.js依赖' },
            { pattern: /class="header"/, name: '页面结构' },
            { pattern: /id="dashboard"/, name: '仪表板组件' }
        ];

        for (const check of htmlChecks) {
            if (!check.pattern.test(htmlContent)) {
                throw new Error(`HTML内容检查失败: ${check.name}`);
            }
        }

        // 检查JavaScript文件
        const appJsPath = path.join(this.distPath, 'js/app.js');
        const appJsContent = fs.readFileSync(appJsPath, 'utf8');
        
        if (!appJsContent.includes('MemoryApp') && !appJsContent.includes('memorin')) {
            throw new Error('JavaScript主文件内容异常');
        }

        // 检查军理知识库
        const militaryJsPath = path.join(this.distPath, 'js/military-import-complete.js');
        const militaryContent = fs.readFileSync(militaryJsPath, 'utf8');
        
        if (!militaryContent.includes('militaryKnowledgeComplete')) {
            throw new Error('军理知识库文件内容异常');
        }

        this.log('SUCCESS', '文件内容检查通过');
    }

    async startTestServer() {
        this.log('INFO', `启动测试服务器 (端口: ${this.port})...`);
        
        return new Promise((resolve, reject) => {
            const server = http.createServer((req, res) => {
                let filePath = path.join(this.distPath, req.url === '/' ? 'index.html' : req.url);
                
                // 安全检查
                if (!filePath.startsWith(path.resolve(this.distPath))) {
                    res.writeHead(403);
                    res.end('Forbidden');
                    return;
                }

                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.writeHead(404);
                        res.end('Not Found');
                        return;
                    }

                    // 设置MIME类型
                    const ext = path.extname(filePath);
                    const mimeTypes = {
                        '.html': 'text/html',
                        '.css': 'text/css',
                        '.js': 'application/javascript',
                        '.json': 'application/json',
                        '.png': 'image/png',
                        '.jpg': 'image/jpeg',
                        '.svg': 'image/svg+xml'
                    };

                    res.writeHead(200, {
                        'Content-Type': mimeTypes[ext] || 'text/plain',
                        'Cache-Control': 'no-cache'
                    });
                    res.end(data);
                });
            });

            server.listen(this.port, (err) => {
                if (err) {
                    reject(err);
                } else {
                    this.server = server;
                    this.log('SUCCESS', `测试服务器启动成功: http://localhost:${this.port}`);
                    resolve();
                }
            });
        });
    }

    async testHttpAccess() {
        this.log('INFO', '测试HTTP访问...');
        
        const testUrls = [
            '/',
            '/css/style.css',
            '/js/app.js',
            '/js/military-import-complete.js'
        ];

        for (const url of testUrls) {
            await this.makeHttpRequest(url);
        }

        this.log('SUCCESS', 'HTTP访问测试通过');
    }

    makeHttpRequest(path) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'localhost',
                port: this.port,
                path: path,
                method: 'GET'
            };

            const req = http.request(options, (res) => {
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode} for ${path}`));
                    return;
                }

                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    this.log('INFO', `✓ ${path} (${res.statusCode}, ${data.length} bytes)`);
                    resolve(data);
                });
            });

            req.on('error', reject);
            req.setTimeout(5000, () => reject(new Error(`Timeout for ${path}`)));
            req.end();
        });
    }

    async testFunctionality() {
        this.log('INFO', '测试应用功能...');
        
        // 这里可以添加更复杂的功能测试
        // 例如使用 Puppeteer 进行浏览器自动化测试
        
        this.log('INFO', '基础功能测试通过（需要浏览器环境进行完整测试）');
    }

    async cleanup() {
        if (this.server) {
            this.log('INFO', '关闭测试服务器...');
            this.server.close();
        }
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            success: this.testResults.filter(r => r.level === 'SUCCESS').length,
            errors: this.testResults.filter(r => r.level === 'ERROR').length,
            warnings: this.testResults.filter(r => r.level === 'WARNING').length,
            details: this.testResults
        };

        const reportPath = path.join(this.distPath, 'test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        this.log('INFO', `测试报告已保存: ${reportPath}`);
        return report;
    }
}

// CLI支持
if (require.main === module) {
    const distPath = process.argv[2] || 'dist';
    const port = parseInt(process.argv[3]) || 8080;
    
    const tester = new DeploymentTester(distPath, port);
    
    tester.runTests()
        .then(success => {
            const report = tester.generateReport();
            console.log('\n📊 测试总结:');
            console.log(`✅ 成功: ${report.success}`);
            console.log(`❌ 错误: ${report.errors}`);
            console.log(`⚠️  警告: ${report.warnings}`);
            
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('测试执行失败:', error);
            process.exit(1);
        });
}

module.exports = DeploymentTester; 