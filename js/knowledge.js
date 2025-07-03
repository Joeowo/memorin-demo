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
        document.getElementById('back-to-area')?.addEventListener('click', () => this.showAreaView(this.currentBase?.id));
        
        // 功能按钮事件
        document.getElementById('add-knowledge-base-btn')?.addEventListener('click', () => this.showCreateKnowledgeBaseModal());
        document.getElementById('add-knowledge-area-btn')?.addEventListener('click', () => this.showCreateKnowledgeAreaModal());
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
        
        // 创建知识库模态框事件
        this.bindCreateKnowledgeBaseEvents();
        
        // 创建知识区模态框事件
        this.bindCreateKnowledgeAreaEvents();
    }

    // 显示知识库视图
    showBaseView() {
        this.currentView = 'base';
        this.hideAllViews();
        document.getElementById('knowledge-base-view').classList.add('active');
        this.renderKnowledgeBases();
    }

    // 刷新当前视图（公共方法）
    refresh() {
        console.log('刷新知识管理器视图...');
        switch(this.currentView) {
            case 'base':
                this.renderKnowledgeBases();
                break;
            case 'area':
                this.renderKnowledgeAreas();
                break;
            case 'points':
                this.loadKnowledgePoints();
                break;
            default:
                this.showBaseView();
        }
    }

    // 显示知识区视图
    showAreaView(baseId = null) {
        console.log('=== 显示知识区视图 ===');
        console.log('输入参数 baseId:', baseId);
        console.log('当前状态:');
        console.log('- this.currentBase:', this.currentBase);
        console.log('- 存储管理器中的当前知识库:', window.storageManager.getCurrentKnowledgeBase());
        
        // 获取知识库数据
        const knowledgeBase = window.storageManager.getKnowledgeBaseById(baseId);
        if (!knowledgeBase) {
            console.error(`❌ 未找到知识库数据: ${baseId}`);
            this.showBaseView();
            return;
        }
        
        console.log(`📚 成功获取知识库: ${knowledgeBase.name} (ID: ${knowledgeBase.id})`);
        
        // 关键：设置当前知识库状态
        this.currentBase = knowledgeBase;
        console.log(`✅ 已设置 this.currentBase = ${this.currentBase.name}`);
        
        // 同步存储管理器的状态
        const setResult = window.storageManager.setCurrentKnowledgeBase(baseId);
        console.log(`📝 存储管理器状态同步结果: ${setResult}`);
        
        // 验证状态设置是否成功
        const verifyCurrentBase = window.storageManager.getCurrentKnowledgeBase();
        console.log('🔍 验证状态设置:');
        console.log(`- this.currentBase.id: ${this.currentBase.id}`);
        console.log(`- 存储管理器当前知识库: ${verifyCurrentBase?.id}`);
        
        if (this.currentBase.id !== verifyCurrentBase?.id) {
            console.warn('⚠️ 状态不一致，尝试修复...');
            window.storageManager.setCurrentKnowledgeBase(this.currentBase.id);
        }
        
        // 设置视图状态
        this.currentView = 'area';
        this.hideAllViews();
        document.getElementById('knowledge-area-view').classList.add('active');
        document.getElementById('current-base-title').textContent = this.currentBase.name;
        
        console.log(`🎯 当前视图: ${this.currentView}`);
        console.log(`📄 页面标题已设置为: ${this.currentBase.name}`);
        
        // 渲染知识区列表
        this.renderKnowledgeAreas();
        
        console.log('✅ 知识区视图显示完成');
    }

    // 显示知识点视图
    showPointsView(areaId) {
        console.log('显示知识点视图...', {
            areaId: areaId,
            currentBase: this.currentBase,
            baseAreas: this.currentBase?.areas
        });
        
        this.currentArea = this.currentBase?.areas.find(area => area.id === areaId);
        
        console.log('查找知识区结果:', {
            currentArea: this.currentArea,
            searchAreaId: areaId
        });
        
        if (!this.currentArea) {
            console.error('未找到知识区:', areaId);
            return;
        }
        
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
        
        // 强制刷新知识库列表显示
        setTimeout(() => {
            this.renderKnowledgeBases();
        }, 100);
    }

    // 获取知识库
    getKnowledgeBase(baseId) {
        const data = window.storageManager.getData();
        return data?.knowledgeBase;
    }

    // 渲染知识库列表
    renderKnowledgeBases() {
        const container = document.getElementById('knowledge-base-grid');
        const knowledgeBases = window.storageManager.getAllKnowledgeBases();
        
        console.log('渲染知识库列表:', knowledgeBases);
        
        if (!knowledgeBases || knowledgeBases.length === 0) {
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

        container.innerHTML = knowledgeBases.map(base => {
            const totalPoints = this.getKnowledgeBaseStats(base.id).totalPoints;
            const totalAreas = base.areas ? base.areas.length : 0;

            return `
                <div class="knowledge-base-card" onclick="window.knowledgeManager.showAreaView('${base.id}')">
                    <div class="knowledge-base-icon">${base.icon || '📚'}</div>
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
                    <div class="knowledge-base-actions">
                        <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); window.knowledgeManager.editKnowledgeBase('${base.id}')" title="编辑知识库">
                            ✏️
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); window.knowledgeManager.deleteKnowledgeBase('${base.id}')" title="删除知识库">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        console.log('知识库列表渲染完成');
    }

    // 获取知识库统计信息
    getKnowledgeBaseStats(knowledgeBaseId) {
        const knowledge = window.storageManager.getKnowledgeByBaseId(knowledgeBaseId);
        return {
            totalPoints: knowledge.length,
            masteredCount: knowledge.filter(k => k.reviewCount > 0 && k.correctCount / k.reviewCount >= 0.8).length,
            reviewingCount: knowledge.filter(k => k.reviewCount > 0 && k.correctCount / k.reviewCount < 0.8).length,
            newCount: knowledge.filter(k => k.reviewCount === 0).length
        };
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
            const pointsCount = window.storageManager.getKnowledgeByAreaId(area.id).length;
            const masteredCount = this.getMasteredCount(area.id);
            const progress = pointsCount > 0 ? (masteredCount / pointsCount * 100) : 0;
            
            return `
                <div class="knowledge-area-card" style="--area-color: ${area.color}" 
                     onclick="window.knowledgeManager.showPointsView('${area.id}')">
                    <div class="area-header">
                        <div class="area-icon">📖</div>
                        <div class="area-actions">
                            <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); window.knowledgeManager.editKnowledgeArea('${area.id}')" title="编辑知识区">
                                ✏️
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); window.knowledgeManager.deleteKnowledgeArea('${area.id}')" title="删除知识区">
                                🗑️
                            </button>
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
        console.log('开始加载知识点...', {
            currentArea: this.currentArea,
            areaId: this.currentArea?.id
        });
        
        const allKnowledge = window.storageManager.getAllKnowledge();
        console.log('所有知识点数量:', allKnowledge.length);
        
        // 筛选当前知识区的知识点
        this.currentPoints = allKnowledge.filter(point => {
            const matches = point.areaId === this.currentArea.id;
            if (!matches) {
                console.log('知识点不匹配:', {
                    pointId: point.id,
                    pointAreaId: point.areaId,
                    currentAreaId: this.currentArea.id,
                    question: point.question?.substring(0, 50)
                });
            }
            return matches;
        });
        
        console.log('筛选后的知识点数量:', this.currentPoints.length);
        
        // 如果没有找到知识点，尝试其他可能的匹配方式
        if (this.currentPoints.length === 0) {
            console.log('尝试其他匹配方式...');
            
            // 尝试按知识库ID和分类匹配
            const alternativePoints = allKnowledge.filter(point => 
                point.knowledgeBaseId === this.currentBase?.id && 
                (point.category === this.currentArea.name || point.area === this.currentArea.name)
            );
            
            console.log('按分类匹配的知识点数量:', alternativePoints.length);
            
            if (alternativePoints.length > 0) {
                this.currentPoints = alternativePoints;
                
                // 更新这些知识点的areaId
                alternativePoints.forEach(point => {
                    window.storageManager.updateKnowledge(point.id, {
                        areaId: this.currentArea.id
                    });
                });
                
                console.log('已更新知识点的areaId');
            }
        }
        
        this.filteredPoints = [...this.currentPoints];
        this.updateTagFilter();
        this.renderKnowledgePoints();
        
        console.log('知识点加载完成，最终数量:', this.filteredPoints.length);
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
            
            // 根据题目类型生成答案显示内容
            let answerContent = '';
            if (point.type === 'choice') {
                // 选择题：显示所有选项和正确答案
                const optionsHtml = point.options.map(option => 
                    `<div class="choice-option-display ${point.correctAnswer.includes(option.key) ? 'correct-answer' : ''}">
                        ${option.key}. ${option.text}
                    </div>`
                ).join('');
                answerContent = `
                    <div class="choice-display">
                        <div class="choice-type-indicator">
                            <span class="choice-type-badge ${point.choiceType === 'multiple' ? 'multiple' : 'single'}">
                                ${point.choiceType === 'multiple' ? '多选题' : '单选题'}
                            </span>
                            ${point.score ? `<span class="score-badge">${point.score}分</span>` : ''}
                        </div>
                        <div class="choice-options-display">
                            ${optionsHtml}
                        </div>
                        <div class="correct-answer-display">
                            <strong>正确答案：${point.correctAnswer}</strong>
                        </div>
                    </div>
                `;
            } else {
                // 填空题：显示标准答案
                answerContent = `<div class="fill-answer-display">${point.answer}</div>`;
            }
            
            return `
                <div class="knowledge-point-card ${isExpanded ? 'expanded' : ''}" 
                     style="--area-color: ${this.currentArea.color}">
                    <div class="point-header" onclick="window.knowledgeManager.togglePoint('${point.id}')">
                        <div class="point-question">
                            ${point.question}
                            ${point.type === 'choice' ? `<span class="question-type-badge">${point.choiceType === 'multiple' ? '多选' : '单选'}</span>` : ''}
                        </div>
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
                            <div class="answer-text">${answerContent}</div>
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
                console.error('startAreaReview: 无法确定当前知识库ID');
                window.app.showNotification('请先选择知识库', 'warning');
                return;
            }

            // 获取知识区信息 - 使用正确的双参数调用
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
        try {
            console.log('=== 开始知识库复习 ===');
            console.log('当前状态检查:');
            console.log('- this.currentBase:', this.currentBase);
            console.log('- 存储管理器中的当前知识库:', window.storageManager.getCurrentKnowledgeBase());
            
            // 首先验证 this.currentBase 是否正确设置
            if (!this.currentBase) {
                console.error('❌ this.currentBase 为空，无法启动复习');
                window.app.showNotification('请先选择要复习的知识库', 'warning');
                return;
            }

            const baseId = this.currentBase.id;
            console.log(`📚 目标知识库: ${this.currentBase.name} (ID: ${baseId})`);

            // 双重验证：检查知识库是否存在
            const verifyBase = window.storageManager.getKnowledgeBaseById(baseId);
            if (!verifyBase) {
                console.error(`❌ 知识库验证失败: ID ${baseId} 不存在`);
                window.app.showNotification(`知识库不存在：${baseId}`, 'error');
                return;
            }

            // 确保存储管理器的当前知识库状态同步
            window.storageManager.setCurrentKnowledgeBase(baseId);
            console.log(`✅ 已同步存储管理器状态到知识库: ${baseId}`);

            // 获取当前知识库的知识点，使用增强的存储管理器方法
            const baseKnowledge = window.storageManager.getKnowledgeByBaseId(baseId);
            console.log(`📊 知识库 "${this.currentBase.name}" 的知识点数量: ${baseKnowledge.length}`);

            if (baseKnowledge.length === 0) {
                const message = `知识库 "${this.currentBase.name}" 中没有知识点`;
                console.warn('⚠️ ' + message);
                window.app.showNotification(message, 'info');
                return;
            }

            // 验证知识点归属的正确性
            console.log('🔍 验证知识点归属:');
            const correctKnowledge = baseKnowledge.filter(k => k.knowledgeBaseId === baseId);
            const incorrectKnowledge = baseKnowledge.filter(k => k.knowledgeBaseId !== baseId);
            
            console.log(`- 正确归属: ${correctKnowledge.length} 个`);
            if (incorrectKnowledge.length > 0) {
                console.warn(`- 错误归属: ${incorrectKnowledge.length} 个`);
                incorrectKnowledge.forEach(k => {
                    console.warn(`  * ${k.question.substring(0, 30)}... (实际BaseID: ${k.knowledgeBaseId})`);
                });
            }

            // 日志记录前5个知识点的归属信息
            console.log('📝 知识点样本检查:');
            baseKnowledge.slice(0, 5).forEach((k, index) => {
                const status = k.knowledgeBaseId === baseId ? '✅' : '❌';
                console.log(`${index + 1}. ${status} ${k.question.substring(0, 40)}... (ID: ${k.id}, BaseID: ${k.knowledgeBaseId})`);
            });

            // 使用新的复习管理器开始复习
            const reviewOptions = {
                onlyDue: false,  // 复习全部题目，不只是到期的
                random: true,    // 随机顺序
                limit: 50        // 最多50题，避免太长
            };

            console.log('🚀 启动复习管理器，配置:', reviewOptions);
            await window.reviewManager.reviewKnowledgeBase(baseId, reviewOptions);
            
            // 切换到复习页面
            window.app.showSection('review');
            
            // 显示成功通知
            const message = `开始复习知识库：${this.currentBase.name}（${baseKnowledge.length}个知识点）`;
            console.log('✅ ' + message);
            window.app.showNotification(message, 'success');

        } catch (error) {
            console.error('❌ 开始知识库复习失败:', error);
            window.app.showNotification('开始复习失败：' + error.message, 'error');
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
        const allKnowledge = window.storageManager.getAllKnowledge();
        const point = allKnowledge.find(k => k.id === pointId);
        if (point) {
            point.note = note;
            window.storageManager.updateKnowledge(point);
        }
    }

    // 显示创建知识库模态框
    showCreateKnowledgeBaseModal() {
        const modal = document.getElementById('create-knowledge-base-modal');
        if (modal) {
            modal.classList.add('active');
            this.resetCreateKnowledgeBaseForm();
        }
    }

    // 绑定创建知识库模态框事件
    bindCreateKnowledgeBaseEvents() {
        // 图标选择事件
        document.querySelectorAll('.icon-option').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.icon-option').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                document.getElementById('kb-icon').value = button.dataset.icon;
                this.updatePreview();
            });
        });

        // 颜色选择事件
        document.querySelectorAll('.color-option').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                document.getElementById('kb-color').value = button.dataset.color;
                this.updatePreview();
            });
        });

        // 表单输入事件
        document.getElementById('kb-name')?.addEventListener('input', () => this.updatePreview());
        document.getElementById('kb-description')?.addEventListener('input', () => this.updatePreview());

        // 表单提交事件
        document.getElementById('create-knowledge-base-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateKnowledgeBase();
        });

        // 模态框关闭事件
        document.querySelectorAll('[data-modal="create-knowledge-base-modal"]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('create-knowledge-base-modal').classList.remove('active');
            });
        });

        // 点击模态框背景关闭
        document.getElementById('create-knowledge-base-modal')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }

    // 重置创建知识库表单
    resetCreateKnowledgeBaseForm() {
        const form = document.getElementById('create-knowledge-base-form');
        form.reset();
        form.removeAttribute('data-edit-id'); // 清除编辑ID
        
        document.getElementById('kb-icon').value = '📚';
        document.getElementById('kb-color').value = '#667eea';
        document.getElementById('create-sample-areas').checked = true;
        
        // 重置选择状态
        document.querySelectorAll('.icon-option').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.icon-option[data-icon="📚"]').classList.add('active');
        
        document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.color-option[data-color="#667eea"]').classList.add('active');
        
        // 重置模态框标题和按钮文本
        document.querySelector('#create-knowledge-base-modal .modal-header h3').textContent = '📚 创建新知识库';
        document.querySelector('#create-knowledge-base-modal .modal-footer .btn-primary').textContent = '创建知识库';
        
        this.updatePreview();
    }

    // 更新预览
    updatePreview() {
        const name = document.getElementById('kb-name').value || '知识库名称';
        const description = document.getElementById('kb-description').value || '知识库描述';
        const icon = document.getElementById('kb-icon').value;
        const color = document.getElementById('kb-color').value;

        document.querySelector('.preview-icon').textContent = icon;
        document.querySelector('.preview-title').textContent = name;
        document.querySelector('.preview-description').textContent = description;
        
        // 更新预览卡片的颜色
        const previewCard = document.querySelector('.preview-card');
        if (previewCard) {
            previewCard.style.setProperty('--preview-color', color);
            previewCard.style.borderLeftColor = color;
        }
    }

    // 处理创建知识库
    async handleCreateKnowledgeBase() {
        const formData = new FormData(document.getElementById('create-knowledge-base-form'));
        const name = formData.get('name').trim();
        const description = formData.get('description').trim();
        const icon = formData.get('icon');
        const color = formData.get('color');
        const createSampleAreas = document.getElementById('create-sample-areas').checked;
        const editId = document.getElementById('create-knowledge-base-form').getAttribute('data-edit-id');

        // 验证必填字段
        if (!name) {
            window.app.showNotification('请输入知识库名称', 'error');
            return;
        }

        try {
            if (editId) {
                // 编辑模式
                console.log('编辑知识库:', { editId, name, description, icon, color });
                
                const updates = {
                    name: name,
                    description: description || '',
                    icon: icon || '📚',
                    color: color || '#667eea'
                };

                const success = window.storageManager.updateKnowledgeBase(editId, updates);
                
                if (!success) {
                    throw new Error('知识库更新失败');
                }

                console.log('知识库更新成功');
                window.app.showNotification(`知识库"${name}"更新成功！`, 'success');
            } else {
                // 创建模式
                console.log('开始创建知识库:', { name, description, icon, color, createSampleAreas });
                
                // 创建知识库数据结构
                const knowledgeBase = {
                    id: 'kb_' + Date.now(),
                    name: name,
                    description: description || '',
                    icon: icon || '📚',
                    color: color || '#667eea',
                    areas: []
                };

                // 如果选择创建示例知识区
                if (createSampleAreas) {
                    knowledgeBase.areas = this.createSampleAreas();
                    console.log('创建了示例知识区:', knowledgeBase.areas);
                }

                // 使用新的存储方法添加知识库
                const result = window.storageManager.addKnowledgeBase(knowledgeBase);
                
                if (!result) {
                    throw new Error('知识库添加失败');
                }

                console.log('知识库创建成功:', result);
                window.app.showNotification(`知识库"${name}"创建成功！`, 'success');
            }

            // 关闭模态框
            document.getElementById('create-knowledge-base-modal').classList.remove('active');

            // 重置表单状态
            this.resetCreateKnowledgeBaseForm();

            // 刷新知识库视图
            this.showBaseView();

        } catch (error) {
            console.error('操作失败:', error);
            window.app.showNotification('操作失败：' + error.message, 'error');
        }
    }

    // 创建示例知识区
    createSampleAreas() {
        return [
            {
                id: 'area_' + Date.now() + '_1',
                name: '基础概念',
                description: '基本概念和定义',
                color: '#667eea',
                knowledgePoints: []
            },
            {
                id: 'area_' + Date.now() + '_2',
                name: '重点难点',
                description: '重要和困难的知识点',
                color: '#f093fb',
                knowledgePoints: []
            },
            {
                id: 'area_' + Date.now() + '_3', 
                name: '实践应用',
                description: '实际应用和案例',
                color: '#43e97b',
                knowledgePoints: []
            }
        ];
    }

    // 编辑知识库
    editKnowledgeBase(knowledgeBaseId) {
        const knowledgeBase = window.storageManager.getKnowledgeBaseById(knowledgeBaseId);
        if (!knowledgeBase) {
            window.app.showNotification('未找到知识库', 'error');
            return;
        }

        // 填充表单数据
        document.getElementById('kb-name').value = knowledgeBase.name;
        document.getElementById('kb-description').value = knowledgeBase.description || '';
        document.getElementById('kb-icon').value = knowledgeBase.icon || '📚';
        document.getElementById('kb-color').value = knowledgeBase.color || '#667eea';
        document.getElementById('create-sample-areas').checked = false; // 编辑时不创建示例区

        // 更新选择状态
        document.querySelectorAll('.icon-option').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.icon-option[data-icon="${knowledgeBase.icon}"]`)?.classList.add('active');
        
        document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.color-option[data-color="${knowledgeBase.color}"]`)?.classList.add('active');

        // 更新预览
        this.updatePreview();

        // 更改模态框标题
        document.querySelector('#create-knowledge-base-modal .modal-header h3').textContent = '📚 编辑知识库';
        document.querySelector('#create-knowledge-base-modal .modal-footer .btn-primary').textContent = '保存修改';

        // 存储编辑ID
        document.getElementById('create-knowledge-base-form').setAttribute('data-edit-id', knowledgeBaseId);

        // 显示模态框
        document.getElementById('create-knowledge-base-modal').classList.add('active');
    }

    // 删除知识库
    deleteKnowledgeBase(knowledgeBaseId) {
        const knowledgeBase = window.storageManager.getKnowledgeBaseById(knowledgeBaseId);
        if (!knowledgeBase) {
            window.app.showNotification('未找到知识库', 'error');
            return;
        }

        const stats = this.getKnowledgeBaseStats(knowledgeBaseId);
        
        if (confirm(`确定要删除知识库"${knowledgeBase.name}"吗？\n\n这将同时删除：\n- ${stats.totalPoints} 个知识点\n- ${knowledgeBase.areas.length} 个知识区\n\n此操作不可恢复！`)) {
            const success = window.storageManager.deleteKnowledgeBase(knowledgeBaseId);
            
            if (success) {
                window.app.showNotification(`知识库"${knowledgeBase.name}"已删除`, 'success');
                this.showBaseView(); // 刷新视图
            } else {
                window.app.showNotification('删除失败，请重试', 'error');
            }
        }
    }

    // 显示创建知识区模态框
    showCreateKnowledgeAreaModal() {
        const modal = document.getElementById('create-knowledge-area-modal');
        if (modal) {
            modal.classList.add('active');
            this.resetCreateKnowledgeAreaForm();
        }
    }

    // 绑定创建知识区模态框事件
    bindCreateKnowledgeAreaEvents() {
        // 颜色选择事件
        document.querySelectorAll('#create-knowledge-area-modal .color-option').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('#create-knowledge-area-modal .color-option').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                document.getElementById('area-color').value = button.dataset.color;
                this.updateAreaPreview();
            });
        });

        // 表单输入事件
        document.getElementById('area-name')?.addEventListener('input', () => this.updateAreaPreview());
        document.getElementById('area-description')?.addEventListener('input', () => this.updateAreaPreview());

        // 表单提交事件
        document.getElementById('create-knowledge-area-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateKnowledgeArea();
        });

        // 模态框关闭事件
        document.querySelectorAll('[data-modal="create-knowledge-area-modal"]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('create-knowledge-area-modal').classList.remove('active');
            });
        });

        // 点击模态框背景关闭
        document.getElementById('create-knowledge-area-modal')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }

    // 重置创建知识区表单
    resetCreateKnowledgeAreaForm() {
        const form = document.getElementById('create-knowledge-area-form');
        form.reset();
        form.removeAttribute('data-edit-id');
        
        document.getElementById('area-color').value = '#667eea';
        
        // 重置选择状态
        document.querySelectorAll('#create-knowledge-area-modal .color-option').forEach(btn => btn.classList.remove('active'));
        document.querySelector('#create-knowledge-area-modal .color-option[data-color="#667eea"]').classList.add('active');
        
        // 重置模态框标题和按钮文本
        document.querySelector('#create-knowledge-area-modal .modal-header h3').textContent = '📖 创建新知识区';
        document.querySelector('#create-knowledge-area-modal .modal-footer .btn-primary').textContent = '创建知识区';
        
        this.updateAreaPreview();
    }

    // 更新知识区预览
    updateAreaPreview() {
        const name = document.getElementById('area-name').value || '知识区名称';
        const description = document.getElementById('area-description').value || '知识区描述';
        const color = document.getElementById('area-color').value;

        document.querySelector('#create-knowledge-area-modal .preview-title').textContent = name;
        document.querySelector('#create-knowledge-area-modal .preview-description').textContent = description;
        
        // 更新预览卡片的颜色
        const previewCard = document.querySelector('#create-knowledge-area-modal .preview-card');
        if (previewCard) {
            previewCard.style.setProperty('--preview-color', color);
            previewCard.style.borderLeftColor = color;
        }
    }

    // 处理创建知识区
    async handleCreateKnowledgeArea() {
        const formData = new FormData(document.getElementById('create-knowledge-area-form'));
        const name = formData.get('name').trim();
        const description = formData.get('description').trim();
        const color = formData.get('color');
        const editId = document.getElementById('create-knowledge-area-form').getAttribute('data-edit-id');

        // 验证必填字段
        if (!name) {
            window.app.showNotification('请输入知识区名称', 'error');
            return;
        }

        if (!this.currentBase) {
            window.app.showNotification('请先选择知识库', 'error');
            return;
        }

        try {
            if (editId) {
                // 编辑模式
                const updates = {
                    name: name,
                    description: description || '',
                    color: color || '#667eea'
                };

                const success = window.storageManager.updateKnowledgeArea(this.currentBase.id, editId, updates);
                
                if (!success) {
                    throw new Error('知识区更新失败');
                }

                window.app.showNotification(`知识区"${name}"更新成功！`, 'success');
            } else {
                // 创建模式
                const areaData = {
                    name: name,
                    description: description || '',
                    color: color || '#667eea'
                };

                const result = window.storageManager.addKnowledgeArea(this.currentBase.id, areaData);
                
                if (!result) {
                    throw new Error('知识区创建失败');
                }

                window.app.showNotification(`知识区"${name}"创建成功！`, 'success');
            }

            // 关闭模态框
            document.getElementById('create-knowledge-area-modal').classList.remove('active');

            // 重置表单状态
            this.resetCreateKnowledgeAreaForm();

            // 刷新知识区视图
            this.showAreaView(this.currentBase.id);

        } catch (error) {
            console.error('操作失败:', error);
            window.app.showNotification('操作失败：' + error.message, 'error');
        }
    }

    // 编辑知识区
    editKnowledgeArea(areaId) {
        const area = this.currentBase?.areas.find(a => a.id === areaId);
        if (!area) {
            window.app.showNotification('未找到知识区', 'error');
            return;
        }

        // 填充表单数据
        document.getElementById('area-name').value = area.name;
        document.getElementById('area-description').value = area.description || '';
        document.getElementById('area-color').value = area.color || '#667eea';

        // 更新选择状态
        document.querySelectorAll('#create-knowledge-area-modal .color-option').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`#create-knowledge-area-modal .color-option[data-color="${area.color}"]`)?.classList.add('active');

        // 更新预览
        this.updateAreaPreview();

        // 更改模态框标题
        document.querySelector('#create-knowledge-area-modal .modal-header h3').textContent = '📖 编辑知识区';
        document.querySelector('#create-knowledge-area-modal .modal-footer .btn-primary').textContent = '保存修改';

        // 存储编辑ID
        document.getElementById('create-knowledge-area-form').setAttribute('data-edit-id', areaId);

        // 显示模态框
        document.getElementById('create-knowledge-area-modal').classList.add('active');
    }

    // 删除知识区
    deleteKnowledgeArea(areaId) {
        const area = this.currentBase?.areas.find(a => a.id === areaId);
        if (!area) {
            window.app.showNotification('未找到知识区', 'error');
            return;
        }

        const knowledgeCount = window.storageManager.getKnowledgeByAreaId(areaId).length;
        
        if (confirm(`确定要删除知识区"${area.name}"吗？\n\n这将同时删除该知识区下的 ${knowledgeCount} 个知识点。\n\n此操作不可恢复！`)) {
            const success = window.storageManager.deleteKnowledgeArea(this.currentBase.id, areaId);
            
            if (success) {
                window.app.showNotification(`知识区"${area.name}"已删除`, 'success');
                this.showAreaView(this.currentBase.id); // 刷新视图
            } else {
                window.app.showNotification('删除失败，请重试', 'error');
            }
        }
    }
}

// 初始化知识管理器
window.knowledgeManager = new KnowledgeManager(); 