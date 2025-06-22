// 软件部署运维知识库导入脚本
// 从软件部署运维文档中解析出的完整知识点

const softwareDeploymentKnowledge = [
    // 概念类知识点 - 填空题
    {
        id: 'se_deploy_001',
        type: 'fill',
        question: '软件部署的定义是什么？',
        answer: '将目标软件系统(包括软构件、配置文件、用户手册等)进行收集、打包、安装、配置和发布到运行环境的过程。',
        explanation: '软件部署是将开发完成的软件系统投入实际运行环境的关键过程。',
        tags: ['软件部署定义', '系统发布', '运行环境'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_deploy_002',
        type: 'fill',
        question: '软件运行环境的定义是什么？',
        answer: '软件运行所依赖的上下文，为软件系统提供必要的基础服务和功能、必须的数据和基本的计算能力。',
        explanation: '运行环境是软件系统正常运行的基础支撑平台。',
        tags: ['运行环境', '基础服务', '计算能力'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_deploy_003',
        type: 'fill',
        question: '软件部署原则包括哪些？',
        answer: '1. 最小化原则：只需安装支撑软件运行的最少软硬件要素\n2. 相关性原则：只部署与系统建设相关联的要素\n3. 适应性原则：随运行环境变化调整部署方案',
        explanation: '部署原则确保部署的高效性、针对性和灵活性。',
        tags: ['部署原则', '最小化', '适应性'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_deploy_004',
        type: 'fill',
        question: '容器的特点包括哪些？',
        answer: '1. 视图隔离、资源可限制\n2. 具有独立文件系统\n3. 比虚拟机更轻量级',
        explanation: '容器技术提供了轻量级的应用隔离和部署方案。',
        tags: ['容器特点', '视图隔离', '轻量级'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_deploy_005',
        type: 'fill',
        question: 'Docker容器的核心特征是什么？',
        answer: '1. 运行在独立命名空间的进程\n2. 容器镜像封装应用及依赖环境\n3. 镜像内容不会改变',
        explanation: 'Docker通过容器镜像实现应用的标准化打包和部署。',
        tags: ['Docker容器', '命名空间', '容器镜像'],
        difficulty: 3,
        score: 85
    },
    {
        id: 'se_deploy_006',
        type: 'fill',
        question: '软件维护的定义是什么？',
        answer: '软件在交付使用后，由于应用需求和环境变化以及自身问题，对软件系统进行改造和调整的过程。',
        explanation: '软件维护是软件生命周期中持续时间最长的阶段。',
        tags: ['软件维护', '系统改造', '需求变化'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_deploy_007',
        type: 'fill',
        question: '软件维护特点包括哪些？',
        answer: '1. 同步性：与使用同步进行\n2. 周期长：可能持续十几年\n3. 费用高：占总成本80%以上\n4. 难度大：需充分理解原有系统',
        explanation: '维护特点决定了维护工作的复杂性和重要性。',
        tags: ['维护特点', '同步性', '高成本'],
        difficulty: 3,
        score: 85
    },
    {
        id: 'se_deploy_008',
        type: 'fill',
        question: '维护流程包括哪些步骤？',
        answer: '1. 提出维护申请\n2. 评审批准申请\n3. 修改文档和代码\n4. 回归测试\n5. 交付运行',
        explanation: '标准化的维护流程确保维护工作的质量和可控性。',
        tags: ['维护流程', '申请评审', '回归测试'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_deploy_009',
        type: 'fill',
        question: '软件演化的定义是什么？',
        answer: '针对软件的大规模功能增强和结构调整，以实现变化的软件需求或提高软件质量。',
        explanation: '软件演化是软件系统适应长期变化需求的重要机制。',
        tags: ['软件演化', '功能增强', '结构调整'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_deploy_010',
        type: 'fill',
        question: '软件演化特点包括哪些？',
        answer: '1. 功能增强粒度大\n2. 主动应对变更\n3. 持续性演化\n4. 引发版本变化',
        explanation: '演化特点体现了软件系统的主动适应和持续改进能力。',
        tags: ['演化特点', '粒度大', '持续性'],
        difficulty: 3,
        score: 80
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_deploy_011',
        type: 'choice',
        choiceType: 'multiple',
        question: '部署分类包括哪些？',
        options: [
            { key: 'A', text: '单机部署：集中部署到单一计算设备' },
            { key: 'B', text: '分布式部署：分散部署在多个计算设备' },
            { key: 'C', text: '云端部署：部署到云计算平台（干扰项）' }
        ],
        correctAnswer: 'A,B',
        explanation: '部署分类主要基于设备数量，云端部署是部署方法而非基本分类。',
        tags: ['部署分类', '单机部署', '分布式部署'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_deploy_012',
        type: 'choice',
        choiceType: 'multiple',
        question: '部署方法包括哪些？',
        options: [
            { key: 'A', text: '基于操作系统的部署' },
            { key: 'B', text: '基于软件开发框架的部署' },
            { key: 'C', text: '基于虚拟机的部署' },
            { key: 'D', text: '基于容器的部署' },
            { key: 'E', text: '基于硬件的部署（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '部署方法基于软件技术栈，硬件部署不是软件部署方法分类。',
        tags: ['部署方法', '技术栈', '虚拟化'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_deploy_013',
        type: 'choice',
        choiceType: 'multiple',
        question: '软件维护分类包括哪些？',
        options: [
            { key: 'A', text: '纠错性维护：纠正软件缺陷' },
            { key: 'B', text: '适应性维护：适应新环境' },
            { key: 'C', text: '完善性维护：增加新功能' },
            { key: 'D', text: '预防性维护：提高可靠性' },
            { key: 'E', text: '应急性维护：处理紧急故障（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '标准维护分类为四种类型，应急性维护通常归入纠错性维护范畴。',
        tags: ['维护分类', '纠错性', '预防性'],
        difficulty: 3,
        score: 85
    },
    {
        id: 'se_deploy_014',
        type: 'choice',
        choiceType: 'multiple',
        question: '维护方法包括哪些？',
        options: [
            { key: 'A', text: '面向过程维护方法' },
            { key: 'B', text: '面向数据维护方法' },
            { key: 'C', text: '面向对象维护方法' },
            { key: 'D', text: '面向服务维护方法（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '维护方法对应主要的编程范式，面向服务不是基本的维护方法分类。',
        tags: ['维护方法', '编程范式', '方法论'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_deploy_015',
        type: 'choice',
        choiceType: 'single',
        question: '软件运行环境关系图展示的核心内容是什么？',
        options: [
            { key: 'A', text: '展示软件系统与运行环境的依赖关系和交互模式' },
            { key: 'B', text: '展示软件的功能模块结构' },
            { key: 'C', text: '展示系统的网络拓扑结构' },
            { key: 'D', text: '展示项目的组织架构图（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '运行环境关系图主要说明软件与环境的依赖和交互关系。',
        tags: ['环境关系图', '依赖关系', '交互模式'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_deploy_016',
        type: 'choice',
        choiceType: 'single',
        question: '容器部署流程图的价值是什么？',
        options: [
            { key: 'A', text: '展示Docker容器构建和部署的完整流程和操作步骤' },
            { key: 'B', text: '展示容器的内部架构设计' },
            { key: 'C', text: '展示容器的性能监控指标' },
            { key: 'D', text: '展示容器的成本分析报告（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '容器部署流程图指导容器技术的实际应用和操作。',
        tags: ['容器流程', 'Docker部署', '操作指导'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_deploy_017',
        type: 'choice',
        choiceType: 'single',
        question: '维护分类对比表的作用是什么？',
        options: [
            { key: 'A', text: '展示四种维护类型的特点、目的和适用场景的对比分析' },
            { key: 'B', text: '展示维护工具的功能对比' },
            { key: 'C', text: '展示维护团队的技能要求' },
            { key: 'D', text: '展示维护成本的预算分析（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '维护分类对比表帮助理解不同维护类型的区别和应用。',
        tags: ['维护对比', '类型分析', '应用场景'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_deploy_018',
        type: 'choice',
        choiceType: 'single',
        question: '软件演化法则图示的核心价值是什么？',
        options: [
            { key: 'A', text: '展示八大软件演化法则，指导软件系统的长期演进策略' },
            { key: 'B', text: '展示软件版本的发布计划' },
            { key: 'C', text: '展示软件的技术架构演进' },
            { key: 'D', text: '展示软件的市场竞争分析（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '演化法则图示提供了软件演化的理论指导和实践原则。',
        tags: ['演化法则', '演进策略', '理论指导'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_deploy_019',
        type: 'choice',
        choiceType: 'multiple',
        question: '容器技术优势包括哪些？',
        options: [
            { key: 'A', text: '资源利用率高（轻量级）' },
            { key: 'B', text: '部署速度快（秒级启动）' },
            { key: 'C', text: '环境一致性好（镜像标准化）' },
            { key: 'D', text: '可移植性强（跨平台运行）' },
            { key: 'E', text: '开发成本低（减少编码工作）' },
            { key: 'F', text: '硬件性能强（提升计算能力）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '容器技术主要在部署和运维层面提供优势，不直接提升硬件性能。',
        tags: ['容器优势', '轻量级', '标准化'],
        difficulty: 3,
        score: 85
    },
    {
        id: 'se_deploy_020',
        type: 'choice',
        choiceType: 'multiple',
        question: '部署环境类型包括哪些？',
        options: [
            { key: 'A', text: '开发环境（Development）' },
            { key: 'B', text: '测试环境（Testing）' },
            { key: 'C', text: '预发布环境（Staging）' },
            { key: 'D', text: '生产环境（Production）' },
            { key: 'E', text: '灾备环境（Disaster Recovery）' },
            { key: 'F', text: '演示环境（Demo）' },
            { key: 'G', text: '研究环境（Research）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F',
        explanation: '部署环境基于软件生命周期阶段，研究环境不是标准的部署环境类型。',
        tags: ['部署环境', '生命周期', '环境管理'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_deploy_021',
        type: 'choice',
        choiceType: 'multiple',
        question: '软件配置管理要素包括哪些？',
        options: [
            { key: 'A', text: '配置项识别（Configuration Item）' },
            { key: 'B', text: '版本控制（Version Control）' },
            { key: 'C', text: '变更控制（Change Control）' },
            { key: 'D', text: '配置审计（Configuration Audit）' },
            { key: 'E', text: '基线管理（Baseline Management）' },
            { key: 'F', text: '性能监控（Performance Monitoring）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '配置管理关注软件制品的版本和变更控制，性能监控属于运维范畴。',
        tags: ['配置管理', '版本控制', '变更控制'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_deploy_022',
        type: 'choice',
        choiceType: 'multiple',
        question: '运维监控指标包括哪些？',
        options: [
            { key: 'A', text: '系统性能指标（CPU、内存、磁盘）' },
            { key: 'B', text: '应用性能指标（响应时间、吞吐量）' },
            { key: 'C', text: '业务指标（用户数、交易量）' },
            { key: 'D', text: '可用性指标（正常运行时间）' },
            { key: 'E', text: '安全指标（入侵检测、访问控制）' },
            { key: 'F', text: '开发指标（代码质量、提交频率）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '运维监控关注系统运行状态，开发指标属于开发阶段的度量。',
        tags: ['运维监控', '性能指标', '可用性'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_deploy_023',
        type: 'choice',
        choiceType: 'single',
        question: '软件部署与软件安装的区别是什么？',
        options: [
            { key: 'A', text: '部署是完整的发布过程，安装只是部署的一个环节' },
            { key: 'B', text: '部署和安装是同一个概念' },
            { key: 'C', text: '安装比部署的范围更大' },
            { key: 'D', text: '部署只针对大型系统，安装针对小型软件（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '软件部署是包含安装在内的完整发布流程，范围更广。',
        tags: ['部署安装', '概念区别', '流程范围'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_deploy_024',
        type: 'choice',
        choiceType: 'single',
        question: '软件维护与软件演化的主要区别是什么？',
        options: [
            { key: 'A', text: '维护是小规模调整，演化是大规模功能增强和结构调整' },
            { key: 'B', text: '维护和演化没有区别' },
            { key: 'C', text: '演化只是维护的一种类型' },
            { key: 'D', text: '维护是主动的，演化是被动的（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '维护和演化的主要区别在于变更的规模和影响范围。',
        tags: ['维护演化', '规模区别', '变更范围'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_deploy_025',
        type: 'choice',
        choiceType: 'single',
        question: '软件部署运维阶段在软件生命周期中的定位是什么？',
        options: [
            { key: 'A', text: '位于软件开发完成后，负责系统的发布、运行和维护' },
            { key: 'B', text: '贯穿整个软件开发过程' },
            { key: 'C', text: '只在软件开发初期进行规划' },
            { key: 'D', text: '主要在软件测试阶段进行（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '部署运维是软件生命周期的后期阶段，确保软件的正常运行和持续服务。',
        tags: ['生命周期', '阶段定位', '运行维护'],
        difficulty: 2,
        score: 70
    }
];

console.log(`软件部署运维导入脚本已加载，包含 ${softwareDeploymentKnowledge.length} 个知识点`);

// 软件部署运维知识点导入函数
function importSoftwareDeployment() {
    try {
        console.log('开始导入软件部署运维知识点...');
        
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
        
        // 检查是否已存在软件部署运维知识区
        const data = window.storageManager.getData();
        const baseIndex = data.knowledgeBases.findIndex(base => base.id === 'software_engineering_base');
        
        if (baseIndex === -1) {
            throw new Error('软件工程知识库未找到');
        }
        
        let deploymentArea = data.knowledgeBases[baseIndex].areas.find(area => area.id === 'software_deployment');
        const existingDeploymentKnowledge = data.knowledge.filter(k => 
            k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'software_deployment'
        );
        
        if (deploymentArea && existingDeploymentKnowledge.length > 0) {
            const confirmMessage = `⚠️ 软件部署运维知识区已存在！\n\n当前数据：\n• 知识区：${deploymentArea.name}\n• 知识点数量：${existingDeploymentKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入软件部署运维知识点', 'info');
                } else {
                    alert('取消导入软件部署运维知识点');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有软件部署运维知识区数据');
            
            // 删除原有知识点
            data.knowledge = data.knowledge.filter(k => 
                !(k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'software_deployment')
            );
        } else {
            // 创建软件部署运维知识区
            deploymentArea = {
                id: 'software_deployment',
                name: '软件部署运维',
                description: '软件部署、维护与演化技术',
                color: '#722ed1',
                knowledgePoints: []
            };
            
            data.knowledgeBases[baseIndex].areas.push(deploymentArea);
        }
        
        // 将知识点转换为标准格式
        const formattedKnowledge = softwareDeploymentKnowledge.map(item => ({
            ...item,
            category: '软件部署运维',
            areaId: 'software_deployment',
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
        
        console.log(`成功导入${validKnowledge.length}个软件部署运维知识点！`);
        
        // 显示成功通知
        const fillCount = validKnowledge.filter(k => k.type === 'fill').length;
        const choiceCount = validKnowledge.filter(k => k.type === 'choice').length;
        
        const successMessage = `✅ 软件部署运维知识点导入成功！\n\n📊 导入统计：\n- 知识区：软件部署运维\n- 填空题：${fillCount}个（概念类）\n- 选择题：${choiceCount}个（知识点+属性类）\n- 总计：${validKnowledge.length}个知识点\n\n📚 内容涵盖：\n• 软件部署基础与原则\n• 容器化部署技术（Docker）\n• 软件维护分类与方法\n• 软件演化理论与实践\n• 配置管理与运维监控\n\n🎯 特色功能：\n• 涵盖从部署到运维的完整生命周期\n• 包含传统部署和现代容器化技术\n• 系统阐述维护与演化的区别和联系\n• 所有选择题都精心设计了干扰项\n• 结合理论原则与实践操作\n\n💡 核心技术：\n• 部署原则与分类方法\n• Docker容器技术应用\n• 四种维护类型详解\n• 软件演化法则指导\n• 环境管理与监控体系\n• 配置管理最佳实践\n\n🚀 实用价值：\n• 指导软件系统的生产部署\n• 提供维护工作的方法论\n• 支持DevOps实践落地\n• 保障系统稳定运行\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
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
        console.error('导入软件部署运维知识点失败:', error);
        const errorMessage = '❌ 导入软件部署运维知识点失败：' + error.message;
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
    }
}

// 将导入函数添加到全局作用域
window.importSoftwareDeployment = importSoftwareDeployment;
window.softwareDeploymentKnowledge = softwareDeploymentKnowledge;

console.log('软件部署运维知识库导入脚本已完全加载'); 