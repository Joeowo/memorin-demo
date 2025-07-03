// 题目列表生成器 - 高扩展性架构设计
class QuestionListGenerator {
    constructor() {
        this.strategies = new Map();
        this.filters = new Map();
        this.sorters = new Map();
        this.limiters = new Map();
        
        // 注册默认策略
        this.registerDefaultStrategies();
        this.registerDefaultFilters();
        this.registerDefaultSorters();
        this.registerDefaultLimiters();
    }

    /**
     * 核心接口：生成题目列表
     * @param {Object} config 生成配置
     * @returns {Array} 题目列表
     */
    async generateQuestionList(config) {
        try {
            // 1. 验证配置
            this.validateConfig(config);
            
            // 2. 获取基础数据源
            let questions = await this.getBaseQuestions(config.source);
            
            // 3. 应用过滤策略
            if (config.filters && config.filters.length > 0) {
                questions = await this.applyFilters(questions, config.filters);
            }
            
            // 4. 应用排序策略
            if (config.sorter) {
                questions = await this.applySorter(questions, config.sorter);
            }
            
            // 5. 应用数量限制策略
            if (config.limiter) {
                questions = await this.applyLimiter(questions, config.limiter);
            }
            
            // 6. 最终处理
            questions = await this.applyFinalProcessing(questions, config);
            
            console.log(`生成题目列表完成: ${questions.length} 道题目`, config);
            return questions;
            
        } catch (error) {
            console.error('题目列表生成失败:', error);
            throw new Error(`题目列表生成失败: ${error.message}`);
        }
    }

    /**
     * 注册生成策略
     * @param {string} name 策略名称
     * @param {Function} strategy 策略函数
     */
    registerStrategy(name, strategy) {
        this.strategies.set(name, strategy);
    }

    /**
     * 注册过滤器
     * @param {string} name 过滤器名称
     * @param {Function} filter 过滤器函数
     */
    registerFilter(name, filter) {
        this.filters.set(name, filter);
    }

    /**
     * 注册排序器
     * @param {string} name 排序器名称
     * @param {Function} sorter 排序器函数
     */
    registerSorter(name, sorter) {
        this.sorters.set(name, sorter);
    }

    /**
     * 注册限制器
     * @param {string} name 限制器名称
     * @param {Function} limiter 限制器函数
     */
    registerLimiter(name, limiter) {
        this.limiters.set(name, limiter);
    }

    // ======================== 私有方法 ========================

    /**
     * 验证配置
     */
    validateConfig(config) {
        if (!config || typeof config !== 'object') {
            throw new Error('配置对象不能为空');
        }
        
        if (!config.source || !config.source.type) {
            throw new Error('必须指定数据源类型');
        }
    }

    /**
     * 获取基础题目数据
     */
    async getBaseQuestions(source) {
        const strategy = this.strategies.get(source.type);
        if (!strategy) {
            throw new Error(`未找到数据源策略: ${source.type}`);
        }
        
        return await strategy(source.params || {});
    }

    /**
     * 应用过滤器
     */
    async applyFilters(questions, filterConfigs) {
        let result = [...questions];
        
        for (const filterConfig of filterConfigs) {
            const filter = this.filters.get(filterConfig.type);
            if (!filter) {
                console.warn(`未找到过滤器: ${filterConfig.type}`);
                continue;
            }
            
            result = await filter(result, filterConfig.params || {});
        }
        
        return result;
    }

    /**
     * 应用排序器
     */
    async applySorter(questions, sorterConfig) {
        const sorter = this.sorters.get(sorterConfig.type);
        if (!sorter) {
            console.warn(`未找到排序器: ${sorterConfig.type}`);
            return questions;
        }
        
        return await sorter([...questions], sorterConfig.params || {});
    }

    /**
     * 应用限制器
     */
    async applyLimiter(questions, limiterConfig) {
        const limiter = this.limiters.get(limiterConfig.type);
        if (!limiter) {
            console.warn(`未找到限制器: ${limiterConfig.type}`);
            return questions;
        }
        
        return await limiter([...questions], limiterConfig.params || {});
    }

    /**
     * 最终处理
     */
    async applyFinalProcessing(questions, config) {
        // 1. 添加元数据
        let processedQuestions = questions.map((question, index) => ({
            ...question,
            _meta: {
                index: index,
                generatedAt: Date.now(),
                source: config.source.type,
                totalCount: questions.length
            }
        }));
        
        // 2. 应用选择题打乱处理（方案A：批量处理）
        if (window.ChoiceProcessor && ChoiceProcessor.config.enabled) {
            console.log('[题目列表生成] 开始应用选择题打乱处理...');
            
            const beforeStats = ChoiceProcessor.getChoiceStatistics(processedQuestions);
            console.log('[题目列表生成] 打乱前统计:', beforeStats);
            
            processedQuestions = ChoiceProcessor.batchShuffleChoiceQuestions(processedQuestions, {
                enabled: true,
                logSummary: true
            });
            
            const afterStats = ChoiceProcessor.getChoiceStatistics(processedQuestions);
            console.log('[题目列表生成] 打乱后统计:', afterStats);
        } else {
            console.log('[题目列表生成] 选择题打乱功能未启用或模块未加载');
        }
        
        return processedQuestions;
    }

    // ======================== 默认策略注册 ========================

    /**
     * 注册默认数据源策略
     */
    registerDefaultStrategies() {
        // 全部知识点
        this.registerStrategy('all-knowledge', async () => {
            return window.storageManager.getAllKnowledge();
        });

        // 知识库
        this.registerStrategy('knowledge-base', async (params) => {
            const { baseId } = params;
            if (!baseId) throw new Error('knowledge-base策略需要baseId参数');
            
            console.log(`题目列表生成器: 获取知识库 ${baseId} 的知识点`);
            
            // 使用增强的存储管理器方法获取知识点，包含数据修复功能
            const baseKnowledge = window.storageManager.getKnowledgeByBaseId(baseId);
            
            console.log(`题目列表生成器: 知识库 ${baseId} 获取到 ${baseKnowledge.length} 个知识点`);
            
            // 验证每个知识点是否正确归属于该知识库
            const validKnowledge = baseKnowledge.filter(k => {
                if (k.knowledgeBaseId !== baseId) {
                    console.warn(`知识点 ${k.id} 的 knowledgeBaseId (${k.knowledgeBaseId}) 与目标知识库ID (${baseId}) 不匹配`);
                    return false;
                }
                return true;
            });
            
            if (validKnowledge.length !== baseKnowledge.length) {
                console.warn(`过滤后保留 ${validKnowledge.length} 个有效知识点`);
            }
            
            return validKnowledge;
        });

        // 知识区
        this.registerStrategy('knowledge-area', async (params) => {
            const { areaId } = params;
            if (!areaId) throw new Error('knowledge-area策略需要areaId参数');
            
            const allKnowledge = window.storageManager.getAllKnowledge();
            return allKnowledge.filter(k => k.areaId === areaId);
        });

        // 错题 - 全部
        this.registerStrategy('all-mistakes', async () => {
            const mistakes = window.storageManager.getMistakes();
            const activeMistakes = mistakes.filter(m => !m.isResolved);
            
            return activeMistakes
                .map(mistake => window.storageManager.getKnowledgeById(mistake.knowledgeId))
                .filter(k => k);
        });

        // 错题 - 按知识库
        this.registerStrategy('mistakes-by-base', async (params) => {
            const { baseId } = params;
            if (!baseId) throw new Error('mistakes-by-base策略需要baseId参数');
            
            const mistakes = window.storageManager.getMistakes();
            const activeMistakes = mistakes.filter(m => !m.isResolved);
            
            return activeMistakes
                .map(mistake => window.storageManager.getKnowledgeById(mistake.knowledgeId))
                .filter(k => k && k.knowledgeBaseId === baseId);
        });

        // 错题 - 按知识区
        this.registerStrategy('mistakes-by-area', async (params) => {
            const { areaId } = params;
            if (!areaId) throw new Error('mistakes-by-area策略需要areaId参数');
            
            const mistakes = window.storageManager.getMistakes();
            const activeMistakes = mistakes.filter(m => !m.isResolved);
            
            return activeMistakes
                .map(mistake => window.storageManager.getKnowledgeById(mistake.knowledgeId))
                .filter(k => k && k.areaId === areaId);
        });

        // 自定义知识点列表
        this.registerStrategy('custom-list', async (params) => {
            const { knowledgeIds } = params;
            if (!Array.isArray(knowledgeIds)) {
                throw new Error('custom-list策略需要knowledgeIds数组参数');
            }
            
            return knowledgeIds
                .map(id => window.storageManager.getKnowledgeById(id))
                .filter(k => k);
        });
    }

    /**
     * 注册默认过滤器
     */
    registerDefaultFilters() {
        // 按复习时间过滤（到期的）
        this.registerFilter('due-for-review', async (questions) => {
            const now = new Date();
            return questions.filter(q => {
                const nextReview = new Date(q.nextReview);
                return nextReview <= now;
            });
        });

        // 按难度过滤
        this.registerFilter('by-difficulty', async (questions, params) => {
            const { minDifficulty, maxDifficulty } = params;
            return questions.filter(q => {
                const difficulty = q.difficulty || 3;
                return (!minDifficulty || difficulty >= minDifficulty) &&
                       (!maxDifficulty || difficulty <= maxDifficulty);
            });
        });

        // 按正确率过滤
        this.registerFilter('by-accuracy', async (questions, params) => {
            const { minAccuracy, maxAccuracy } = params;
            return questions.filter(q => {
                const accuracy = q.reviewCount > 0 ? q.correctCount / q.reviewCount : 0;
                return (!minAccuracy || accuracy >= minAccuracy) &&
                       (!maxAccuracy || accuracy <= maxAccuracy);
            });
        });

        // 按标签过滤
        this.registerFilter('by-tags', async (questions, params) => {
            const { tags, mode = 'any' } = params; // mode: 'any' 或 'all'
            if (!Array.isArray(tags) || tags.length === 0) return questions;
            
            return questions.filter(q => {
                if (!q.tags || q.tags.length === 0) return false;
                
                if (mode === 'all') {
                    return tags.every(tag => q.tags.includes(tag));
                } else {
                    return tags.some(tag => q.tags.includes(tag));
                }
            });
        });

        // 按分类过滤
        this.registerFilter('by-category', async (questions, params) => {
            const { categories } = params;
            if (!Array.isArray(categories) || categories.length === 0) return questions;
            
            return questions.filter(q => categories.includes(q.category));
        });

        // 按复习次数过滤
        this.registerFilter('by-review-count', async (questions, params) => {
            const { minCount, maxCount } = params;
            return questions.filter(q => {
                const count = q.reviewCount || 0;
                return (!minCount || count >= minCount) &&
                       (!maxCount || count <= maxCount);
            });
        });
    }

    /**
     * 注册默认排序器
     */
    registerDefaultSorters() {
        // 随机排序
        this.registerSorter('random', async (questions) => {
            return Utils.shuffleArray(questions);
        });

        // 按复习时间排序
        this.registerSorter('by-review-time', async (questions, params) => {
            const { order = 'asc' } = params; // 'asc' 或 'desc'
            
            return questions.sort((a, b) => {
                const timeA = new Date(a.nextReview || 0).getTime();
                const timeB = new Date(b.nextReview || 0).getTime();
                return order === 'asc' ? timeA - timeB : timeB - timeA;
            });
        });

        // 按难度排序
        this.registerSorter('by-difficulty', async (questions, params) => {
            const { order = 'asc' } = params;
            
            return questions.sort((a, b) => {
                const diffA = a.difficulty || 3;
                const diffB = b.difficulty || 3;
                return order === 'asc' ? diffA - diffB : diffB - diffA;
            });
        });

        // 按正确率排序
        this.registerSorter('by-accuracy', async (questions, params) => {
            const { order = 'asc' } = params;
            
            return questions.sort((a, b) => {
                const accA = a.reviewCount > 0 ? a.correctCount / a.reviewCount : 0;
                const accB = b.reviewCount > 0 ? b.correctCount / b.reviewCount : 0;
                return order === 'asc' ? accA - accB : accB - accA;
            });
        });

        // 按创建时间排序
        this.registerSorter('by-created-time', async (questions, params) => {
            const { order = 'asc' } = params;
            
            return questions.sort((a, b) => {
                const timeA = new Date(a.createdAt || 0).getTime();
                const timeB = new Date(b.createdAt || 0).getTime();
                return order === 'asc' ? timeA - timeB : timeB - timeA;
            });
        });

        // 智能排序（综合算法）
        this.registerSorter('smart', async (questions) => {
            return questions.sort((a, b) => {
                // 综合考虑：复习时间、正确率、难度
                const now = Date.now();
                
                // 复习紧急度 (越小越紧急)
                const urgencyA = Math.max(0, new Date(a.nextReview || 0).getTime() - now);
                const urgencyB = Math.max(0, new Date(b.nextReview || 0).getTime() - now);
                
                // 正确率 (越低越需要练习)
                const accA = a.reviewCount > 0 ? a.correctCount / a.reviewCount : 0;
                const accB = b.reviewCount > 0 ? b.correctCount / b.reviewCount : 0;
                
                // 综合分数 (越小越优先)
                const scoreA = urgencyA * 0.5 + (1 - accA) * 1000000 + (a.difficulty || 3) * 100000;
                const scoreB = urgencyB * 0.5 + (1 - accB) * 1000000 + (b.difficulty || 3) * 100000;
                
                return scoreA - scoreB;
            });
        });
    }

    /**
     * 注册默认限制器
     */
    registerDefaultLimiters() {
        // 固定数量限制
        this.registerLimiter('fixed-count', async (questions, params) => {
            const { count } = params;
            if (!count || count <= 0) return questions;
            
            return questions.slice(0, count);
        });

        // 百分比限制
        this.registerLimiter('percentage', async (questions, params) => {
            const { percentage } = params;
            if (!percentage || percentage <= 0 || percentage > 100) return questions;
            
            const count = Math.ceil(questions.length * percentage / 100);
            return questions.slice(0, count);
        });

        // 时间限制（预估答题时间）
        this.registerLimiter('time-limit', async (questions, params) => {
            const { timeLimit } = params; // 分钟
            if (!timeLimit || timeLimit <= 0) return questions;
            
            const avgTimePerQuestion = 2; // 分钟
            const maxCount = Math.floor(timeLimit / avgTimePerQuestion);
            
            return questions.slice(0, maxCount);
        });

        // 智能限制（基于用户学习能力）
        this.registerLimiter('smart-limit', async (questions, params) => {
            const stats = window.storageManager.getStatistics();
            const { baseCount = 20, maxCount = 50 } = params;
            
            // 根据用户正确率调整题目数量
            const accuracy = stats.totalReviews > 0 ? stats.correctAnswers / stats.totalReviews : 0.5;
            const adjustedCount = Math.round(baseCount * (1 + (1 - accuracy) * 0.5));
            
            const finalCount = Math.min(maxCount, Math.max(10, adjustedCount));
            return questions.slice(0, finalCount);
        });
    }
}

// ======================== 预设配置模板 ========================

/**
 * 题目列表配置模板
 */
class QuestionListTemplates {
    /**
     * 知识库完整复习
     */
    static knowledgeBaseReview(baseId, options = {}) {
        return {
            source: {
                type: 'knowledge-base',
                params: { baseId }
            },
            filters: options.onlyDue ? [{ type: 'due-for-review' }] : [],
            sorter: {
                type: options.random ? 'random' : 'smart'
            },
            limiter: options.limit ? {
                type: 'fixed-count',
                params: { count: options.limit }
            } : null
        };
    }

    /**
     * 知识区复习
     */
    static knowledgeAreaReview(areaId, options = {}) {
        return {
            source: {
                type: 'knowledge-area',
                params: { areaId }
            },
            filters: options.onlyDue ? [{ type: 'due-for-review' }] : [],
            sorter: {
                type: options.random ? 'random' : 'by-review-time'
            },
            limiter: options.limit ? {
                type: 'fixed-count',
                params: { count: options.limit }
            } : null
        };
    }

    /**
     * 智能复习
     */
    static smartReview(options = {}) {
        const {
            baseId,
            count = 20,
            difficulty,
            tags,
            onlyDue = true
        } = options;

        const filters = [];
        if (onlyDue) filters.push({ type: 'due-for-review' });
        if (difficulty) filters.push({ 
            type: 'by-difficulty', 
            params: { minDifficulty: difficulty.min, maxDifficulty: difficulty.max }
        });
        if (tags) filters.push({ 
            type: 'by-tags', 
            params: { tags, mode: 'any' }
        });

        return {
            source: baseId ? {
                type: 'knowledge-base',
                params: { baseId }
            } : {
                type: 'all-knowledge'
            },
            filters,
            sorter: { type: 'smart' },
            limiter: {
                type: 'smart-limit',
                params: { baseCount: count, maxCount: count * 2 }
            }
        };
    }

    /**
     * 错题复习 - 知识库
     */
    static mistakeReviewByBase(baseId, options = {}) {
        return {
            source: {
                type: 'mistakes-by-base',
                params: { baseId }
            },
            sorter: {
                type: options.random ? 'random' : 'by-accuracy',
                params: { order: 'asc' }
            },
            limiter: options.limit ? {
                type: 'fixed-count',
                params: { count: options.limit }
            } : null
        };
    }

    /**
     * 错题复习 - 知识区
     */
    static mistakeReviewByArea(areaId, options = {}) {
        return {
            source: {
                type: 'mistakes-by-area',
                params: { areaId }
            },
            sorter: {
                type: options.random ? 'random' : 'by-accuracy',
                params: { order: 'asc' }
            },
            limiter: options.limit ? {
                type: 'fixed-count',
                params: { count: options.limit }
            } : null
        };
    }

    /**
     * 全部错题复习
     */
    static allMistakesReview(options = {}) {
        return {
            source: {
                type: 'all-mistakes'
            },
            sorter: {
                type: options.random ? 'random' : 'by-accuracy',
                params: { order: 'asc' }
            },
            limiter: options.limit ? {
                type: 'fixed-count',
                params: { count: options.limit }
            } : null
        };
    }

    /**
     * 弱项强化复习
     */
    static weaknessReview(options = {}) {
        const { baseId, count = 15 } = options;

        return {
            source: baseId ? {
                type: 'knowledge-base',
                params: { baseId }
            } : {
                type: 'all-knowledge'
            },
            filters: [
                { 
                    type: 'by-accuracy', 
                    params: { maxAccuracy: 0.7 } // 正确率低于70%
                },
                {
                    type: 'by-review-count',
                    params: { minCount: 2 } // 至少复习过2次
                }
            ],
            sorter: {
                type: 'by-accuracy',
                params: { order: 'asc' } // 正确率从低到高
            },
            limiter: {
                type: 'fixed-count',
                params: { count }
            }
        };
    }
}

// 初始化全局实例
window.questionListGenerator = new QuestionListGenerator();
window.QuestionListTemplates = QuestionListTemplates;

console.log('题目列表生成器已初始化'); 