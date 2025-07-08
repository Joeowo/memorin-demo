// 笔记管理器 - 支持可视化编辑知识库结构
class NotesManager {
    constructor() {
        this.currentData = {
            knowledgeBases: [],
            version: '1.0.0',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.currentSelection = null;
        this.selectionType = null; // 'knowledgeBase', 'area', 'point'
        this.init();
    }

    init() {
        console.log('笔记管理器初始化...');
        this.renderTree();
        this.bindEvents();
    }

    bindEvents() {
        // 模态框点击背景关闭
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    // 渲染树状结构
    renderTree() {
        const treeView = document.getElementById('treeView');
        
        if (!this.currentData.knowledgeBases || this.currentData.knowledgeBases.length === 0) {
            treeView.innerHTML = `
                <div class="empty-state">
                    <h3>暂无笔记</h3>
                    <p>点击"新建知识库"开始创建</p>
                </div>
            `;
            return;
        }

        let html = '';
        this.currentData.knowledgeBases.forEach(kb => {
            html += this.renderKnowledgeBase(kb);
        });
        
        treeView.innerHTML = html;
    }

    renderKnowledgeBase(kb) {
        const isSelected = this.currentSelection?.id === kb.id && this.selectionType === 'knowledgeBase';
        
        let html = `
            <div class="tree-item knowledge-base ${isSelected ? 'active' : ''}" 
                 onclick="notesManager.selectKnowledgeBase('${kb.id}')">
                <span>${kb.icon || '📚'}</span>
                <span>${kb.name}</span>
                <div class="tree-controls">
                    <button class="tree-btn" onclick="event.stopPropagation(); notesManager.createKnowledgeArea('${kb.id}')" title="新建知识区">+</button>
                    <button class="tree-btn" onclick="event.stopPropagation(); notesManager.deleteKnowledgeBase('${kb.id}')" title="删除知识库">×</button>
                </div>
            </div>
        `;
        
        if (kb.areas && kb.areas.length > 0) {
            kb.areas.forEach(area => {
                html += this.renderKnowledgeArea(area, kb.id);
            });
        }
        
        return html;
    }

    renderKnowledgeArea(area, knowledgeBaseId) {
        const isSelected = this.currentSelection?.id === area.id && this.selectionType === 'area';
        
        let html = `
            <div class="tree-item knowledge-area ${isSelected ? 'active' : ''}" 
                 onclick="notesManager.selectKnowledgeArea('${knowledgeBaseId}', '${area.id}')">
                <span>📂</span>
                <span>${area.name}</span>
                <div class="tree-controls">
                    <button class="tree-btn" onclick="event.stopPropagation(); notesManager.createKnowledgePoint('${knowledgeBaseId}', '${area.id}')" title="新建知识点">+</button>
                    <button class="tree-btn" onclick="event.stopPropagation(); notesManager.deleteKnowledgeArea('${knowledgeBaseId}', '${area.id}')" title="删除知识区">×</button>
                </div>
            </div>
        `;
        
        if (area.knowledgePoints && area.knowledgePoints.length > 0) {
            area.knowledgePoints.forEach(point => {
                html += this.renderKnowledgePoint(point, knowledgeBaseId, area.id);
            });
        }
        
        return html;
    }

    renderKnowledgePoint(point, knowledgeBaseId, areaId) {
        const isSelected = this.currentSelection?.id === point.id && this.selectionType === 'point';
        const icon = point.type === 'choice' ? '🔘' : '📝';
        
        return `
            <div class="tree-item knowledge-point ${isSelected ? 'active' : ''}" 
                 onclick="notesManager.selectKnowledgePoint('${knowledgeBaseId}', '${areaId}', '${point.id}')">
                <span>${icon}</span>
                <span>${point.question ? point.question.substring(0, 30) + '...' : '新知识点'}</span>
                <div class="tree-controls">
                    <button class="tree-btn" onclick="event.stopPropagation(); notesManager.deleteKnowledgePoint('${knowledgeBaseId}', '${areaId}', '${point.id}')" title="删除知识点">×</button>
                </div>
            </div>
        `;
    }

    // 选择知识库
    selectKnowledgeBase(id) {
        const kb = this.currentData.knowledgeBases.find(k => k.id === id);
        if (!kb) return;
        
        this.currentSelection = kb;
        this.selectionType = 'knowledgeBase';
        this.updateCurrentPath(`📚 ${kb.name}`);
        this.renderTree();
        this.renderKnowledgeBaseEditor(kb);
    }

    // 选择知识区
    selectKnowledgeArea(knowledgeBaseId, areaId) {
        const kb = this.currentData.knowledgeBases.find(k => k.id === knowledgeBaseId);
        if (!kb) return;
        
        const area = kb.areas.find(a => a.id === areaId);
        if (!area) return;
        
        this.currentSelection = area;
        this.selectionType = 'area';
        this.updateCurrentPath(`📚 ${kb.name} > 📂 ${area.name}`);
        this.renderTree();
        this.renderKnowledgeAreaEditor(area, knowledgeBaseId);
    }

    // 选择知识点
    selectKnowledgePoint(knowledgeBaseId, areaId, pointId) {
        const kb = this.currentData.knowledgeBases.find(k => k.id === knowledgeBaseId);
        if (!kb) return;
        
        const area = kb.areas.find(a => a.id === areaId);
        if (!area) return;
        
        const point = area.knowledgePoints.find(p => p.id === pointId);
        if (!point) return;
        
        this.currentSelection = point;
        this.selectionType = 'point';
        this.updateCurrentPath(`📚 ${kb.name} > 📂 ${area.name} > 📝 ${point.question ? point.question.substring(0, 20) + '...' : '新知识点'}`);
        this.renderTree();
        this.renderKnowledgePointEditor(point, knowledgeBaseId, areaId);
    }

    // 更新当前路径显示
    updateCurrentPath(path) {
        document.getElementById('currentPath').textContent = path;
    }

    // 渲染知识库编辑器
    renderKnowledgeBaseEditor(kb) {
        const editor = document.getElementById('editorContent');
        editor.innerHTML = `
            <div class="editor-form">
                <h3>📚 编辑知识库</h3>
                <div class="form-group">
                    <label for="kb-name">知识库名称</label>
                    <input type="text" id="kb-name" value="${kb.name || ''}" placeholder="请输入知识库名称">
                </div>
                <div class="form-group">
                    <label for="kb-description">知识库描述</label>
                    <textarea id="kb-description" placeholder="请输入知识库描述">${kb.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="kb-icon">图标</label>
                    <input type="text" id="kb-icon" value="${kb.icon || '📚'}" placeholder="📚">
                </div>
                <div class="form-group">
                    <label for="kb-color">颜色</label>
                    <input type="color" id="kb-color" value="${kb.color || '#667eea'}">
                </div>
                <div class="toolbar">
                    <button class="btn btn-primary" onclick="notesManager.saveKnowledgeBase('${kb.id}')">💾 保存</button>
                    <button class="btn btn-secondary" onclick="notesManager.createKnowledgeArea('${kb.id}')">➕ 新建知识区</button>
                </div>
            </div>
        `;
    }

    // 渲染知识区编辑器
    renderKnowledgeAreaEditor(area, knowledgeBaseId) {
        const editor = document.getElementById('editorContent');
        editor.innerHTML = `
            <div class="editor-form">
                <h3>📂 编辑知识区</h3>
                <div class="form-group">
                    <label for="area-name">知识区名称</label>
                    <input type="text" id="area-name" value="${area.name || ''}" placeholder="请输入知识区名称">
                </div>
                <div class="form-group">
                    <label for="area-description">知识区描述</label>
                    <textarea id="area-description" placeholder="请输入知识区描述">${area.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="area-color">颜色</label>
                    <input type="color" id="area-color" value="${area.color || '#667eea'}">
                </div>
                <div class="toolbar">
                    <button class="btn btn-primary" onclick="notesManager.saveKnowledgeArea('${knowledgeBaseId}', '${area.id}')">💾 保存</button>
                    <button class="btn btn-secondary" onclick="notesManager.createKnowledgePoint('${knowledgeBaseId}', '${area.id}')">➕ 新建知识点</button>
                </div>
            </div>
        `;
    }

    // 渲染知识点编辑器
    renderKnowledgePointEditor(point, knowledgeBaseId, areaId) {
        const editor = document.getElementById('editorContent');
        const choiceHtml = point.type === 'choice' ? this.renderChoiceOptions(point) : '';
        
        editor.innerHTML = `
            <div class="editor-form">
                <h3>📝 编辑知识点</h3>
                <div class="form-group">
                    <label for="point-type">题目类型</label>
                    <select id="point-type" onchange="notesManager.handlePointTypeChange('${knowledgeBaseId}', '${areaId}', '${point.id}')">
                        <option value="fill" ${point.type === 'fill' ? 'selected' : ''}>填空题</option>
                        <option value="choice" ${point.type === 'choice' ? 'selected' : ''}>选择题</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="point-question">问题</label>
                    <textarea id="point-question" placeholder="请输入问题">${point.question || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="point-answer">答案</label>
                    <textarea id="point-answer" placeholder="请输入答案">${point.answer || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="point-explanation">解释</label>
                    <textarea id="point-explanation" placeholder="请输入解释">${point.explanation || ''}</textarea>
                </div>
                ${choiceHtml}
                <div class="form-group">
                    <label for="point-tags">标签</label>
                    <input type="text" id="point-tags" value="${point.tags ? point.tags.join(', ') : ''}" placeholder="用逗号分隔标签">
                </div>
                <div class="form-group">
                    <label for="point-difficulty">难度</label>
                    <select id="point-difficulty">
                        <option value="1" ${point.difficulty === 1 ? 'selected' : ''}>简单</option>
                        <option value="2" ${point.difficulty === 2 ? 'selected' : ''}>一般</option>
                        <option value="3" ${point.difficulty === 3 ? 'selected' : ''}>困难</option>
                        <option value="4" ${point.difficulty === 4 ? 'selected' : ''}>非常困难</option>
                    </select>
                </div>
                <div class="toolbar">
                    <button class="btn btn-primary" onclick="notesManager.saveKnowledgePoint('${knowledgeBaseId}', '${areaId}', '${point.id}')">💾 保存</button>
                    <button class="btn btn-secondary" onclick="notesManager.createKnowledgePoint('${knowledgeBaseId}', '${areaId}')">➕ 新建知识点</button>
                </div>
            </div>
        `;
    }

    // 渲染选择题选项
    renderChoiceOptions(point) {
        const options = point.options || [
            { key: 'A', text: '' },
            { key: 'B', text: '' },
            { key: 'C', text: '' },
            { key: 'D', text: '' }
        ];
        
        const correctAnswers = point.correctAnswer ? point.correctAnswer.split(',') : [];
        
        let html = `
            <div class="form-group">
                <label>选择题选项</label>
                <div class="choice-options">
                    <div class="form-group">
                        <label for="choice-type">选择题类型</label>
                        <select id="choice-type">
                            <option value="single" ${point.choiceType === 'single' ? 'selected' : ''}>单选题</option>
                            <option value="multiple" ${point.choiceType === 'multiple' ? 'selected' : ''}>多选题</option>
                        </select>
                    </div>
        `;
        
        options.forEach(option => {
            const isCorrect = correctAnswers.includes(option.key);
            html += `
                <div class="choice-option">
                    <div class="option-label">${option.key}</div>
                    <input type="text" value="${option.text || ''}" placeholder="请输入选项内容" data-key="${option.key}">
                    <div class="correct-indicator ${isCorrect ? 'correct' : ''}" 
                         onclick="notesManager.toggleCorrectAnswer('${option.key}')" 
                         title="${isCorrect ? '正确答案' : '点击设为正确答案'}">
                        ${isCorrect ? '✓' : ''}
                    </div>
                </div>
            `;
        });
        
        html += `
                    <div class="toolbar">
                        <button class="btn btn-secondary" onclick="notesManager.addChoiceOption()">➕ 添加选项</button>
                        <button class="btn btn-secondary" onclick="notesManager.removeChoiceOption()">➖ 删除选项</button>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }

    // 切换正确答案
    toggleCorrectAnswer(key) {
        const indicator = document.querySelector(`[data-key="${key}"] + .correct-indicator`);
        const choiceType = document.getElementById('choice-type').value;
        
        if (choiceType === 'single') {
            // 单选题，取消其他选项
            document.querySelectorAll('.correct-indicator').forEach(ind => {
                ind.classList.remove('correct');
                ind.textContent = '';
            });
        }
        
        // 切换当前选项
        if (indicator.classList.contains('correct')) {
            indicator.classList.remove('correct');
            indicator.textContent = '';
        } else {
            indicator.classList.add('correct');
            indicator.textContent = '✓';
        }
    }

    // 添加选择题选项
    addChoiceOption() {
        const choiceOptions = document.querySelector('.choice-options');
        const existingOptions = choiceOptions.querySelectorAll('.choice-option');
        const nextKey = String.fromCharCode(65 + existingOptions.length);
        
        const optionHtml = `
            <div class="choice-option">
                <div class="option-label">${nextKey}</div>
                <input type="text" value="" placeholder="请输入选项内容" data-key="${nextKey}">
                <div class="correct-indicator" onclick="notesManager.toggleCorrectAnswer('${nextKey}')" title="点击设为正确答案"></div>
            </div>
        `;
        
        const toolbar = choiceOptions.querySelector('.toolbar');
        toolbar.insertAdjacentHTML('beforebegin', optionHtml);
    }

    // 删除选择题选项
    removeChoiceOption() {
        const options = document.querySelectorAll('.choice-option');
        if (options.length > 2) {
            options[options.length - 1].remove();
        } else {
            this.showNotification('至少需要保留两个选项', 'warning');
        }
    }

    // 处理题目类型变化
    handlePointTypeChange(knowledgeBaseId, areaId, pointId) {
        const point = this.findKnowledgePoint(knowledgeBaseId, areaId, pointId);
        if (!point) return;
        
        const newType = document.getElementById('point-type').value;
        point.type = newType;
        
        // 重新渲染编辑器
        this.renderKnowledgePointEditor(point, knowledgeBaseId, areaId);
    }

    // 创建知识库
    createKnowledgeBase() {
        const newKb = {
            id: this.generateId(),
            name: '新知识库',
            description: '',
            icon: '📚',
            color: '#667eea',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            areas: []
        };
        
        this.currentData.knowledgeBases.push(newKb);
        this.currentData.updatedAt = new Date().toISOString();
        
        this.renderTree();
        this.selectKnowledgeBase(newKb.id);
        this.showNotification('知识库创建成功', 'success');
    }

    // 创建知识区
    createKnowledgeArea(knowledgeBaseId) {
        const kb = this.currentData.knowledgeBases.find(k => k.id === knowledgeBaseId);
        if (!kb) return;
        
        const newArea = {
            id: this.generateId(),
            name: '新知识区',
            description: '',
            color: '#667eea',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            knowledgePoints: []
        };
        
        if (!kb.areas) kb.areas = [];
        kb.areas.push(newArea);
        kb.updatedAt = new Date().toISOString();
        this.currentData.updatedAt = new Date().toISOString();
        
        this.renderTree();
        this.selectKnowledgeArea(knowledgeBaseId, newArea.id);
        this.showNotification('知识区创建成功', 'success');
    }

    // 创建知识点
    createKnowledgePoint(knowledgeBaseId, areaId) {
        const kb = this.currentData.knowledgeBases.find(k => k.id === knowledgeBaseId);
        if (!kb) return;
        
        const area = kb.areas.find(a => a.id === areaId);
        if (!area) return;
        
        const newPoint = {
            id: this.generateId(),
            type: 'fill',
            question: '',
            answer: '',
            explanation: '',
            tags: [],
            difficulty: 2,
            score: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        if (!area.knowledgePoints) area.knowledgePoints = [];
        area.knowledgePoints.push(newPoint);
        area.updatedAt = new Date().toISOString();
        kb.updatedAt = new Date().toISOString();
        this.currentData.updatedAt = new Date().toISOString();
        
        this.renderTree();
        this.selectKnowledgePoint(knowledgeBaseId, areaId, newPoint.id);
        this.showNotification('知识点创建成功', 'success');
    }

    // 保存知识库
    saveKnowledgeBase(id) {
        const kb = this.currentData.knowledgeBases.find(k => k.id === id);
        if (!kb) return;
        
        kb.name = document.getElementById('kb-name').value.trim();
        kb.description = document.getElementById('kb-description').value.trim();
        kb.icon = document.getElementById('kb-icon').value.trim();
        kb.color = document.getElementById('kb-color').value;
        kb.updatedAt = new Date().toISOString();
        this.currentData.updatedAt = new Date().toISOString();
        
        this.renderTree();
        this.updateCurrentPath(`📚 ${kb.name}`);
        this.showNotification('知识库保存成功', 'success');
    }

    // 保存知识区
    saveKnowledgeArea(knowledgeBaseId, areaId) {
        const kb = this.currentData.knowledgeBases.find(k => k.id === knowledgeBaseId);
        if (!kb) return;
        
        const area = kb.areas.find(a => a.id === areaId);
        if (!area) return;
        
        area.name = document.getElementById('area-name').value.trim();
        area.description = document.getElementById('area-description').value.trim();
        area.color = document.getElementById('area-color').value;
        area.updatedAt = new Date().toISOString();
        kb.updatedAt = new Date().toISOString();
        this.currentData.updatedAt = new Date().toISOString();
        
        this.renderTree();
        this.updateCurrentPath(`📚 ${kb.name} > 📂 ${area.name}`);
        this.showNotification('知识区保存成功', 'success');
    }

    // 保存知识点
    saveKnowledgePoint(knowledgeBaseId, areaId, pointId) {
        const point = this.findKnowledgePoint(knowledgeBaseId, areaId, pointId);
        if (!point) return;
        
        point.question = document.getElementById('point-question').value.trim();
        point.answer = document.getElementById('point-answer').value.trim();
        point.explanation = document.getElementById('point-explanation').value.trim();
        point.tags = document.getElementById('point-tags').value.split(',').map(t => t.trim()).filter(t => t);
        point.difficulty = parseInt(document.getElementById('point-difficulty').value);
        point.updatedAt = new Date().toISOString();
        
        // 处理选择题数据
        if (point.type === 'choice') {
            point.choiceType = document.getElementById('choice-type').value;
            point.options = [];
            point.correctAnswer = '';
            
            const correctAnswers = [];
            document.querySelectorAll('.choice-option input[data-key]').forEach(input => {
                const key = input.getAttribute('data-key');
                const text = input.value.trim();
                if (text) {
                    point.options.push({ key, text });
                    
                    const indicator = input.nextElementSibling;
                    if (indicator && indicator.classList.contains('correct')) {
                        correctAnswers.push(key);
                    }
                }
            });
            
            point.correctAnswer = correctAnswers.join(',');
        }
        
        // 更新父级时间戳
        const kb = this.currentData.knowledgeBases.find(k => k.id === knowledgeBaseId);
        const area = kb.areas.find(a => a.id === areaId);
        area.updatedAt = new Date().toISOString();
        kb.updatedAt = new Date().toISOString();
        this.currentData.updatedAt = new Date().toISOString();
        
        this.renderTree();
        this.showNotification('知识点保存成功', 'success');
    }

    // 查找知识点
    findKnowledgePoint(knowledgeBaseId, areaId, pointId) {
        const kb = this.currentData.knowledgeBases.find(k => k.id === knowledgeBaseId);
        if (!kb) return null;
        
        const area = kb.areas.find(a => a.id === areaId);
        if (!area) return null;
        
        return area.knowledgePoints.find(p => p.id === pointId);
    }

    // 删除知识库
    deleteKnowledgeBase(id) {
        if (!confirm('确定要删除这个知识库吗？此操作不可恢复。')) return;
        
        const index = this.currentData.knowledgeBases.findIndex(k => k.id === id);
        if (index > -1) {
            this.currentData.knowledgeBases.splice(index, 1);
            this.currentData.updatedAt = new Date().toISOString();
            
            // 清空编辑器
            this.currentSelection = null;
            this.selectionType = null;
            this.renderTree();
            this.showEmptyEditor();
            this.showNotification('知识库删除成功', 'success');
        }
    }

    // 删除知识区
    deleteKnowledgeArea(knowledgeBaseId, areaId) {
        if (!confirm('确定要删除这个知识区吗？此操作不可恢复。')) return;
        
        const kb = this.currentData.knowledgeBases.find(k => k.id === knowledgeBaseId);
        if (!kb) return;
        
        const index = kb.areas.findIndex(a => a.id === areaId);
        if (index > -1) {
            kb.areas.splice(index, 1);
            kb.updatedAt = new Date().toISOString();
            this.currentData.updatedAt = new Date().toISOString();
            
            // 如果当前选中的是被删除的知识区，清空编辑器
            if (this.currentSelection?.id === areaId) {
                this.currentSelection = null;
                this.selectionType = null;
                this.showEmptyEditor();
            }
            
            this.renderTree();
            this.showNotification('知识区删除成功', 'success');
        }
    }

    // 删除知识点
    deleteKnowledgePoint(knowledgeBaseId, areaId, pointId) {
        if (!confirm('确定要删除这个知识点吗？此操作不可恢复。')) return;
        
        const kb = this.currentData.knowledgeBases.find(k => k.id === knowledgeBaseId);
        if (!kb) return;
        
        const area = kb.areas.find(a => a.id === areaId);
        if (!area) return;
        
        const index = area.knowledgePoints.findIndex(p => p.id === pointId);
        if (index > -1) {
            area.knowledgePoints.splice(index, 1);
            area.updatedAt = new Date().toISOString();
            kb.updatedAt = new Date().toISOString();
            this.currentData.updatedAt = new Date().toISOString();
            
            // 如果当前选中的是被删除的知识点，清空编辑器
            if (this.currentSelection?.id === pointId) {
                this.currentSelection = null;
                this.selectionType = null;
                this.showEmptyEditor();
            }
            
            this.renderTree();
            this.showNotification('知识点删除成功', 'success');
        }
    }

    // 显示空编辑器
    showEmptyEditor() {
        const editor = document.getElementById('editorContent');
        editor.innerHTML = `
            <div class="empty-state">
                <h3>选择一个项目开始编辑</h3>
                <p>从左侧树状结构中选择知识库、知识区或知识点进行编辑</p>
            </div>
        `;
        this.updateCurrentPath('');
    }

    // 从存储加载数据
    loadFromStorage() {
        try {
            const data = localStorage.getItem('memorin_data');
            if (!data) {
                this.showNotification('存储中没有找到数据', 'warning');
                return;
            }
            
            const parsed = JSON.parse(data);
            if (parsed.knowledgeBases) {
                this.currentData.knowledgeBases = parsed.knowledgeBases;
                this.currentData.updatedAt = new Date().toISOString();
                this.renderTree();
                this.showEmptyEditor();
                this.showNotification('数据加载成功', 'success');
            } else {
                this.showNotification('存储数据格式不正确', 'error');
            }
        } catch (e) {
            console.error('加载数据失败:', e);
            this.showNotification('加载数据失败', 'error');
        }
    }

    // 保存到存储
    saveToStorage() {
        try {
            const existingData = localStorage.getItem('memorin_data');
            let data = existingData ? JSON.parse(existingData) : {};
            
            data.knowledgeBases = this.currentData.knowledgeBases;
            data.updatedAt = new Date().toISOString();
            
            localStorage.setItem('memorin_data', JSON.stringify(data));
            this.showNotification('数据保存成功', 'success');
        } catch (e) {
            console.error('保存数据失败:', e);
            this.showNotification('保存数据失败', 'error');
        }
    }

    // 显示导入对话框
    showImportDialog() {
        document.getElementById('importDialog').style.display = 'flex';
    }

    // 隐藏导入对话框
    hideImportDialog() {
        document.getElementById('importDialog').style.display = 'none';
    }

    // 显示导出对话框
    showExportDialog() {
        document.getElementById('exportDialog').style.display = 'flex';
        document.getElementById('exportFilename').value = `memorin-notes-${new Date().toISOString().split('T')[0]}`;
        this.updateExportPreview();
    }

    // 隐藏导出对话框
    hideExportDialog() {
        document.getElementById('exportDialog').style.display = 'none';
    }

    // 更新导出预览
    updateExportPreview() {
        const format = document.querySelector('#exportDialog .format-option.active').getAttribute('data-format');
        const preview = document.getElementById('exportPreview');
        
        if (format === 'json') {
            preview.textContent = JSON.stringify(this.currentData, null, 2);
        } else if (format === 'markdown') {
            preview.textContent = this.convertToMarkdown(this.currentData);
        }
    }

    // 处理导入
    handleImport() {
        const file = document.getElementById('importFile').files[0];
        if (!file) {
            this.showNotification('请选择文件', 'warning');
            return;
        }
        
        const format = document.querySelector('#importDialog .format-option.active').getAttribute('data-format');
        const merge = document.getElementById('mergeImport').checked;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                let importData;
                
                if (format === 'json') {
                    importData = JSON.parse(e.target.result);
                } else if (format === 'markdown') {
                    importData = this.parseMarkdown(e.target.result);
                }
                
                if (merge) {
                    this.mergeData(importData);
                } else {
                    this.currentData = importData;
                }
                
                this.currentData.updatedAt = new Date().toISOString();
                this.renderTree();
                this.showEmptyEditor();
                this.hideImportDialog();
                this.showNotification('导入成功', 'success');
            } catch (error) {
                console.error('导入失败:', error);
                this.showNotification('导入失败：' + error.message, 'error');
            }
        };
        
        reader.readAsText(file);
    }

    // 处理导出
    handleExport() {
        const format = document.querySelector('#exportDialog .format-option.active').getAttribute('data-format');
        const filename = document.getElementById('exportFilename').value || 'memorin-notes';
        
        let content, mimeType, extension;
        
        if (format === 'json') {
            content = JSON.stringify(this.currentData, null, 2);
            mimeType = 'application/json';
            extension = '.json';
        } else if (format === 'markdown') {
            content = this.convertToMarkdown(this.currentData);
            mimeType = 'text/markdown';
            extension = '.md';
        }
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename + extension;
        a.click();
        URL.revokeObjectURL(url);
        
        this.hideExportDialog();
        this.showNotification('导出成功', 'success');
    }

    // 转换为Markdown格式
    convertToMarkdown(data) {
        let markdown = `# Memorin 笔记\n\n`;
        markdown += `> 生成时间：${new Date().toLocaleString()}\n\n`;
        
        if (!data.knowledgeBases || data.knowledgeBases.length === 0) {
            markdown += `*暂无数据*\n`;
            return markdown;
        }
        
        data.knowledgeBases.forEach(kb => {
            markdown += `## ${kb.icon || '📚'} ${kb.name}\n\n`;
            if (kb.description) {
                markdown += `> ${kb.description}\n\n`;
            }
            
            if (kb.areas && kb.areas.length > 0) {
                kb.areas.forEach(area => {
                    markdown += `### 📂 ${area.name}\n\n`;
                    if (area.description) {
                        markdown += `> ${area.description}\n\n`;
                    }
                    
                    if (area.knowledgePoints && area.knowledgePoints.length > 0) {
                        area.knowledgePoints.forEach((point, index) => {
                            markdown += `#### ${index + 1}. ${point.question}\n\n`;
                            markdown += `**答案：** ${point.answer}\n\n`;
                            if (point.explanation) {
                                markdown += `**解释：** ${point.explanation}\n\n`;
                            }
                            
                            if (point.type === 'choice' && point.options) {
                                markdown += `**选项：**\n`;
                                point.options.forEach(option => {
                                    const isCorrect = point.correctAnswer && point.correctAnswer.includes(option.key);
                                    markdown += `- ${option.key}. ${option.text} ${isCorrect ? '✓' : ''}\n`;
                                });
                                markdown += `\n`;
                            }
                            
                            if (point.tags && point.tags.length > 0) {
                                markdown += `**标签：** ${point.tags.join(', ')}\n\n`;
                            }
                            
                            markdown += `**难度：** ${point.difficulty}/4\n\n`;
                            markdown += `---\n\n`;
                        });
                    }
                });
            }
        });
        
        return markdown;
    }

    // 解析Markdown格式
    parseMarkdown(content) {
        // 简化的Markdown解析，主要用于演示
        const lines = content.split('\n');
        const data = {
            knowledgeBases: [],
            version: '1.0.0',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        let currentKb = null;
        let currentArea = null;
        let currentPoint = null;
        
        lines.forEach(line => {
            line = line.trim();
            
            if (line.startsWith('## ')) {
                // 知识库
                const name = line.substring(3).trim();
                currentKb = {
                    id: this.generateId(),
                    name: name,
                    description: '',
                    icon: '📚',
                    color: '#667eea',
                    areas: []
                };
                data.knowledgeBases.push(currentKb);
            } else if (line.startsWith('### ')) {
                // 知识区
                const name = line.substring(4).trim();
                currentArea = {
                    id: this.generateId(),
                    name: name,
                    description: '',
                    color: '#667eea',
                    knowledgePoints: []
                };
                if (currentKb) {
                    currentKb.areas.push(currentArea);
                }
            } else if (line.match(/^#### \d+\. /)) {
                // 知识点
                const question = line.substring(line.indexOf('. ') + 2).trim();
                currentPoint = {
                    id: this.generateId(),
                    type: 'fill',
                    question: question,
                    answer: '',
                    explanation: '',
                    tags: [],
                    difficulty: 2
                };
                if (currentArea) {
                    currentArea.knowledgePoints.push(currentPoint);
                }
            } else if (line.startsWith('**答案：** ')) {
                if (currentPoint) {
                    currentPoint.answer = line.substring(7).trim();
                }
            } else if (line.startsWith('**解释：** ')) {
                if (currentPoint) {
                    currentPoint.explanation = line.substring(7).trim();
                }
            }
        });
        
        return data;
    }

    // 合并数据
    mergeData(importData) {
        if (importData.knowledgeBases) {
            importData.knowledgeBases.forEach(kb => {
                // 检查是否已存在同名知识库
                const existing = this.currentData.knowledgeBases.find(k => k.name === kb.name);
                if (existing) {
                    // 合并知识区
                    if (kb.areas) {
                        kb.areas.forEach(area => {
                            area.id = this.generateId();
                            if (area.knowledgePoints) {
                                area.knowledgePoints.forEach(point => {
                                    point.id = this.generateId();
                                });
                            }
                        });
                        existing.areas = [...(existing.areas || []), ...kb.areas];
                    }
                } else {
                    // 新增知识库
                    kb.id = this.generateId();
                    if (kb.areas) {
                        kb.areas.forEach(area => {
                            area.id = this.generateId();
                            if (area.knowledgePoints) {
                                area.knowledgePoints.forEach(point => {
                                    point.id = this.generateId();
                                });
                            }
                        });
                    }
                    this.currentData.knowledgeBases.push(kb);
                }
            });
        }
    }

    // 生成唯一ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // 导入到主系统
    importToMainSystem() {
        if (!this.currentData.knowledgeBases || this.currentData.knowledgeBases.length === 0) {
            this.showNotification('没有数据可以导入', 'warning');
            return;
        }
        
        if (!confirm('确定要将当前笔记数据导入到主系统吗？这将与现有数据合并。')) {
            return;
        }
        
        try {
            // 获取现有主系统数据
            const existingData = localStorage.getItem('memorin_data');
            let mainSystemData = existingData ? JSON.parse(existingData) : this.getDefaultMainSystemData();
            
            // 确保主系统数据结构正确
            if (!mainSystemData.knowledgeBases) {
                mainSystemData.knowledgeBases = [];
            }
            if (!mainSystemData.knowledge) {
                mainSystemData.knowledge = [];
            }
            
            // 转换和合并数据
            let importedPointsCount = 0;
            let importedAreasCount = 0;
            let importedBasesCount = 0;
            
            this.currentData.knowledgeBases.forEach(notesKb => {
                // 检查是否已存在同名知识库
                let existingKb = mainSystemData.knowledgeBases.find(kb => kb.name === notesKb.name);
                
                if (!existingKb) {
                    // 创建新知识库
                    existingKb = {
                        id: this.generateId(),
                        name: notesKb.name,
                        description: notesKb.description || '',
                        icon: notesKb.icon || '📚',
                        color: notesKb.color || '#667eea',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        areas: []
                    };
                    mainSystemData.knowledgeBases.push(existingKb);
                    importedBasesCount++;
                }
                
                // 处理知识区
                if (notesKb.areas && notesKb.areas.length > 0) {
                    notesKb.areas.forEach(notesArea => {
                        // 检查是否已存在同名知识区
                        let existingArea = existingKb.areas.find(area => area.name === notesArea.name);
                        
                        if (!existingArea) {
                            // 创建新知识区
                            existingArea = {
                                id: this.generateId(),
                                name: notesArea.name,
                                description: notesArea.description || '',
                                color: notesArea.color || '#667eea',
                                knowledgePoints: []
                            };
                            existingKb.areas.push(existingArea);
                            importedAreasCount++;
                        }
                        
                        // 处理知识点
                        if (notesArea.knowledgePoints && notesArea.knowledgePoints.length > 0) {
                            notesArea.knowledgePoints.forEach(notesPoint => {
                                // 转换知识点格式为主系统格式
                                const mainSystemPoint = {
                                    id: this.generateId(),
                                    question: notesPoint.question || '',
                                    answer: notesPoint.answer || '',
                                    explanation: notesPoint.explanation || '',
                                    tags: notesPoint.tags || [],
                                    category: notesArea.name, // 使用知识区名称作为分类
                                    difficulty: notesPoint.difficulty || 2,
                                    createdAt: Date.now(),
                                    updatedAt: Date.now(),
                                    reviewCount: 0,
                                    correctCount: 0,
                                    lastReviewed: null,
                                    nextReview: Date.now(), // 立即可复习
                                    interval: 1,
                                    easeFactor: 2.5,
                                    knowledgeBaseId: existingKb.id,
                                    areaId: existingArea.id,
                                    score: notesPoint.score || 0
                                };
                                
                                // 处理选择题特殊格式
                                if (notesPoint.type === 'choice') {
                                    mainSystemPoint.type = 'choice';
                                    mainSystemPoint.choiceType = notesPoint.choiceType || 'single';
                                    mainSystemPoint.options = notesPoint.options || [];
                                    mainSystemPoint.correctAnswer = notesPoint.correctAnswer || '';
                                } else {
                                    mainSystemPoint.type = 'fill';
                                }
                                
                                mainSystemData.knowledge.push(mainSystemPoint);
                                importedPointsCount++;
                            });
                        }
                    });
                }
            });
            
            // 更新主系统数据时间戳
            mainSystemData.updatedAt = Date.now();
            
            // 保存到主系统
            localStorage.setItem('memorin_data', JSON.stringify(mainSystemData));
            
            this.showNotification(
                `导入成功！共导入 ${importedBasesCount} 个知识库、${importedAreasCount} 个知识区、${importedPointsCount} 个知识点`, 
                'success'
            );
            
        } catch (error) {
            console.error('导入到主系统失败:', error);
            this.showNotification('导入失败：' + error.message, 'error');
        }
    }
    
    // 获取默认主系统数据结构
    getDefaultMainSystemData() {
        return {
            knowledge: [],
            knowledgeBases: [],
            currentKnowledgeBaseId: null,
            mistakes: [],
            reviewHistory: [],
            settings: {
                theme: 'light',
                language: 'zh-CN',
                reviewReminder: true,
                soundEnabled: true
            },
            statistics: {
                totalReviews: 0,
                correctAnswers: 0,
                studyTime: 0,
                streakDays: 0,
                lastStudyDate: null
            },
            version: '1.0.0',
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
    }

    // 显示通知
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
} 