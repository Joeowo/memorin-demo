// 软件测试知识点导入功能
function importSoftwareTesting() {
    try {
        console.log('开始导入软件测试知识点...');
        
        // 软件测试知识点数据
        const testingKnowledge = [
            {
                id: 'se_testing_001',
                type: 'fill',
                question: '软件测试的定义是什么？',
                answer: '软件测试是在规定的条件下对程序进行操作，以发现程序错误，衡量软件质量，并对其是否能满足设计要求进行评估的过程。',
                explanation: '软件测试是软件质量保证的重要手段，通过系统化的测试活动来验证软件的正确性。',
                tags: ['软件测试', '基本概念', '定义'],
                difficulty: 2,
                score: 70
            },
            {
                id: 'se_testing_002',
                type: 'choice',
                choiceType: 'single',
                question: '黑盒测试的主要特点是什么？',
                options: [
                    { key: 'A', text: '基于程序内部结构设计测试用例' },
                    { key: 'B', text: '基于程序功能规格说明设计测试用例' },
                    { key: 'C', text: '只测试程序的边界条件' },
                    { key: 'D', text: '只测试程序的异常处理' }
                ],
                correctAnswer: 'B',
                explanation: '黑盒测试不考虑程序内部结构，只基于功能需求和规格说明来设计测试用例。',
                tags: ['黑盒测试', '测试方法', '功能测试'],
                difficulty: 2,
                score: 65
            },
            {
                id: 'se_testing_003',
                type: 'choice',
                choiceType: 'multiple',
                question: '软件测试的层次包括哪些？',
                options: [
                    { key: 'A', text: '单元测试' },
                    { key: 'B', text: '集成测试' },
                    { key: 'C', text: '系统测试' },
                    { key: 'D', text: '验收测试' }
                ],
                correctAnswer: 'A,B,C,D',
                explanation: '软件测试按照测试层次分为单元测试、集成测试、系统测试和验收测试四个层次。',
                tags: ['测试层次', '单元测试', '集成测试', '系统测试', '验收测试'],
                difficulty: 3,
                score: 75
            }
        ];
        
        console.log(`解析出 ${testingKnowledge.length} 个软件测试知识点`);
        
        // 检查软件工程知识库是否存在
        const existingBases = window.storageManager.getAllKnowledgeBases();
        let softwareEngineeringBase = existingBases.find(base => base.id === 'software_engineering_base');
        
        if (!softwareEngineeringBase) {
            // 如果知识库不存在，先创建基础知识库
            console.log('软件工程知识库不存在，创建基础知识库...');
            softwareEngineeringBase = {
                id: 'software_engineering_base',
                name: '软件工程知识库',
                description: '软件工程课程完整知识体系',
                icon: '💻',
                color: '#1890ff',
                areas: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            const addResult = window.storageManager.addKnowledgeBase(softwareEngineeringBase);
            if (!addResult) {
                throw new Error('创建软件工程知识库失败');
            }
        }
        
        // 检查是否已存在软件测试知识区
        const data = window.storageManager.getData();
        const baseIndex = data.knowledgeBases.findIndex(base => base.id === 'software_engineering_base');
        
        if (baseIndex === -1) {
            throw new Error('软件工程知识库未找到');
        }
        
        let testingArea = data.knowledgeBases[baseIndex].areas.find(area => area.id === 'software_testing');
        const existingTestingKnowledge = data.knowledge.filter(k => 
            k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'software_testing'
        );
        
        if (testingArea && existingTestingKnowledge.length > 0) {
            const confirmMessage = `⚠️ 软件测试知识区已存在！\n\n当前数据：\n• 知识区：${testingArea.name}\n• 知识点数量：${existingTestingKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入软件测试知识点', 'info');
                } else {
                    alert('取消导入软件测试知识点');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有软件测试知识区数据');
            
            // 删除原有知识点
            data.knowledge = data.knowledge.filter(k => 
                !(k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'software_testing')
            );
        } else {
            // 创建软件测试知识区
            testingArea = {
                id: 'software_testing',
                name: '软件测试',
                description: '软件测试方法、技术和流程',
                color: '#faad14',
                knowledgePoints: []
            };
            
            data.knowledgeBases[baseIndex].areas.push(testingArea);
        }
        
        // 将知识点转换为标准格式
        const formattedKnowledge = testingKnowledge.map(item => ({
            ...item,
            category: '软件测试',
            areaId: 'software_testing',
            knowledgeBaseId: 'software_engineering_base',
            reviewCount: 0,
            correctCount: 0,
            lastReviewed: null,
            nextReview: new Date().toISOString(),
            interval: 1,
            easeFactor: 2.5,
            note: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));
        
        // 验证知识点数据
        const validKnowledge = formattedKnowledge.filter(point => {
            const isValid = window.storageManager.validateKnowledgePoint(point);
            if (!isValid) {
                console.warn('无效的知识点数据:', point);
            }
            return isValid;
        });
        
        console.log(`有效知识点数量: ${validKnowledge.length}`);
        
        // 添加新的知识点
        data.knowledge = [...data.knowledge, ...validKnowledge];
        
        // 更新知识库的更新时间
        data.knowledgeBases[baseIndex].updatedAt = new Date().toISOString();
        
        // 保存数据
        const success = window.storageManager.setData(data);
        
        if (!success) {
            throw new Error('保存数据失败');
        }
        
        console.log(`成功导入${validKnowledge.length}个软件测试知识点！`);
        
        // 显示成功通知
        const fillCount = validKnowledge.filter(k => k.type === 'fill').length;
        const choiceCount = validKnowledge.filter(k => k.type === 'choice').length;
        
        const successMessage = `✅ 软件测试知识点导入成功！\n\n包含内容：\n- 知识区：软件测试\n- ${fillCount}个填空题\n- ${choiceCount}个选择题\n- 总计：${validKnowledge.length}个知识点\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
        if (window.app && window.app.showNotification) {
            window.app.showNotification(successMessage, 'success');
        } else {
            alert(successMessage);
        }
        
        // 刷新相关组件
        if (window.knowledgeManager) {
            window.knowledgeManager.refresh();
        }
        
        if (window.app && window.app.currentSection === 'knowledge') {
            window.app.loadSectionData('knowledge');
        }
        
        if (window.app && window.app.loadDashboard) {
            window.app.loadDashboard();
        }
        
    } catch (error) {
        console.error('导入软件测试知识点失败:', error);
        const errorMessage = '❌ 导入软件测试知识点失败：' + error.message;
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
    }
}

// 将导入函数添加到全局作用域
window.importSoftwareTesting = importSoftwareTesting;

console.log('软件测试导入功能已加载'); 