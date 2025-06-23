// 数据迁移和重构模块
class DataMigrationManager {
    constructor() {
        this.currentVersion = '2.0.0';
        this.supportedVersions = ['1.0.0', '1.5.0', '2.0.0'];
        this.migrationStrategies = new Map();
        this.fieldMappings = new Map();
        this.validationRules = new Map();
        
        this.initializeMigrationStrategies();
        this.initializeFieldMappings();
        this.initializeValidationRules();
    }

    /**
     * 执行完整的数据重构
     * @returns {Object} 重构结果
     */
    async executeFullDataRestructure() {
        console.log('=== 开始执行完整数据重构 ===');
        
        try {
            const data = window.storageManager.getData();
            if (!data) {
                throw new Error('无法获取数据');
            }

            const restructureResult = {
                originalDataVersion: this.detectDataVersion(data),
                targetVersion: this.currentVersion,
                migratedKnowledgeBases: 0,
                migratedKnowledge: 0,
                fixedKnowledgeBaseIds: 0,
                normalizedFields: 0,
                validationErrors: [],
                migrationLog: []
            };

            // 1. 检测并迁移数据版本
            const versionMigrated = await this.migrateDataVersion(data, restructureResult);
            
            // 2. 重构知识库结构
            const kbRestructured = await this.restructureKnowledgeBases(data, restructureResult);
            
            // 3. 修复知识点字段映射
            const fieldsFixed = await this.fixKnowledgeFieldMappings(data, restructureResult);
            
            // 4. 标准化数据格式
            const dataNormalized = await this.normalizeDataStructure(data, restructureResult);
            
            // 5. 验证数据完整性
            const validationResult = await this.validateDataIntegrity(data, restructureResult);
            
            // 6. 保存重构后的数据
            const saved = window.storageManager.setData(data);
            if (!saved) {
                throw new Error('保存重构后的数据失败');
            }

            restructureResult.success = true;
            restructureResult.migrationLog.push('数据重构完成并保存成功');
            
            console.log('数据重构完成:', restructureResult);
            return restructureResult;

        } catch (error) {
            console.error('数据重构失败:', error);
            return {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * 检测数据版本
     */
    detectDataVersion(data) {
        // 检测数据结构特征来判断版本
        if (data.knowledgeBases && Array.isArray(data.knowledgeBases)) {
            if (data.version) {
                return data.version;
            } else if (data.knowledge && data.knowledge.length > 0) {
                // 检查知识点是否有knowledgeBaseId字段
                const hasKnowledgeBaseId = data.knowledge.some(k => k.knowledgeBaseId);
                return hasKnowledgeBaseId ? '1.5.0' : '1.0.0';
            }
            return '2.0.0';
        } else if (data.knowledgeBase) {
            // 旧的单知识库结构
            return '1.0.0';
        }
        return 'unknown';
    }

    /**
     * 数据版本迁移
     */
    async migrateDataVersion(data, result) {
        const currentVersion = this.detectDataVersion(data);
        result.migrationLog.push(`检测到数据版本: ${currentVersion}`);

        if (currentVersion === this.currentVersion) {
            result.migrationLog.push('数据版本已是最新，跳过版本迁移');
            return true;
        }

        // 从旧的单知识库结构迁移到多知识库结构
        if (currentVersion === '1.0.0' && data.knowledgeBase) {
            result.migrationLog.push('执行1.0.0 -> 2.0.0版本迁移');
            
            // 将单知识库转换为多知识库结构
            const singleKB = data.knowledgeBase;
            data.knowledgeBases = [{
                id: singleKB.id || 'migrated_knowledge_base',
                name: singleKB.name || '迁移的知识库',
                description: singleKB.description || '从旧版本迁移的知识库',
                icon: singleKB.icon || '📚',
                color: singleKB.color || '#667eea',
                areas: singleKB.areas || [],
                createdAt: singleKB.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }];
            
            // 删除旧的knowledgeBase字段
            delete data.knowledgeBase;
            
            result.migratedKnowledgeBases = 1;
            result.migrationLog.push('单知识库结构迁移完成');
        }

        // 设置新的数据版本
        data.version = this.currentVersion;
        data.lastMigration = new Date().toISOString();
        
        return true;
    }

    /**
     * 重构知识库结构
     */
    async restructureKnowledgeBases(data, result) {
        if (!data.knowledgeBases || !Array.isArray(data.knowledgeBases)) {
            // 如果没有知识库，创建默认知识库
            data.knowledgeBases = [this.createDefaultKnowledgeBase()];
            result.migratedKnowledgeBases = 1;
            result.migrationLog.push('创建了默认知识库');
        }

        // 确保每个知识库都有必要的字段
        data.knowledgeBases = data.knowledgeBases.map(kb => {
            const restructured = {
                id: kb.id || this.generateId(),
                name: kb.name || '未命名知识库',
                description: kb.description || '',
                icon: kb.icon || '📚',
                color: kb.color || '#667eea',
                areas: Array.isArray(kb.areas) ? kb.areas : [],
                createdAt: kb.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                metadata: {
                    totalKnowledge: 0,
                    lastActivity: null,
                    tags: []
                }
            };

            // 确保知识区也有必要的字段
            restructured.areas = restructured.areas.map(area => ({
                id: area.id || this.generateId(),
                name: area.name || '未命名知识区',
                description: area.description || '',
                color: area.color || kb.color || '#667eea',
                knowledgePoints: Array.isArray(area.knowledgePoints) ? area.knowledgePoints : [],
                createdAt: area.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }));

            return restructured;
        });

        result.migrationLog.push(`重构了 ${data.knowledgeBases.length} 个知识库结构`);
        return true;
    }

    /**
     * 修复知识点字段映射
     */
    async fixKnowledgeFieldMappings(data, result) {
        if (!data.knowledge || !Array.isArray(data.knowledge)) {
            data.knowledge = [];
            result.migrationLog.push('初始化了空的知识点数组');
            return true;
        }

        let fixedCount = 0;
        const knowledgeBaseMap = this.buildKnowledgeBaseMap(data.knowledgeBases);

        data.knowledge = data.knowledge.map(k => {
            const original = { ...k };
            let wasFixed = false;

            // 修复knowledgeBaseId字段
            if (!k.knowledgeBaseId || !knowledgeBaseMap.has(k.knowledgeBaseId)) {
                const inferredBaseId = this.inferKnowledgeBaseId(k, knowledgeBaseMap);
                if (inferredBaseId !== k.knowledgeBaseId) {
                    k.knowledgeBaseId = inferredBaseId;
                    wasFixed = true;
                }
            }

            // 修复areaId字段
            if (!k.areaId) {
                const inferredAreaId = this.inferAreaId(k, data.knowledgeBases);
                if (inferredAreaId) {
                    k.areaId = inferredAreaId;
                    wasFixed = true;
                }
            }

            // 标准化必要字段
            const standardized = this.standardizeKnowledgeFields(k);
            if (JSON.stringify(standardized) !== JSON.stringify(k)) {
                Object.assign(k, standardized);
                wasFixed = true;
            }

            if (wasFixed) {
                fixedCount++;
                result.migrationLog.push(`修复知识点字段映射: ${k.id} (${k.question?.substring(0, 30)}...)`);
            }

            return k;
        });

        result.fixedKnowledgeBaseIds = fixedCount;
        result.migrationLog.push(`修复了 ${fixedCount} 个知识点的字段映射`);
        return true;
    }

    /**
     * 推断知识点的知识库ID
     */
    inferKnowledgeBaseId(knowledge, knowledgeBaseMap) {
        // 1. 根据category推断
        if (knowledge.category) {
            const category = knowledge.category.toLowerCase();
            
            // 军事理论相关
            if (category.includes('国防') || category.includes('军事') || 
                category.includes('战争') || category.includes('安全') || 
                category.includes('装备')) {
                if (knowledgeBaseMap.has('military_theory_base')) {
                    return 'military_theory_base';
                }
            }
            
            // 软件工程相关
            if (category.includes('软件') || category.includes('需求') || 
                category.includes('设计') || category.includes('测试') || 
                category.includes('部署') || category.includes('实现')) {
                if (knowledgeBaseMap.has('software_engineering_base')) {
                    return 'software_engineering_base';
                }
            }
        }

        // 2. 根据ID前缀推断
        if (knowledge.id) {
            if (knowledge.id.startsWith('mil_') && knowledgeBaseMap.has('military_theory_base')) {
                return 'military_theory_base';
            }
            if (knowledge.id.startsWith('se_') && knowledgeBaseMap.has('software_engineering_base')) {
                return 'software_engineering_base';
            }
        }

        // 3. 根据标签推断
        if (knowledge.tags && Array.isArray(knowledge.tags)) {
            const tags = knowledge.tags.join(' ').toLowerCase();
            if (tags.includes('军事') || tags.includes('国防')) {
                if (knowledgeBaseMap.has('military_theory_base')) {
                    return 'military_theory_base';
                }
            }
            if (tags.includes('软件') || tags.includes('编程')) {
                if (knowledgeBaseMap.has('software_engineering_base')) {
                    return 'software_engineering_base';
                }
            }
        }

        // 4. 默认使用第一个知识库或创建默认知识库
        const knowledgeBaseIds = Array.from(knowledgeBaseMap.keys());
        return knowledgeBaseIds.length > 0 ? knowledgeBaseIds[0] : 'default_base';
    }

    /**
     * 推断知识点的知识区ID
     */
    inferAreaId(knowledge, knowledgeBases) {
        const knowledgeBase = knowledgeBases.find(kb => kb.id === knowledge.knowledgeBaseId);
        if (!knowledgeBase || !knowledgeBase.areas) {
            return null;
        }

        // 根据category匹配知识区
        if (knowledge.category) {
            const matchedArea = knowledgeBase.areas.find(area => 
                area.name === knowledge.category || 
                area.name.includes(knowledge.category) ||
                knowledge.category.includes(area.name)
            );
            if (matchedArea) {
                return matchedArea.id;
            }
        }

        // 如果没有匹配的知识区，返回第一个知识区或null
        return knowledgeBase.areas.length > 0 ? knowledgeBase.areas[0].id : null;
    }

    /**
     * 标准化知识点字段
     */
    standardizeKnowledgeFields(knowledge) {
        return {
            id: knowledge.id || this.generateId(),
            question: knowledge.question || '',
            answer: knowledge.answer || '',
            type: knowledge.type || 'fill', // 默认填空题
            explanation: knowledge.explanation || '',
            note: knowledge.note || '',
            tags: Array.isArray(knowledge.tags) ? knowledge.tags : [],
            category: knowledge.category || '',
            difficulty: Number(knowledge.difficulty) || 3,
            score: knowledge.score !== undefined ? Number(knowledge.score) : null,
            
            // 复习相关字段
            reviewCount: Number(knowledge.reviewCount) || 0,
            correctCount: Number(knowledge.correctCount) || 0,
            lastReviewed: knowledge.lastReviewed || null,
            nextReview: knowledge.nextReview || new Date().toISOString(),
            interval: Number(knowledge.interval) || 1,
            easeFactor: Number(knowledge.easeFactor) || 2.5,
            
            // 关联字段
            knowledgeBaseId: knowledge.knowledgeBaseId || '',
            areaId: knowledge.areaId || '',
            
            // 选择题特有字段
            ...(knowledge.type === 'choice' ? {
                options: Array.isArray(knowledge.options) ? knowledge.options : [],
                correctAnswer: knowledge.correctAnswer || '',
                choiceType: knowledge.choiceType || 'single'
            } : {}),
            
            // 时间戳
            createdAt: knowledge.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    /**
     * 标准化数据结构
     */
    async normalizeDataStructure(data, result) {
        let normalizedCount = 0;

        // 确保有必要的根级字段
        const requiredFields = {
            version: this.currentVersion,
            knowledgeBases: [],
            knowledge: [],
            mistakes: [],
            reviewHistory: [],
            statistics: {
                totalReviews: 0,
                correctAnswers: 0,
                studyTime: 0,
                streakDays: 0,
                lastStudyDate: null
            },
            settings: {
                theme: 'light',
                reviewOrder: 'smart',
                autoAdvance: false,
                showExplanation: true
            }
        };

        for (const [field, defaultValue] of Object.entries(requiredFields)) {
            if (!(field in data)) {
                data[field] = defaultValue;
                normalizedCount++;
            }
        }

        // 确保统计数据的正确性
        if (data.statistics && typeof data.statistics === 'object') {
            const statsFields = {
                totalReviews: 0,
                correctAnswers: 0,
                studyTime: 0,
                streakDays: 0,
                lastStudyDate: null
            };
            
            for (const [field, defaultValue] of Object.entries(statsFields)) {
                if (!(field in data.statistics)) {
                    data.statistics[field] = defaultValue;
                    normalizedCount++;
                }
            }
        }

        result.normalizedFields = normalizedCount;
        result.migrationLog.push(`标准化了 ${normalizedCount} 个数据字段`);
        return true;
    }

    /**
     * 验证数据完整性
     */
    async validateDataIntegrity(data, result) {
        const errors = [];

        // 验证知识库结构
        if (!Array.isArray(data.knowledgeBases)) {
            errors.push('知识库数据不是数组格式');
        } else {
            data.knowledgeBases.forEach((kb, index) => {
                if (!kb.id) errors.push(`知识库[${index}]缺少id字段`);
                if (!kb.name) errors.push(`知识库[${index}]缺少name字段`);
                if (!Array.isArray(kb.areas)) errors.push(`知识库[${index}]的areas不是数组格式`);
            });
        }

        // 验证知识点结构
        if (!Array.isArray(data.knowledge)) {
            errors.push('知识点数据不是数组格式');
        } else {
            const knowledgeBaseIds = new Set(data.knowledgeBases.map(kb => kb.id));
            data.knowledge.forEach((k, index) => {
                if (!k.id) errors.push(`知识点[${index}]缺少id字段`);
                if (!k.question) errors.push(`知识点[${index}]缺少question字段`);
                if (!k.knowledgeBaseId) {
                    errors.push(`知识点[${index}]缺少knowledgeBaseId字段`);
                } else if (!knowledgeBaseIds.has(k.knowledgeBaseId)) {
                    errors.push(`知识点[${index}]的knowledgeBaseId(${k.knowledgeBaseId})不存在`);
                }
            });
        }

        result.validationErrors = errors;
        result.migrationLog.push(`数据验证完成，发现 ${errors.length} 个错误`);

        return errors.length === 0;
    }

    /**
     * 创建默认知识库
     */
    createDefaultKnowledgeBase() {
        return {
            id: 'default_base',
            name: '默认知识库',
            description: '系统默认的知识库',
            icon: '📚',
            color: '#667eea',
            areas: [{
                id: 'default_area',
                name: '默认知识区',
                description: '默认的知识区域',
                color: '#667eea',
                knowledgePoints: []
            }],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            metadata: {
                totalKnowledge: 0,
                lastActivity: null,
                tags: []
            }
        };
    }

    /**
     * 构建知识库映射
     */
    buildKnowledgeBaseMap(knowledgeBases) {
        const map = new Map();
        if (Array.isArray(knowledgeBases)) {
            knowledgeBases.forEach(kb => {
                map.set(kb.id, kb);
            });
        }
        return map;
    }

    /**
     * 生成唯一ID
     */
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 初始化迁移策略
     */
    initializeMigrationStrategies() {
        // 这里可以注册不同版本的迁移策略
        this.migrationStrategies.set('1.0.0->2.0.0', this.migrate_1_0_to_2_0.bind(this));
        this.migrationStrategies.set('1.5.0->2.0.0', this.migrate_1_5_to_2_0.bind(this));
    }

    /**
     * 初始化字段映射
     */
    initializeFieldMappings() {
        // 定义字段映射规则
        this.fieldMappings.set('knowledge', {
            'base_id': 'knowledgeBaseId',
            'area_id': 'areaId',
            'created_time': 'createdAt',
            'updated_time': 'updatedAt'
        });
    }

    /**
     * 初始化验证规则
     */
    initializeValidationRules() {
        // 定义数据验证规则
        this.validationRules.set('knowledge', {
            required: ['id', 'question', 'knowledgeBaseId'],
            types: {
                'id': 'string',
                'question': 'string',
                'difficulty': 'number',
                'tags': 'array'
            }
        });
    }

    /**
     * 1.0.0 到 2.0.0 迁移
     */
    async migrate_1_0_to_2_0(data) {
        // 具体的迁移逻辑
        console.log('执行1.0.0到2.0.0的数据迁移');
        return true;
    }

    /**
     * 1.5.0 到 2.0.0 迁移
     */
    async migrate_1_5_to_2_0(data) {
        // 具体的迁移逻辑
        console.log('执行1.5.0到2.0.0的数据迁移');
        return true;
    }
}

// 全局实例
window.dataMigrationManager = new DataMigrationManager();

// 便捷的全局函数
window.executeDataRestructure = async function() {
    console.log('开始执行数据重构...');
    
    try {
        const result = await window.dataMigrationManager.executeFullDataRestructure();
        
        if (result.success) {
            const message = `✅ 数据重构成功完成！\n\n重构统计:\n- 迁移知识库: ${result.migratedKnowledgeBases}个\n- 修复知识点: ${result.fixedKnowledgeBaseIds}个\n- 标准化字段: ${result.normalizedFields}个\n- 验证错误: ${result.validationErrors.length}个\n\n数据版本: ${result.originalDataVersion} → ${result.targetVersion}`;
            
            if (window.app && window.app.showNotification) {
                window.app.showNotification(message, 'success');
            } else {
                alert(message);
            }
            
            // 刷新相关组件
            if (window.knowledgeManager) {
                window.knowledgeManager.refresh();
            }
            
            if (window.app && window.app.loadDashboard) {
                window.app.loadDashboard();
            }
            
            return result;
        } else {
            throw new Error(result.error || '数据重构失败');
        }
        
    } catch (error) {
        console.error('数据重构失败:', error);
        const errorMessage = '❌ 数据重构失败: ' + error.message;
        
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
        
        return { success: false, error: error.message };
    }
};

console.log('数据迁移管理器已加载，可使用以下命令:');
console.log('- executeDataRestructure() - 执行完整数据重构');
console.log('- window.dataMigrationManager.executeFullDataRestructure() - 获取详细重构结果'); 