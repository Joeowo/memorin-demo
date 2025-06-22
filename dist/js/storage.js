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
                        easeFactor: 2.5
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
                        easeFactor: 2.6
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
                        easeFactor: 2.3
                    }
                ],
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
}

// 初始化存储管理器
window.storageManager = new StorageManager(); 