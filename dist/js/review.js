// 复习管理类 - 重构版本
class ReviewManager {
    constructor() {
        this.currentReviewList = [];
        this.currentIndex = 0;
        this.currentKnowledge = null;
        this.reviewMode = null;
        this.startTime = null;
        this.isInputFocused = false;
        this.currentConfig = null; // 保存当前生成配置
        this.init();
    }

    init() {
        this.bindEvents();
        this.bindUserAnswerEvents();
        console.log('复习管理器已初始化');
    }

    // 绑定事件监听器
    bindEvents() {
        // 复习模式按钮
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.getAttribute('data-mode');
                this.startReview(mode);
            });
        });

        // 显示答案按钮
        const showAnswerBtn = document.getElementById('show-answer-btn');
        if (showAnswerBtn) {
            showAnswerBtn.addEventListener('click', () => {
                this.toggleAnswer();
            });
        }

        // 评分按钮
        document.querySelectorAll('[data-rating]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rating = parseInt(e.target.getAttribute('data-rating'));
                this.submitRating(rating);
            });
        });

        // 复习所有错题按钮
        const reviewMistakesBtn = document.getElementById('review-all-mistakes');
        if (reviewMistakesBtn) {
            reviewMistakesBtn.addEventListener('click', () => {
                this.startMistakeReview();
            });
        }

        // 导航按钮 - 上一题
        const prevQuestionBtn = document.getElementById('prev-question-btn');
        if (prevQuestionBtn) {
            prevQuestionBtn.addEventListener('click', () => {
                this.previousQuestion();
            });
        }

        // 导航按钮 - 下一题
        const nextQuestionBtn = document.getElementById('next-question-btn');
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => {
                this.goToNextQuestion();
            });
        }

        // 键盘快捷键支持
        document.addEventListener('keydown', (e) => {
            // 只在复习卡片显示时响应快捷键
            const reviewCard = document.getElementById('review-card');
            if (!reviewCard || reviewCard.style.display === 'none') return;
            
            // 如果输入框获得焦点，则不响应左右键切换
            if (this.isInputFocused && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                return;
            }

            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousQuestion();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.goToNextQuestion();
                    break;
            }
        });
    }

    // 绑定用户答案输入框相关事件
    bindUserAnswerEvents() {
        const userAnswerInput = document.getElementById('user-answer-input');
        const reviewNoteInput = document.getElementById('review-note-input');
        
        // 处理用户答案输入框
        if (userAnswerInput) {
            // 创建事件处理函数（保存引用以便移除）
            if (!this.userAnswerKeydownHandler) {
                this.userAnswerKeydownHandler = (e) => {
                    if (e.ctrlKey && e.key === 'Enter') {
                        e.preventDefault();
                        this.toggleAnswer();
                    }
                    
                    // 在输入框内时，阻止左右键事件冒泡
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                        e.stopPropagation(); // 阻止事件冒泡到document
                    }
                };
            }
            
            if (!this.userAnswerInputHandler) {
                this.userAnswerInputHandler = (e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.max(120, e.target.scrollHeight) + 'px';
                };
            }
            
            if (!this.userAnswerFocusHandler) {
                this.userAnswerFocusHandler = () => {
                    this.isInputFocused = true;
                };
            }
            
            if (!this.userAnswerBlurHandler) {
                this.userAnswerBlurHandler = () => {
                    this.isInputFocused = false;
                };
            }
            
            // 移除旧的事件监听器（如果存在）
            userAnswerInput.removeEventListener('keydown', this.userAnswerKeydownHandler);
            userAnswerInput.removeEventListener('input', this.userAnswerInputHandler);
            userAnswerInput.removeEventListener('focus', this.userAnswerFocusHandler);
            userAnswerInput.removeEventListener('blur', this.userAnswerBlurHandler);
            
            // 添加新的事件监听器
            userAnswerInput.addEventListener('keydown', this.userAnswerKeydownHandler);
            userAnswerInput.addEventListener('input', this.userAnswerInputHandler);
            userAnswerInput.addEventListener('focus', this.userAnswerFocusHandler);
            userAnswerInput.addEventListener('blur', this.userAnswerBlurHandler);
        }
        
        // 处理笔记输入框
        if (reviewNoteInput) {
            // 创建事件处理函数（保存引用以便移除）
            if (!this.noteKeydownHandler) {
                this.noteKeydownHandler = (e) => {
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                        e.stopPropagation(); // 阻止事件冒泡到document
                    }
                };
            }
            
            if (!this.noteFocusHandler) {
                this.noteFocusHandler = () => {
                    this.isInputFocused = true;
                };
            }
            
            if (!this.noteBlurHandler) {
                this.noteBlurHandler = () => {
                    this.isInputFocused = false;
                };
            }
            
            // 移除旧的事件监听器（如果存在）
            reviewNoteInput.removeEventListener('keydown', this.noteKeydownHandler);
            reviewNoteInput.removeEventListener('focus', this.noteFocusHandler);
            reviewNoteInput.removeEventListener('blur', this.noteBlurHandler);
            
            // 添加新的事件监听器
            reviewNoteInput.addEventListener('keydown', this.noteKeydownHandler);
            reviewNoteInput.addEventListener('focus', this.noteFocusHandler);
            reviewNoteInput.addEventListener('blur', this.noteBlurHandler);
        }
    }

    // 初始化复习页面
    initReview() {
        // 检查是否有活跃的复习会话（排除area-mode-select状态）
        const hasActiveSession = this.currentReviewList && 
                                this.currentReviewList.length > 0 && 
                                this.reviewMode &&
                                this.reviewMode !== 'area-mode-select';
        
        if (hasActiveSession) {
            console.log('检测到活跃复习会话，跳过复习页面初始化');
            console.log('活跃会话信息:', {
                reviewMode: this.reviewMode,
                listLength: this.currentReviewList.length,
                currentIndex: this.currentIndex
            });
            
            // 直接显示复习卡片而不是模式选择
            this.showReviewCard();
            this.loadCurrentKnowledge();
            return;
        }
        
        console.log('没有活跃会话，执行标准复习页面初始化');
        
        const reviewModes = document.getElementById('review-modes');
        const reviewCard = document.getElementById('review-card');
        const reviewProgress = document.querySelector('.review-progress');
        
        if (reviewModes) reviewModes.style.display = 'block';
        if (reviewCard) reviewCard.style.display = 'none';
        // 隐藏进度条，直到开始复习
        if (reviewProgress) reviewProgress.style.display = 'none';
        
        // 重新显示所有模式按钮
        const categoryBtn = document.getElementById('category-mode-btn');
        if (categoryBtn) {
            categoryBtn.style.display = 'inline-block';
        }
        
        // 重新绑定标准模式事件
        this.bindStandardModeEvents();
        
        this.resetReviewState();
    }

    // 绑定标准模式事件
    bindStandardModeEvents() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            // 移除旧的事件监听器
            btn.replaceWith(btn.cloneNode(true));
        });
        
        // 重新绑定标准事件
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.getAttribute('data-mode');
                this.startReview(mode);
            });
        });
    }

    // 重置复习状态
    resetReviewState() {
        this.currentReviewList = [];
        this.currentIndex = 0;
        this.currentKnowledge = null;
        this.reviewMode = null;
        this.startTime = null;
        this.isInputFocused = false;
        this.currentConfig = null;
        // 隐藏进度条
        this.hideProgress();
    }

    // ======================== 新的复习启动方法 ========================

    /**
     * 使用新的题目列表生成器开始复习
     * @param {Object} config 题目生成配置
     * @param {string} mode 复习模式标识
     */
    async startReviewWithConfig(config, mode = 'custom') {
        try {
            this.reviewMode = mode;
            this.currentConfig = config;
            
            // 使用新的题目列表生成器
            this.currentReviewList = await window.questionListGenerator.generateQuestionList(config);
            
            if (this.currentReviewList.length === 0) {
                window.app.showNotification('没有符合条件的题目', 'info');
                return;
            }

            this.currentIndex = 0;
            this.startTime = Date.now();
            this.showReviewCard();
            this.loadCurrentKnowledge();

            console.log(`开始复习: ${mode}模式, ${this.currentReviewList.length}道题目`);
            
        } catch (error) {
            console.error('开始复习失败:', error);
            window.app.showNotification(`复习启动失败: ${error.message}`, 'error');
        }
    }

    /**
     * 复习整个知识库
     * @param {string} baseId 知识库ID
     * @param {Object} options 选项
     */
    async reviewKnowledgeBase(baseId, options = {}) {
        const config = window.QuestionListTemplates.knowledgeBaseReview(baseId, options);
        await this.startReviewWithConfig(config, `knowledge-base-${baseId}`);
    }

    /**
     * 复习知识区
     * @param {string} areaId 知识区ID
     * @param {Object} options 选项
     */
    async reviewKnowledgeArea(areaId, options = {}) {
        console.log(`=== 复习知识区 ===`);
        console.log(`知识区ID: ${areaId}`);
        console.log('复习选项:', options);
        
        // 使用新的查找方法获取知识区信息
        const areaInfo = window.storageManager.findKnowledgeAreaById(areaId);
        if (!areaInfo) {
            const error = `知识区 ${areaId} 不存在`;
            console.error(error);
            throw new Error(error);
        }
        
        const area = areaInfo.area;
        const knowledgeBase = areaInfo.knowledgeBase;
        
        console.log(`目标知识区: ${area.name}`);
        console.log(`所属知识库: ${knowledgeBase.name}`);
        
        // 预检查知识区中的知识点数量
        const allKnowledge = window.storageManager.getAllKnowledge();
        const areaPoints = allKnowledge.filter(point => point.areaId === areaId);
        console.log(`预检查知识区 ${area.name} 中有 ${areaPoints.length} 个知识点`);
        
        if (areaPoints.length === 0) {
            const message = `知识区 "${area.name}" 中没有知识点，无法开始复习`;
            console.warn(message);
            window.app.showNotification(message, 'warning');
            return;
        }

        // 🔧 新增：清理旧的复习状态，确保状态转换的完整性
        console.log('清理旧的复习状态...');
        this.currentReviewList = [];
        this.currentIndex = 0;
        this.currentKnowledge = null;
        
        // 设置知识区复习准备状态，等待用户选择模式
        this.reviewMode = 'area-mode-select';
        this.currentAreaId = areaId;
        this.currentAreaOptions = options;
        this.startTime = Date.now();
        
        // 显示知识区复习模式选择界面
        this.showAreaReviewModes();
        
        console.log(`知识区复习准备完成，等待用户选择复习模式`);
    }

    /**
     * 智能复习
     * @param {Object} options 复习选项
     */
    async smartReview(options = {}) {
        const config = window.QuestionListTemplates.smartReview(options);
        await this.startReviewWithConfig(config, 'smart-review');
    }

    /**
     * 复习知识库的所有错题
     * @param {string} baseId 知识库ID
     * @param {Object} options 选项
     */
    async reviewMistakesByBase(baseId, options = {}) {
        const config = window.QuestionListTemplates.mistakeReviewByBase(baseId, options);
        await this.startReviewWithConfig(config, `mistakes-base-${baseId}`);
    }

    /**
     * 复习知识区的所有错题
     * @param {string} areaId 知识区ID
     * @param {Object} options 选项
     */
    async reviewMistakesByArea(areaId, options = {}) {
        const config = window.QuestionListTemplates.mistakeReviewByArea(areaId, options);
        await this.startReviewWithConfig(config, `mistakes-area-${areaId}`);
    }

    /**
     * 复习所有错题
     * @param {Object} options 选项
     */
    async reviewAllMistakes(options = {}) {
        const config = window.QuestionListTemplates.allMistakesReview(options);
        await this.startReviewWithConfig(config, 'all-mistakes');
    }

    /**
     * 弱项强化复习
     * @param {Object} options 选项
     */
    async reviewWeakness(options = {}) {
        const config = window.QuestionListTemplates.weaknessReview(options);
        await this.startReviewWithConfig(config, 'weakness-review');
    }

    /**
     * 自定义复习（通过配置对象）
     * @param {Object} customConfig 自定义配置
     */
    async customReview(customConfig) {
        await this.startReviewWithConfig(customConfig, 'custom');
    }

    // ======================== 兼容旧版本的方法 ========================

    // 开始复习（兼容旧版本）
    startReview(mode) {
        // 如果是分类复习，跳转到知识管理页面
        if (mode === 'category') {
            window.app.showSection('knowledge');
            window.app.showNotification('请在知识管理页面选择要复习的知识区', 'info');
            return;
        }

        // 使用传统方法进行简单复习
        this.reviewMode = mode;
        this.currentReviewList = this.getReviewList(mode);
        
        if (this.currentReviewList.length === 0) {
            window.app.showNotification('暂无需要复习的知识点', 'info');
            return;
        }

        // 根据模式打乱顺序
        if (mode === 'random') {
            this.currentReviewList = Utils.shuffleArray(this.currentReviewList);
        }

        this.currentIndex = 0;
        this.startTime = Date.now();
        this.showReviewCard();
        this.loadCurrentKnowledge();
    }

    // 获取复习列表（简化版，保持向后兼容）
    getReviewList(mode) {
        const allKnowledge = window.storageManager.getAllKnowledge();
        const now = new Date();

        switch (mode) {
            case 'scheduled':
                // 顺序复习：返回到期需要复习的知识点，如果没有则返回所有知识点
                const scheduledKnowledge = allKnowledge.filter(k => {
                    const nextReview = new Date(k.nextReview);
                    return nextReview <= now;
                });
                return scheduledKnowledge.length > 0 ? scheduledKnowledge : [...allKnowledge];
            
            case 'random':
                // 随机复习：返回所有知识点
                return [...allKnowledge];
            
            default:
                return [];
        }
    }

    // 开始复习
    startSingleReview(knowledgeId) {
        const knowledge = window.storageManager.getKnowledgeById(knowledgeId);
        if (!knowledge) return;

        this.reviewMode = 'single';
        this.currentReviewList = [knowledge];
        this.currentIndex = 0;
        this.startTime = Date.now();
        this.showReviewCard();
        this.loadCurrentKnowledge();
    }

    // 开始错题复习
    startMistakeReview() {
        // 调用新的错题复习方法
        this.startAllMistakesReview();
    }

    // 显示复习卡片
    showReviewCard() {
        const reviewModes = document.getElementById('review-modes');
        const reviewCard = document.getElementById('review-card');
        const reviewProgress = document.querySelector('.review-progress');
        
        if (reviewModes) reviewModes.style.display = 'none';
        if (reviewCard) reviewCard.style.display = 'block';
        // 显示进度条
        if (reviewProgress) reviewProgress.style.display = 'block';
        
        // 初始化导航按钮状态
        this.updateNavigationButtons();
    }

    // 加载当前知识点
    loadCurrentKnowledge() {
        if (this.currentIndex >= this.currentReviewList.length) {
            this.completeReview();
            return;
        }

        this.currentKnowledge = this.currentReviewList[this.currentIndex];
        this.renderCurrentQuestion();
        this.updateProgress();
        this.updateNavigationButtons();
    }

    // 渲染当前题目
    renderCurrentQuestion() {
        if (!this.currentKnowledge) return;

        const questionText = document.getElementById('question-text');
        const answerText = document.getElementById('answer-text');
        const explanationText = document.getElementById('explanation-text');
        const answerSection = document.getElementById('answer-section');
        const showAnswerBtn = document.getElementById('show-answer-btn');
        const ratingButtons = document.getElementById('rating-buttons');
        const scoreSection = document.getElementById('score-section');
        const userAnswerInput = document.getElementById('user-answer-input');
        const reviewNoteInput = document.getElementById('review-note-input');
        const noteContent = document.getElementById('note-content');
        const toggleNoteBtn = document.getElementById('toggle-note-btn');

        if (questionText) {
            questionText.innerHTML = this.formatContent(this.currentKnowledge.question);
        }

        // 预设答案内容（但不显示）
        if (answerText) {
            answerText.innerHTML = this.formatContent(this.currentKnowledge.answer);
        }

        if (explanationText) {
            if (this.currentKnowledge.explanation) {
                explanationText.innerHTML = this.formatContent(this.currentKnowledge.explanation);
                explanationText.style.display = 'block';
            } else {
                explanationText.style.display = 'none';
            }
        }

        // 清空用户答案输入框
        if (userAnswerInput) {
            userAnswerInput.value = '';
        }

        // 初始化笔记区域
        if (reviewNoteInput) {
            reviewNoteInput.value = this.currentKnowledge.note || '';
        }
        
        // 默认收起笔记
        if (noteContent) {
            noteContent.classList.add('collapsed');
        }
        if (toggleNoteBtn) {
            toggleNoteBtn.textContent = '展开';
        }

        // 隐藏答案区域、评分按钮和评分区域，重置按钮状态
        if (answerSection) answerSection.style.display = 'none';
        if (showAnswerBtn) {
            showAnswerBtn.style.display = 'block';
            showAnswerBtn.textContent = '显示答案';
            showAnswerBtn.setAttribute('data-state', 'hidden');
        }
        if (ratingButtons) ratingButtons.style.display = 'none';
        if (scoreSection) scoreSection.style.display = 'none';
        
        // 更新导航按钮状态
        this.updateNavigationButtons();
        
        // 重新绑定用户输入事件，确保笔记输入框的键盘事件处理生效
        this.bindUserAnswerEvents();
    }

    // 显示答案
    showAnswer() {
        const answerSection = document.getElementById('answer-section');
        const ratingButtons = document.getElementById('rating-buttons');
        const scoreSection = document.getElementById('score-section');
        const showAnswerBtn = document.getElementById('show-answer-btn');
        
        if (answerSection) {
            answerSection.style.display = 'block';
        }
        
        if (ratingButtons) {
            ratingButtons.style.display = 'flex';
        }
        
        // 显示评分区域
        if (scoreSection) {
            scoreSection.style.display = 'block';
            // 如果知识点已有评分，显示在输入框中
            const scoreInput = document.getElementById('score-input');
            if (scoreInput && this.currentKnowledge && this.currentKnowledge.score) {
                scoreInput.value = this.currentKnowledge.score;
            }
        }
        
        if (showAnswerBtn) {
            showAnswerBtn.textContent = '隐藏答案';
            showAnswerBtn.setAttribute('data-state', 'shown');
        }
        
        // 滚动到答案区域
        setTimeout(() => {
            answerSection?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }

    // 隐藏答案
    hideAnswer() {
        const answerSection = document.getElementById('answer-section');
        const ratingButtons = document.getElementById('rating-buttons');
        const scoreSection = document.getElementById('score-section');
        const showAnswerBtn = document.getElementById('show-answer-btn');
        
        if (answerSection) {
            answerSection.style.display = 'none';
        }
        
        if (ratingButtons) {
            ratingButtons.style.display = 'none';
        }
        
        // 隐藏评分区域
        if (scoreSection) {
            scoreSection.style.display = 'none';
        }
        
        if (showAnswerBtn) {
            showAnswerBtn.textContent = '显示答案';
            showAnswerBtn.setAttribute('data-state', 'hidden');
        }
    }

    // 切换答案显示状态
    toggleAnswer() {
        const answerSection = document.getElementById('answer-section');
        
        // 通过检查答案区域的显示状态来判断当前状态
        if (answerSection && answerSection.style.display === 'block') {
            this.hideAnswer();
        } else {
            this.showAnswer();
        }
    }

    // 提交评分
    submitRating(rating) {
        if (!this.currentKnowledge) return;

        // 新的评分标准：1=错误，2=模糊，3=正确
        const isCorrect = rating === 3; // 只有"正确"才算正确
        const isMistake = rating === 1; // 只有"错误"才算错题
        const timeSpent = Date.now() - this.startTime;
        
        // 获取用户输入的答案
        const userAnswerInput = document.getElementById('user-answer-input');
        const userAnswer = userAnswerInput ? userAnswerInput.value.trim() : '';

        // 更新知识点的复习数据
        this.updateKnowledgeReviewData(this.currentKnowledge.id, rating, isCorrect);

        // 记录复习历史
        window.storageManager.addReviewRecord(this.currentKnowledge.id, {
            isCorrect: isCorrect,
            difficulty: rating,
            timeSpent: timeSpent,
            selfEvaluation: this.getRatingText(rating),
            response: this.getRatingText(rating),
            userAnswer: userAnswer // 添加用户答案记录
        });

        // 如果自评为错误，添加到错题本
        if (isMistake) {
            const success = window.storageManager.addMistake(this.currentKnowledge.id, {
                reason: `用户答案: ${userAnswer || '未填写'}`
            });
            console.log('添加错题:', this.currentKnowledge.id, '成功:', success);
            if (success) {
                window.app.showNotification('已添加到错题本', 'warning');
            }
        }

        // 进入下一题
        this.nextQuestion();
    }

    // 获取评分文本
    getRatingText(rating) {
        switch(rating) {
            case 1: return '错误';
            case 2: return '模糊';
            case 3: return '正确';
            default: return '未知';
        }
    }

    // 更新知识点复习数据
    updateKnowledgeReviewData(knowledgeId, rating, isCorrect) {
        const knowledge = window.storageManager.getKnowledgeById(knowledgeId);
        if (!knowledge) return;

        // 使用改进的SM-2算法计算下次复习时间
        const reviewData = this.calculateNextReview(
            knowledge.easeFactor || 2.5,
            knowledge.interval || 1,
            rating
        );

        // 更新知识点数据
        const updates = {
            reviewCount: knowledge.reviewCount + 1,
            correctCount: knowledge.correctCount + (isCorrect ? 1 : 0),
            lastReviewed: Date.now(),
            nextReview: reviewData.nextReview,
            interval: reviewData.interval,
            easeFactor: reviewData.easeFactor
        };

        window.storageManager.updateKnowledge(knowledgeId, updates);
    }

    // 计算下次复习时间（改进的SM-2算法）
    calculateNextReview(easeFactor, interval, quality) {
        // quality: 1=错误, 2=模糊, 3=正确
        
        if (quality === 1) {
            // 自评错误：大幅降低熟悉因子，立即重新复习
            return {
                interval: 1,
                easeFactor: Math.max(1.3, easeFactor - 0.3), // 更大的惩罚
                nextReview: Date.now() + 6 * 60 * 60 * 1000 // 6小时后复习
            };
        } else if (quality === 2) {
            // 自评模糊：轻微降低熟悉因子，短期内复习
            return {
                interval: Math.max(1, Math.round(interval * 0.6)), // 缩短间隔
                easeFactor: Math.max(1.3, easeFactor - 0.1), // 轻微惩罚
                nextReview: Date.now() + Math.max(1, Math.round(interval * 0.6)) * 24 * 60 * 60 * 1000
            };
        } else {
            // 自评正确：提高熟悉因子，按正常间隔复习
            const newEaseFactor = Math.min(3.0, easeFactor + 0.15); // 奖励，但有上限
            
            let newInterval;
            if (interval === 1) {
                newInterval = 3; // 第一次正确后3天复习
            } else if (interval < 6) {
                newInterval = 6; // 短期内正确后6天复习
            } else {
                newInterval = Math.round(interval * newEaseFactor);
            }

            return {
                interval: newInterval,
                easeFactor: newEaseFactor,
                nextReview: Date.now() + newInterval * 24 * 60 * 60 * 1000
            };
        }
    }

    // 下一题
    nextQuestion() {
        this.currentIndex++;
        this.startTime = Date.now();
        
        // 减少延迟时间，提升响应速度
        setTimeout(() => {
            this.loadCurrentKnowledge();
        }, 300);
    }

    // 上一题导航
    previousQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.startTime = Date.now();
            this.loadCurrentKnowledge();
        }
    }

    // 下一题导航（不自动提交评分）
    goToNextQuestion() {
        if (this.currentIndex < this.currentReviewList.length - 1) {
            this.currentIndex++;
            this.startTime = Date.now();
            this.loadCurrentKnowledge();
        }
    }

    // 完成复习
    completeReview() {
        const reviewCard = document.getElementById('review-card');
        const reviewModes = document.getElementById('review-modes');
        const reviewProgress = document.querySelector('.review-progress');

        if (reviewCard) reviewCard.style.display = 'none';
        
        // 显示完成信息
        const completedCount = this.currentReviewList.length;
        window.app.showNotification(`恭喜！已完成 ${completedCount} 个知识点的复习`, 'success');

        // 根据复习模式决定完成后的行为
        if (this.reviewMode === 'all-mistakes' || this.reviewMode === 'area-mistakes') {
            // 错题复习完成后，返回错题本页面
            window.app.showSection('mistakes');
            // 重新加载错题列表以反映最新状态
            if (window.reviewManager && window.reviewManager.loadMistakes) {
                setTimeout(() => {
                    window.reviewManager.loadMistakes();
                }, 300);
            }
        } else if (this.reviewMode && this.reviewMode.startsWith('area-')) {
            // 知识区复习完成后，返回知识管理页面
            window.app.showSection('knowledge');
        } else {
            // 普通复习完成后，显示复习模式选择
            if (reviewModes) reviewModes.style.display = 'block';
            
            // 重新显示所有模式按钮
            const categoryBtn = document.getElementById('category-mode-btn');
            if (categoryBtn) {
                categoryBtn.style.display = 'inline-block';
            }
            
            // 重新绑定标准模式事件
            this.bindStandardModeEvents();
        }

        // 隐藏进度条
        if (reviewProgress) reviewProgress.style.display = 'none';

        // 重置状态
        this.resetReviewState();

        // 更新仪表板数据
        if (window.app) {
            window.app.loadDashboard();
        }
    }

    // 更新进度
    updateProgress() {
        const progressFill = document.getElementById('review-progress');
        const progressText = document.getElementById('progress-text');
        const reviewProgress = document.querySelector('.review-progress');

        // 如果没有复习列表，隐藏进度条
        if (this.currentReviewList.length === 0) {
            if (reviewProgress) reviewProgress.style.display = 'none';
            if (progressFill) progressFill.style.width = '0%';
            if (progressText) progressText.textContent = '0/0';
            return;
        }

        // 显示进度条并更新内容
        if (reviewProgress) reviewProgress.style.display = 'block';

        const progress = (this.currentIndex / this.currentReviewList.length) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${this.currentIndex}/${this.currentReviewList.length}`;
        }
    }

    // 隐藏进度条
    hideProgress() {
        const reviewProgress = document.querySelector('.review-progress');
        if (reviewProgress) {
            reviewProgress.style.display = 'none';
        }
    }

    // 格式化内容（支持简单的Markdown）
    formatContent(content) {
        if (!content) return '';
        
        // 简单的Markdown支持
        let formatted = content;
        
        // 粗体
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // 斜体
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // 代码
        formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
        
        // 换行
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }

    // 加载错题列表
    loadMistakes() {
        this.loadMistakesOverview();
        this.loadMistakesTabs();
        this.loadAllMistakes();
        this.bindMistakesEvents();
    }

    // 加载错题概览
    loadMistakesOverview() {
        const mistakes = window.storageManager.getMistakes();
        const overviewContainer = document.getElementById('mistakes-overview');
        
        if (!overviewContainer) return;

        const totalMistakes = mistakes.filter(m => !m.isResolved).length;
        const resolvedMistakes = mistakes.filter(m => m.isResolved).length;
        const mostFrequentMistake = mistakes.reduce((max, m) => m.count > max.count ? m : max, { count: 0 });
        
        // 按知识区统计
        const mistakesByArea = this.groupMistakesByArea(mistakes);
        const areaCount = Object.keys(mistakesByArea).length;

        overviewContainer.innerHTML = `
            <div class="overview-grid">
                <div class="overview-item">
                    <div class="overview-number">${totalMistakes}</div>
                    <div class="overview-label">待复习错题</div>
                </div>
                <div class="overview-item">
                    <div class="overview-number">${resolvedMistakes}</div>
                    <div class="overview-label">已掌握错题</div>
                </div>
                <div class="overview-item">
                    <div class="overview-number">${areaCount}</div>
                    <div class="overview-label">涉及知识区</div>
                </div>
                <div class="overview-item">
                    <div class="overview-number">${mostFrequentMistake.count}</div>
                    <div class="overview-label">最高错误次数</div>
                </div>
            </div>
        `;
    }

    // 按知识区分组错题
    groupMistakesByArea(mistakes) {
        const mistakesByArea = {};
        
        mistakes.filter(m => !m.isResolved).forEach(mistake => {
            const knowledge = window.storageManager.getKnowledgeById(mistake.knowledgeId);
            if (!knowledge) return;
            
            const area = knowledge.area || '未分类';
            if (!mistakesByArea[area]) {
                mistakesByArea[area] = [];
            }
            mistakesByArea[area].push({ ...mistake, knowledge });
        });
        
        return mistakesByArea;
    }

    // 加载分类标签
    loadMistakesTabs() {
        const mistakes = window.storageManager.getMistakes();
        const tabsContainer = document.getElementById('mistakes-filter-tabs');
        
        if (!tabsContainer) return;

        const mistakesByArea = this.groupMistakesByArea(mistakes);
        const areas = Object.keys(mistakesByArea);
        
        let tabsHtml = '<button class="filter-tab active" data-area="all">全部错题</button>';
        
        areas.forEach(area => {
            const count = mistakesByArea[area].length;
            tabsHtml += `
                <button class="filter-tab" data-area="${Utils.escapeHtml(area)}">
                    ${Utils.escapeHtml(area)} (${count})
                </button>
            `;
        });
        
        tabsContainer.innerHTML = tabsHtml;
    }

    // 加载所有错题视图
    loadAllMistakes() {
        const mistakes = window.storageManager.getMistakes();
        const mistakesList = document.getElementById('mistakes-list-all');
        
        if (!mistakesList) return;

        const activeMistakes = mistakes.filter(m => !m.isResolved);
        
        if (activeMistakes.length === 0) {
            mistakesList.innerHTML = `
                <div class="mistakes-empty">
                    <div class="icon">🎉</div>
                    <h3>暂无错题</h3>
                    <p>继续学习，保持良好的正确率！</p>
                </div>
            `;
            return;
        }

        // 渲染错题列表
        const mistakesHtml = activeMistakes.map(mistake => this.renderMistakeCard(mistake)).join('');
        mistakesList.innerHTML = mistakesHtml;
    }

    // 加载按知识区分类的错题视图
    loadMistakesByArea() {
        const mistakes = window.storageManager.getMistakes();
        const mistakesAreas = document.getElementById('mistakes-areas');
        
        if (!mistakesAreas) return;

        const mistakesByArea = this.groupMistakesByArea(mistakes);
        const areas = Object.keys(mistakesByArea);
        
        if (areas.length === 0) {
            mistakesAreas.innerHTML = `
                <div class="mistakes-empty">
                    <div class="icon">🎉</div>
                    <h3>暂无错题</h3>
                    <p>继续学习，保持良好的正确率！</p>
                </div>
            `;
            return;
        }

        const areasHtml = areas.map(area => {
            const areaMistakes = mistakesByArea[area];
            const mistakesHtml = areaMistakes.map(item => this.renderMistakeCard(item)).join('');
            
            return `
                <div class="mistake-area-group">
                    <div class="mistake-area-header">
                        <div class="area-title-with-count">
                            <div class="area-title">${Utils.escapeHtml(area)}</div>
                            <div class="mistakes-count-badge">${areaMistakes.length} 道错题</div>
                        </div>
                        <button class="area-review-btn" onclick="window.reviewManager.reviewAreaMistakes('${Utils.escapeHtml(area)}')">
                            复习本区错题
                        </button>
                    </div>
                    <div class="mistake-area-content">
                        ${mistakesHtml}
                    </div>
                </div>
            `;
        }).join('');
        
        mistakesAreas.innerHTML = areasHtml;
    }

    // 绑定错题本事件
    bindMistakesEvents() {
        // 绑定分类标签事件
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // 移除所有活动状态
                filterTabs.forEach(t => t.classList.remove('active'));
                // 添加当前活动状态
                e.target.classList.add('active');
                
                const area = e.target.dataset.area;
                this.switchMistakesView(area);
            });
        });

        // 复习所有错题按钮
        const reviewAllBtn = document.getElementById('review-all-mistakes');
        if (reviewAllBtn) {
            reviewAllBtn.onclick = () => this.startAllMistakesReview();
        }

        // 清除已掌握错题按钮
        const clearResolvedBtn = document.getElementById('clear-resolved-mistakes');
        if (clearResolvedBtn) {
            clearResolvedBtn.onclick = () => this.clearResolvedMistakes();
        }
    }

    // 切换错题视图
    switchMistakesView(area) {
        const allView = document.getElementById('mistakes-view-all');
        const areasView = document.getElementById('mistakes-areas');
        
        if (area === 'all') {
            // 显示所有错题
            if (allView) {
                allView.classList.add('active');
                allView.style.display = 'block';
            }
            if (areasView) {
                areasView.classList.remove('active');
                areasView.style.display = 'none';
            }
            this.loadAllMistakes();
        } else {
            // 显示特定知识区错题
            if (allView) {
                allView.classList.remove('active');
                allView.style.display = 'none';
            }
            if (areasView) {
                areasView.classList.add('active');
                areasView.style.display = 'block';
            }
            this.loadSpecificAreaMistakes(area);
        }
    }

    // 加载特定知识区的错题
    loadSpecificAreaMistakes(targetArea) {
        const mistakes = window.storageManager.getMistakes();
        const mistakesAreas = document.getElementById('mistakes-areas');
        
        if (!mistakesAreas) return;

        const mistakesByArea = this.groupMistakesByArea(mistakes);
        const areaMistakes = mistakesByArea[targetArea] || [];
        
        if (areaMistakes.length === 0) {
            mistakesAreas.innerHTML = `
                <div class="mistakes-empty">
                    <div class="icon">🎯</div>
                    <h3>${Utils.escapeHtml(targetArea)} - 暂无错题</h3>
                    <p>该知识区没有错题记录，学习情况良好！</p>
                </div>
            `;
            return;
        }

        const mistakesHtml = areaMistakes.map(item => this.renderMistakeCard(item)).join('');
        
        mistakesAreas.innerHTML = `
            <div class="mistake-area-group">
                <div class="mistake-area-header">
                    <div class="area-title-with-count">
                        <div class="area-title">${Utils.escapeHtml(targetArea)}</div>
                        <div class="mistakes-count-badge">${areaMistakes.length} 道错题</div>
                    </div>
                    <button class="area-review-btn" onclick="window.reviewManager.reviewAreaMistakes('${Utils.escapeHtml(targetArea)}')">
                        复习本区错题
                    </button>
                </div>
                <div class="mistake-area-content">
                    ${mistakesHtml}
                </div>
            </div>
        `;
    }

    // 开始复习所有错题
    async startAllMistakesReview() {
        await this.reviewAllMistakes({ random: true });
    }

    // 开始复习特定知识区的错题
    async reviewAreaMistakes(areaIdentifier) {
        // areaIdentifier 可能是区域名称或区域ID，需要转换为区域ID
        let areaId = areaIdentifier;
        
        // 如果传入的是区域名称，需要转换为区域ID
        if (areaIdentifier.startsWith('第')) {
            // 建立名称到ID的映射
            const nameToIdMap = {
                '第一章 国防概述': 'area_defense',
                '第二章 国家安全': 'area_security', 
                '第三章 军事思想': 'area_thought',
                '第四章 现代战争': 'area_war',
                '第五章 信息化装备': 'area_equipment'
            };
            areaId = nameToIdMap[areaIdentifier] || areaIdentifier;
        }
        
        await this.reviewMistakesByArea(areaId, { random: true });
    }

    // 清除已掌握的错题记录
    clearResolvedMistakes() {
        const mistakes = window.storageManager.getMistakes();
        const resolvedCount = mistakes.filter(m => m.isResolved).length;
        
        if (resolvedCount === 0) {
            window.app.showNotification('没有已掌握的错题记录', 'info');
            return;
        }

        window.app.showConfirm(
            `确定要清除 ${resolvedCount} 条已掌握的错题记录吗？此操作不可撤销。`,
            () => {
                const data = window.storageManager.getData();
                if (data) {
                    data.mistakes = data.mistakes.filter(m => !m.isResolved);
                    const success = window.storageManager.setData(data);
                    
                    if (success) {
                        this.loadMistakes(); // 重新加载错题列表
                        window.app.showNotification(`已清除 ${resolvedCount} 条已掌握的错题记录`, 'success');
                        
                        // 更新仪表板数据
                        if (window.app) {
                            window.app.loadDashboard();
                        }
                    } else {
                        window.app.showNotification('清除失败，请重试', 'error');
                    }
                }
            }
        );
    }

    // 渲染错题卡片
    renderMistakeCard(mistake) {
        const knowledge = window.storageManager.getKnowledgeById(mistake.knowledgeId);
        if (!knowledge) return '';

        return `
            <div class="mistake-card">
                <div class="mistake-card-header">
                    <div class="mistake-count">错误 ${mistake.count} 次</div>
                    <div class="mistake-date">
                        最近错误: ${Utils.formatDate(mistake.lastMistakeDate)}
                    </div>
                </div>
                <div class="knowledge-card-title">
                    <h4>${Utils.escapeHtml(Utils.truncateText(knowledge.question, 100))}</h4>
                </div>
                <div class="knowledge-card-actions">
                    <button class="btn btn-primary" onclick="window.reviewManager.reviewMistake('${mistake.knowledgeId}')">
                        复习
                    </button>
                    <button class="btn btn-success" onclick="window.reviewManager.resolveMistake('${mistake.knowledgeId}')">
                        标记已掌握
                    </button>
                    <button class="btn btn-danger" onclick="window.reviewManager.deleteMistake('${mistake.knowledgeId}')">
                        删除
                    </button>
                </div>
            </div>
        `;
    }

    // 复习单个错题
    reviewMistake(knowledgeId) {
        this.startSingleReview(knowledgeId);
    }

    // 标记错题为已解决
    resolveMistake(knowledgeId) {
        const success = window.storageManager.resolveMistake(knowledgeId);
        if (success) {
            this.loadMistakes();
            window.app.showNotification('已标记为已掌握', 'success');
            
            // 更新仪表板数据
            if (window.app) {
                window.app.loadDashboard();
            }
        }
    }

    // 删除错题记录
    deleteMistake(knowledgeId) {
        window.app.showConfirm(
            '确定要删除这个错题记录吗？',
            () => {
                const success = window.storageManager.deleteMistake(knowledgeId);
                if (success) {
                    this.loadMistakes();
                    window.app.showNotification('错题记录已删除', 'success');
                    
                    // 更新仪表板数据
                    if (window.app) {
                        window.app.loadDashboard();
                    }
                }
            }
        );
    }

    // 获取复习统计
    getReviewStats() {
        const knowledge = window.storageManager.getAllKnowledge();
        const reviewHistory = window.storageManager.getReviewHistory();
        const mistakes = window.storageManager.getMistakes();

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        return {
            totalKnowledge: knowledge.length,
            todayReviews: reviewHistory.filter(r => new Date(r.reviewDate) >= today).length,
            totalReviews: reviewHistory.length,
            correctRate: reviewHistory.length > 0 ? 
                Utils.percentage(reviewHistory.filter(r => r.isCorrect).length, reviewHistory.length) : 0,
            mistakeCount: mistakes.filter(m => !m.isResolved).length,
            masteredCount: knowledge.filter(k => 
                k.reviewCount >= 5 && k.correctCount / k.reviewCount >= 0.8
            ).length,
            needReview: knowledge.filter(k => {
                const nextReview = new Date(k.nextReview);
                return nextReview <= now;
            }).length
        };
    }

    // 设置自定义复习列表（重构为使用新生成器）
    async setCustomReviewList(knowledgeList, startMode = 'scheduled') {
        if (!knowledgeList || knowledgeList.length === 0) {
            window.app.showNotification('没有可复习的知识点', 'warning');
            return;
        }
        
        // 创建自定义配置
        const config = {
            source: {
                type: 'custom-list',
                params: { knowledgeIds: knowledgeList.map(k => k.id) }
            },
            sorter: {
                type: startMode === 'random' ? 'random' : 'by-created-time'
            }
        };
        
        await this.startReviewWithConfig(config, 'area-custom');
    }

    // 设置知识区复习模式（用于知识区内的模式切换）
    // @deprecated 此方法已被弃用，请使用 reviewKnowledgeArea() 方法
    setAreaReviewMode(knowledgeList) {
        if (!knowledgeList || knowledgeList.length === 0) {
            window.app.showNotification('没有可复习的知识点', 'warning');
            return;
        }
        
        this.reviewMode = 'area-mode-select';
        this.currentReviewList = [...knowledgeList];
        this.currentIndex = 0;
        this.startTime = Date.now();
        
        // 显示特殊的知识区复习模式选择界面
        this.showAreaReviewModes();
        
        console.log(`准备知识区复习，共 ${knowledgeList.length} 个知识点`);
    }

    // 显示知识区复习模式选择
    showAreaReviewModes() {
        const reviewModes = document.getElementById('review-modes');
        const reviewCard = document.getElementById('review-card');
        const categoryBtn = document.getElementById('category-mode-btn');
        const reviewProgress = document.querySelector('.review-progress');
        
        if (reviewModes) reviewModes.style.display = 'block';
        if (reviewCard) reviewCard.style.display = 'none';
        // 隐藏进度条，直到选择模式开始复习
        if (reviewProgress) reviewProgress.style.display = 'none';
        
        // 隐藏分类复习按钮
        if (categoryBtn) {
            categoryBtn.style.display = 'none';
        }
        
        // 绑定知识区专用的模式事件
        this.bindAreaModeEvents();
    }

    // 绑定知识区模式事件
    bindAreaModeEvents() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            // 移除旧的事件监听器
            btn.replaceWith(btn.cloneNode(true));
        });
        
        // 重新绑定事件
        document.querySelectorAll('.mode-btn:not(#category-mode-btn)').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const mode = e.target.getAttribute('data-mode');
                await this.startAreaReviewWithMode(mode);
            });
        });
    }

    // 开始知识区复习（使用统一的复习机制）
    async startAreaReviewWithMode(mode) {
        if (!this.currentAreaId) {
            window.app.showNotification('无法确定知识区，请重新选择', 'error');
            return;
        }

        try {
            console.log(`开始知识区复习，模式: ${mode}`);
            
            // 根据模式设置复习选项
            const reviewOptions = {
                ...this.currentAreaOptions,
                random: mode === 'random',
                limit: null  // 不限制题目数量
            };

            console.log('最终复习选项:', reviewOptions);

            // 使用统一的题目列表生成器启动复习
            const config = window.QuestionListTemplates.knowledgeAreaReview(this.currentAreaId, reviewOptions);
            console.log('生成的复习配置:', config);
            
            await this.startReviewWithConfig(config, `knowledge-area-${this.currentAreaId}-${mode}`);
            
        } catch (error) {
            console.error('启动知识区复习失败:', error);
            window.app.showNotification(`启动复习失败: ${error.message}`, 'error');
        }
    }

    // 更新导航按钮状态
    updateNavigationButtons() {
        const prevQuestionBtn = document.getElementById('prev-question-btn');
        const nextQuestionBtn = document.getElementById('next-question-btn');

        if (prevQuestionBtn) {
            prevQuestionBtn.disabled = this.currentIndex === 0;
        }
        if (nextQuestionBtn) {
            nextQuestionBtn.disabled = this.currentIndex === this.currentReviewList.length - 1;
        }
    }

    // 切换笔记显示状态
    toggleNote() {
        const noteContent = document.getElementById('note-content');
        const toggleBtn = document.getElementById('toggle-note-btn');
        
        if (noteContent && toggleBtn) {
            const isCollapsed = noteContent.classList.contains('collapsed');
            
            if (isCollapsed) {
                noteContent.classList.remove('collapsed');
                toggleBtn.textContent = '收起';
            } else {
                noteContent.classList.add('collapsed');
                toggleBtn.textContent = '展开';
            }
        }
    }

    // 更新当前知识点的笔记
    updateCurrentNote(note) {
        if (!this.currentKnowledge) return;
        
        const success = window.storageManager.updateKnowledgeNote(this.currentKnowledge.id, note);
        if (success) {
            this.currentKnowledge.note = note;
            window.app.showNotification('笔记已保存', 'success', 1000);
        } else {
            window.app.showNotification('笔记保存失败', 'error');
        }
    }

    // 更新当前知识点的评分
    updateCurrentScore(score) {
        if (!this.currentKnowledge) return;
        
        const numScore = parseInt(score);
        if (isNaN(numScore) || numScore < 1 || numScore > 5) {
            window.app.showNotification('评分必须在1-5之间', 'warning');
            return;
        }
        
        const success = window.storageManager.updateKnowledgeScore(this.currentKnowledge.id, numScore);
        if (success) {
            this.currentKnowledge.score = numScore;
            window.app.showNotification(`评分已更新：${numScore}/5`, 'success', 1000);
        } else {
            window.app.showNotification('评分保存失败', 'error');
        }
    }

    // ======================== 复习会话管理 ========================

    /**
     * 获取当前复习会话信息
     */
    getCurrentSessionInfo() {
        return {
            mode: this.reviewMode,
            config: this.currentConfig,
            totalQuestions: this.currentReviewList.length,
            currentIndex: this.currentIndex,
            completed: this.currentIndex,
            remaining: this.currentReviewList.length - this.currentIndex,
            progress: this.currentReviewList.length > 0 ? 
                (this.currentIndex / this.currentReviewList.length * 100).toFixed(1) : 0,
            startTime: this.startTime,
            currentQuestion: this.currentKnowledge
        };
    }

    /**
     * 重新生成当前配置的题目列表（用于刷新）
     */
    async refreshCurrentSession() {
        if (!this.currentConfig) {
            window.app.showNotification('没有可刷新的复习会话', 'warning');
            return;
        }

        try {
            const newList = await window.questionListGenerator.generateQuestionList(this.currentConfig);
            
            if (newList.length === 0) {
                window.app.showNotification('刷新后没有题目', 'info');
                return;
            }

            this.currentReviewList = newList;
            this.currentIndex = 0;
            this.loadCurrentKnowledge();
            this.updateProgress();
            
            window.app.showNotification(`已刷新题目列表，共${newList.length}道题目`, 'success');
            
        } catch (error) {
            console.error('刷新复习会话失败:', error);
            window.app.showNotification(`刷新失败: ${error.message}`, 'error');
        }
    }

    /**
     * 获取复习统计（增强版）
     */
    getEnhancedReviewStats() {
        const basicStats = this.getReviewStats();
        const sessionInfo = this.getCurrentSessionInfo();
        
        return {
            ...basicStats,
            currentSession: sessionInfo,
            generationCapabilities: {
                availableStrategies: Array.from(window.questionListGenerator.strategies.keys()),
                availableFilters: Array.from(window.questionListGenerator.filters.keys()),
                availableSorters: Array.from(window.questionListGenerator.sorters.keys()),
                availableLimiters: Array.from(window.questionListGenerator.limiters.keys())
            }
        };
    }
}

// 初始化复习管理器
window.reviewManager = new ReviewManager(); 