// 数据存储管理类
class StorageManager {
    constructor() {
        this.storageKey = 'memorin_data';
        this.init();
    }

    init() {
        // 检查浏览器是否支持localStorage
        if (!this.isLocalStorageSupported()) {
            console.error('浏览器不支持localStorage');
            return;
        }

        // 初始化数据结构
        this.initData();
        console.log('存储管理器已初始化');
    }

    // 检查localStorage支持
    isLocalStorageSupported() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // 初始化数据结构
    initData() {
        const data = this.getData();
        if (!data) {
            const initialData = {
                knowledge: [
                    {
                        id: 'demo1',
                        question: 'JavaScript中什么是闭包？',
                        answer: '闭包是指有权访问另一个函数作用域中变量的函数。',
                        explanation: '闭包可以让内部函数访问外部函数的作用域。在JavaScript中，闭包在每次创建函数时都会被创建。',
                        tags: ['JavaScript', '闭包', '作用域'],
                        category: '前端开发',
                        difficulty: 3,
                        createdAt: Date.now() - 86400000, // 1天前
                        updatedAt: Date.now() - 86400000,
                        reviewCount: 2,
                        correctCount: 1,
                        lastReviewed: Date.now() - 3600000, // 1小时前
                        nextReview: Date.now() + 86400000, // 明天
                        interval: 2,
                        easeFactor: 2.5,
                        knowledgeBaseId: 'default_kb', // 添加知识库ID
                        areaId: 'default_area_1' // 添加知识区ID
                    },
                    {
                        id: 'demo2',
                        question: 'CSS的盒模型是什么？',
                        answer: 'CSS盒模型由内容(content)、内边距(padding)、边框(border)和外边距(margin)组成。',
                        explanation: '盒模型定义了元素在页面中所占的空间。标准盒模型和IE盒模型在计算宽高时有所不同。',
                        tags: ['CSS', '盒模型', '布局'],
                        category: '前端开发',
                        difficulty: 2,
                        createdAt: Date.now() - 172800000, // 2天前
                        updatedAt: Date.now() - 172800000,
                        reviewCount: 3,
                        correctCount: 3,
                        lastReviewed: Date.now() - 7200000, // 2小时前
                        nextReview: Date.now(), // 现在需要复习
                        interval: 1,
                        easeFactor: 2.6,
                        knowledgeBaseId: 'default_kb',
                        areaId: 'default_area_1'
                    },
                    {
                        id: 'demo3',
                        question: 'HTTP和HTTPS的区别是什么？',
                        answer: 'HTTPS是HTTP的加密版本，使用SSL/TLS协议进行数据加密传输。',
                        explanation: 'HTTPS提供了数据完整性、身份验证和保密性，端口号是443，而HTTP端口号是80。',
                        tags: ['HTTP', 'HTTPS', '网络安全'],
                        category: '网络协议',
                        difficulty: 2,
                        createdAt: Date.now() - 259200000, // 3天前
                        updatedAt: Date.now() - 259200000,
                        reviewCount: 1,
                        correctCount: 0,
                        lastReviewed: Date.now() - 10800000, // 3小时前
                        nextReview: Date.now() + 43200000, // 12小时后
                        interval: 1,
                        easeFactor: 2.3,
                        knowledgeBaseId: 'default_kb',
                        areaId: 'default_area_2'
                    }
                ],
                knowledgeBases: [ // 改为数组，支持多个知识库
                    {
                        id: 'default_kb',
                        name: '默认知识库',
                        description: '系统默认的演示知识库',
                        icon: '📚',
                        color: '#667eea',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        areas: [
                            {
                                id: 'default_area_1',
                                name: '前端开发',
                                description: '前端开发相关知识',
                                color: '#667eea',
                                knowledgePoints: []
                            },
                            {
                                id: 'default_area_2',
                                name: '网络协议',
                                description: '网络协议相关知识',
                                color: '#f093fb',
                                knowledgePoints: []
                            }
                        ]
                    }
                ],
                currentKnowledgeBaseId: 'default_kb', // 当前选中的知识库ID
                mistakes: [
                    {
                        id: 'mistake1',
                        knowledgeId: 'demo1',
                        addedAt: Date.now() - 86400000,
                        mistakeCount: 1,
                        lastMistake: Date.now() - 86400000,
                        isResolved: false
                    }
                ],
                reviewHistory: [
                    {
                        id: 'review1',
                        knowledgeId: 'demo1',
                        reviewDate: Date.now() - 86400000,
                        isCorrect: false,
                        difficulty: 4,
                        timeSpent: 45,
                        response: ''
                    },
                    {
                        id: 'review2',
                        knowledgeId: 'demo2',
                        reviewDate: Date.now() - 172800000,
                        isCorrect: true,
                        difficulty: 2,
                        timeSpent: 30,
                        response: ''
                    }
                ],
                settings: {
                    theme: 'light',
                    language: 'zh-CN',
                    reviewReminder: true,
                    soundEnabled: true
                },
                statistics: {
                    totalReviews: 6,
                    correctAnswers: 4,
                    studyTime: 180,
                    streakDays: 2,
                    lastStudyDate: Date.now() - 3600000
                },
                version: '1.0.0',
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            this.setData(initialData);
        }
    }

    // 获取所有数据
    getData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('读取数据失败:', e);
            return null;
        }
    }

    // 保存所有数据
    setData(data) {
        try {
            data.updatedAt = Date.now();
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('保存数据失败:', e);
            return false;
        }
    }

    // saveData方法作为setData的别名，保持API一致性
    saveData(data) {
        return this.setData(data);
    }

    // 知识点相关操作
    
    // 获取所有知识点
    getAllKnowledge() {
        const data = this.getData();
        return data ? data.knowledge : [];
    }

    // 根据ID获取知识点
    getKnowledgeById(id) {
        const knowledge = this.getAllKnowledge();
        return knowledge.find(k => k.id === id);
    }

    // 添加知识点
    addKnowledge(knowledgeData) {
        const data = this.getData();
        if (!data) return false;

        const newKnowledge = {
            id: this.generateId(),
            question: knowledgeData.question,
            answer: knowledgeData.answer,
            explanation: knowledgeData.explanation || '',
            note: knowledgeData.note || '',
            score: knowledgeData.score || null,
            tags: knowledgeData.tags || [],
            category: knowledgeData.category || '',
            difficulty: parseInt(knowledgeData.difficulty) || 3,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            reviewCount: 0,
            correctCount: 0,
            lastReviewed: null,
            nextReview: Date.now(), // 新添加的知识点立即可复习
            interval: 1,
            easeFactor: 2.5
        };

        data.knowledge.push(newKnowledge);
        return this.setData(data) ? newKnowledge : null;
    }

    // 更新知识点
    updateKnowledge(id, updates) {
        const data = this.getData();
        if (!data) return false;

        const index = data.knowledge.findIndex(k => k.id === id);
        if (index === -1) return false;

        data.knowledge[index] = {
            ...data.knowledge[index],
            ...updates,
            updatedAt: Date.now()
        };

        return this.setData(data);
    }

    // 更新知识点笔记
    updateKnowledgeNote(id, note) {
        const data = this.getData();
        if (!data) return false;

        const index = data.knowledge.findIndex(k => k.id === id);
        if (index === -1) return false;

        data.knowledge[index].note = note;
        data.knowledge[index].updatedAt = Date.now();

        return this.setData(data);
    }

    // 更新知识点评分
    updateKnowledgeScore(id, score) {
        const data = this.getData();
        if (!data) return false;

        const index = data.knowledge.findIndex(k => k.id === id);
        if (index === -1) return false;

        data.knowledge[index].score = score;
        data.knowledge[index].updatedAt = Date.now();

        return this.setData(data);
    }

    // 删除知识点
    deleteKnowledge(id) {
        const data = this.getData();
        if (!data) return false;

        const index = data.knowledge.findIndex(k => k.id === id);
        if (index === -1) return false;

        data.knowledge.splice(index, 1);
        return this.setData(data);
    }

    // 批量删除知识点
    deleteMultipleKnowledge(ids) {
        const data = this.getData();
        if (!data) return false;

        data.knowledge = data.knowledge.filter(k => !ids.includes(k.id));
        return this.setData(data);
    }

    // 搜索知识点
    searchKnowledge(query, filters = {}) {
        const knowledge = this.getAllKnowledge();
        let results = knowledge;

        // 文本搜索
        if (query) {
            const searchQuery = query.toLowerCase();
            results = results.filter(k => 
                k.question.toLowerCase().includes(searchQuery) ||
                k.answer.toLowerCase().includes(searchQuery) ||
                k.explanation.toLowerCase().includes(searchQuery) ||
                k.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }

        // 分类过滤
        if (filters.category) {
            results = results.filter(k => k.category === filters.category);
        }

        // 难度过滤
        if (filters.difficulty) {
            results = results.filter(k => k.difficulty === parseInt(filters.difficulty));
        }

        // 标签过滤
        if (filters.tags && filters.tags.length > 0) {
            results = results.filter(k => 
                filters.tags.some(tag => k.tags.includes(tag))
            );
        }

        return results;
    }

    // 获取所有分类
    getAllCategories() {
        const knowledge = this.getAllKnowledge();
        const categories = [...new Set(knowledge.map(k => k.category).filter(c => c))];
        return categories.sort();
    }

    // 获取所有标签
    getAllTags() {
        const knowledge = this.getAllKnowledge();
        const tags = [...new Set(knowledge.flatMap(k => k.tags))];
        return tags.sort();
    }

    // 错题本相关操作

    // 获取所有错题
    getMistakes() {
        const data = this.getData();
        return data ? data.mistakes : [];
    }

    // 添加错题
    addMistake(knowledgeId, mistakeData = {}) {
        const data = this.getData();
        if (!data) return false;

        const existingMistake = data.mistakes.find(m => m.knowledgeId === knowledgeId);
        
        if (existingMistake) {
            // 更新现有错题记录
            existingMistake.count++;
            existingMistake.lastMistakeDate = Date.now();
            existingMistake.reasons.push(mistakeData.reason || '');
        } else {
            // 添加新错题记录
            const newMistake = {
                id: this.generateId(),
                knowledgeId: knowledgeId,
                count: 1,
                firstMistakeDate: Date.now(),
                lastMistakeDate: Date.now(),
                reasons: [mistakeData.reason || ''],
                isResolved: false
            };
            data.mistakes.push(newMistake);
        }

        return this.setData(data);
    }

    // 标记错题为已解决
    resolveMistake(knowledgeId) {
        const data = this.getData();
        if (!data) return false;

        const mistake = data.mistakes.find(m => m.knowledgeId === knowledgeId);
        if (mistake) {
            mistake.isResolved = true;
            mistake.resolvedDate = Date.now();
            return this.setData(data);
        }
        return false;
    }

    // 删除错题记录
    deleteMistake(knowledgeId) {
        const data = this.getData();
        if (!data) return false;

        const index = data.mistakes.findIndex(m => m.knowledgeId === knowledgeId);
        if (index !== -1) {
            data.mistakes.splice(index, 1);
            return this.setData(data);
        }
        return false;
    }

    // 复习历史相关操作

    // 添加复习记录
    addReviewRecord(knowledgeId, result) {
        const data = this.getData();
        if (!data) return false;

        const reviewRecord = {
            id: this.generateId(),
            knowledgeId: knowledgeId,
            reviewDate: Date.now(),
            isCorrect: result.isCorrect,
            difficulty: result.difficulty || 3,
            timeSpent: result.timeSpent || 0,
            response: result.response || ''
        };

        data.reviewHistory.push(reviewRecord);

        // 更新统计数据
        data.statistics.totalReviews++;
        if (result.isCorrect) {
            data.statistics.correctAnswers++;
        }
        data.statistics.lastStudyDate = Date.now();

        return this.setData(data);
    }

    // 获取复习历史
    getReviewHistory(knowledgeId = null, limit = null) {
        const data = this.getData();
        if (!data) return [];

        let history = data.reviewHistory;
        
        if (knowledgeId) {
            history = history.filter(r => r.knowledgeId === knowledgeId);
        }

        // 按时间倒序排列
        history.sort((a, b) => b.reviewDate - a.reviewDate);

        if (limit) {
            history = history.slice(0, limit);
        }

        return history;
    }

    // 设置相关操作

    // 获取设置
    getSettings() {
        const data = this.getData();
        return data ? data.settings : {};
    }

    // 更新设置
    updateSettings(newSettings) {
        const data = this.getData();
        if (!data) return false;

        data.settings = { ...data.settings, ...newSettings };
        return this.setData(data);
    }

    // 统计数据相关操作

    // 获取统计数据
    getStatistics() {
        const data = this.getData();
        return data ? data.statistics : {};
    }

    // 更新统计数据
    updateStatistics(newStats) {
        const data = this.getData();
        if (!data) return false;

        data.statistics = { ...data.statistics, ...newStats };
        return this.setData(data);
    }

    // 数据导入导出

    // 导出数据
    exportData() {
        const data = this.getData();
        if (!data) return null;

        return {
            ...data,
            exportDate: Date.now(),
            exportVersion: '1.0.0'
        };
    }

    // 导入数据
    importData(importData, mergeMode = false) {
        try {
            if (!importData || typeof importData !== 'object') {
                throw new Error('无效的导入数据');
            }

            if (mergeMode) {
                // 合并模式：将导入数据与现有数据合并
                const currentData = this.getData() || this.getDefaultData();
                
                // 合并知识点（去重）
                const existingIds = new Set(currentData.knowledge.map(k => k.id));
                const newKnowledge = importData.knowledge?.filter(k => !existingIds.has(k.id)) || [];
                currentData.knowledge.push(...newKnowledge);

                // 合并其他数据...
                return this.setData(currentData);
            } else {
                // 替换模式：完全替换现有数据
                const dataToImport = {
                    ...importData,
                    updatedAt: Date.now()
                };
                return this.setData(dataToImport);
            }
        } catch (e) {
            console.error('导入数据失败:', e);
            return false;
        }
    }

    // 清空所有数据
    clearAllData() {
        try {
            localStorage.removeItem(this.storageKey);
            this.initData();
            return true;
        } catch (e) {
            console.error('清空数据失败:', e);
            return false;
        }
    }

    // 获取存储使用情况
    getStorageUsage() {
        try {
            const data = JSON.stringify(this.getData());
            const sizeInBytes = new Blob([data]).size;
            const sizeInKB = (sizeInBytes / 1024).toFixed(2);
            const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

            return {
                bytes: sizeInBytes,
                kb: sizeInKB,
                mb: sizeInMB,
                records: {
                    knowledge: this.getAllKnowledge().length,
                    mistakes: this.getMistakes().length,
                    reviewHistory: this.getReviewHistory().length
                }
            };
        } catch (e) {
            console.error('获取存储使用情况失败:', e);
            return null;
        }
    }

    // 工具方法

    // 生成唯一ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // 获取默认数据结构
    getDefaultData() {
        return {
            knowledge: [],
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

    // 数据验证
    validateData(data) {
        if (!data || typeof data !== 'object') return false;
        
        const requiredFields = ['knowledge', 'mistakes', 'reviewHistory', 'settings', 'statistics'];
        return requiredFields.every(field => data.hasOwnProperty(field));
    }

    // 知识库管理相关操作

    // 获取所有知识库
    getAllKnowledgeBases() {
        const data = this.getData();
        return data ? data.knowledgeBases || [] : [];
    }

    // 根据ID获取知识库
    getKnowledgeBaseById(id) {
        const knowledgeBases = this.getAllKnowledgeBases();
        return knowledgeBases.find(kb => kb.id === id);
    }

    // 获取当前选中的知识库
    getCurrentKnowledgeBase() {
        const data = this.getData();
        if (!data || !data.currentKnowledgeBaseId) return null;
        return this.getKnowledgeBaseById(data.currentKnowledgeBaseId);
    }

    // 设置当前知识库
    setCurrentKnowledgeBase(knowledgeBaseId) {
        const data = this.getData();
        if (!data) return false;
        
        data.currentKnowledgeBaseId = knowledgeBaseId;
        return this.setData(data);
    }

    // 添加知识库
    addKnowledgeBase(knowledgeBaseData) {
        const data = this.getData();
        if (!data) return false;

        const newKnowledgeBase = {
            id: knowledgeBaseData.id || this.generateId(),
            name: knowledgeBaseData.name,
            description: knowledgeBaseData.description || '',
            icon: knowledgeBaseData.icon || '📚',
            color: knowledgeBaseData.color || '#667eea',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            areas: knowledgeBaseData.areas || []
        };

        if (!data.knowledgeBases) {
            data.knowledgeBases = [];
        }

        data.knowledgeBases.push(newKnowledgeBase);
        
        // 如果这是第一个知识库，设为当前知识库
        if (!data.currentKnowledgeBaseId) {
            data.currentKnowledgeBaseId = newKnowledgeBase.id;
        }

        return this.setData(data) ? newKnowledgeBase : null;
    }

    // 更新知识库
    updateKnowledgeBase(id, updates) {
        const data = this.getData();
        if (!data || !data.knowledgeBases) return false;

        const index = data.knowledgeBases.findIndex(kb => kb.id === id);
        if (index === -1) return false;

        data.knowledgeBases[index] = {
            ...data.knowledgeBases[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        return this.setData(data);
    }

    // 删除知识库
    deleteKnowledgeBase(id) {
        const data = this.getData();
        if (!data || !data.knowledgeBases) return false;

        const index = data.knowledgeBases.findIndex(kb => kb.id === id);
        if (index === -1) return false;

        // 删除知识库
        data.knowledgeBases.splice(index, 1);

        // 删除相关的知识点
        data.knowledge = data.knowledge.filter(k => k.knowledgeBaseId !== id);

        // 如果删除的是当前知识库，切换到其他知识库
        if (data.currentKnowledgeBaseId === id) {
            data.currentKnowledgeBaseId = data.knowledgeBases.length > 0 ? data.knowledgeBases[0].id : null;
        }

        return this.setData(data);
    }

    // 添加知识区到指定知识库
    addKnowledgeArea(knowledgeBaseId, areaData) {
        const data = this.getData();
        if (!data || !data.knowledgeBases) return false;

        const knowledgeBase = data.knowledgeBases.find(kb => kb.id === knowledgeBaseId);
        if (!knowledgeBase) return false;

        const newArea = {
            id: areaData.id || this.generateId(),
            name: areaData.name,
            description: areaData.description || '',
            color: areaData.color || '#667eea',
            knowledgePoints: []
        };

        knowledgeBase.areas.push(newArea);
        knowledgeBase.updatedAt = new Date().toISOString();

        return this.setData(data) ? newArea : null;
    }

    // 更新知识区
    updateKnowledgeArea(knowledgeBaseId, areaId, updates) {
        const data = this.getData();
        if (!data || !data.knowledgeBases) return false;

        const knowledgeBase = data.knowledgeBases.find(kb => kb.id === knowledgeBaseId);
        if (!knowledgeBase) return false;

        const areaIndex = knowledgeBase.areas.findIndex(area => area.id === areaId);
        if (areaIndex === -1) return false;

        knowledgeBase.areas[areaIndex] = {
            ...knowledgeBase.areas[areaIndex],
            ...updates
        };
        knowledgeBase.updatedAt = new Date().toISOString();

        return this.setData(data);
    }

    // 删除知识区
    deleteKnowledgeArea(knowledgeBaseId, areaId) {
        const data = this.getData();
        if (!data || !data.knowledgeBases) return false;

        const knowledgeBase = data.knowledgeBases.find(kb => kb.id === knowledgeBaseId);
        if (!knowledgeBase) return false;

        const areaIndex = knowledgeBase.areas.findIndex(area => area.id === areaId);
        if (areaIndex === -1) return false;

        // 获取该知识区下的所有知识点ID
        const deletedKnowledgeIds = data.knowledge.filter(k => k.areaId === areaId).map(k => k.id);

        // 删除知识区
        knowledgeBase.areas.splice(areaIndex, 1);
        knowledgeBase.updatedAt = new Date().toISOString();

        // 删除该知识区下的所有知识点
        data.knowledge = data.knowledge.filter(k => k.areaId !== areaId);

        // 删除相关的错题记录
        data.mistakes = data.mistakes.filter(m => !deletedKnowledgeIds.includes(m.knowledgeId));

        // 删除相关的复习历史
        data.reviewHistory = data.reviewHistory.filter(r => !deletedKnowledgeIds.includes(r.knowledgeId));

        return this.setData(data);
    }

    // 根据知识库ID获取知识区列表
    getKnowledgeAreasByBaseId(knowledgeBaseId) {
        const knowledgeBase = this.getKnowledgeBaseById(knowledgeBaseId);
        return knowledgeBase ? knowledgeBase.areas : [];
    }

    // 根据知识区ID获取知识区信息
    getKnowledgeAreaById(knowledgeBaseId, areaId) {
        const areas = this.getKnowledgeAreasByBaseId(knowledgeBaseId);
        return areas.find(area => area.id === areaId);
    }

    /**
     * 增强的按知识库ID获取知识点方法
     * 包含数据一致性检查和自动修复
     */
    getKnowledgeByBaseId(baseId) {
        try {
            if (!baseId) {
                console.warn('getKnowledgeByBaseId: baseId参数为空');
                return [];
            }

            const data = this.getData();
            if (!data || !Array.isArray(data.knowledge)) {
                console.warn('getKnowledgeByBaseId: 知识点数据无效');
                return [];
            }

            // 验证知识库是否存在
            const knowledgeBase = this.getKnowledgeBaseById(baseId);
            if (!knowledgeBase) {
                console.warn(`getKnowledgeByBaseId: 知识库 ${baseId} 不存在`);
                return [];
            }

            // 获取匹配的知识点，包含自动修复逻辑
            const matchedKnowledge = [];
            let fixedCount = 0;

            data.knowledge.forEach((k, index) => {
                let shouldInclude = false;
                let wasFixed = false;

                // 主要匹配条件：knowledgeBaseId
                if (k.knowledgeBaseId === baseId) {
                    shouldInclude = true;
                } else if (!k.knowledgeBaseId) {
                    // 如果知识点没有knowledgeBaseId，尝试自动推断
                    const inferredBaseId = this.inferKnowledgeBaseId(k);
                    if (inferredBaseId === baseId) {
                        k.knowledgeBaseId = inferredBaseId;
                        shouldInclude = true;
                        wasFixed = true;
                        fixedCount++;
                        console.log(`自动修复知识点 ${k.id} 的 knowledgeBaseId: ${inferredBaseId}`);
                    }
                } else if (k.knowledgeBaseId !== baseId) {
                    // 验证现有的knowledgeBaseId是否有效
                    const currentBase = this.getKnowledgeBaseById(k.knowledgeBaseId);
                    if (!currentBase) {
                        // 如果知识点的knowledgeBaseId指向不存在的知识库，重新推断
                        const inferredBaseId = this.inferKnowledgeBaseId(k);
                        if (inferredBaseId === baseId) {
                            k.knowledgeBaseId = inferredBaseId;
                            shouldInclude = true;
                            wasFixed = true;
                            fixedCount++;
                            console.log(`修复无效的 knowledgeBaseId: ${k.id} -> ${inferredBaseId}`);
                        }
                    }
                }

                if (shouldInclude) {
                    matchedKnowledge.push(k);
                }

                // 如果数据被修复，更新到存储中
                if (wasFixed) {
                    data.knowledge[index] = k;
                }
            });

            // 如果有数据修复，保存到存储
            if (fixedCount > 0) {
                this.setData(data);
                console.log(`getKnowledgeByBaseId: 自动修复了 ${fixedCount} 个知识点的映射关系`);
            }

            console.log(`getKnowledgeByBaseId(${baseId}): 返回 ${matchedKnowledge.length} 个知识点 (修复了 ${fixedCount} 个)`);
            return matchedKnowledge;

        } catch (error) {
            console.error('getKnowledgeByBaseId失败:', error);
            return [];
        }
    }

    /**
     * 推断知识点的知识库ID
     * 基于多种策略的智能映射算法
     */
    inferKnowledgeBaseId(knowledge) {
        const data = this.getData();
        const knowledgeBases = data.knowledgeBases || [];
        
        if (knowledgeBases.length === 0) {
            return 'default_base';
        }

        // 策略1: 基于ID前缀的精确匹配
        if (knowledge.id) {
            if (knowledge.id.startsWith('mil_')) {
                const militaryBase = knowledgeBases.find(kb => kb.id === 'military_theory_base');
                if (militaryBase) return militaryBase.id;
            }
            if (knowledge.id.startsWith('se_')) {
                const softwareBase = knowledgeBases.find(kb => kb.id === 'software_engineering_base');
                if (softwareBase) return softwareBase.id;
            }
        }

        // 策略2: 基于分类的模糊匹配
        if (knowledge.category) {
            const category = knowledge.category.toLowerCase();
            
            // 定义分类关键词映射
            const categoryMappings = {
                'military_theory_base': ['军事', '国防', '战争', '安全', '装备', '战略', '战术'],
                'software_engineering_base': ['软件', '需求', '设计', '测试', '部署', '实现', '编程', '开发', '系统']
            };

            for (const [baseId, keywords] of Object.entries(categoryMappings)) {
                if (keywords.some(keyword => category.includes(keyword))) {
                    const targetBase = knowledgeBases.find(kb => kb.id === baseId);
                    if (targetBase) return targetBase.id;
                }
            }
        }

        // 策略3: 基于标签的匹配
        if (knowledge.tags && Array.isArray(knowledge.tags)) {
            const allTags = knowledge.tags.join(' ').toLowerCase();
            
            if (allTags.includes('军事') || allTags.includes('国防')) {
                const militaryBase = knowledgeBases.find(kb => kb.id === 'military_theory_base');
                if (militaryBase) return militaryBase.id;
            }
            
            if (allTags.includes('软件') || allTags.includes('编程') || allTags.includes('开发')) {
                const softwareBase = knowledgeBases.find(kb => kb.id === 'software_engineering_base');
                if (softwareBase) return softwareBase.id;
            }
        }

        // 策略4: 基于题目内容的智能匹配
        if (knowledge.question) {
            const question = knowledge.question.toLowerCase();
            
            // 军事理论相关关键词
            const militaryKeywords = ['军队', '武器', '作战', '指挥', '战斗', '防务', '军官', '士兵'];
            if (militaryKeywords.some(keyword => question.includes(keyword))) {
                const militaryBase = knowledgeBases.find(kb => kb.id === 'military_theory_base');
                if (militaryBase) return militaryBase.id;
            }
            
            // 软件工程相关关键词
            const softwareKeywords = ['代码', '程序', '算法', '数据库', '接口', '模块', '类', '对象'];
            if (softwareKeywords.some(keyword => question.includes(keyword))) {
                const softwareBase = knowledgeBases.find(kb => kb.id === 'software_engineering_base');
                if (softwareBase) return softwareBase.id;
            }
        }

        // 策略5: 默认策略 - 返回第一个知识库
        return knowledgeBases[0].id;
    }

    /**
     * 验证和修复所有知识点的映射关系
     */
    validateAndFixKnowledgeMappings() {
        try {
            const data = this.getData();
            if (!data || !Array.isArray(data.knowledge)) {
                console.log('validateAndFixKnowledgeMappings: 没有知识点数据需要修复');
                return { success: true, fixedCount: 0 };
            }

            let fixedCount = 0;
            const knowledgeBaseIds = new Set((data.knowledgeBases || []).map(kb => kb.id));

            data.knowledge = data.knowledge.map(k => {
                let wasFixed = false;

                // 修复knowledgeBaseId
                if (!k.knowledgeBaseId || !knowledgeBaseIds.has(k.knowledgeBaseId)) {
                    const inferredBaseId = this.inferKnowledgeBaseId(k);
                    k.knowledgeBaseId = inferredBaseId;
                    wasFixed = true;
                }

                // 修复areaId
                if (!k.areaId) {
                    const inferredAreaId = this.inferAreaId(k, data.knowledgeBases);
                    if (inferredAreaId) {
                        k.areaId = inferredAreaId;
                        wasFixed = true;
                    }
    }

                // 确保必要字段存在
                if (!k.id) {
                    k.id = this.generateId();
                    wasFixed = true;
                }

                if (wasFixed) {
                    fixedCount++;
                }

                return k;
            });

            // 保存修复后的数据
            if (fixedCount > 0) {
                this.setData(data);
                console.log(`validateAndFixKnowledgeMappings: 修复了 ${fixedCount} 个知识点的映射关系`);
            }

            return { success: true, fixedCount };

        } catch (error) {
            console.error('validateAndFixKnowledgeMappings失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 推断知识点的知识区ID
     */
    inferAreaId(knowledge, knowledgeBases) {
        const knowledgeBase = knowledgeBases.find(kb => kb.id === knowledge.knowledgeBaseId);
        if (!knowledgeBase || !knowledgeBase.areas) {
            return null;
        }

        // 根据category精确匹配
        if (knowledge.category) {
            const exactMatch = knowledgeBase.areas.find(area => area.name === knowledge.category);
            if (exactMatch) {
                return exactMatch.id;
            }

            // 模糊匹配
            const fuzzyMatch = knowledgeBase.areas.find(area => 
                area.name.includes(knowledge.category) || 
                knowledge.category.includes(area.name)
            );
            if (fuzzyMatch) {
                return fuzzyMatch.id;
            }
        }

        // 返回第一个知识区作为默认
        return knowledgeBase.areas.length > 0 ? knowledgeBase.areas[0].id : null;
    }

    /**
     * 增强的按知识区ID获取知识点方法
     * 包含数据一致性检查
     */
    getKnowledgeByAreaId(areaId) {
        try {
            if (!areaId) {
                console.warn('getKnowledgeByAreaId: areaId参数为空');
                return [];
            }

            const data = this.getData();
            if (!data || !Array.isArray(data.knowledge)) {
                console.warn('getKnowledgeByAreaId: 知识点数据无效');
                return [];
            }

            // 查找包含该知识区的知识库
            const targetKnowledgeBase = data.knowledgeBases?.find(kb => 
                kb.areas?.some(area => area.id === areaId)
            );

            if (!targetKnowledgeBase) {
                console.warn(`getKnowledgeByAreaId: 知识区 ${areaId} 不存在`);
                return [];
            }

            // 获取匹配的知识点
            const matchedKnowledge = data.knowledge.filter(k => {
                // 主要匹配条件：areaId和knowledgeBaseId都匹配
                return k.areaId === areaId && k.knowledgeBaseId === targetKnowledgeBase.id;
            });

            console.log(`getKnowledgeByAreaId(${areaId}): 返回 ${matchedKnowledge.length} 个知识点`);
            return matchedKnowledge;

        } catch (error) {
            console.error('getKnowledgeByAreaId失败:', error);
            return [];
        }
    }

    // 初始化数据结构
    initializeData() {
        return {
            knowledgeBases: [
                {
                    id: 'default_base',
                    name: '默认知识库',
                    description: '系统默认的知识库',
                    icon: '📚',
                    color: '#667eea',
                    areas: [
                        {
                            id: 'default_area',
                            name: '默认知识区',
                            description: '默认的知识区域',
                            color: '#667eea',
                            knowledgePoints: []
                        }
                    ]
                }
            ],
            currentKnowledgeBase: 'default_base',
            knowledge: [],
            mistakes: [],
            reviewHistory: [],
            statistics: {
                totalReviews: 0,
                correctAnswers: 0,
                studyTime: 0,
                streakDays: 0,
                lastStudyDate: null
            }
        };
    }

    // 验证知识点数据结构
    validateKnowledgePoint(knowledge) {
        if (!knowledge || typeof knowledge !== 'object') {
            return false;
        }

        // 必须字段
        const requiredFields = ['id', 'question'];
        for (const field of requiredFields) {
            if (!knowledge[field]) {
                return false;
            }
        }

        // 验证知识点类型
        const validTypes = ['fill', 'choice', 'essay'];
        if (knowledge.type && !validTypes.includes(knowledge.type)) {
            return false;
        }

        // 如果是选择题，验证选择题特有字段
        if (knowledge.type === 'choice') {
            if (!knowledge.options || !Array.isArray(knowledge.options) || knowledge.options.length < 2) {
                return false;
            }
            if (!knowledge.correctAnswer) {
                return false;
            }
            // 验证选择题类型
            const validChoiceTypes = ['single', 'multiple'];
            if (!knowledge.choiceType || !validChoiceTypes.includes(knowledge.choiceType)) {
                return false;
            }
        } else {
            // 填空题或问答题需要有答案
            if (!knowledge.answer) {
                return false;
            }
        }

        return true;
    }

    /**
     * 通过知识区ID查找知识区信息（遍历所有知识库）
     * @param {string} areaId 知识区ID
     * @returns {Object|null} 返回包含知识区信息和所属知识库信息的对象
     */
    findKnowledgeAreaById(areaId) {
        const knowledgeBases = this.getAllKnowledgeBases();
        
        for (const knowledgeBase of knowledgeBases) {
            if (knowledgeBase.areas) {
                const area = knowledgeBase.areas.find(area => area.id === areaId);
                if (area) {
                    return {
                        area: area,
                        knowledgeBase: knowledgeBase,
                        knowledgeBaseId: knowledgeBase.id
                    };
                }
            }
        }
        
        return null;
    }
}

// 初始化存储管理器
window.storageManager = new StorageManager(); 