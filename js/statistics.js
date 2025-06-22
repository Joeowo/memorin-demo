// 统计分析管理类
class StatisticsManager {
    constructor() {
        this.charts = {};
        this.chartColors = {
            primary: '#667eea',
            secondary: '#764ba2',
            success: '#2ecc71',
            warning: '#f39c12',
            danger: '#e74c3c',
            info: '#3498db',
            light: '#ecf0f1',
            dark: '#2c3e50'
        };
        this.init();
    }

    init() {
        console.log('统计分析管理器已初始化');
    }

    // 加载统计数据
    loadStatistics() {
        this.destroyExistingCharts();
        this.renderProgressChart();
        this.renderAccuracyChart();
        this.renderDetailedStats();
    }

    // 销毁现有图表
    destroyExistingCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
    }

    // 渲染学习进度图表
    renderProgressChart() {
        const ctx = document.getElementById('progress-chart');
        if (!ctx) return;

        const data = this.getProgressData();
        
        this.charts.progress = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['已掌握', '需复习', '新知识'],
                datasets: [{
                    data: [data.mastered, data.needReview, data.newKnowledge],
                    backgroundColor: [
                        this.chartColors.success,
                        this.chartColors.warning,
                        this.chartColors.info
                    ],
                    borderColor: [
                        this.chartColors.success,
                        this.chartColors.warning,
                        this.chartColors.info
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 渲染正确率趋势图表
    renderAccuracyChart() {
        const ctx = document.getElementById('accuracy-chart');
        if (!ctx) return;

        const data = this.getAccuracyTrendData();
        
        this.charts.accuracy = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: '正确率(%)',
                    data: data.accuracyData,
                    borderColor: this.chartColors.primary,
                    backgroundColor: `${this.chartColors.primary}20`,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: this.chartColors.primary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }, {
                    label: '复习次数',
                    data: data.reviewCountData,
                    borderColor: this.chartColors.secondary,
                    backgroundColor: `${this.chartColors.secondary}20`,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: this.chartColors.secondary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        min: 0,
                        max: 100,
                        title: {
                            display: true,
                            text: '正确率 (%)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        min: 0,
                        title: {
                            display: true,
                            text: '复习次数'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }

    // 获取学习进度数据
    getProgressData() {
        const knowledge = window.storageManager.getAllKnowledge();
        const now = new Date();

        let mastered = 0;
        let needReview = 0;
        let newKnowledge = 0;

        knowledge.forEach(k => {
            if (k.reviewCount >= 5 && k.correctCount / k.reviewCount >= 0.8) {
                mastered++;
            } else if (new Date(k.nextReview) <= now) {
                needReview++;
            } else {
                newKnowledge++;
            }
        });

        return { mastered, needReview, newKnowledge };
    }

    // 获取正确率趋势数据
    getAccuracyTrendData() {
        const reviewHistory = window.storageManager.getReviewHistory();
        const days = 14; // 显示最近14天
        const now = new Date();

        const labels = [];
        const accuracyData = [];
        const reviewCountData = [];

        // 生成日期标签
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            labels.push(Utils.formatDate(date, 'MM-DD'));

            // 计算当天的数据
            const dayStart = new Date(date);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(date);
            dayEnd.setHours(23, 59, 59, 999);

            const dayReviews = reviewHistory.filter(r => {
                const reviewDate = new Date(r.reviewDate);
                return reviewDate >= dayStart && reviewDate <= dayEnd;
            });

            const correctCount = dayReviews.filter(r => r.isCorrect).length;
            const accuracy = dayReviews.length > 0 ? 
                Math.round((correctCount / dayReviews.length) * 100) : 0;

            accuracyData.push(accuracy);
            reviewCountData.push(dayReviews.length);
        }

        return { labels, accuracyData, reviewCountData };
    }

    // 获取分类统计数据
    getCategoryStats() {
        const knowledge = window.storageManager.getAllKnowledge();
        const categoryStats = {};

        knowledge.forEach(k => {
            const category = k.category || '未分类';
            if (!categoryStats[category]) {
                categoryStats[category] = {
                    total: 0,
                    reviewed: 0,
                    correct: 0,
                    mastered: 0,
                    avgDifficulty: 0
                };
            }

            categoryStats[category].total++;
            categoryStats[category].avgDifficulty += k.difficulty;
            
            if (k.reviewCount > 0) {
                categoryStats[category].reviewed++;
                categoryStats[category].correct += k.correctCount;
            }
            
            if (k.reviewCount >= 5 && k.correctCount / k.reviewCount >= 0.8) {
                categoryStats[category].mastered++;
            }
        });

        // 计算平均难度
        Object.keys(categoryStats).forEach(category => {
            const stats = categoryStats[category];
            stats.avgDifficulty = (stats.avgDifficulty / stats.total).toFixed(1);
            stats.accuracy = stats.reviewed > 0 ? 
                Math.round((stats.correct / stats.reviewed) * 100) : 0;
        });

        return categoryStats;
    }

    // 获取难度分布数据
    getDifficultyStats() {
        const knowledge = window.storageManager.getAllKnowledge();
        const difficultyStats = {
            1: { total: 0, mastered: 0 },
            2: { total: 0, mastered: 0 },
            3: { total: 0, mastered: 0 },
            4: { total: 0, mastered: 0 },
            5: { total: 0, mastered: 0 }
        };

        knowledge.forEach(k => {
            difficultyStats[k.difficulty].total++;
            if (k.reviewCount >= 5 && k.correctCount / k.reviewCount >= 0.8) {
                difficultyStats[k.difficulty].mastered++;
            }
        });

        return difficultyStats;
    }

    // 获取学习效率数据
    getEfficiencyData() {
        const reviewHistory = window.storageManager.getReviewHistory();
        const recentReviews = reviewHistory.slice(-50); // 最近50次复习

        if (recentReviews.length === 0) {
            return {
                avgTimeSpent: 0,
                accuracy: 0,
                efficiency: 0
            };
        }

        const totalTime = recentReviews.reduce((sum, r) => sum + (r.timeSpent || 0), 0);
        const correctCount = recentReviews.filter(r => r.isCorrect).length;
        const avgTimeSpent = Math.round(totalTime / recentReviews.length);
        const accuracy = Math.round((correctCount / recentReviews.length) * 100);
        
        // 效率 = 正确率 / 平均用时（归一化）
        const efficiency = avgTimeSpent > 0 ? 
            Math.round((accuracy / Math.min(avgTimeSpent, 120)) * 100) : 0;

        return { avgTimeSpent, accuracy, efficiency };
    }

    // 渲染分类统计图表
    renderCategoryChart() {
        const ctx = document.getElementById('category-chart');
        if (!ctx) return;

        const categoryStats = this.getCategoryStats();
        const categories = Object.keys(categoryStats);
        const totals = categories.map(cat => categoryStats[cat].total);
        const mastered = categories.map(cat => categoryStats[cat].mastered);

        this.charts.category = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: '总数',
                    data: totals,
                    backgroundColor: `${this.chartColors.info}80`
                }, {
                    label: '已掌握',
                    data: mastered,
                    backgroundColor: this.chartColors.success
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // 获取详细报告
    getDetailedReport() {
        const knowledge = window.storageManager.getAllKnowledge();
        const reviewHistory = window.storageManager.getReviewHistory();
        const mistakes = window.storageManager.getMistakes();

        const totalKnowledge = knowledge.length;
        const totalReviews = reviewHistory.length;
        const totalCorrect = reviewHistory.filter(r => r.isCorrect).length;
        const overallAccuracy = totalReviews > 0 ? 
            Utils.percentage(totalCorrect, totalReviews) : 0;

        const mastered = knowledge.filter(k => 
            k.reviewCount >= 5 && k.correctCount / k.reviewCount >= 0.8
        ).length;

        const avgDifficulty = totalKnowledge > 0 ?
            (knowledge.reduce((sum, k) => sum + k.difficulty, 0) / totalKnowledge).toFixed(1) : 0;

        const efficiency = this.getEfficiencyData();

        return {
            totalKnowledge,
            totalReviews,
            overallAccuracy,
            mastered,
            masteryRate: totalKnowledge > 0 ? Utils.percentage(mastered, totalKnowledge) : 0,
            avgDifficulty,
            totalMistakes: mistakes.length,
            efficiency: efficiency.efficiency,
            avgTimeSpent: efficiency.avgTimeSpent
        };
    }

    // 导出统计报告
    exportReport() {
        const report = this.getDetailedReport();
        const categoryStats = this.getCategoryStats();
        const difficultyStats = this.getDifficultyStats();

        const exportData = {
            reportDate: new Date().toISOString(),
            summary: report,
            categoryBreakdown: categoryStats,
            difficultyBreakdown: difficultyStats,
            generatedBy: 'Memorin v1.0.0'
        };

        const filename = `memorin_report_${Utils.formatDate(new Date(), 'YYYY-MM-DD')}.json`;
        Utils.downloadFile(JSON.stringify(exportData, null, 2), filename);
        
        if (window.app) {
            window.app.showNotification('统计报告导出成功', 'success');
        }
    }

    // 渲染详细统计表格
    renderDetailedStats() {
        const detailedStats = document.getElementById('detailed-stats');
        if (!detailedStats) return;

        const report = this.getDetailedReport();
        const categoryStats = this.getCategoryStats();

        detailedStats.innerHTML = `
            <div class="stats-summary">
                <h3>学习总览</h3>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="summary-label">总知识点</span>
                        <span class="summary-value">${report.totalKnowledge}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">总复习次数</span>
                        <span class="summary-value">${report.totalReviews}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">整体正确率</span>
                        <span class="summary-value">${report.overallAccuracy}%</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">已掌握知识点</span>
                        <span class="summary-value">${report.mastered} (${report.masteryRate}%)</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">平均难度</span>
                        <span class="summary-value">${report.avgDifficulty}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">错题数量</span>
                        <span class="summary-value">${report.totalMistakes}</span>
                    </div>
                </div>
            </div>
            
            <div class="category-breakdown">
                <h3>分类统计</h3>
                <div class="table-responsive">
                    <table class="stats-table">
                        <thead>
                            <tr>
                                <th>分类</th>
                                <th>总数</th>
                                <th>已复习</th>
                                <th>正确率</th>
                                <th>已掌握</th>
                                <th>平均难度</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(categoryStats).map(([category, stats]) => `
                                <tr>
                                    <td>${category}</td>
                                    <td>${stats.total}</td>
                                    <td>${stats.reviewed}</td>
                                    <td>${stats.accuracy}%</td>
                                    <td>${stats.mastered}</td>
                                    <td>${stats.avgDifficulty}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

// 初始化统计分析管理器
window.statisticsManager = new StatisticsManager(); 