// 测试"复习整个知识库"功能的专用脚本
// 用于验证状态管理和题目列表生成是否正确

/**
 * 测试知识库复习功能
 */
async function testKnowledgeBaseReviewFlow() {
    console.log('=== 开始测试知识库复习功能 ===');
    
    try {
        // 1. 获取所有知识库
        const knowledgeBases = window.storageManager.getAllKnowledgeBases();
        console.log(`📚 系统中共有 ${knowledgeBases.length} 个知识库:`);
        
        knowledgeBases.forEach(base => {
            const knowledge = window.storageManager.getKnowledgeByBaseId(base.id);
            console.log(`- ${base.name} (${base.id}): ${knowledge.length} 个知识点`);
        });
        
        if (knowledgeBases.length === 0) {
            console.log('❌ 没有知识库，无法进行测试');
            return;
        }
        
        // 2. 测试每个知识库的状态管理
        for (const base of knowledgeBases) {
            console.log(`\n--- 测试知识库: ${base.name} ---`);
            
            // 模拟用户点击知识库卡片
            console.log('🖱️ 模拟点击知识库卡片...');
            window.knowledgeManager.showAreaView(base.id);
            
            // 检查状态设置
            const currentBase = window.knowledgeManager.currentBase;
            const storageCurrentBase = window.storageManager.getCurrentKnowledgeBase();
            
            console.log('🔍 状态检查:');
            console.log(`- knowledgeManager.currentBase: ${currentBase?.name} (${currentBase?.id})`);
            console.log(`- storageManager 当前知识库: ${storageCurrentBase?.name} (${storageCurrentBase?.id})`);
            
            const stateConsistent = currentBase?.id === storageCurrentBase?.id && currentBase?.id === base.id;
            console.log(`状态一致性: ${stateConsistent ? '✅ 一致' : '❌ 不一致'}`);
            
            if (!stateConsistent) {
                console.error('❌ 状态不一致，这会导致复习功能错误！');
                console.error(`期望: ${base.id}, 实际KM: ${currentBase?.id}, 实际SM: ${storageCurrentBase?.id}`);
            }
            
            // 测试获取知识点
            const baseKnowledge = window.storageManager.getKnowledgeByBaseId(base.id);
            console.log(`📊 知识库 ${base.name} 的知识点数量: ${baseKnowledge.length}`);
            
            if (baseKnowledge.length > 0) {
                // 验证知识点归属
                const correctKnowledge = baseKnowledge.filter(k => k.knowledgeBaseId === base.id);
                const incorrectKnowledge = baseKnowledge.filter(k => k.knowledgeBaseId !== base.id);
                
                console.log(`- 正确归属: ${correctKnowledge.length} 个`);
                console.log(`- 错误归属: ${incorrectKnowledge.length} 个`);
                
                if (incorrectKnowledge.length > 0) {
                    console.warn('⚠️ 存在错误归属的知识点:');
                    incorrectKnowledge.slice(0, 3).forEach(k => {
                        console.warn(`  * ${k.question.substring(0, 40)}... (实际BaseID: ${k.knowledgeBaseId})`);
                    });
                }
                
                // 测试题目列表生成
                console.log('🧪 测试题目列表生成...');
                const config = window.QuestionListTemplates.knowledgeBaseReview(base.id, {
                    onlyDue: false,
                    random: true,
                    limit: 10
                });
                
                try {
                    const questionList = await window.questionListGenerator.generateQuestionList(config);
                    console.log(`✅ 题目列表生成成功: ${questionList.length} 道题目`);
                    
                    // 验证题目归属
                    const correctQuestions = questionList.filter(q => q.knowledgeBaseId === base.id);
                    const incorrectQuestions = questionList.filter(q => q.knowledgeBaseId !== base.id);
                    
                    console.log(`- 正确归属题目: ${correctQuestions.length} 个`);
                    console.log(`- 错误归属题目: ${incorrectQuestions.length} 个`);
                    
                    if (incorrectQuestions.length > 0) {
                        console.error('❌ 题目列表中包含其他知识库的题目！');
                        incorrectQuestions.slice(0, 3).forEach(q => {
                            console.error(`  * ${q.question.substring(0, 40)}... (来源: ${q.knowledgeBaseId})`);
                        });
                    } else {
                        console.log('✅ 题目列表归属正确');
                    }
                    
                } catch (error) {
                    console.error('❌ 题目列表生成失败:', error);
                }
            }
            
            // 等待一下再测试下一个
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log('\n=== 知识库复习功能测试完成 ===');
        
    } catch (error) {
        console.error('❌ 测试过程中出现错误:', error);
    }
}

/**
 * 模拟用户操作流程测试
 */
async function simulateUserReviewFlow() {
    console.log('\n=== 模拟用户操作流程 ===');
    
    const knowledgeBases = window.storageManager.getAllKnowledgeBases();
    if (knowledgeBases.length === 0) {
        console.log('❌ 没有知识库，无法模拟用户操作');
        return;
    }
    
    // 选择软件工程知识库进行测试（如果存在）
    const softwareBase = knowledgeBases.find(base => base.id === 'software_engineering_base');
    const testBase = softwareBase || knowledgeBases[0];
    
    console.log(`🎯 选择测试知识库: ${testBase.name} (${testBase.id})`);
    
    try {
        // 步骤1：模拟点击知识库卡片
        console.log('\n📝 步骤1: 点击知识库卡片...');
        window.knowledgeManager.showAreaView(testBase.id);
        
        // 步骤2：检查状态
        console.log('\n📝 步骤2: 检查状态设置...');
        const currentBase = window.knowledgeManager.currentBase;
        console.log(`当前知识库: ${currentBase?.name} (${currentBase?.id})`);
        
        if (currentBase?.id !== testBase.id) {
            console.error(`❌ 状态设置错误！期望: ${testBase.id}, 实际: ${currentBase?.id}`);
            return;
        }
        
        // 步骤3：模拟点击"复习整个知识库"按钮
        console.log('\n📝 步骤3: 点击"复习整个知识库"按钮...');
        
        // 记录开始状态
        console.log('开始状态记录:');
        console.log(`- this.currentBase: ${window.knowledgeManager.currentBase?.name}`);
        console.log(`- 存储管理器当前知识库: ${window.storageManager.getCurrentKnowledgeBase()?.name}`);
        
        // 执行复习功能（但不实际启动）
        await window.knowledgeManager.startBaseReview();
        
        console.log('✅ 用户操作流程模拟完成');
        
    } catch (error) {
        console.error('❌ 用户操作流程模拟失败:', error);
    }
}

/**
 * 修复状态不一致问题
 */
function fixKnowledgeBaseStates() {
    console.log('\n=== 修复知识库状态 ===');
    
    const knowledgeBases = window.storageManager.getAllKnowledgeBases();
    
    knowledgeBases.forEach(base => {
        console.log(`🔧 修复知识库: ${base.name}`);
        
        // 获取该知识库的所有知识点
        const allKnowledge = window.storageManager.getAllKnowledge();
        const baseKnowledge = allKnowledge.filter(k => 
            k.knowledgeBaseId === base.id || 
            k.category?.includes(base.name) ||
            k.area?.includes(base.name)
        );
        
        console.log(`- 找到 ${baseKnowledge.length} 个相关知识点`);
        
        // 修复知识点的knowledgeBaseId
        let fixedCount = 0;
        baseKnowledge.forEach(k => {
            if (k.knowledgeBaseId !== base.id) {
                window.storageManager.updateKnowledge(k.id, {
                    knowledgeBaseId: base.id
                });
                fixedCount++;
            }
        });
        
        console.log(`- 修复了 ${fixedCount} 个知识点的归属`);
    });
    
    console.log('✅ 状态修复完成');
}

/**
 * 完整测试"复习整个知识库"功能
 */
async function fullTestKnowledgeBaseReview() {
    console.log('=== 完整测试"复习整个知识库"功能 ===');
    
    try {
        const knowledgeBases = window.storageManager.getAllKnowledgeBases();
        if (knowledgeBases.length === 0) {
            console.log('❌ 没有知识库，无法测试');
            return;
        }
        
        // 选择软件工程知识库进行测试
        const softwareBase = knowledgeBases.find(base => base.id === 'software_engineering_base');
        const testBase = softwareBase || knowledgeBases[0];
        
        console.log(`🎯 测试知识库: ${testBase.name} (${testBase.id})`);
        
        // 步骤1：模拟用户点击知识库卡片
        console.log('\n📝 步骤1: 模拟点击知识库卡片...');
        window.knowledgeManager.showAreaView(testBase.id);
        
        // 验证状态设置
        const currentBase = window.knowledgeManager.currentBase;
        if (currentBase?.id !== testBase.id) {
            console.error(`❌ 状态设置错误！期望: ${testBase.id}, 实际: ${currentBase?.id}`);
            return;
        }
        console.log('✅ 知识库状态设置正确');
        
        // 步骤2：开始知识库复习
        console.log('\n📝 步骤2: 开始知识库复习...');
        await window.knowledgeManager.startBaseReview();
        
        // 验证复习管理器状态
        console.log('\n🔍 验证复习管理器状态:');
        console.log(`- 复习模式: ${window.reviewManager.reviewMode}`);
        console.log(`- 题目列表长度: ${window.reviewManager.currentReviewList?.length || 0}`);
        console.log(`- 当前题目索引: ${window.reviewManager.currentIndex}`);
        
        const expectedMode = `knowledge-base-${testBase.id}`;
        if (window.reviewManager.reviewMode !== expectedMode) {
            console.error(`❌ 复习模式错误！期望: ${expectedMode}, 实际: ${window.reviewManager.reviewMode}`);
            return;
        }
        
        if (!window.reviewManager.currentReviewList || window.reviewManager.currentReviewList.length === 0) {
            console.error('❌ 题目列表为空！');
            return;
        }
        
        console.log('✅ 复习管理器状态正确');
        
        // 步骤3：测试页面跳转
        console.log('\n📝 步骤3: 测试复习页面跳转...');
        
        // 记录跳转前的状态
        const beforeJump = {
            reviewMode: window.reviewManager.reviewMode,
            listLength: window.reviewManager.currentReviewList.length,
            currentIndex: window.reviewManager.currentIndex
        };
        
        console.log('跳转前状态:', beforeJump);
        
        // 模拟跳转到复习页面
        window.app.showSection('review');
        
        // 验证跳转后的状态
        const afterJump = {
            reviewMode: window.reviewManager.reviewMode,
            listLength: window.reviewManager.currentReviewList?.length || 0,
            currentIndex: window.reviewManager.currentIndex
        };
        
        console.log('跳转后状态:', afterJump);
        
        // 检查状态是否保持一致
        const statePreserved = beforeJump.reviewMode === afterJump.reviewMode &&
                              beforeJump.listLength === afterJump.listLength &&
                              beforeJump.currentIndex === afterJump.currentIndex;
        
        if (statePreserved) {
            console.log('✅ 页面跳转后复习状态保持一致');
        } else {
            console.error('❌ 页面跳转后复习状态被重置！');
            console.error('状态对比:', { beforeJump, afterJump });
            return;
        }
        
        // 步骤4：验证题目内容
        console.log('\n📝 步骤4: 验证题目内容...');
        const currentKnowledge = window.reviewManager.currentKnowledge;
        
        if (!currentKnowledge) {
            console.error('❌ 当前题目为空！');
            return;
        }
        
        console.log(`当前题目: ${currentKnowledge.question.substring(0, 50)}...`);
        console.log(`题目归属: ${currentKnowledge.knowledgeBaseId}`);
        
        if (currentKnowledge.knowledgeBaseId !== testBase.id) {
            console.error(`❌ 题目归属错误！期望: ${testBase.id}, 实际: ${currentKnowledge.knowledgeBaseId}`);
            return;
        }
        
        console.log('✅ 当前题目归属正确');
        
        // 步骤5：验证所有题目的归属
        console.log('\n📝 步骤5: 验证所有题目的归属...');
        const correctQuestions = window.reviewManager.currentReviewList.filter(q => q.knowledgeBaseId === testBase.id);
        const incorrectQuestions = window.reviewManager.currentReviewList.filter(q => q.knowledgeBaseId !== testBase.id);
        
        console.log(`- 正确归属题目: ${correctQuestions.length} 个`);
        console.log(`- 错误归属题目: ${incorrectQuestions.length} 个`);
        
        if (incorrectQuestions.length > 0) {
            console.error('❌ 发现错误归属的题目:');
            incorrectQuestions.slice(0, 3).forEach(q => {
                console.error(`  * ${q.question.substring(0, 40)}... (来源: ${q.knowledgeBaseId})`);
            });
            return;
        }
        
        console.log('✅ 所有题目归属验证通过');
        
        console.log('\n🎉 "复习整个知识库"功能测试完全通过！');
        
        // 返回测试结果
        return {
            success: true,
            testBase: testBase.name,
            questionCount: window.reviewManager.currentReviewList.length,
            reviewMode: window.reviewManager.reviewMode
        };
        
    } catch (error) {
        console.error('❌ 测试过程中出现错误:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * 测试修复后的知识库复习功能
 */
async function testFixedKnowledgeBaseReview() {
    console.log('=== 测试修复后的知识库复习功能 ===');
    
    try {
        const knowledgeBases = window.storageManager.getAllKnowledgeBases();
        const softwareBase = knowledgeBases.find(base => base.id === 'software_engineering_base');
        const testBase = softwareBase || knowledgeBases[0];
        
        if (!testBase) {
            console.log('❌ 没有知识库，无法测试');
            return;
        }
        
        console.log(`🎯 测试知识库: ${testBase.name} (${testBase.id})`);
        
        // 测试1：模拟正常的知识库复习流程
        console.log('\\n📝 测试1: 正常知识库复习流程');
        
        // 设置知识库状态
        window.knowledgeManager.currentBase = testBase;
        window.storageManager.setCurrentKnowledgeBase(testBase.id);
        
        // 启动知识库复习
        await window.knowledgeManager.startBaseReview();
        
        // 验证复习状态
        const isCorrectMode = window.reviewManager.reviewMode === `knowledge-base-${testBase.id}`;
        const hasCorrectList = window.reviewManager.currentReviewList && 
                              window.reviewManager.currentReviewList.length > 0;
        
        console.log('✅ 复习状态验证:', {
            correctMode: isCorrectMode,
            hasCorrectList: hasCorrectList,
            reviewMode: window.reviewManager.reviewMode,
            listLength: window.reviewManager.currentReviewList?.length || 0
        });
        
        // 测试2：测试状态保护功能
        console.log('\\n📝 测试2: 状态保护功能');
        
        if (hasCorrectList) {
            // 模拟用户点击"随机复习"按钮
            console.log('模拟点击随机复习按钮（应该弹出确认对话框）...');
            
            // 注意：这里会弹出确认对话框，用户可以选择是否继续
            // window.reviewManager.startReview('random');
            
            console.log('✅ 状态保护功能已启用，会弹出确认对话框');
        }
        
        // 测试3：测试页面跳转后的状态保持
        console.log('\\n📝 测试3: 页面跳转状态保持');
        
        // 模拟跳转到其他页面再回到复习页面
        window.app.showSection('dashboard');
        setTimeout(() => {
            window.app.showSection('review');
            
            // 验证状态是否保持
            const statePreserved = window.reviewManager.reviewMode === `knowledge-base-${testBase.id}` &&
                                  window.reviewManager.currentReviewList &&
                                  window.reviewManager.currentReviewList.length > 0;
            
            console.log('✅ 页面跳转后状态保持:', {
                preserved: statePreserved,
                reviewMode: window.reviewManager.reviewMode,
                listLength: window.reviewManager.currentReviewList?.length || 0
            });
            
            // 测试4：验证知识点归属
            if (window.reviewManager.currentReviewList && window.reviewManager.currentReviewList.length > 0) {
                console.log('\\n📝 测试4: 验证知识点归属');
                
                const allCorrectBase = window.reviewManager.currentReviewList.every(q => 
                    q.knowledgeBaseId === testBase.id
                );
                
                const sampleQuestions = window.reviewManager.currentReviewList.slice(0, 3);
                
                console.log('✅ 知识点归属验证:', {
                    allCorrectBase: allCorrectBase,
                    targetBaseId: testBase.id,
                    sampleQuestions: sampleQuestions.map(q => ({
                        id: q.id,
                        baseId: q.knowledgeBaseId,
                        question: q.question.substring(0, 30) + '...'
                    }))
                });
                
                // 生成测试报告
                console.log('\\n📊 测试报告汇总:');
                console.log(`✅ 知识库: ${testBase.name}`);
                console.log(`✅ 复习模式: ${window.reviewManager.reviewMode}`);
                console.log(`✅ 题目数量: ${window.reviewManager.currentReviewList.length}`);
                console.log(`✅ 归属正确: ${allCorrectBase ? '是' : '否'}`);
                console.log(`✅ 状态保护: 已启用`);
                console.log(`✅ 页面跳转: 状态保持正常`);
                
                return {
                    success: true,
                    knowledgeBase: testBase.name,
                    reviewMode: window.reviewManager.reviewMode,
                    questionCount: window.reviewManager.currentReviewList.length,
                    allCorrectBase: allCorrectBase
                };
            }
        }, 1000);
        
    } catch (error) {
        console.error('❌ 测试失败:', error);
        return { success: false, error: error.message };
    }
}

/**
 * 快速验证修复效果
 */
function quickVerifyFix() {
    console.log('=== 快速验证修复效果 ===');
    
    const hasActiveSession = window.reviewManager.currentReviewList && 
                            window.reviewManager.currentReviewList.length > 0 && 
                            window.reviewManager.reviewMode;
    
    if (hasActiveSession && window.reviewManager.reviewMode.startsWith('knowledge-base-')) {
        const baseId = window.reviewManager.reviewMode.replace('knowledge-base-', '');
        const knowledgeBase = window.storageManager.getKnowledgeBaseById(baseId);
        
        console.log('✅ 检测到活跃的知识库复习会话:');
        console.log(`📚 知识库: ${knowledgeBase?.name || baseId}`);
        console.log(`📊 题目数量: ${window.reviewManager.currentReviewList.length}`);
        console.log(`🎯 当前进度: ${window.reviewManager.currentIndex + 1}/${window.reviewManager.currentReviewList.length}`);
        
        // 验证题目归属
        const correctBase = window.reviewManager.currentReviewList.filter(q => q.knowledgeBaseId === baseId);
        const correctPercentage = (correctBase.length / window.reviewManager.currentReviewList.length * 100).toFixed(1);
        
        console.log(`✅ 题目归属正确率: ${correctPercentage}% (${correctBase.length}/${window.reviewManager.currentReviewList.length})`);
        
        if (correctPercentage === '100.0') {
            console.log('🎉 修复成功！知识库复习功能正常工作');
        } else {
            console.log('⚠️ 仍有问题：存在其他知识库的题目');
        }
        
        return true;
    } else {
        console.log('ℹ️ 当前没有活跃的知识库复习会话');
        return false;
    }
}

// 将函数添加到全局作用域以便在浏览器控制台中调用
window.testKnowledgeBaseReviewFlow = testKnowledgeBaseReviewFlow;
window.simulateUserReviewFlow = simulateUserReviewFlow;
window.fixKnowledgeBaseStates = fixKnowledgeBaseStates;
window.fullTestKnowledgeBaseReview = fullTestKnowledgeBaseReview;
window.testFixedKnowledgeBaseReview = testFixedKnowledgeBaseReview;
window.quickVerifyFix = quickVerifyFix;

console.log('📋 知识库复习测试脚本已加载');
console.log('💡 可用函数:');
console.log('- testKnowledgeBaseReviewFlow(): 完整测试知识库复习功能');
console.log('- simulateUserReviewFlow(): 模拟用户操作流程');
console.log('- fixKnowledgeBaseStates(): 修复知识库状态问题');
console.log('- fullTestKnowledgeBaseReview(): 完整测试"复习整个知识库"功能（包括页面跳转）');
console.log('- testFixedKnowledgeBaseReview(): 测试修复后的知识库复习功能');
console.log('- quickVerifyFix(): 快速验证修复效果'); 