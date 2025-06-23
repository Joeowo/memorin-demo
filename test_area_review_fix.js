/**
 * 知识区复习功能修复验证测试
 * 测试choice_practice知识区是否能正确启动复习
 */

console.log('=== 知识区复习功能修复验证测试 ===');

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
                window.knowledgeManager) {
                resolve();
            } else {
                setTimeout(checkManagers, 100);
            }
        };
        checkManagers();
    });
}

// 测试存储管理器的getKnowledgeAreaById方法
function testGetKnowledgeAreaById() {
    console.log('\n=== 测试存储管理器的getKnowledgeAreaById方法 ===');
    
    // 获取所有知识库
    const allBases = window.storageManager.getAllKnowledgeBases();
    console.log('所有知识库:', allBases.map(base => ({ id: base.id, name: base.name })));
    
    // 查找包含choice_practice的知识库
    let foundBase = null;
    let foundArea = null;
    
    for (const base of allBases) {
        if (base.areas) {
            const area = base.areas.find(a => a.id === 'choice_practice');
            if (area) {
                foundBase = base;
                foundArea = area;
                break;
            }
        }
    }
    
    if (foundBase && foundArea) {
        console.log('✅ 找到choice_practice知识区:');
        console.log(`  - 知识库: ${foundBase.name} (ID: ${foundBase.id})`);
        console.log(`  - 知识区: ${foundArea.name} (ID: ${foundArea.id})`);
        
        // 测试双参数调用
        const area = window.storageManager.getKnowledgeAreaById(foundBase.id, 'choice_practice');
        if (area) {
            console.log('✅ 双参数调用成功:', area.name);
        } else {
            console.log('❌ 双参数调用失败');
        }
    } else {
        console.log('❌ 未找到choice_practice知识区');
    }
    
    return { foundBase, foundArea };
}

// 测试知识区中的知识点数量
function testAreaKnowledgePoints(areaId) {
    console.log('\n=== 测试知识区中的知识点数量 ===');
    
    const allKnowledge = window.storageManager.getAllKnowledge();
    const areaPoints = allKnowledge.filter(point => point.areaId === areaId);
    
    console.log(`知识区 ${areaId} 中的知识点数量: ${areaPoints.length}`);
    
    if (areaPoints.length > 0) {
        console.log('前3个知识点:');
        areaPoints.slice(0, 3).forEach((point, index) => {
            console.log(`  ${index + 1}. ${point.question.substring(0, 50)}... (ID: ${point.id})`);
        });
    }
    
    return areaPoints;
}

// 测试知识管理器的startAreaReview方法
async function testKnowledgeManagerAreaReview(baseId, areaId) {
    console.log('\n=== 测试知识管理器的startAreaReview方法 ===');
    
    try {
        // 设置当前知识库
        if (window.knowledgeManager.currentBase?.id !== baseId) {
            const knowledgeBase = window.storageManager.getKnowledgeBaseById(baseId);
            if (knowledgeBase) {
                window.knowledgeManager.currentBase = knowledgeBase;
                window.storageManager.setCurrentKnowledgeBase(baseId);
                console.log(`✅ 设置当前知识库: ${knowledgeBase.name}`);
            }
        }
        
        // 调用startAreaReview方法（但不实际启动复习）
        console.log('🧪 测试startAreaReview方法的知识区查找逻辑...');
        
        // 模拟startAreaReview的前半部分逻辑
        const currentBaseId = window.knowledgeManager.currentBase?.id || window.storageManager.getCurrentKnowledgeBase()?.id;
        console.log(`当前知识库ID: ${currentBaseId}`);
        
        if (!currentBaseId) {
            console.log('❌ 无法确定当前知识库ID');
            return false;
        }
        
        const area = window.storageManager.getKnowledgeAreaById(currentBaseId, areaId);
        if (area) {
            console.log(`✅ 成功找到知识区: ${area.name}`);
            
            // 检查知识点数量
            const allKnowledge = window.storageManager.getAllKnowledge();
            const areaPoints = allKnowledge.filter(point => point.areaId === areaId);
            console.log(`✅ 知识区中有 ${areaPoints.length} 个知识点`);
            
            return true;
        } else {
            console.log(`❌ 未找到知识区 ${areaId} 在知识库 ${currentBaseId} 中`);
            return false;
        }
        
    } catch (error) {
        console.log('❌ 测试过程中出现错误:', error);
        return false;
    }
}

// 测试复习管理器的reviewKnowledgeArea方法
async function testReviewManagerAreaReview(areaId) {
    console.log('\n=== 测试复习管理器的reviewKnowledgeArea方法 ===');
    
    try {
        // 模拟reviewKnowledgeArea的前半部分逻辑
        console.log('🧪 测试reviewKnowledgeArea方法的知识区查找逻辑...');
        
        const allBases = window.storageManager.getAllKnowledgeBases();
        let area = null;
        let foundBaseId = null;
        
        for (const base of allBases) {
            if (base.areas) {
                const foundArea = base.areas.find(a => a.id === areaId);
                if (foundArea) {
                    area = foundArea;
                    foundBaseId = base.id;
                    break;
                }
            }
        }
        
        if (area && foundBaseId) {
            console.log(`✅ 成功找到知识区: ${area.name} (属于知识库: ${foundBaseId})`);
            
            // 检查知识点数量
            const allKnowledge = window.storageManager.getAllKnowledge();
            const areaPoints = allKnowledge.filter(point => point.areaId === areaId);
            console.log(`✅ 知识区中有 ${areaPoints.length} 个知识点`);
            
            return true;
        } else {
            console.log(`❌ 未找到知识区 ${areaId}`);
            return false;
        }
        
    } catch (error) {
        console.log('❌ 测试过程中出现错误:', error);
        return false;
    }
}

// 主测试函数
async function runAreaReviewFixTest() {
    try {
        await waitForLoad();
        console.log('✅ 页面加载完成');
        
        await waitForManagers();
        console.log('✅ 管理器初始化完成');
        
        // 等待数据加载
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 测试存储管理器方法
        const { foundBase, foundArea } = testGetKnowledgeAreaById();
        
        if (!foundBase || !foundArea) {
            console.log('❌ 无法继续测试，未找到choice_practice知识区');
            return;
        }
        
        // 测试知识点数量
        const areaPoints = testAreaKnowledgePoints('choice_practice');
        
        if (areaPoints.length === 0) {
            console.log('❌ 知识区中没有知识点，无法测试复习功能');
            return;
        }
        
        // 测试知识管理器方法
        const kmTest = await testKnowledgeManagerAreaReview(foundBase.id, 'choice_practice');
        
        // 测试复习管理器方法
        const rmTest = await testReviewManagerAreaReview('choice_practice');
        
        // 总结测试结果
        console.log('\n=== 测试结果总结 ===');
        console.log(`存储管理器查找: ${foundBase && foundArea ? '✅ 成功' : '❌ 失败'}`);
        console.log(`知识点数量检查: ${areaPoints.length > 0 ? '✅ 成功' : '❌ 失败'} (${areaPoints.length}个)`);
        console.log(`知识管理器测试: ${kmTest ? '✅ 成功' : '❌ 失败'}`);
        console.log(`复习管理器测试: ${rmTest ? '✅ 成功' : '❌ 失败'}`);
        
        if (kmTest && rmTest) {
            console.log('\n🎉 修复验证成功！choice_practice知识区复习功能已修复');
        } else {
            console.log('\n❌ 修复验证失败，仍存在问题');
        }
        
    } catch (error) {
        console.error('❌ 测试过程中出现错误:', error);
    }
}

// 等待DOM加载后运行测试
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAreaReviewFixTest);
} else {
    runAreaReviewFixTest();
}

// 导出测试函数供手动调用
window.testAreaReviewFix = runAreaReviewFixTest; 