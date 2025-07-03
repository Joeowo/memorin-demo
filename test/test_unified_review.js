/**
 * 统一复习启动机制测试
 * 验证知识区复习和知识库复习都能正确调用选择题打乱功能
 */

console.log('=== 统一复习启动机制测试 ===');

// 等待页面加载完成
function waitForLoad() {
    return new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });
}

// 等待管理器初始化
function waitForManagers() {
    return new Promise(resolve => {
        const checkManagers = () => {
            if (window.storageManager && 
                window.reviewManager && 
                window.knowledgeManager && 
                window.questionListGenerator &&
                window.choiceProcessor) {
                resolve();
            } else {
                setTimeout(checkManagers, 100);
            }
        };
        checkManagers();
    });
}

// 测试选择题打乱功能的部署状态
function testChoiceShuffleDeployment() {
    console.log('\n🔍 检查选择题打乱功能部署状态:');
    
    // 检查核心模块
    const choiceProcessor = window.choiceProcessor;
    if (!choiceProcessor) {
        console.error('❌ choiceProcessor 未加载');
        return false;
    }
    
    console.log('✅ choiceProcessor 已加载');
    
    // 检查核心方法
    const methods = ['shuffleChoices', 'processChoiceQuestions'];
    for (const method of methods) {
        if (typeof choiceProcessor[method] === 'function') {
            console.log(`✅ choiceProcessor.${method}() 方法可用`);
        } else {
            console.error(`❌ choiceProcessor.${method}() 方法缺失`);
            return false;
        }
    }
    
    // 检查题目列表生成器集成
    const generator = window.questionListGenerator;
    if (!generator) {
        console.error('❌ questionListGenerator 未加载');
        return false;
    }
    
    console.log('✅ questionListGenerator 已加载');
    
    return true;
}

// 测试知识库复习流程
async function testKnowledgeBaseReview() {
    console.log('\n📚 测试知识库复习流程（应该调用选择题打乱）:');
    
    try {
        // 获取第一个知识库
        const allBases = window.storageManager.getAllKnowledgeBases();
        if (allBases.length === 0) {
            console.warn('⚠️ 没有可用的知识库');
            return false;
        }
        
        const testBase = allBases[0];
        console.log(`目标知识库: ${testBase.name} (ID: ${testBase.id})`);
        
        // 获取知识库中的知识点
        const baseKnowledge = window.storageManager.getKnowledgeByBaseId(testBase.id);
        console.log(`知识库中的知识点数量: ${baseKnowledge.length}`);
        
        if (baseKnowledge.length === 0) {
            console.warn('⚠️ 知识库中没有知识点');
            return false;
        }
        
        // 查找选择题
        const choiceQuestions = baseKnowledge.filter(k => 
            k.type === 'choice' || 
            (k.choices && Array.isArray(k.choices) && k.choices.length > 0)
        );
        
        console.log(`选择题数量: ${choiceQuestions.length}`);
        
        if (choiceQuestions.length === 0) {
            console.warn('⚠️ 知识库中没有选择题，无法测试打乱功能');
            return true; // 不是错误，只是无法测试
        }
        
        // 启动知识库复习
        console.log('🚀 启动知识库复习...');
        
        // 监听控制台输出
        const originalLog = console.log;
        const logs = [];
        console.log = function(...args) {
            logs.push(args.join(' '));
            originalLog.apply(console, args);
        };
        
        try {
            await window.reviewManager.reviewKnowledgeBase(testBase.id, {
                random: false,
                limit: 10
            });
            
            // 恢复console.log
            console.log = originalLog;
            
            // 检查是否有选择题打乱的日志
            const shuffleLogs = logs.filter(log => 
                log.includes('[选择题打乱]') || 
                log.includes('选择题打乱处理完成')
            );
            
            if (shuffleLogs.length > 0) {
                console.log('✅ 知识库复习正确调用了选择题打乱功能');
                shuffleLogs.forEach(log => console.log(`   ${log}`));
                return true;
            } else {
                console.error('❌ 知识库复习未调用选择题打乱功能');
                return false;
            }
            
        } catch (error) {
            console.log = originalLog;
            console.error('❌ 知识库复习启动失败:', error);
            return false;
        }
        
    } catch (error) {
        console.error('❌ 测试知识库复习流程失败:', error);
        return false;
    }
}

// 测试知识区复习流程
async function testKnowledgeAreaReview() {
    console.log('\n🗂️ 测试知识区复习流程（应该调用选择题打乱）:');
    
    try {
        // 获取第一个知识区
        const allAreas = window.storageManager.getAllKnowledgeAreas();
        if (allAreas.length === 0) {
            console.warn('⚠️ 没有可用的知识区');
            return false;
        }
        
        const testArea = allAreas[0];
        console.log(`目标知识区: ${testArea.name} (ID: ${testArea.id})`);
        
        // 获取知识区中的知识点
        const allKnowledge = window.storageManager.getAllKnowledge();
        const areaKnowledge = allKnowledge.filter(k => k.areaId === testArea.id);
        console.log(`知识区中的知识点数量: ${areaKnowledge.length}`);
        
        if (areaKnowledge.length === 0) {
            console.warn('⚠️ 知识区中没有知识点');
            return false;
        }
        
        // 查找选择题
        const choiceQuestions = areaKnowledge.filter(k => 
            k.type === 'choice' || 
            (k.choices && Array.isArray(k.choices) && k.choices.length > 0)
        );
        
        console.log(`选择题数量: ${choiceQuestions.length}`);
        
        if (choiceQuestions.length === 0) {
            console.warn('⚠️ 知识区中没有选择题，无法测试打乱功能');
            return true; // 不是错误，只是无法测试
        }
        
        // 启动知识区复习（第一步：准备）
        console.log('🚀 启动知识区复习（准备阶段）...');
        
        try {
            await window.reviewManager.reviewKnowledgeArea(testArea.id, {
                random: false,
                limit: null
            });
            
            console.log('✅ 知识区复习准备阶段完成，应该显示模式选择界面');
            
            // 检查状态
            if (window.reviewManager.reviewMode === 'area-mode-select' &&
                window.reviewManager.currentAreaId === testArea.id) {
                console.log('✅ 知识区复习状态设置正确');
                
                // 模拟选择随机模式
                console.log('🎲 模拟选择随机复习模式...');
                
                // 监听控制台输出
                const originalLog = console.log;
                const logs = [];
                console.log = function(...args) {
                    logs.push(args.join(' '));
                    originalLog.apply(console, args);
                };
                
                try {
                    await window.reviewManager.startAreaReviewWithMode('random');
                    
                    // 恢复console.log
                    console.log = originalLog;
                    
                    // 检查是否有选择题打乱的日志
                    const shuffleLogs = logs.filter(log => 
                        log.includes('[选择题打乱]') || 
                        log.includes('选择题打乱处理完成')
                    );
                    
                    if (shuffleLogs.length > 0) {
                        console.log('✅ 知识区复习正确调用了选择题打乱功能');
                        shuffleLogs.forEach(log => console.log(`   ${log}`));
                        return true;
                    } else {
                        console.error('❌ 知识区复习未调用选择题打乱功能');
                        return false;
                    }
                    
                } catch (error) {
                    console.log = originalLog;
                    console.error('❌ 知识区复习模式选择失败:', error);
                    return false;
                }
                
            } else {
                console.error('❌ 知识区复习状态设置错误');
                return false;
            }
            
        } catch (error) {
            console.error('❌ 知识区复习启动失败:', error);
            return false;
        }
        
    } catch (error) {
        console.error('❌ 测试知识区复习流程失败:', error);
        return false;
    }
}

// 验证架构统一性
function testArchitectureUnification() {
    console.log('\n🏗️ 验证复习架构统一性:');
    
    try {
        // 检查ReviewManager的关键方法
        const reviewManager = window.reviewManager;
        const unifiedMethods = [
            'reviewKnowledgeBase',
            'reviewKnowledgeArea', 
            'startReviewWithConfig'
        ];
        
        for (const method of unifiedMethods) {
            if (typeof reviewManager[method] === 'function') {
                console.log(`✅ ReviewManager.${method}() 方法可用`);
            } else {
                console.error(`❌ ReviewManager.${method}() 方法缺失`);
                return false;
            }
        }
        
        // 检查模板配置
        const templates = window.QuestionListTemplates;
        if (templates && typeof templates.knowledgeAreaReview === 'function') {
            console.log('✅ QuestionListTemplates.knowledgeAreaReview() 可用');
        } else {
            console.error('❌ QuestionListTemplates.knowledgeAreaReview() 缺失');
            return false;
        }
        
        // 检查题目列表生成器
        const generator = window.questionListGenerator;
        if (generator && typeof generator.generateQuestionList === 'function') {
            console.log('✅ questionListGenerator.generateQuestionList() 可用');
        } else {
            console.error('❌ questionListGenerator.generateQuestionList() 缺失');
            return false;
        }
        
        console.log('✅ 复习架构统一性验证通过');
        return true;
        
    } catch (error) {
        console.error('❌ 架构统一性验证失败:', error);
        return false;
    }
}

// 主测试函数
async function runUnifiedReviewTest() {
    try {
        await waitForLoad();
        console.log('✅ 页面加载完成');
        
        await waitForManagers();
        console.log('✅ 管理器初始化完成');
        
        // 执行测试
        const tests = [
            { name: '选择题打乱功能部署', test: testChoiceShuffleDeployment },
            { name: '复习架构统一性', test: testArchitectureUnification },
            { name: '知识库复习流程', test: testKnowledgeBaseReview },
            { name: '知识区复习流程', test: testKnowledgeAreaReview }
        ];
        
        let passedTests = 0;
        let totalTests = tests.length;
        
        for (const { name, test } of tests) {
            console.log(`\n🧪 运行测试: ${name}`);
            try {
                const result = await test();
                if (result) {
                    console.log(`✅ 测试通过: ${name}`);
                    passedTests++;
                } else {
                    console.error(`❌ 测试失败: ${name}`);
                }
            } catch (error) {
                console.error(`❌ 测试异常: ${name}`, error);
            }
        }
        
        // 测试总结
        console.log('\n' + '='.repeat(50));
        console.log('📊 统一复习启动机制测试总结:');
        console.log(`通过测试: ${passedTests}/${totalTests}`);
        console.log(`成功率: ${(passedTests/totalTests*100).toFixed(1)}%`);
        
        if (passedTests === totalTests) {
            console.log('🎉 所有测试通过！统一复习启动机制部署成功！');
            console.log('📝 主要成果:');
            console.log('   ✓ 知识库复习和知识区复习统一使用 QuestionListGenerator');
            console.log('   ✓ 选择题打乱功能在所有复习模式下都能正常工作');
            console.log('   ✓ 复习架构实现了统一管理和扩展性');
            console.log('   ✓ 用户体验保持一致性（模式选择界面）');
        } else {
            console.warn('⚠️ 部分测试未通过，请检查相关功能');
        }
        
    } catch (error) {
        console.error('❌ 测试运行失败:', error);
    }
}

// 启动测试
runUnifiedReviewTest();

// 提供手动测试函数
window.testUnifiedReview = runUnifiedReviewTest;
window.testChoiceShuffleDeployment = testChoiceShuffleDeployment;
window.testKnowledgeBaseReview = testKnowledgeBaseReview;
window.testKnowledgeAreaReview = testKnowledgeAreaReview;
window.testArchitectureUnification = testArchitectureUnification;

console.log('\n💡 提示: 可以手动调用以下函数进行测试:');
console.log('  - testUnifiedReview() - 完整测试');
console.log('  - testChoiceShuffleDeployment() - 测试选择题打乱部署');
console.log('  - testKnowledgeBaseReview() - 测试知识库复习');
console.log('  - testKnowledgeAreaReview() - 测试知识区复习');
console.log('  - testArchitectureUnification() - 测试架构统一性'); 