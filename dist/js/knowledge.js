// 知识管理类 - 三级结构版本
class KnowledgeManager {
    constructor() {
        this.currentView = 'base'; // base, area, points
        this.currentBase = null;
        this.currentArea = null;
        this.filteredPoints = [];
        this.expandedPoints = new Set();
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadKnowledgeBase();
    }

    bindEvents() {
        // 视图切换事件
        document.getElementById('back-to-base')?.addEventListener('click', () => this.showBaseView());
        document.getElementById('back-to-area')?.addEventListener('click', () => this.showAreaView());
        
        // 功能按钮事件
        document.getElementById('expand-all-btn')?.addEventListener('click', () => this.expandAllPoints());
        document.getElementById('collapse-all-btn')?.addEventListener('click', () => this.collapseAllPoints());
        document.getElementById('review-area-btn')?.addEventListener('click', () => this.startAreaReview());
        document.getElementById('review-all-base-btn')?.addEventListener('click', () => this.startBaseReview());
        
        // 搜索和筛选事件
        document.getElementById('search-input')?.addEventListener('input', (e) => this.handleSearch(e.target.value));
        document.getElementById('tag-filter')?.addEventListener('change', (e) => this.handleFilter());
        
        // 导入导出事件
        document.getElementById('import-btn')?.addEventListener('click', () => this.handleImport());
        document.getElementById('export-btn')?.addEventListener('click', () => this.handleExport());
    }

    // 显示知识库视图
    showBaseView() {
        this.currentView = 'base';
        this.hideAllViews();
        document.getElementById('knowledge-base-view').classList.add('active');
        this.renderKnowledgeBases();
    }

    // 显示知识区视图
    showAreaView(baseId = null) {
        // 获取知识库数据
        const data = window.storageManager.getData();
        if (data?.knowledgeBase) {
            this.currentBase = data.knowledgeBase;
        } else {
            console.error('未找到知识库数据');
            this.showBaseView();
            return;
        }
        
        this.currentView = 'area';
        this.hideAllViews();
        document.getElementById('knowledge-area-view').classList.add('active');
        document.getElementById('current-base-title').textContent = this.currentBase.name;
        this.renderKnowledgeAreas();
    }

    // 显示知识点视图
    showPointsView(areaId) {
        this.currentArea = this.currentBase?.areas.find(area => area.id === areaId);
        if (!this.currentArea) return;
        
        this.currentView = 'points';
        this.hideAllViews();
        document.getElementById('knowledge-points-view').classList.add('active');
        document.getElementById('current-area-title').textContent = this.currentArea.name;
        this.loadKnowledgePoints();
    }

    hideAllViews() {
        document.querySelectorAll('.knowledge-view').forEach(view => {
            view.classList.remove('active');
        });
    }

    // 加载知识库数据
    loadKnowledgeBase() {
        // 总是先显示知识库选择视图，让用户看到知识库卡片
        this.showBaseView();
    }

    // 获取知识库
    getKnowledgeBase(baseId) {
        const data = window.storageManager.getData();
        return data?.knowledgeBase;
    }

    // 渲染知识库列表
    renderKnowledgeBases() {
        const container = document.getElementById('knowledge-base-grid');
        const data = window.storageManager.getData();
        
        if (!data?.knowledgeBase) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #6c757d;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                    <h3>暂无知识库</h3>
                    <p>请导入知识库文件或创建新的知识库</p>
                    <button class="btn btn-secondary" onclick="window.knowledgeManager.handleImport()" style="margin-top: 1rem;">
                        📁 导入知识库
                    </button>
                </div>
            `;
            return;
        }

        const base = data.knowledgeBase;
        const totalPoints = base.areas.reduce((sum, area) => sum + area.knowledgePoints.length, 0);
        const totalAreas = base.areas.length;

        container.innerHTML = `
            <div class="knowledge-base-card" onclick="window.knowledgeManager.showAreaView('${base.id}')">
                <div class="knowledge-base-icon">🎯</div>
                <div class="knowledge-base-title">${base.name}</div>
                <div class="knowledge-base-description">${base.description}</div>
                <div class="knowledge-base-stats">
                    <div class="stat-item">
                        <div class="stat-number">${totalAreas}</div>
                        <div class="stat-label">知识区</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${totalPoints}</div>
                        <div class="stat-label">知识点</div>
                    </div>
                </div>
            </div>
        `;
    }

    // 渲染知识区列表
    renderKnowledgeAreas() {
        const container = document.getElementById('knowledge-area-grid');
        
        if (!this.currentBase?.areas || this.currentBase.areas.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #6c757d;">
                    <h3>暂无知识区</h3>
                    <p>请添加知识区来组织您的知识点</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.currentBase.areas.map(area => {
            const pointsCount = area.knowledgePoints.length;
            const masteredCount = this.getMasteredCount(area.id);
            const progress = pointsCount > 0 ? (masteredCount / pointsCount * 100) : 0;
            
            return `
                <div class="knowledge-area-card" style="--area-color: ${area.color}" 
                     onclick="window.knowledgeManager.showPointsView('${area.id}')">
                    <div class="area-header">
                        <div class="area-icon">📖</div>
                        <div class="area-actions">
                            <button class="btn btn-sm btn-success" onclick="event.stopPropagation(); window.knowledgeManager.startAreaReview('${area.id}')" title="复习本知识区">
                                🎯
                            </button>
                        </div>
                    </div>
                    <div class="area-title">${area.name}</div>
                    <div class="area-description">${area.description}</div>
                    <div class="area-stats">
                        <div class="area-progress">
                            <div class="progress-label">学习进度 ${masteredCount}/${pointsCount}</div>
                            <div class="progress-bar-mini">
                                <div class="progress-fill-mini" style="width: ${progress}%"></div>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${pointsCount}</div>
                            <div class="stat-label">知识点</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 加载知识点列表
    loadKnowledgePoints() {
        const allKnowledge = window.storageManager.getAllKnowledge();
        this.currentPoints = allKnowledge.filter(point => point.areaId === this.currentArea.id);
        this.filteredPoints = [...this.currentPoints];
        this.updateTagFilter();
        this.renderKnowledgePoints();
    }

    // 渲染知识点列表
    renderKnowledgePoints() {
        const container = document.getElementById('knowledge-points-list');
        
        if (this.filteredPoints.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #6c757d;">
                    <h3>暂无知识点</h3>
                    <p>请添加知识点或调整筛选条件</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredPoints.map(point => {
            const isExpanded = this.expandedPoints.has(point.id);
            const reviewStatus = this.getReviewStatus(point);
            
            return `
                <div class="knowledge-point-card ${isExpanded ? 'expanded' : ''}" 
                     style="--area-color: ${this.currentArea.color}">
                    <div class="point-header" onclick="window.knowledgeManager.togglePoint('${point.id}')">
                        <div class="point-question">${point.question}</div>
                        <div class="point-actions">
                            <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); window.knowledgeManager.editKnowledgePoint('${point.id}')" title="编辑">
                                ✏️
                            </button>
                            <button class="expand-btn ${isExpanded ? 'expanded' : ''}" title="展开/收起">
                                ▼
                            </button>
                        </div>
                    </div>
                    
                    <div class="point-meta">
                        <span class="review-status">${reviewStatus}</span>
                        ${point.score !== null ? `<span class="score-badge">评分: ${point.score}/5</span>` : ''}
                        <div class="tags-container">
                            ${point.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="point-content ${isExpanded ? 'expanded' : ''}">
                        <div class="answer-section">
                            <div class="answer-label">💡 答案</div>
                            <div class="answer-text">${point.answer}</div>
                        </div>
                        ${point.explanation ? `
                            <div class="explanation-section">
                                <div class="explanation-label">📝 解析</div>
                                <div class="explanation-text">${point.explanation}</div>
                            </div>
                        ` : ''}
                        <div class="note-section">
                            <div class="note-label">📄 笔记</div>
                            <div class="note-content">
                                <textarea 
                                    id="note-${point.id}" 
                                    class="note-textarea"
                                    placeholder="添加您的笔记..."
                                    onblur="window.knowledgeManager.updateNote('${point.id}', this.value)"
                                >${point.note || ''}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 切换知识点展开状态
    togglePoint(pointId) {
        if (this.expandedPoints.has(pointId)) {
            this.expandedPoints.delete(pointId);
        } else {
            this.expandedPoints.add(pointId);
        }
        this.renderKnowledgePoints();
    }

    // 展开所有知识点
    expandAllPoints() {
        this.filteredPoints.forEach(point => {
            this.expandedPoints.add(point.id);
        });
        document.getElementById('expand-all-btn').style.display = 'none';
        document.getElementById('collapse-all-btn').style.display = 'inline-block';
        this.renderKnowledgePoints();
    }

    // 收起所有知识点
    collapseAllPoints() {
        this.expandedPoints.clear();
        document.getElementById('expand-all-btn').style.display = 'inline-block';
        document.getElementById('collapse-all-btn').style.display = 'none';
        this.renderKnowledgePoints();
    }

    // 开始知识区复习
    async startAreaReview(areaId = null) {
        try {
            const targetAreaId = areaId || this.currentArea?.id;
            if (!targetAreaId) {
                console.error('startAreaReview: 无法确定知识区ID');
                window.app.showNotification('请先选择要复习的知识区', 'warning');
                return;
            }

            console.log(`=== 开始知识区复习 ===`);
            console.log(`目标知识区ID: ${targetAreaId}`);

            // 获取当前知识库ID
            const currentBaseId = this.currentBase?.id || window.storageManager.getCurrentKnowledgeBase()?.id;
            if (!currentBaseId) {
                console.error('无法确定当前知识库ID');
                window.app.showNotification('请先选择知识库', 'warning');
                return;
            }

            console.log(`当前知识库ID: ${currentBaseId}`);

            // 获取知识区信息（传递知识库ID和知识区ID两个参数）
            const area = window.storageManager.getKnowledgeAreaById(currentBaseId, targetAreaId);
            if (!area) {
                console.error(`知识区 ${targetAreaId} 在知识库 ${currentBaseId} 中不存在`);
                window.app.showNotification('知识区不存在', 'error');
                return;
            }

            console.log(`知识区: ${area.name}`);

            // 预检查知识区中的知识点数量
            const allKnowledge = window.storageManager.getAllKnowledge();
            const areaPoints = allKnowledge.filter(point => point.areaId === targetAreaId);
            
            console.log(`知识区 "${area.name}" 中有 ${areaPoints.length} 个知识点`);

            if (areaPoints.length === 0) {
                const message = `知识区 "${area.name}" 中没有知识点，无法开始复习`;
                console.warn(message);
                window.app.showNotification(message, 'warning');
                return;
            }

            // 使用统一的复习管理器启动知识区复习
            const reviewOptions = {
                random: false,  // 默认顺序复习，用户可以在界面中选择
                limit: null     // 不限制题目数量，复习所有知识点
            };

            console.log('🚀 启动知识区复习管理器，配置:', reviewOptions);
            await window.reviewManager.reviewKnowledgeArea(targetAreaId, reviewOptions);
            
            // 切换到复习页面
            window.app.showSection('review');
            
            // 显示成功通知
            const message = `准备复习知识区：${area.name}（${areaPoints.length}个知识点）`;
            console.log('✅ ' + message);
            window.app.showNotification(message, 'success');

        } catch (error) {
            console.error('❌ 开始知识区复习失败:', error);
            window.app.showNotification('开始复习失败：' + error.message, 'error');
        }
    }

    // 开始知识库复习
    async startBaseReview() {
        if (!this.currentBase) {
            window.app.showNotification('请先选择要复习的知识库', 'warning');
            return;
        }

        try {
            // 使用新的题目列表生成器复习整个知识库
            // 使用当前选择的知识库ID
            const baseId = this.currentBase.id;
            
            await window.reviewManager.reviewKnowledgeBase(baseId, {
                onlyDue: false,  // 复习全部题目，不只是到期的
                random: true,    // 随机顺序
                limit: 50        // 最多50题，避免太长
            });
            
            // 切换到复习页面
            window.app.showSection('review');
            window.app.showNotification(`开始复习：${this.currentBase.name}`, 'success');
        } catch (error) {
            console.error('开始知识库复习失败:', error);
            window.app.showNotification('开始复习失败，请重试', 'error');
        }
    }

    // 编辑知识点
    editKnowledgePoint(pointId) {
        const knowledge = window.storageManager.getKnowledgeById(pointId);
        if (!knowledge) {
            window.app.showNotification('未找到知识点', 'error');
            return;
        }

        // 打开编辑模态框
        this.openEditModal(knowledge);
    }

    // 打开编辑模态框
    openEditModal(knowledge) {
        const modal = document.getElementById('knowledge-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('knowledge-form');
        
        title.textContent = '编辑知识点';
        
        // 填充表单数据
        document.getElementById('question-input').value = knowledge.question;
        document.getElementById('answer-input').value = knowledge.answer;
        document.getElementById('explanation-input').value = knowledge.explanation || '';
        document.getElementById('note-input').value = knowledge.note || '';
        document.getElementById('category-input').value = knowledge.category || '';
        document.getElementById('difficulty-input').value = knowledge.difficulty || 3;
        document.getElementById('tags-input').value = knowledge.tags.join(', ');
        
        modal.classList.add('active');
        
        // 存储当前编辑的知识点ID
        form.setAttribute('data-edit-id', knowledge.id);
        
        // 聚焦到第一个输入框
        setTimeout(() => {
            document.getElementById('question-input').focus();
        }, 100);
    }

    // 搜索处理
    handleSearch(query) {
        if (!query.trim()) {
            this.filteredPoints = [...this.currentPoints];
        } else {
            const lowerQuery = query.toLowerCase();
            this.filteredPoints = this.currentPoints.filter(point => 
                point.question.toLowerCase().includes(lowerQuery) ||
                point.answer.toLowerCase().includes(lowerQuery) ||
                point.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
        }
        this.renderKnowledgePoints();
    }

    // 筛选处理
    handleFilter() {
        const tag = document.getElementById('tag-filter').value;
        
        this.filteredPoints = this.currentPoints.filter(point => {
            const tagMatch = !tag || point.tags.includes(tag);
            return tagMatch;
        });
        
        this.renderKnowledgePoints();
    }

    // 更新标签筛选器
    updateTagFilter() {
        const tagFilter = document.getElementById('tag-filter');
        const allTags = new Set();
        
        this.currentPoints.forEach(point => {
            point.tags.forEach(tag => allTags.add(tag));
        });
        
        tagFilter.innerHTML = '<option value="">所有标签</option>' +
            Array.from(allTags).sort().map(tag => 
                `<option value="${tag}">${tag}</option>`
            ).join('');
    }

    // 获取已掌握数量
    getMasteredCount(areaId) {
        const allKnowledge = window.storageManager.getAllKnowledge();
        return allKnowledge.filter(point => 
            point.areaId === areaId && 
            point.reviewCount > 0 && 
            point.correctCount / point.reviewCount >= 0.8
        ).length;
    }

    // 获取复习状态
    getReviewStatus(point) {
        if (point.reviewCount === 0) {
            return '🔵 新知识';
        } else if (point.correctCount / point.reviewCount >= 0.8) {
            return '🟢 已掌握';
        } else {
            return '🟡 需复习';
        }
    }

    // 导入数据
    handleImport() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const content = await this.readFileAsText(file);
                const data = JSON.parse(content);
                
                if (!data.knowledgeBase && !data.knowledge) {
                    throw new Error('无效的数据格式');
                }

                const success = window.storageManager.importData(data, true);
                if (success) {
                    this.loadKnowledgeBase();
                    window.app.showNotification('数据导入成功', 'success');
                } else {
                    window.app.showNotification('导入失败', 'error');
                }
            } catch (e) {
                console.error('导入失败:', e);
                window.app.showNotification('导入失败：' + e.message, 'error');
            }
        };
        input.click();
    }

    // 导出数据
    handleExport() {
        try {
            const data = window.storageManager.getData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `knowledge-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            window.app.showNotification('数据导出成功', 'success');
        } catch (e) {
            console.error('导出失败:', e);
            window.app.showNotification('导出失败', 'error');
        }
    }

    // 读取文件内容
    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = e => reject(e);
            reader.readAsText(file);
        });
    }

    // 更新知识点笔记
    updateNote(pointId, note) {
        const success = window.storageManager.updateKnowledgeNote(pointId, note);
        if (success) {
            // 更新本地数据
            const point = this.currentPoints.find(p => p.id === pointId);
            if (point) {
                point.note = note;
            }
            window.app.showNotification('笔记已保存', 'success', 1000);
        } else {
            window.app.showNotification('笔记保存失败', 'error');
        }
    }
}

// 初始化知识管理器
window.knowledgeManager = new KnowledgeManager(); 