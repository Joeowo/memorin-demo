// 测试数据重构效果的综合脚本
window.testDataRestructure = async function() {
    console.log('=== 开始测试数据重构效果 ===');
    
    try {
        // 1. 测试基础数据一致性
        console.log('\n1. 测试基础数据一致性:');
        const data = window.storageManager.getData();
        console.log('数据版本:', data.version);
        console.log('知识库数量:', data.knowledgeBases?.length || 0);
        console.log('知识点数量:', data.knowledge?.length || 0);
        
        // 检查知识库结构
        const knowledgeBases = data.knowledgeBases || [];
        knowledgeBases.forEach(kb => {
            console.log(`知识库 ${kb.name} (${kb.id}): ${kb.areas?.length || 0} 个知识区`);
        });
        
        // 2. 测试知识点映射关系
        console.log('\n2. 测试知识点映射关系:');
        const groupedByBase = {};
        const orphanKnowledge = [];
        
        (data.knowledge || []).forEach(k => {
            if (!k.knowledgeBaseId) {
                orphanKnowledge.push(k);
            } else {
                groupedByBase[k.knowledgeBaseId] = (groupedByBase[k.knowledgeBaseId] || 0) + 1;
            }
        });
        
        console.log('按知识库分组的知识点数量:', groupedByBase);
        console.log('孤立知识点数量:', orphanKnowledge.length);
        
        if (orphanKnowledge.length > 0) {
            console.warn('发现孤立知识点:', orphanKnowledge.slice(0, 3).map(k => ({
                id: k.id,
                question: k.question?.substring(0, 30) + '...'
            })));
        }
        
        // 3. 测试存储管理器方法
        console.log('\n3. 测试存储管理器方法:');
        
        for (const baseId of Object.keys(groupedByBase)) {
            const knowledgeFromStorage = window.storageManager.getKnowledgeByBaseId(baseId);
            const expectedCount = groupedByBase[baseId];
            const actualCount = knowledgeFromStorage.length;
            
            console.log(`知识库 ${baseId}: 预期 ${expectedCount}, 实际 ${actualCount}, ${actualCount === expectedCount ? '✅' : '❌'}`);
            
            if (actualCount !== expectedCount) {
                console.warn(`知识库 ${baseId} 的知识点数量不匹配！`);
            }
        }
        
        // 4. 测试题目列表生成器
        console.log('\n4. 测试题目列表生成器:');
        
        for (const baseId of Object.keys(groupedByBase)) {
            try {
                const config = window.QuestionListTemplates.knowledgeBaseReview(baseId, {
                    onlyDue: false,
                    random: false,
                    limit: 5
                });
                
                const questionList = await window.questionListGenerator.generateQuestionList(config);
                console.log(`知识库 ${baseId} 生成题目: ${questionList.length} 个 ${questionList.length > 0 ? '✅' : '❌'}`);
                
                if (questionList.length === 0 && groupedByBase[baseId] > 0) {
                    console.error(`知识库 ${baseId} 有知识点但无法生成题目！`);
                }
                
                // 验证生成的题目是否属于正确的知识库
                const wrongBaseQuestions = questionList.filter(q => q.knowledgeBaseId !== baseId);
                if (wrongBaseQuestions.length > 0) {
                    console.error(`知识库 ${baseId} 生成了 ${wrongBaseQuestions.length} 个其他知识库的题目！`);
                }
                
            } catch (error) {
                console.error(`测试知识库 ${baseId} 的题目生成器失败:`, error);
            }
        }
        
        // 5. 测试知识库复习功能
        console.log('\n5. 测试知识库复习功能:');
        
        // 模拟在知识库界面点击"复习整个知识库"
        for (const baseId of Object.keys(groupedByBase)) {
            try {
                // 模拟设置当前知识库
                if (window.knowledgeManager) {
                    const base = data.knowledgeBases.find(kb => kb.id === baseId);
                    if (base) {
                        window.knowledgeManager.currentBase = base;
                        
                        // 测试startBaseReview方法（不实际启动复习）
                        console.log(`测试知识库 ${base.name} 的复习功能...`);
                        
                        // 直接测试配置生成
                        const config = window.QuestionListTemplates.knowledgeBaseReview(baseId, {
                            onlyDue: false,
                            random: true,
                            limit: 50
                        });
                        
                        const questionList = await window.questionListGenerator.generateQuestionList(config);
                        console.log(`知识库 ${base.name} 复习题目: ${questionList.length} 个 ${questionList.length > 0 ? '✅' : '❌'}`);
                    }
                }
            } catch (error) {
                console.error(`测试知识库 ${baseId} 复习功能失败:`, error);
            }
        }
        
        // 6. 数据一致性总结
        console.log('\n6. 数据一致性总结:');
        const totalKnowledge = data.knowledge?.length || 0;
        const mappedKnowledge = totalKnowledge - orphanKnowledge.length;
        const consistencyRate = totalKnowledge > 0 ? (mappedKnowledge / totalKnowledge * 100).toFixed(2) : 100;
        
        console.log(`总知识点: ${totalKnowledge}`);
        console.log(`已映射知识点: ${mappedKnowledge}`);
        console.log(`孤立知识点: ${orphanKnowledge.length}`);
        console.log(`数据一致性: ${consistencyRate}%`);
        
        // 7. 自动修复建议
        if (orphanKnowledge.length > 0) {
            console.log('\n7. 自动修复建议:');
            console.log('发现孤立知识点，建议执行以下操作:');
            console.log('- window.storageManager.validateAndFixKnowledgeMappings() - 验证并修复映射关系');
            console.log('- executeDataRestructure() - 执行完整数据重构');
        }
        
        // 生成测试报告
        const testReport = {
            timestamp: new Date().toISOString(),
            dataVersion: data.version,
            knowledgeBasesCount: knowledgeBases.length,
            totalKnowledge: totalKnowledge,
            mappedKnowledge: mappedKnowledge,
            orphanKnowledge: orphanKnowledge.length,
            consistencyRate: parseFloat(consistencyRate),
            knowledgeBaseBreakdown: groupedByBase,
            success: orphanKnowledge.length === 0 && Object.keys(groupedByBase).length > 0
        };
        
        console.log('\n=== 测试报告 ===');
        console.log(testReport);
        
        // 显示用户友好的结果
        const message = `📊 数据重构测试完成！\n\n测试结果:\n- 数据版本: ${testReport.dataVersion}\n- 知识库数量: ${testReport.knowledgeBasesCount}个\n- 知识点总数: ${testReport.totalKnowledge}个\n- 数据一致性: ${testReport.consistencyRate}%\n- 测试状态: ${testReport.success ? '✅ 通过' : '❌ 发现问题'}\n\n${testReport.success ? '所有功能正常运行！' : '建议执行数据重构修复问题。'}`;
        
        if (window.app && window.app.showNotification) {
            window.app.showNotification(message, testReport.success ? 'success' : 'warning');
        } else {
            alert(message);
        }
        
        return testReport;
        
    } catch (error) {
        console.error('测试数据重构效果失败:', error);
        
        if (window.app && window.app.showNotification) {
            window.app.showNotification('❌ 测试失败: ' + error.message, 'error');
        } else {
            alert('❌ 测试失败: ' + error.message);
        }
        
        return { success: false, error: error.message };
    }
};

// 快速修复映射关系的便捷函数
window.quickFixMappings = function() {
    console.log('开始快速修复映射关系...');
    
    try {
        const result = window.storageManager.validateAndFixKnowledgeMappings();
        
        if (result.success) {
            const message = `✅ 映射关系修复完成！\n\n修复统计:\n- 修复的知识点: ${result.fixedCount}个\n\n${result.fixedCount === 0 ? '数据映射关系正常，无需修复。' : '已自动修复所有映射问题。'}`;
            
            if (window.app && window.app.showNotification) {
                window.app.showNotification(message, 'success');
            } else {
                alert(message);
            }
            
            // 刷新相关组件
            if (window.knowledgeManager) {
                window.knowledgeManager.refresh();
            }
            
            return result;
        } else {
            throw new Error(result.error);
        }
        
    } catch (error) {
        console.error('快速修复失败:', error);
        
        if (window.app && window.app.showNotification) {
            window.app.showNotification('❌ 快速修复失败: ' + error.message, 'error');
        } else {
            alert('❌ 快速修复失败: ' + error.message);
        }
        
        return { success: false, error: error.message };
    }
};

console.log('数据重构测试脚本已加载，可使用以下命令:');
console.log('- testDataRestructure() - 测试数据重构效果');
console.log('- quickFixMappings() - 快速修复映射关系');

// 测试数据重构和"复习整个知识库"功能的脚本

/**
 * 测试"复习整个知识库"功能
 */
async function testKnowledgeBaseReview() {
    console.log('=== 测试"复习整个知识库"功能 ===');
    
    try {
        // 1. 获取所有知识库
        const knowledgeBases = window.storageManager.getAllKnowledgeBases();
        console.log(`系统中共有 ${knowledgeBases.length} 个知识库:`);
        
        knowledgeBases.forEach(base => {
            const knowledgeCount = window.storageManager.getKnowledgeByBaseId(base.id).length;
            console.log(`- ${base.name} (${base.id}): ${knowledgeCount} 个知识点`);
        });
        
        if (knowledgeBases.length === 0) {
            console.log('没有知识库，测试结束');
            return;
        }
        
        // 2. 测试每个知识库的复习功能
        for (const base of knowledgeBases) {
            console.log(`\n--- 测试知识库: ${base.name} ---`);
            
            // 获取知识库的知识点
            const baseKnowledge = window.storageManager.getKnowledgeByBaseId(base.id);
            console.log(`直接获取知识点数量: ${baseKnowledge.length}`);
            
            // 测试题目列表生成器
            const config = window.QuestionListTemplates.knowledgeBaseReview(base.id, {
                onlyDue: false,
                random: false,
                limit: 10
            });
            
            console.log('题目列表配置:', config);
            
            const questionList = await window.questionListGenerator.generateQuestionList(config);
            console.log(`生成的题目列表长度: ${questionList.length}`);
            
            // 验证题目是否都属于该知识库
            const wrongBaseQuestions = questionList.filter(q => q.knowledgeBaseId !== base.id);
            if (wrongBaseQuestions.length > 0) {
                console.error(`❌ 发现 ${wrongBaseQuestions.length} 个不属于当前知识库的题目:`);
                wrongBaseQuestions.forEach(q => {
                    console.error(`  - 题目 ${q.id}: "${q.question.substring(0, 30)}..." 属于知识库 ${q.knowledgeBaseId}`);
                });
            } else {
                console.log(`✅ 所有 ${questionList.length} 个题目都正确归属于知识库 ${base.id}`);
            }
            
            // 显示前几个题目的详情
            console.log('前5个题目详情:');
            questionList.slice(0, 5).forEach((q, index) => {
                console.log(`  ${index + 1}. ${q.question.substring(0, 50)}... (BaseID: ${q.knowledgeBaseId})`);
            });
        }
        
        console.log('\n=== 测试完成 ===');
        
    } catch (error) {
        console.error('测试失败:', error);
    }
}

/**
 * 测试数据一致性
 */
async function testDataConsistency() {
    console.log('=== 测试数据一致性 ===');
    
    try {
        const allKnowledge = window.storageManager.getAllKnowledge();
        const knowledgeBases = window.storageManager.getAllKnowledgeBases();
        
        console.log(`总知识点数: ${allKnowledge.length}`);
        console.log(`总知识库数: ${knowledgeBases.length}`);
        
        // 检查知识点的归属
        const baseIds = new Set(knowledgeBases.map(base => base.id));
        let inconsistentCount = 0;
        let orphanedCount = 0;
        
        const baseKnowledgeCount = {};
        knowledgeBases.forEach(base => {
            baseKnowledgeCount[base.id] = 0;
        });
        
        allKnowledge.forEach(knowledge => {
            if (!knowledge.knowledgeBaseId) {
                orphanedCount++;
                console.warn(`知识点 ${knowledge.id} 没有knowledgeBaseId`);
            } else if (!baseIds.has(knowledge.knowledgeBaseId)) {
                inconsistentCount++;
                console.warn(`知识点 ${knowledge.id} 的knowledgeBaseId (${knowledge.knowledgeBaseId}) 对应的知识库不存在`);
            } else {
                baseKnowledgeCount[knowledge.knowledgeBaseId]++;
            }
        });
        
        console.log('\n各知识库的知识点统计:');
        knowledgeBases.forEach(base => {
            const directCount = window.storageManager.getKnowledgeByBaseId(base.id).length;
            const calculatedCount = baseKnowledgeCount[base.id];
            
            console.log(`${base.name}:`);
            console.log(`  - 直接查询: ${directCount} 个`);
            console.log(`  - 计算得出: ${calculatedCount} 个`);
            
            if (directCount !== calculatedCount) {
                console.warn(`  ❌ 数量不一致！差异: ${Math.abs(directCount - calculatedCount)}`);
            } else {
                console.log(`  ✅ 数量一致`);
            }
        });
        
        console.log(`\n孤立知识点: ${orphanedCount} 个`);
        console.log(`归属不一致: ${inconsistentCount} 个`);
        
        if (orphanedCount === 0 && inconsistentCount === 0) {
            console.log('✅ 数据一致性检查通过');
        } else {
            console.warn('❌ 发现数据一致性问题');
        }
        
    } catch (error) {
        console.error('数据一致性测试失败:', error);
    }
}

/**
 * 快速修复映射关系
 */
async function quickFixMappings() {
    console.log('=== 快速修复映射关系 ===');
    
    try {
        const result = window.storageManager.validateAndFixKnowledgeMappings();
        
        if (result.success) {
            console.log(`✅ 修复完成，共修复了 ${result.fixedCount} 个知识点的映射关系`);
            
            if (result.fixedCount > 0) {
                // 刷新相关组件
                if (window.knowledgeManager) {
                    window.knowledgeManager.refresh();
                }
                
                if (window.app && window.app.loadDashboard) {
                    window.app.loadDashboard();
                }
                
                window.app.showNotification(`已修复 ${result.fixedCount} 个知识点的映射关系`, 'success');
            } else {
                window.app.showNotification('所有映射关系都是正确的，无需修复', 'info');
            }
        } else {
            console.error('修复失败:', result.error);
            window.app.showNotification('修复失败: ' + result.error, 'error');
        }
        
    } catch (error) {
        console.error('快速修复失败:', error);
        window.app.showNotification('修复失败: ' + error.message, 'error');
    }
}

/**
 * 综合测试数据重构
 */
async function testDataRestructure() {
    console.log('=== 综合测试数据重构 ===');
    
    try {
        // 1. 数据一致性检查
        console.log('\n1. 执行数据一致性检查...');
        await testDataConsistency();
        
        // 2. 测试存储管理器方法
        console.log('\n2. 测试存储管理器方法...');
        await testStorageManagerMethods();
        
        // 3. 测试题目列表生成器
        console.log('\n3. 测试题目列表生成器...');
        await testQuestionListGenerator();
        
        // 4. 测试复习功能
        console.log('\n4. 测试知识库复习功能...');
        await testKnowledgeBaseReview();
        
        console.log('\n=== 综合测试完成 ===');
        
        // 生成测试报告
        generateTestReport();
        
    } catch (error) {
        console.error('综合测试失败:', error);
    }
}

/**
 * 测试存储管理器方法
 */
async function testStorageManagerMethods() {
    const knowledgeBases = window.storageManager.getAllKnowledgeBases();
    
    for (const base of knowledgeBases) {
        console.log(`测试知识库: ${base.name}`);
        
        const knowledge1 = window.storageManager.getKnowledgeByBaseId(base.id);
        console.log(`  getKnowledgeByBaseId: ${knowledge1.length} 个知识点`);
        
        // 验证每个知识点的归属
        const invalidKnowledge = knowledge1.filter(k => k.knowledgeBaseId !== base.id);
        if (invalidKnowledge.length > 0) {
            console.warn(`  ❌ 发现 ${invalidKnowledge.length} 个归属错误的知识点`);
        } else {
            console.log(`  ✅ 所有知识点归属正确`);
        }
    }
}

/**
 * 测试题目列表生成器
 */
async function testQuestionListGenerator() {
    const knowledgeBases = window.storageManager.getAllKnowledgeBases();
    
    for (const base of knowledgeBases) {
        console.log(`测试题目生成 - 知识库: ${base.name}`);
        
        try {
            const config = {
                source: {
                    type: 'knowledge-base',
                    params: { baseId: base.id }
                },
                filters: [],
                sorter: { type: 'random' },
                limiter: null
            };
            
            const questions = await window.questionListGenerator.generateQuestionList(config);
            console.log(`  生成题目数量: ${questions.length}`);
            
            // 验证题目归属
            const wrongQuestions = questions.filter(q => q.knowledgeBaseId !== base.id);
            if (wrongQuestions.length > 0) {
                console.warn(`  ❌ 发现 ${wrongQuestions.length} 个归属错误的题目`);
            } else {
                console.log(`  ✅ 所有题目归属正确`);
            }
            
        } catch (error) {
            console.error(`  ❌ 题目生成失败:`, error);
        }
    }
}

/**
 * 生成测试报告
 */
function generateTestReport() {
    const knowledgeBases = window.storageManager.getAllKnowledgeBases();
    const allKnowledge = window.storageManager.getAllKnowledge();
    
    const report = {
        timestamp: new Date().toISOString(),
        totalKnowledgeBases: knowledgeBases.length,
        totalKnowledge: allKnowledge.length,
        knowledgeBaseDetails: knowledgeBases.map(base => {
            const baseKnowledge = window.storageManager.getKnowledgeByBaseId(base.id);
            return {
                id: base.id,
                name: base.name,
                knowledgeCount: baseKnowledge.length,
                areas: base.areas?.length || 0
            };
        })
    };
    
    console.log('\n=== 测试报告 ===');
    console.log(JSON.stringify(report, null, 2));
    
    // 用户友好的报告显示
    let reportText = '📊 数据重构测试报告\n\n';
    reportText += `📅 测试时间：${new Date().toLocaleString()}\n`;
    reportText += `📚 知识库总数：${report.totalKnowledgeBases}\n`;
    reportText += `📝 知识点总数：${report.totalKnowledge}\n\n`;
    
    reportText += '📋 知识库详情：\n';
    report.knowledgeBaseDetails.forEach(base => {
        reportText += `• ${base.name}：${base.knowledgeCount}个知识点，${base.areas}个知识区\n`;
    });
    
    if (window.app && window.app.showNotification) {
        window.app.showNotification(reportText, 'info');
    } else {
        alert(reportText);
    }
}

// 将测试函数添加到全局作用域
window.testKnowledgeBaseReview = testKnowledgeBaseReview;
window.testDataConsistency = testDataConsistency;
window.quickFixMappings = quickFixMappings;
window.testDataRestructure = testDataRestructure;

console.log('数据重构测试脚本已加载');
console.log('可用的测试函数:');
console.log('- testDataRestructure() - 综合测试');
console.log('- testKnowledgeBaseReview() - 测试知识库复习功能');
console.log('- testDataConsistency() - 测试数据一致性');
console.log('- quickFixMappings() - 快速修复映射关系'); 