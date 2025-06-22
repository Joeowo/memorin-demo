// 主应用类
class MemoryApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.init();
    }

    init() {
        this.bindEvents();
        
        // 开发模式：检查是否需要重置数据
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('reset') === 'true') {
            localStorage.removeItem('memorin_data');
            window.location.href = window.location.pathname; // 移除参数并刷新
            return;
        }
        
        this.loadDashboard();
        console.log('Memorin 应用已启动');
    }

    // 绑定事件监听器
    bindEvents() {
        // 导航菜单点击事件
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                this.switchSection(section);
            });
        });

        // 快速操作按钮事件
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });

        // 模态框事件
        this.bindModalEvents();
    }

    // 绑定模态框相关事件
    bindModalEvents() {
        const modal = document.getElementById('knowledge-modal');
        const closeBtn = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-btn');
        const saveBtn = document.getElementById('save-btn');

        // 关闭模态框
        [closeBtn, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // 保存按钮事件
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.handleFormSubmit();
            });
        }

        // 表单提交事件
        const form = document.getElementById('knowledge-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        // 点击背景关闭模态框
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    // 切换页面section
    switchSection(sectionName) {
        // 更新导航状态
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // 更新内容区域
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        // 根据不同section加载相应数据
        this.loadSectionData(sectionName);
    }

    // 加载section对应的数据
    loadSectionData(sectionId) {
        switch(sectionId) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'knowledge':
                if (window.knowledgeManager) {
                    console.log('加载知识管理页面...');
                    window.knowledgeManager.loadKnowledgeBase();
                }
                break;
            case 'review':
                if (window.reviewManager) {
                    // 只有在不是知识区模式时才初始化复习页面
                    if (!window.reviewManager.reviewMode || !window.reviewManager.reviewMode.startsWith('area-')) {
                        window.reviewManager.initReview();
                    }
                }
                break;
            case 'mistakes':
                if (window.reviewManager) {
                    window.reviewManager.loadMistakes();
                }
                break;
            case 'statistics':
                if (window.statisticsManager) {
                    window.statisticsManager.loadStatistics();
                }
                break;
        }
    }

    // 加载仪表板数据
    loadDashboard() {
        const stats = this.getDashboardStats();
        
        // 更新统计数据
        document.getElementById('total-knowledge').textContent = stats.totalKnowledge;
        document.getElementById('today-review').textContent = stats.todayReview;
        document.getElementById('mastered-count').textContent = stats.masteredCount;
        document.getElementById('mistakes-count').textContent = stats.mistakesCount;
        
        // 更新知识库信息
        this.updateKnowledgeBasesInfo();
    }

    // 更新知识库信息显示
    updateKnowledgeBasesInfo() {
        const infoContainer = document.getElementById('knowledge-bases-info');
        if (!infoContainer || !window.storageManager) return;
        
        const knowledgeBases = window.storageManager.getAllKnowledgeBases();
        
        if (knowledgeBases.length === 0) {
            infoContainer.innerHTML = '<p class="no-data">暂无知识库数据</p>';
            return;
        }
        
        let html = '<div class="knowledge-bases-list">';
        knowledgeBases.forEach(base => {
            const knowledgeCount = window.storageManager.getKnowledgeByBaseId(base.id).length;
            html += `
                <div class="knowledge-base-info">
                    <span class="base-icon">${base.icon || '📚'}</span>
                    <span class="base-name">${base.name}</span>
                    <span class="base-count">${knowledgeCount}个知识点</span>
                </div>
            `;
        });
        html += '</div>';
        
        infoContainer.innerHTML = html;
    }

    // 获取仪表板统计数据
    getDashboardStats() {
        if (!window.storageManager) {
            return {
                totalKnowledge: 0,
                todayReview: 0,
                masteredCount: 0,
                mistakesCount: 0
            };
        }

        const knowledge = window.storageManager.getAllKnowledge();
        const mistakes = window.storageManager.getMistakes();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return {
            totalKnowledge: knowledge.length,
            todayReview: knowledge.filter(k => {
                const nextReview = new Date(k.nextReview);
                return nextReview <= new Date();
            }).length,
            masteredCount: knowledge.filter(k => k.reviewCount >= 5 && k.correctCount / k.reviewCount >= 0.8).length,
            mistakesCount: mistakes.length
        };
    }

    // 处理快速操作
    handleQuickAction(action) {
        switch (action) {
            case 'start-review':
                this.switchSection('review');
                break;
            case 'add-knowledge':
                this.openAddKnowledgeModal();
                break;
            case 'review-mistakes':
                this.switchSection('mistakes');
                break;
        }
    }

    // 打开添加知识点模态框
    openAddKnowledgeModal() {
        const modal = document.getElementById('knowledge-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('knowledge-form');
        
        title.textContent = '添加知识点';
        form.reset();
        modal.classList.add('active');
        
        // 聚焦到第一个输入框
        setTimeout(() => {
            document.getElementById('question-input').focus();
        }, 100);
    }

    // 关闭模态框
    closeModal() {
        const modal = document.getElementById('knowledge-modal');
        modal.classList.remove('active');
        
        // 清空表单
        const form = document.getElementById('knowledge-form');
        form.reset();
        form.removeAttribute('data-edit-id');
    }

    // 处理表单提交
    handleFormSubmit() {
        const form = document.getElementById('knowledge-form');
        const editId = form.getAttribute('data-edit-id');
        
        // 获取表单数据
        const formData = {
            question: document.getElementById('question-input').value.trim(),
            answer: document.getElementById('answer-input').value.trim(),
            explanation: document.getElementById('explanation-input').value.trim(),
            note: document.getElementById('note-input').value.trim(),
            category: document.getElementById('category-input').value.trim(),
            difficulty: parseInt(document.getElementById('difficulty-input').value),
            tags: document.getElementById('tags-input').value.split(',').map(tag => tag.trim()).filter(tag => tag)
        };

        // 验证必填字段
        if (!formData.question || !formData.answer) {
            this.showNotification('题目和答案不能为空', 'error');
            return;
        }

        try {
            if (editId) {
                // 编辑模式
                const success = window.storageManager.updateKnowledge(editId, {
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
                
                if (success) {
                    this.showNotification('知识点更新成功', 'success');
                    this.closeModal();
                    
                    // 刷新知识点列表
                    if (window.knowledgeManager && window.knowledgeManager.currentView === 'points') {
                        window.knowledgeManager.loadKnowledgePoints();
                    }
                } else {
                    this.showNotification('更新失败', 'error');
                }
            } else {
                // 新增模式
                const newKnowledge = {
                    id: this.generateId(),
                    ...formData,
                    score: null, // 初始化评分为空
                    reviewCount: 0,
                    correctCount: 0,
                    nextReview: new Date().toISOString(),
                    interval: 1,
                    easeFactor: 2.5,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                const success = window.storageManager.addKnowledge(newKnowledge);
                
                if (success) {
                    this.showNotification('知识点添加成功', 'success');
                    this.closeModal();
                    this.loadDashboard(); // 刷新仪表板统计
                } else {
                    this.showNotification('添加失败', 'error');
                }
            }
        } catch (error) {
            console.error('表单提交失败:', error);
            this.showNotification('操作失败: ' + error.message, 'error');
        }
    }

    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // 3秒后自动消失
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 显示确认对话框
    showConfirm(message, onConfirm, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        
        modal.innerHTML = `
            <div class="confirm-dialog">
                <h3>确认操作</h3>
                <p>${message}</p>
                <div class="btn-group">
                    <button class="btn btn-secondary" id="confirm-cancel">取消</button>
                    <button class="btn btn-danger" id="confirm-ok">确认</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定事件
        document.getElementById('confirm-cancel').addEventListener('click', () => {
            document.body.removeChild(modal);
            if (onCancel) onCancel();
        });
        
        document.getElementById('confirm-ok').addEventListener('click', () => {
            document.body.removeChild(modal);
            if (onConfirm) onConfirm();
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                if (onCancel) onCancel();
            }
        });
    }

    // 格式化日期
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('zh-CN');
    }

    // 格式化时间
    formatTime(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleString('zh-CN');
    }

    // 生成唯一ID
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // 显示指定的section（供外部调用）
    showSection(sectionName) {
        this.switchSection(sectionName);
    }

    // 清空所有数据（带确认）
    clearAllDataWithConfirm() {
        const knowledgeBases = window.storageManager ? window.storageManager.getAllKnowledgeBases() : [];
        const allKnowledge = window.storageManager ? window.storageManager.getAllKnowledge() : [];
        
        if (knowledgeBases.length === 0 && allKnowledge.length === 0) {
            this.showNotification('当前没有数据需要清空', 'info');
            return;
        }
        
        let confirmMessage = '⚠️ 您确定要清空所有数据吗？\n\n这将删除：\n';
        
        if (knowledgeBases.length > 0) {
            confirmMessage += `• ${knowledgeBases.length} 个知识库\n`;
            knowledgeBases.forEach(base => {
                const count = window.storageManager.getKnowledgeByBaseId(base.id).length;
                confirmMessage += `  - ${base.name}（${count}个知识点）\n`;
            });
        }
        
        if (allKnowledge.length > 0) {
            confirmMessage += `• 总计 ${allKnowledge.length} 个知识点\n`;
        }
        
        const mistakes = window.storageManager ? window.storageManager.getMistakes() : [];
        if (mistakes.length > 0) {
            confirmMessage += `• ${mistakes.length} 个错题记录\n`;
        }
        
        confirmMessage += '\n此操作不可恢复！';
        
        if (confirm(confirmMessage)) {
            this.clearAllData();
        }
    }

    // 清空所有数据
    clearAllData() {
        try {
            // 清空localStorage中的数据
            localStorage.removeItem('memorin_data');
            
            // 重新初始化存储管理器
            if (window.storageManager) {
                window.storageManager.init();
            }
            
            // 刷新界面
            this.loadDashboard();
            
            // 如果当前在知识管理页面，刷新知识管理器
            if (window.knowledgeManager) {
                window.knowledgeManager.refresh();
            }
            
            this.showNotification('✅ 所有数据已清空！', 'success');
            
        } catch (error) {
            console.error('清空数据失败:', error);
            this.showNotification('❌ 清空数据失败：' + error.message, 'error');
        }
    }
}

// 文档加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 依赖检查函数
    const checkDependencies = () => {
        const dependencies = {
            storageManager: window.storageManager,
            knowledgeManager: window.knowledgeManager,
            reviewManager: window.reviewManager,
            statisticsManager: window.statisticsManager
        };
        
        const allLoaded = Object.values(dependencies).every(dep => dep);
        
        if (allLoaded) {
            // 初始化主应用
            if (!window.app) {
                try {
                    window.app = new MemoryApp();
                    console.log('✅ Memorin 应用初始化完成');
                } catch (error) {
                    console.error('❌ 主应用初始化失败:', error);
                }
            }
        } else {
            // 100ms后重试
            setTimeout(checkDependencies, 100);
        }
    };
    
    // 开始检查依赖
    checkDependencies();
});

// 定义全局清空数据函数（确保HTML按钮能调用）
window.clearAllDataWithConfirm = function() {
    // 检查app是否已初始化
    if (window.app && typeof window.app.clearAllDataWithConfirm === 'function') {
        window.app.clearAllDataWithConfirm();
    } else {
        // 备用清空方法
        if (!window.storageManager) {
            alert('❌ 存储管理器未初始化，无法清空数据');
            return;
        }
        
        const knowledgeBases = window.storageManager.getAllKnowledgeBases();
        const allKnowledge = window.storageManager.getAllKnowledge();
        
        if (knowledgeBases.length === 0 && allKnowledge.length === 0) {
            alert('ℹ️ 当前没有数据需要清空');
            return;
        }
        
        let confirmMessage = '⚠️ 您确定要清空所有数据吗？\n\n这将删除：\n';
        
        if (knowledgeBases.length > 0) {
            confirmMessage += `• ${knowledgeBases.length} 个知识库\n`;
            knowledgeBases.forEach(base => {
                const count = window.storageManager.getKnowledgeByBaseId(base.id).length;
                confirmMessage += `  - ${base.name}（${count}个知识点）\n`;
            });
        }
        
        if (allKnowledge.length > 0) {
            confirmMessage += `• 总计 ${allKnowledge.length} 个知识点\n`;
        }
        
        const mistakes = window.storageManager.getMistakes();
        if (mistakes.length > 0) {
            confirmMessage += `• ${mistakes.length} 个错题记录\n`;
        }
        
        confirmMessage += '\n此操作不可恢复！';
        
        if (confirm(confirmMessage)) {
            try {
                localStorage.removeItem('memorin_data');
                
                if (window.storageManager) {
                    window.storageManager.init();
                }
                
                if (window.knowledgeManager) {
                    window.knowledgeManager.refresh();
                }
                
                if (window.app) {
                    window.app.loadDashboard();
                }
                
                alert('✅ 所有数据已清空！');
                
            } catch (error) {
                console.error('❌ 清空数据失败:', error);
                alert('❌ 清空数据失败：' + error.message);
            }
        }
    }
}; 