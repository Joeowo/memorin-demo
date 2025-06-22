// Memorin 健康检查和监控脚本
(function() {
    'use strict';
    
    const HealthMonitor = {
        config: {
            checkInterval: 30000, // 30秒检查一次
            reportInterval: 300000, // 5分钟上报一次
            maxErrors: 5,
            endpoints: {
                health: '/health',
                metrics: '/metrics'
            }
        },
        
        metrics: {
            startTime: Date.now(),
            pageViews: 0,
            errors: [],
            performance: [],
            userActions: {
                reviews: 0,
                additions: 0,
                searches: 0
            }
        },
        
        init() {
            this.startTime = Date.now();
            this.bindEvents();
            this.startHealthCheck();
            this.collectPerformanceMetrics();
            console.log('[HealthMonitor] 监控系统已启动');
        },
        
        bindEvents() {
            // 监听错误事件
            window.addEventListener('error', (e) => {
                this.recordError({
                    type: 'javascript',
                    message: e.message,
                    filename: e.filename,
                    lineno: e.lineno,
                    colno: e.colno,
                    timestamp: Date.now()
                });
            });
            
            // 监听Promise拒绝
            window.addEventListener('unhandledrejection', (e) => {
                this.recordError({
                    type: 'promise',
                    message: e.reason?.message || 'Unhandled Promise Rejection',
                    timestamp: Date.now()
                });
            });
            
            // 监听页面可见性变化
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    this.metrics.pageViews++;
                }
            });
            
            // 监听用户操作
            this.trackUserActions();
        },
        
        trackUserActions() {
            // 监听复习相关操作
            document.addEventListener('click', (e) => {
                const target = e.target;
                
                if (target.closest('.review-card')) {
                    this.metrics.userActions.reviews++;
                } else if (target.closest('[data-action="add-knowledge"]')) {
                    this.metrics.userActions.additions++;
                } else if (target.closest('#search-input')) {
                    this.metrics.userActions.searches++;
                }
            });
        },
        
        recordError(error) {
            this.metrics.errors.push(error);
            
            // 限制错误记录数量
            if (this.metrics.errors.length > this.config.maxErrors) {
                this.metrics.errors.shift();
            }
            
            console.error('[HealthMonitor] 记录错误:', error);
            
            // 严重错误立即上报
            if (this.metrics.errors.length >= 3) {
                this.reportHealth();
            }
        },
        
        collectPerformanceMetrics() {
            // 页面加载性能
            if (window.performance && window.performance.timing) {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                
                this.metrics.performance.push({
                    type: 'page_load',
                    value: loadTime,
                    timestamp: Date.now()
                });
            }
            
            // 内存使用情况（如果支持）
            if (window.performance && window.performance.memory) {
                const memory = window.performance.memory;
                this.metrics.performance.push({
                    type: 'memory',
                    value: {
                        used: memory.usedJSHeapSize,
                        total: memory.totalJSHeapSize,
                        limit: memory.jsHeapSizeLimit
                    },
                    timestamp: Date.now()
                });
            }
        },
        
        checkLocalStorage() {
            try {
                const testKey = '_memorin_health_check';
                localStorage.setItem(testKey, 'test');
                localStorage.removeItem(testKey);
                return true;
            } catch (e) {
                this.recordError({
                    type: 'localStorage',
                    message: 'LocalStorage访问失败',
                    error: e.message,
                    timestamp: Date.now()
                });
                return false;
            }
        },
        
        checkDataIntegrity() {
            try {
                const data = JSON.parse(localStorage.getItem('memorin_data') || '{}');
                const issues = [];
                
                // 检查数据结构
                if (!data.knowledge || !Array.isArray(data.knowledge)) {
                    issues.push('知识点数据结构异常');
                }
                
                if (!data.statistics || typeof data.statistics !== 'object') {
                    issues.push('统计数据结构异常');
                }
                
                // 检查数据一致性
                if (data.knowledge && data.mistakes) {
                    const knowledgeIds = new Set(data.knowledge.map(k => k.id));
                    const orphanMistakes = data.mistakes.filter(m => !knowledgeIds.has(m.knowledgeId));
                    
                    if (orphanMistakes.length > 0) {
                        issues.push(`发现${orphanMistakes.length}个孤立错题记录`);
                    }
                }
                
                return {
                    isValid: issues.length === 0,
                    issues: issues
                };
                
            } catch (e) {
                this.recordError({
                    type: 'data_integrity',
                    message: '数据完整性检查失败',
                    error: e.message,
                    timestamp: Date.now()
                });
                
                return {
                    isValid: false,
                    issues: ['数据解析失败']
                };
            }
        },
        
        getSystemInfo() {
            return {
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                onLine: navigator.onLine,
                cookieEnabled: navigator.cookieEnabled,
                localStorageAvailable: this.checkLocalStorage(),
                screenResolution: `${screen.width}x${screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                timestamp: Date.now()
            };
        },
        
        getHealthStatus() {
            const dataIntegrity = this.checkDataIntegrity();
            const uptime = Date.now() - this.startTime;
            const errorRate = this.metrics.errors.length / Math.max(this.metrics.pageViews, 1);
            
            const status = {
                status: 'healthy',
                uptime: uptime,
                timestamp: Date.now(),
                metrics: {
                    ...this.metrics,
                    errorRate: errorRate
                },
                system: this.getSystemInfo(),
                dataIntegrity: dataIntegrity
            };
            
            // 判断健康状态
            if (this.metrics.errors.length >= this.config.maxErrors) {
                status.status = 'unhealthy';
            } else if (this.metrics.errors.length > 0 || !dataIntegrity.isValid) {
                status.status = 'degraded';
            }
            
            return status;
        },
        
        startHealthCheck() {
            setInterval(() => {
                const health = this.getHealthStatus();
                
                // 在开发模式下输出健康状态
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('[HealthMonitor] 健康检查:', health);
                }
                
                // 清理旧的性能数据
                const oneHourAgo = Date.now() - 3600000;
                this.metrics.performance = this.metrics.performance.filter(p => p.timestamp > oneHourAgo);
                
            }, this.config.checkInterval);
        },
        
        reportHealth() {
            const health = this.getHealthStatus();
            
            // 这里可以发送到监控服务
            console.log('[HealthMonitor] 健康报告:', health);
            
            // 如果有外部监控服务，可以在这里发送数据
            if (window.MONITORING_ENDPOINT) {
                fetch(window.MONITORING_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(health)
                }).catch(e => {
                    console.warn('[HealthMonitor] 上报失败:', e);
                });
            }
            
            return health;
        },
        
        // 公开API
        getStatus() {
            return this.getHealthStatus();
        },
        
        reset() {
            this.metrics = {
                startTime: Date.now(),
                pageViews: 0,
                errors: [],
                performance: [],
                userActions: {
                    reviews: 0,
                    additions: 0,
                    searches: 0
                }
            };
            console.log('[HealthMonitor] 监控数据已重置');
        }
    };
    
    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            HealthMonitor.init();
        });
    } else {
        HealthMonitor.init();
    }
    
    // 暴露到全局
    window.HealthMonitor = HealthMonitor;
    
    // 定期上报（可配置）
    setInterval(() => {
        HealthMonitor.reportHealth();
    }, HealthMonitor.config.reportInterval);
    
})(); 