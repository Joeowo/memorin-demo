// 修复知识点的 knowledgeBaseId 字段
function fixKnowledgeBaseIds() {
    console.log('=== 开始修复知识点的 knowledgeBaseId 字段 ===');
    
    try {
        const data = window.storageManager.getData();
        if (!data || !data.knowledge) {
            console.error('没有找到知识点数据');
            return false;
        }
        
        console.log('原始知识点数量:', data.knowledge.length);
        
        // 获取所有知识库
        const knowledgeBases = data.knowledgeBases || [];
        console.log('知识库列表:', knowledgeBases.map(kb => ({ id: kb.id, name: kb.name })));
        
        // 统计修复前的情况
        let fixedCount = 0;
        let unknownCount = 0;
        const beforeStats = {};
        
        data.knowledge.forEach(k => {
            const baseId = k.knowledgeBaseId || 'undefined';
            beforeStats[baseId] = (beforeStats[baseId] || 0) + 1;
        });
        
        console.log('修复前按知识库ID分组:', beforeStats);
        
        // 修复逻辑
        data.knowledge = data.knowledge.map(k => {
            // 如果已经有正确的 knowledgeBaseId，跳过
            if (k.knowledgeBaseId && knowledgeBases.find(kb => kb.id === k.knowledgeBaseId)) {
                return k;
            }
            
            // 尝试根据 category 和已知的映射关系推断 knowledgeBaseId
            let inferredBaseId = null;
            
            // 军事理论相关
            if (k.category && (
                k.category.includes('国防') || 
                k.category.includes('军事') || 
                k.category.includes('战争') || 
                k.category.includes('安全') ||
                k.category.includes('装备') ||
                k.id && k.id.startsWith('mil_')
            )) {
                inferredBaseId = 'military_theory_base';
            }
            // 软件工程相关
            else if (k.category && (
                k.category.includes('软件') || 
                k.category.includes('需求') || 
                k.category.includes('设计') || 
                k.category.includes('测试') ||
                k.category.includes('部署') ||
                k.category.includes('实现') ||
                k.category.includes('详细设计') ||
                k.id && k.id.startsWith('se_')
            )) {
                inferredBaseId = 'software_engineering_base';
            }
            // 默认知识库
            else {
                inferredBaseId = 'default_base';
                unknownCount++;
            }
            
            if (inferredBaseId !== k.knowledgeBaseId) {
                fixedCount++;
                console.log(`修复知识点 ${k.id}: ${k.knowledgeBaseId || 'undefined'} -> ${inferredBaseId} (${k.category})`);
            }
            
            return {
                ...k,
                knowledgeBaseId: inferredBaseId
            };
        });
        
        // 统计修复后的情况
        const afterStats = {};
        data.knowledge.forEach(k => {
            const baseId = k.knowledgeBaseId || 'undefined';
            afterStats[baseId] = (afterStats[baseId] || 0) + 1;
        });
        
        console.log('修复后按知识库ID分组:', afterStats);
        console.log(`修复完成: 修改了 ${fixedCount} 个知识点，${unknownCount} 个知识点归入默认知识库`);
        
        // 保存修复后的数据
        const success = window.storageManager.setData(data);
        if (success) {
            console.log('数据保存成功');
            
            // 刷新相关组件
            if (window.knowledgeManager) {
                window.knowledgeManager.refresh();
            }
            
            if (window.app && window.app.loadDashboard) {
                window.app.loadDashboard();
            }
            
            // 显示成功通知
            const message = `✅ 知识点 knowledgeBaseId 修复完成！\n\n修复统计:\n- 修改了 ${fixedCount} 个知识点\n- ${unknownCount} 个知识点归入默认知识库\n\n修复后分布:\n${Object.entries(afterStats).map(([id, count]) => `- ${id}: ${count}个`).join('\n')}`;
            
            if (window.app && window.app.showNotification) {
                window.app.showNotification(message, 'success');
            } else {
                alert(message);
            }
            
            return true;
        } else {
            throw new Error('数据保存失败');
        }
        
    } catch (error) {
        console.error('修复失败:', error);
        if (window.app && window.app.showNotification) {
            window.app.showNotification('修复失败: ' + error.message, 'error');
        } else {
            alert('修复失败: ' + error.message);
        }
        return false;
    }
}

// 测试当前知识库复习功能
async function testKnowledgeBaseReview() {
    console.log('=== 测试知识库复习功能 ===');
    
    // 测试军事理论知识库
    const testBaseId = 'military_theory_base';
    console.log(`测试知识库: ${testBaseId}`);
    
    try {
        // 1. 直接测试存储管理器方法
        const knowledgeFromStorage = window.storageManager.getKnowledgeByBaseId(testBaseId);
        console.log(`存储管理器返回的知识点数量: ${knowledgeFromStorage.length}`);
        
        // 2. 测试题目列表生成器
        const config = window.QuestionListTemplates.knowledgeBaseReview(testBaseId, {
            onlyDue: false,
            random: false,
            limit: 10
        });
        console.log('生成的配置:', config);
        
        const questionList = await window.questionListGenerator.generateQuestionList(config);
        console.log(`生成的题目列表数量: ${questionList.length}`);
        
        if (questionList.length > 0) {
            console.log('前3个题目信息:', questionList.slice(0, 3).map(q => ({
                id: q.id,
                knowledgeBaseId: q.knowledgeBaseId,
                question: q.question.substring(0, 50) + '...'
            })));
        } else {
            console.log('⚠️ 没有生成任何题目！这就是问题所在。');
        }
        
        // 3. 测试软件工程知识库
        const testBaseId2 = 'software_engineering_base';
        console.log(`\n测试知识库: ${testBaseId2}`);
        
        const knowledgeFromStorage2 = window.storageManager.getKnowledgeByBaseId(testBaseId2);
        console.log(`存储管理器返回的知识点数量: ${knowledgeFromStorage2.length}`);
        
        const config2 = window.QuestionListTemplates.knowledgeBaseReview(testBaseId2, {
            onlyDue: false,
            random: false,
            limit: 5
        });
        
        const questionList2 = await window.questionListGenerator.generateQuestionList(config2);
        console.log(`生成的题目列表数量: ${questionList2.length}`);
        
    } catch (error) {
        console.error('测试失败:', error);
    }
    
    console.log('=== 测试完成 ===');
}

// 提供全局函数
if (typeof window !== 'undefined') {
    window.fixKnowledgeBaseIds = fixKnowledgeBaseIds;
    window.testKnowledgeBaseReview = testKnowledgeBaseReview;
}

console.log('修复脚本已加载，请在浏览器控制台中运行:');
console.log('1. fixKnowledgeBaseIds() - 修复知识点的knowledgeBaseId字段');
console.log('2. testKnowledgeBaseReview() - 测试知识库复习功能'); 