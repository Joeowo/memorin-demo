/**
 * 选择题处理器
 * 负责选择题选项打乱和答案映射
 */
class ChoiceProcessor {
    /**
     * 打乱选择题选项
     * @param {Object} knowledge 原始知识点对象
     * @returns {Object} 打乱后的知识点对象
     */
    static shuffleChoiceOptions(knowledge) {
        if (knowledge.type !== 'choice' || !knowledge.options || knowledge.options.length <= 1) {
            return knowledge;
        }
        
        try {
            // 1. 解析原始正确答案
            const originalCorrectKeys = knowledge.correctAnswer.split(',').map(s => s.trim());
            
            // 2. 获取原始正确答案对应的文本内容
            const correctTexts = originalCorrectKeys.map(key => {
                const option = knowledge.options.find(opt => opt.key === key);
                if (!option) {
                    console.warn(`[选择题打乱] 找不到key为${key}的选项`, knowledge.id);
                    return null;
                }
                return option.text;
            }).filter(text => text !== null);
            
            // 3. 创建选项文本数组并打乱
            const optionTexts = knowledge.options.map(opt => opt.text);
            const shuffledTexts = this.shuffleArray([...optionTexts]);
            
            // 4. 重新分配key并创建新的选项数组
            const availableKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            const shuffledOptions = shuffledTexts.map((text, index) => ({
                key: availableKeys[index],
                text: text
            }));
            
            // 5. 根据正确答案的文本内容，找到新的key
            const newCorrectKeys = correctTexts.map(correctText => {
                const newOption = shuffledOptions.find(opt => opt.text === correctText);
                if (!newOption) {
                    console.warn(`[选择题打乱] 打乱后找不到文本为"${correctText}"的选项`, knowledge.id);
                    return null;
                }
                return newOption.key;
            }).filter(key => key !== null);
            
            // 6. 验证处理结果
            if (newCorrectKeys.length !== originalCorrectKeys.length) {
                console.warn(`[选择题打乱] 打乱过程中丢失了部分正确答案，使用原始数据`, knowledge.id);
                return knowledge;
            }
            
            // 7. 创建打乱后的知识点对象
            const shuffledKnowledge = {
                ...knowledge,
                options: shuffledOptions,
                correctAnswer: newCorrectKeys.join(','),
                // 调试信息（可选）
                _shuffleInfo: {
                    originalCorrectKeys,
                    correctTexts,
                    newCorrectKeys,
                    isShuffled: true,
                    shuffleTimestamp: Date.now()
                }
            };
            
            // 发送简要信息到浏览器控制台
            console.log(`[选择题打乱] ID:${knowledge.id || '未知'} ${originalCorrectKeys.join(',')}→${newCorrectKeys.join(',')} [${knowledge.question?.substring(0, 20) || ''}...]`);
            
            return shuffledKnowledge;
            
        } catch (error) {
            console.error('[选择题打乱] 处理失败:', error, knowledge.id);
            return knowledge; // 失败时返回原始数据
        }
    }
    
    /**
     * 批量处理选择题打乱
     * @param {Array} questions 题目列表
     * @param {Object} options 配置选项
     * @returns {Array} 处理后的题目列表
     */
    static batchShuffleChoiceQuestions(questions, options = {}) {
        const { enabled = true, logSummary = true } = options;
        
        if (!enabled) {
            console.log('[选择题打乱] 功能已禁用，跳过处理');
            return questions;
        }
        
        let choiceCount = 0;
        let shuffledCount = 0;
        
        const processedQuestions = questions.map(question => {
            if (question.type === 'choice') {
                choiceCount++;
                const originalLength = question.options?.length || 0;
                const shuffled = this.shuffleChoiceOptions(question);
                
                if (shuffled._shuffleInfo?.isShuffled) {
                    shuffledCount++;
                }
                
                return shuffled;
            }
            return question;
        });
        
        if (logSummary && choiceCount > 0) {
            console.log(`[选择题打乱] 批量处理完成: ${choiceCount}道选择题，${shuffledCount}道已打乱`);
        }
        
        return processedQuestions;
    }
    
    /**
     * 验证打乱处理的正确性
     * @param {Object} original 原始知识点
     * @param {Object} shuffled 打乱后的知识点
     * @returns {Boolean} 验证是否通过
     */
    static validateShuffleResult(original, shuffled) {
        try {
            // 1. 检查选项数量
            if (original.options.length !== shuffled.options.length) {
                return false;
            }
            
            // 2. 检查所有原始选项文本是否都存在于打乱后的选项中
            const originalTexts = original.options.map(opt => opt.text).sort();
            const shuffledTexts = shuffled.options.map(opt => opt.text).sort();
            
            if (JSON.stringify(originalTexts) !== JSON.stringify(shuffledTexts)) {
                console.error('[选择题打乱] 选项文本不一致', { originalTexts, shuffledTexts });
                return false;
            }
            
            // 3. 验证正确答案的映射
            const originalCorrectKeys = original.correctAnswer.split(',').map(s => s.trim());
            const shuffledCorrectKeys = shuffled.correctAnswer.split(',').map(s => s.trim());
            
            // 获取原始正确答案对应的文本
            const originalCorrectTexts = originalCorrectKeys.map(key => {
                const option = original.options.find(opt => opt.key === key);
                return option ? option.text : null;
            }).filter(text => text !== null).sort();
            
            // 获取打乱后正确答案对应的文本
            const shuffledCorrectTexts = shuffledCorrectKeys.map(key => {
                const option = shuffled.options.find(opt => opt.key === key);
                return option ? option.text : null;
            }).filter(text => text !== null).sort();
            
            // 两者应该完全一致
            if (JSON.stringify(originalCorrectTexts) !== JSON.stringify(shuffledCorrectTexts)) {
                console.error('[选择题打乱] 正确答案文本映射不一致', { 
                    originalCorrectTexts, 
                    shuffledCorrectTexts 
                });
                return false;
            }
            
            return true;
            
        } catch (error) {
            console.error('[选择题打乱] 验证时出错:', error);
            return false;
        }
    }
    
    /**
     * 数组打乱工具函数 (Fisher-Yates算法)
     * @param {Array} array 要打乱的数组
     * @returns {Array} 打乱后的新数组
     */
    static shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    /**
     * 获取选择题统计信息
     * @param {Array} questions 题目列表
     * @returns {Object} 统计信息
     */
    static getChoiceStatistics(questions) {
        const choiceQuestions = questions.filter(q => q.type === 'choice');
        const shuffledQuestions = choiceQuestions.filter(q => q._shuffleInfo?.isShuffled);
        
        return {
            totalQuestions: questions.length,
            choiceQuestions: choiceQuestions.length,
            shuffledQuestions: shuffledQuestions.length,
            shuffleRate: choiceQuestions.length > 0 ? (shuffledQuestions.length / choiceQuestions.length * 100).toFixed(1) + '%' : '0%'
        };
    }
}

// 全局配置
ChoiceProcessor.config = {
    // 是否启用选择题打乱功能
    enabled: true,
    // 是否显示详细日志
    verbose: false,
    // 是否显示处理摘要
    showSummary: true
};

// 导出到全局
if (typeof window !== 'undefined') {
    window.ChoiceProcessor = ChoiceProcessor;
    console.log('[选择题处理器] 模块已加载');
} 