/**
 * 选择题打乱功能测试
 * 用于验证部署是否成功
 */

// 测试选择题打乱功能
function testChoiceShuffleDeployment() {
    console.log('🧪 开始测试选择题打乱功能部署...\n');
    
    try {
        // 1. 检查模块是否加载
        if (typeof window.ChoiceProcessor === 'undefined') {
            console.error('❌ ChoiceProcessor 模块未加载');
            return false;
        }
        
        console.log('✅ ChoiceProcessor 模块已加载');
        
        // 2. 检查配置
        console.log('📋 当前配置:', ChoiceProcessor.config);
        
        // 3. 测试基础打乱功能
        const testQuestion = {
            id: 'test_choice_001',
            type: 'choice',
            question: '以下哪些是编程语言？',
            options: [
                { key: 'A', text: 'JavaScript' },
                { key: 'B', text: 'HTML' },
                { key: 'C', text: 'Python' },
                { key: 'D', text: 'CSS' }
            ],
            correctAnswer: 'A,C'
        };
        
        console.log('\n📝 原始题目:');
        console.log('正确答案:', testQuestion.correctAnswer);
        testQuestion.options.forEach(opt => {
            console.log(`${opt.key}. ${opt.text}`);
        });
        
        // 执行打乱
        const shuffledQuestion = ChoiceProcessor.shuffleChoiceOptions(testQuestion);
        
        console.log('\n🔀 打乱后:');
        console.log('正确答案:', shuffledQuestion.correctAnswer);
        shuffledQuestion.options.forEach(opt => {
            console.log(`${opt.key}. ${opt.text}`);
        });
        
        // 4. 验证结果
        const isValid = ChoiceProcessor.validateShuffleResult(testQuestion, shuffledQuestion);
        console.log('\n🔍 验证结果:', isValid ? '✅ 通过' : '❌ 失败');
        
        // 5. 测试批量处理
        const testQuestions = [
            testQuestion,
            {
                id: 'test_choice_002',
                type: 'choice',
                question: '关于软件工程，正确的是？',
                options: [
                    { key: 'A', text: '瀑布模型适用于所有项目' },
                    { key: 'B', text: '敏捷开发注重文档' },
                    { key: 'C', text: '需求分析很重要' },
                    { key: 'D', text: '测试是可选的' }
                ],
                correctAnswer: 'C'
            },
            {
                id: 'test_fill_001',
                type: 'fill',
                question: '软件工程的目标是什么？',
                answer: '开发高质量、可维护的软件'
            }
        ];
        
        console.log('\n📦 测试批量处理...');
        const processedQuestions = ChoiceProcessor.batchShuffleChoiceQuestions(testQuestions);
        
        // 6. 统计信息
        const stats = ChoiceProcessor.getChoiceStatistics(processedQuestions);
        console.log('\n📊 处理统计:', stats);
        
        console.log('\n🎉 选择题打乱功能部署测试完成！');
        return true;
        
    } catch (error) {
        console.error('❌ 测试失败:', error);
        return false;
    }
}

// 测试与题目列表生成器的集成
async function testQuestionListGeneratorIntegration() {
    console.log('\n🔗 测试与题目列表生成器的集成...');
    
    try {
        // 检查是否有现有的知识库数据
        if (typeof window.storageManager === 'undefined') {
            console.log('⚠️ 存储管理器未加载，跳过集成测试');
            return;
        }
        
        const knowledgeBases = window.storageManager.getAllKnowledgeBases();
        if (knowledgeBases.length === 0) {
            console.log('⚠️ 没有知识库数据，跳过集成测试');
            return;
        }
        
        // 选择第一个知识库进行测试
        const testBaseId = knowledgeBases[0].id;
        console.log(`📚 使用知识库: ${knowledgeBases[0].name} (${testBaseId})`);
        
        // 生成题目列表
        const generator = new QuestionListGenerator();
        const config = {
            source: {
                type: 'knowledge-base',
                params: { baseId: testBaseId }
            },
            limiter: {
                type: 'fixed-count',
                params: { count: 5 }
            }
        };
        
        console.log('🔄 生成题目列表（应该包含选择题打乱处理）...');
        const questions = await generator.generateQuestionList(config);
        
        // 检查是否有选择题被打乱
        const choiceQuestions = questions.filter(q => q.type === 'choice');
        const shuffledQuestions = choiceQuestions.filter(q => q._shuffleInfo?.isShuffled);
        
        console.log(`📋 生成了 ${questions.length} 道题目`);
        console.log(`🔀 其中 ${choiceQuestions.length} 道选择题，${shuffledQuestions.length} 道已打乱`);
        
        if (shuffledQuestions.length > 0) {
            console.log('✅ 集成测试成功：选择题打乱功能已正常工作');
            
            // 显示一个打乱的例子
            const example = shuffledQuestions[0];
            console.log('\n📖 打乱示例:');
            console.log(`题目: ${example.question.substring(0, 50)}...`);
            console.log(`原始答案: ${example._shuffleInfo.originalCorrectKeys.join(',')}`);
            console.log(`打乱后答案: ${example._shuffleInfo.newCorrectKeys.join(',')}`);
        } else {
            console.log('⚠️ 没有选择题被打乱，可能没有选择题或功能被禁用');
        }
        
    } catch (error) {
        console.error('❌ 集成测试失败:', error);
    }
}

// 选择题打乱功能控制
function toggleChoiceShuffle(enabled) {
    if (typeof window.ChoiceProcessor !== 'undefined') {
        ChoiceProcessor.config.enabled = enabled;
        console.log(`🎛️ 选择题打乱功能已${enabled ? '启用' : '禁用'}`);
    } else {
        console.error('❌ ChoiceProcessor 模块未加载');
    }
}

// 导出测试函数到全局
if (typeof window !== 'undefined') {
    window.testChoiceShuffleDeployment = testChoiceShuffleDeployment;
    window.testQuestionListGeneratorIntegration = testQuestionListGeneratorIntegration;
    window.toggleChoiceShuffle = toggleChoiceShuffle;
    
    console.log('🧪 选择题打乱测试函数已加载');
    console.log('💡 使用方法:');
    console.log('  - testChoiceShuffleDeployment() // 测试基础功能');
    console.log('  - testQuestionListGeneratorIntegration() // 测试集成');
    console.log('  - toggleChoiceShuffle(true/false) // 启用/禁用功能');
} 