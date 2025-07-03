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
                    window.knowledgeManager.loadKnowledgeBase();
                }
                break;
            case 'review':
                if (window.reviewManager) {
                    // 检查是否是知识区模式选择状态
                    if (window.reviewManager.reviewMode === 'area-mode-select') {
                        // 知识区模式选择状态，不需要initReview，直接返回
                        console.log('知识区模式选择状态，跳过初始化');
                        return;
                    }
                    
                    // 检查是否有活跃的复习会话（排除area-mode-select状态）
                    const hasActiveSession = window.reviewManager.currentReviewList && 
                                           window.reviewManager.currentReviewList.length > 0 &&
                                           window.reviewManager.reviewMode &&
                                           window.reviewManager.reviewMode !== 'area-mode-select';
                    
                    console.log('复习页面加载检查:', {
                        hasActiveSession: hasActiveSession,
                        reviewMode: window.reviewManager.reviewMode,
                        currentReviewListLength: window.reviewManager.currentReviewList?.length || 0
                    });
                    
                    if (hasActiveSession) {
                        // 如果有活跃的复习会话，直接显示复习卡片
                        console.log('检测到活跃复习会话，继续现有会话');
                        window.reviewManager.showReviewCard();
                        window.reviewManager.loadCurrentKnowledge();
                    } else {
                        // 没有活跃会话时才初始化复习页面
                        console.log('没有活跃会话，初始化复习页面');
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

    // 显示指定页面
    showSection(sectionName) {
        this.switchSection(sectionName);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 确保所有依赖的脚本都已加载
    const checkDependencies = () => {
        if (window.storageManager && window.knowledgeManager && 
            window.reviewManager && window.statisticsManager) {
            // 初始化主应用
            window.app = new MemoryApp();
        } else {
            // 如果依赖未加载完成，100ms后重试
            setTimeout(checkDependencies, 100);
        }
    };
    
    checkDependencies();
});

// 添加全局样式动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 