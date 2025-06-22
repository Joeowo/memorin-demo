// 软件工程知识库导入脚本
const softwareEngineeringKnowledge = {
    id: 'software_engineering',
    name: '软件工程知识库',
    description: '软件工程课程完整试题集',
    icon: '💻',
    color: '#1890ff',
    areas: [
        {
            id: 'choice_practice',
            name: '选择专练',
            description: '软件工程选择题专项练习',
            color: '#1890ff',
            knowledgePoints: [
                {
                    id: 'se_0001',
                    type: 'choice',
                    choiceType: 'single',
                    question: '下面哪个是软件工程的三要素？',
                    options: [
                        { key: 'A', text: '质量、过程、方法' },
                        { key: 'B', text: '工具、质量、过程' },
                        { key: 'C', text: '方法、工具、质量' },
                        { key: 'D', text: '方法、过程、工具' }
                    ],
                    correctAnswer: 'D',
                    explanation: '软件工程的三要素是方法、过程、工具，这是软件工程的基本构成要素。',
                    tags: ['软件工程', '基本概念', '三要素'],
                    difficulty: 2,
                    score: 50
                },
                {
                    id: 'se_0002',
                    type: 'choice',
                    choiceType: 'single',
                    question: '你认为软件工程课程培养最重要的能力是？',
                    options: [
                        { key: 'A', text: '分析和解决目标领域问题的能力' },
                        { key: 'B', text: '编程框架应用能力' },
                        { key: 'C', text: '编程能力' }
                    ],
                    correctAnswer: 'A',
                    explanation: '软件工程课程的核心目标是培养学生分析和解决实际问题的能力。',
                    tags: ['软件工程', '能力培养'],
                    difficulty: 2,
                    score: 50
                },
                {
                    id: 'se_0003',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '软件不等于程序，相对于程序而言，软件由哪几部分组成？',
                    options: [
                        { key: 'A', text: '文档' },
                        { key: 'B', text: '日志' },
                        { key: 'C', text: '数据' },
                        { key: 'D', text: '程序' }
                    ],
                    correctAnswer: 'A,C,D',
                    explanation: '软件 = 程序 + 数据 + 文档，这是软件工程中对软件的完整定义。',
                    tags: ['软件工程', '软件定义', '软件组成'],
                    difficulty: 3,
                    score: 66
                },
                {
                    id: 'se_0004',
                    type: 'choice',
                    choiceType: 'single',
                    question: '以下哪一个选项是IEEE给出的软件工程的定义？',
                    options: [
                        { key: 'A', text: '软件工程是研究软件开发和软件管理的一门工程学科' },
                        { key: 'B', text: '软件工程是一个过程、一组方法和一系列工具' },
                        { key: 'C', text: '软件工程是将系统化的、严格约束的、可量化的方法，应用于软件开发、运行和维护过程中' },
                        { key: 'D', text: '软件工程是软件开发、运行、维护和引退的系统方法' }
                    ],
                    correctAnswer: 'C',
                    explanation: 'IEEE对软件工程的定义强调系统化、严格约束和可量化的方法论。',
                    tags: ['软件工程', 'IEEE定义'],
                    difficulty: 3,
                    score: 34
                },
                {
                    id: 'se_0005',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '选择软件过程模型时需要考虑哪些因素？',
                    options: [
                        { key: 'A', text: '软件项目的特点' },
                        { key: 'B', text: '各种软件过程模型特点' },
                        { key: 'C', text: '用户喜好' },
                        { key: 'D', text: '软件开发团队的水平' }
                    ],
                    correctAnswer: 'A,B,D',
                    explanation: '选择软件过程模型需要考虑项目特点、模型特点和团队水平，用户喜好不是主要因素。',
                    tags: ['软件过程', '过程模型', '选择因素'],
                    difficulty: 3,
                    score: 50
                },
                {
                    id: 'se_0006',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '软件项目管理的对象？',
                    options: [
                        { key: 'A', text: '人(参与项目开发的人员）' },
                        { key: 'B', text: '物（软件制品）' },
                        { key: 'C', text: '进度安排' },
                        { key: 'D', text: '过程（软件开发过程）' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '软件项目管理需要管理人员、制品、进度和过程等所有要素。',
                    tags: ['项目管理', '管理对象'],
                    difficulty: 2,
                    score: 50
                },
                {
                    id: 'se_0007',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '需求主要分哪几个层次？',
                    options: [
                        { key: 'A', text: '易用性需求' },
                        { key: 'B', text: '用户需求' },
                        { key: 'C', text: '系统（软件）需求' },
                        { key: 'D', text: '业务需求' }
                    ],
                    correctAnswer: 'B,C,D',
                    explanation: '需求分为业务需求、用户需求和系统需求三个层次。',
                    tags: ['需求工程', '需求层次'],
                    difficulty: 3,
                    score: 50
                },
                {
                    id: 'se_0008',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '需求工程过程模型主要分哪几个阶段？',
                    options: [
                        { key: 'A', text: '需求确认与验证' },
                        { key: 'B', text: '需求获取' },
                        { key: 'C', text: '需求精化与规约' },
                        { key: 'D', text: '需求管理' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '需求工程过程包括需求获取、需求精化与规约、需求确认与验证三个主要阶段。',
                    tags: ['需求工程', '过程模型'],
                    difficulty: 3,
                    score: 50
                },
                {
                    id: 'se_0009',
                    type: 'choice',
                    choiceType: 'single',
                    question: '系统顺序图与对象顺序图的主要区别是？',
                    options: [
                        { key: 'A', text: '消息Message' },
                        { key: 'B', text: '以上的项都是' },
                        { key: 'C', text: '对象（系统顺序图中的对象是整个系统）' },
                        { key: 'D', text: '激活Execution' }
                    ],
                    correctAnswer: 'C',
                    explanation: '系统顺序图将整个系统视为一个对象，这是与对象顺序图的主要区别。',
                    tags: ['UML', '顺序图', '系统设计'],
                    difficulty: 3,
                    score: 1
                },
                {
                    id: 'se_0010',
                    type: 'choice',
                    choiceType: 'single',
                    question: '概念类图与类图的主要区别是以下哪一项？',
                    options: [
                        { key: 'A', text: '类名' },
                        { key: 'B', text: '以上都是' },
                        { key: 'C', text: '属性' },
                        { key: 'D', text: '操作' }
                    ],
                    correctAnswer: 'D',
                    explanation: '概念类图不包含操作（方法），只包含类名和属性，这是与类图的主要区别。',
                    tags: ['UML', '类图', '概念建模'],
                    difficulty: 2,
                    score: 100
                },
                {
                    id: 'se_0011',
                    type: 'choice',
                    choiceType: 'single',
                    question: '用例图中参与者之间可以有以下哪种关系？',
                    options: [
                        { key: 'A', text: '泛化关系' },
                        { key: 'B', text: '包含关系' },
                        { key: 'C', text: '实体关系' },
                        { key: 'D', text: '拓展关系' }
                    ],
                    correctAnswer: 'A',
                    explanation: '用例图中参与者之间可以有泛化关系，表示参与者的继承关系。',
                    tags: ['UML', '用例图', '参与者关系'],
                    difficulty: 2,
                    score: 100
                },
                {
                    id: 'se_0012',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '下面哪两项是用例之间的关系？',
                    options: [
                        { key: 'A', text: '扩展关系' },
                        { key: 'B', text: '包含关系' },
                        { key: 'C', text: '泛化关系' },
                        { key: 'D', text: '实现关系' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '用例之间可以有扩展关系、包含关系和泛化关系。',
                    tags: ['UML', '用例图', '用例关系'],
                    difficulty: 3,
                    score: 100
                },
                {
                    id: 'se_0013',
                    type: 'choice',
                    choiceType: 'single',
                    question: '以下哪种UML图不能用于系统概要设计？',
                    options: [
                        { key: 'A', text: '组件顺序图' },
                        { key: 'B', text: '对象活动图' },
                        { key: 'C', text: '包图' },
                        { key: 'D', text: '组件图' }
                    ],
                    correctAnswer: 'B',
                    explanation: '对象活动图用于详细设计阶段，不适用于系统概要设计。',
                    tags: ['UML', '系统设计', '设计阶段'],
                    difficulty: 3,
                    score: 1
                },
                {
                    id: 'se_0014',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '软件架构设计的主要过程？',
                    options: [
                        { key: 'A', text: '初步架构设计' },
                        { key: 'B', text: '可用的软件资源重用' },
                        { key: 'C', text: '架构设计精化' },
                        { key: 'D', text: '架构设计评审' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '软件架构设计包括初步设计、资源重用、设计精化和设计评审等过程。',
                    tags: ['软件架构', '设计过程'],
                    difficulty: 3,
                    score: 2
                },
                {
                    id: 'se_0015',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '常用的架构设计模式有哪些？',
                    options: [
                        { key: 'A', text: '管道模式' },
                        { key: 'B', text: '面向服务架构模式' },
                        { key: 'C', text: '星型架构模式' },
                        { key: 'D', text: '分层架构模式' }
                    ],
                    correctAnswer: 'A,B,D',
                    explanation: '常用的架构模式包括管道模式、面向服务架构模式和分层架构模式。',
                    tags: ['软件架构', '设计模式'],
                    difficulty: 4,
                    score: 2
                },
                {
                    id: 'se_0016',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '软件设计的主要过程？',
                    options: [
                        { key: 'A', text: '详细设计' },
                        { key: 'B', text: '用例设计' },
                        { key: 'C', text: '软件设计评审' },
                        { key: 'D', text: '体系架构设计' }
                    ],
                    correctAnswer: 'A,C,D',
                    explanation: '软件设计的主要过程包括体系架构设计、详细设计和软件设计评审。',
                    tags: ['软件设计', '设计过程'],
                    difficulty: 3,
                    score: 2
                },
                {
                    id: 'se_0017',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '以下哪些UML图可以用于系统详细设计？',
                    options: [
                        { key: 'A', text: '对象活动图' },
                        { key: 'B', text: '类图' },
                        { key: 'C', text: '对象顺序图' },
                        { key: 'D', text: '对象状态图' }
                    ],
                    correctAnswer: 'B,C,D',
                    explanation: '类图、对象顺序图和对象状态图都可以用于系统详细设计。',
                    tags: ['UML', '详细设计'],
                    difficulty: 3,
                    score: 2
                },
                {
                    id: 'se_0018',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '面向对象方法的详细设计主要包括哪些过程？',
                    options: [
                        { key: 'A', text: '持久化设计' },
                        { key: 'B', text: '函数设计' },
                        { key: 'C', text: '用例设计' },
                        { key: 'D', text: '类设计' }
                    ],
                    correctAnswer: 'A,D',
                    explanation: '面向对象方法的详细设计主要包括类设计和持久化设计。',
                    tags: ['面向对象', '详细设计'],
                    difficulty: 4,
                    score: 2
                },
                {
                    id: 'se_0019',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '下面哪些活动属于类的设计过程？',
                    options: [
                        { key: 'A', text: '构建状态图' },
                        { key: 'B', text: '构建用例图' },
                        { key: 'C', text: '精化类间关系' },
                        { key: 'D', text: '精化属性和方法' }
                    ],
                    correctAnswer: 'C,D',
                    explanation: '类的设计过程主要包括精化类间关系和精化属性和方法。',
                    tags: ['类设计', '面向对象'],
                    difficulty: 3,
                    score: 2
                },
                {
                    id: 'se_0020',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '以下哪种面向过程模型可以用进行详细设计？',
                    options: [
                        { key: 'A', text: '伪代码PDL' },
                        { key: 'B', text: 'N-S盒图' },
                        { key: 'C', text: '程序流程图' },
                        { key: 'D', text: '问题分析图PAD' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '所有这些面向过程的模型都可以用于详细设计。',
                    tags: ['详细设计', '面向过程'],
                    difficulty: 2,
                    score: 2
                },
                {
                    id: 'se_0021',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '软件实现的原则哪些？',
                    options: [
                        { key: 'A', text: '易改' },
                        { key: 'B', text: '多人协同' },
                        { key: 'C', text: '具有容错性' },
                        { key: 'D', text: '易读' }
                    ],
                    correctAnswer: 'A,C,D',
                    explanation: '软件实现的原则包括易改、具有容错性和易读。',
                    tags: ['软件实现', '实现原则'],
                    difficulty: 3,
                    score: 100
                },
                {
                    id: 'se_0022',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '程序故障、错误、失效的关系？',
                    options: [
                        { key: 'A', text: '程序错误的根源在于程序中存在故障' },
                        { key: 'B', text: '程序失效会导致故障' },
                        { key: 'C', text: '程序错误会导致故障' },
                        { key: 'D', text: '程序的错误运行会导致软件失效' }
                    ],
                    correctAnswer: 'A,D',
                    explanation: '故障导致错误，错误运行导致失效，这是故障-错误-失效的因果关系链。',
                    tags: ['软件测试', '故障分析'],
                    difficulty: 4,
                    score: 50
                },
                {
                    id: 'se_0023',
                    type: 'choice',
                    choiceType: 'single',
                    question: '下面哪一项不属于软件的动态测试方法？',
                    options: [
                        { key: 'A', text: '灰盒测试' },
                        { key: 'B', text: '黄盒测试' },
                        { key: 'C', text: '白盒测试' },
                        { key: 'D', text: '黑盒测试' }
                    ],
                    correctAnswer: 'B',
                    explanation: '黄盒测试不是标准的软件测试方法，动态测试方法包括黑盒、白盒和灰盒测试。',
                    tags: ['软件测试', '测试方法'],
                    difficulty: 2,
                    score: 50
                },
                {
                    id: 'se_0024',
                    type: 'choice',
                    choiceType: 'single',
                    question: '下面哪一项不属于是黑盒测试方法？',
                    options: [
                        { key: 'A', text: '边界值分析法' },
                        { key: 'B', text: '路径覆盖法' },
                        { key: 'C', text: '等价类划分法' },
                        { key: 'D', text: '错误推测法' }
                    ],
                    correctAnswer: 'B',
                    explanation: '路径覆盖法是白盒测试方法，其他都是黑盒测试方法。',
                    tags: ['软件测试', '黑盒测试'],
                    difficulty: 3,
                    score: 100
                },
                {
                    id: 'se_0025',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '下面哪些活动属于软件测试过程？',
                    options: [
                        { key: 'A', text: '集成测试' },
                        { key: 'B', text: '验收测试' },
                        { key: 'C', text: '确认测试' },
                        { key: 'D', text: '单元测试' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '软件测试过程包括单元测试、集成测试、确认测试和验收测试。',
                    tags: ['软件测试', '测试过程'],
                    difficulty: 2,
                    score: 50
                },
                {
                    id: 'se_0026',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '下面哪些项属于白盒测试方法？',
                    options: [
                        { key: 'A', text: '语句覆盖' },
                        { key: 'B', text: '条件覆盖' },
                        { key: 'C', text: '组合覆盖' },
                        { key: 'D', text: '分支覆盖' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '这些都是白盒测试的覆盖准则，用于衡量测试的充分性。',
                    tags: ['软件测试', '白盒测试', '覆盖准则'],
                    difficulty: 3,
                    score: 50
                },
                {
                    id: 'se_0027',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '下面哪些项是软件维护的分类？',
                    options: [
                        { key: 'A', text: '完善性维护' },
                        { key: 'B', text: '预防性维护' },
                        { key: 'C', text: '纠错性维护' },
                        { key: 'D', text: '适应性维护' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '软件维护分为纠错性、适应性、完善性和预防性维护四类。',
                    tags: ['软件维护', '维护分类'],
                    difficulty: 2,
                    score: 50
                },
                {
                    id: 'se_0028',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '软件部署的原则?',
                    options: [
                        { key: 'A', text: '适用性原则' },
                        { key: 'B', text: '内聚原则' },
                        { key: 'C', text: '相关性原则' },
                        { key: 'D', text: '最小化原则' }
                    ],
                    correctAnswer: 'A,D',
                    explanation: '软件部署应遵循适用性原则和最小化原则。',
                    tags: ['软件部署', '部署原则'],
                    difficulty: 3,
                    score: 50
                }
            ]
        }
    ]
};

// 导入软件工程知识库的函数
function importSoftwareEngineeringKnowledge() {
    try {
        console.log('开始导入软件工程知识库...');
        
        // 检查是否已存在软件工程知识库
        const existingBases = window.storageManager.getAllKnowledgeBases();
        const existingBase = existingBases.find(base => base.id === 'software_engineering_base');
        
        if (existingBase) {
            const existingKnowledge = window.storageManager.getKnowledgeByBaseId('software_engineering_base');
            const confirmMessage = `⚠️ 软件工程知识库已存在！\n\n当前数据：\n• 知识库：${existingBase.name}\n• 知识点数量：${existingKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入软件工程知识库', 'info');
                } else {
                    alert('取消导入软件工程知识库');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有软件工程知识库数据');
        }
        
        // 构建完整的知识库结构
        const completeKnowledgeBase = {
            ...softwareEngineeringKnowledge,
            id: 'software_engineering_base',  // 设置固定的知识库ID
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        console.log('知识库结构:', completeKnowledgeBase);
        
        // 将知识点扁平化用于复习系统
        const allKnowledge = completeKnowledgeBase.areas.reduce((acc, area) => {
            return acc.concat(area.knowledgePoints.map(item => ({
                ...item,
                category: area.name,
                areaId: area.id,
                knowledgeBaseId: completeKnowledgeBase.id,  // 添加知识库ID
                reviewCount: 0,
                correctCount: 0,
                lastReviewed: null,
                nextReview: new Date().toISOString(),
                interval: 1,
                easeFactor: 2.5,
                difficulty: item.difficulty || 3,
                tags: item.tags || [],
                note: item.note || '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })));
        }, []);
        
        console.log(`准备导入 ${allKnowledge.length} 个知识点`);
        
        // 验证知识点数据
        const validKnowledge = allKnowledge.filter(point => {
            const isValid = window.storageManager.validateKnowledgePoint(point);
            if (!isValid) {
                console.warn('无效的知识点数据:', point);
            }
            return isValid;
        });
        
        console.log(`有效知识点数量: ${validKnowledge.length}`);
        
        // 如果已存在，先删除旧数据
        if (existingBase) {
            window.storageManager.deleteKnowledgeBase('software_engineering_base');
            console.log('已删除原有软件工程知识库数据');
        }
        
        // 使用存储管理器添加知识库
        const result = window.storageManager.addKnowledgeBase(completeKnowledgeBase);
        
        if (!result) {
            throw new Error('添加软件工程知识库失败');
        }
        
        console.log('知识库添加成功:', result);
        
        // 获取现有数据并添加知识点
        const data = window.storageManager.getData();
        
        // 过滤掉原有的软件工程知识点（如果存在）
        const existingKnowledge = data.knowledge.filter(k => k.knowledgeBaseId !== completeKnowledgeBase.id);
        
        // 添加新的软件工程知识点
        data.knowledge = [...existingKnowledge, ...validKnowledge];
        
        // 清空相关的错题和复习历史
        data.mistakes = data.mistakes.filter(m => {
            const knowledge = data.knowledge.find(k => k.id === m.knowledgeId);
            return knowledge && knowledge.knowledgeBaseId !== completeKnowledgeBase.id;
        });
        
        data.reviewHistory = data.reviewHistory.filter(r => {
            const knowledge = data.knowledge.find(k => k.id === r.knowledgeId);
            return knowledge && knowledge.knowledgeBaseId !== completeKnowledgeBase.id;
        });
        
        // 更新统计数据
        if (!data.statistics) {
            data.statistics = {
                totalReviews: 0,
                correctAnswers: 0,
                studyTime: 0,
                streakDays: 0,
                lastStudyDate: null
            };
        }
        
        // 保存更新后的数据
        const success = window.storageManager.setData(data);
        
        if (!success) {
            throw new Error('保存数据失败');
        }
        
        console.log(`成功导入${validKnowledge.length}个软件工程知识点！`);
        
        // 显示成功通知
        const successMessage = `✅ 软件工程知识库${existingBase ? '重新' : ''}导入成功！\n\n包含内容：\n- 1个知识区：选择专练\n- ${validKnowledge.length}道选择题\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
        if (window.app && window.app.showNotification) {
            window.app.showNotification(successMessage, 'success');
        } else {
            alert(successMessage);
        }
        
        // 如果知识管理器存在，立即刷新知识库列表
        if (window.knowledgeManager) {
            console.log('刷新知识管理器...');
            window.knowledgeManager.refresh();
        }
        
        // 如果当前在知识管理页面，切换到知识管理页面以显示新导入的知识库
        if (window.app && window.app.currentSection !== 'knowledge') {
            window.app.switchSection('knowledge');
        } else if (window.app && window.app.currentSection === 'knowledge') {
            // 如果已经在知识管理页面，强制刷新
            window.app.loadSectionData('knowledge');
        }
        
        // 更新仪表板统计
        if (window.app && window.app.loadDashboard) {
            window.app.loadDashboard();
        }
        
    } catch (error) {
        console.error('导入软件工程知识库失败:', error);
        const errorMessage = '❌ 导入软件工程知识库失败：' + error.message;
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
    }
}

// 将导入函数添加到全局作用域
window.importSoftwareEngineeringKnowledge = importSoftwareEngineeringKnowledge;
window.softwareEngineeringKnowledge = softwareEngineeringKnowledge;

console.log('软件工程知识库导入脚本已加载');

// 软件工程概要知识点解析与导入
function importSoftwareEngineeringOverview() {
    try {
        console.log('开始解析软件工程概要文档...');
        
        // 从 softdocs/1软件工程概要.md 解析的知识点
        const overviewKnowledge = [
            {
                id: 'se_overview_001',
                type: 'fill',
                question: '程序（Program）的定义是什么？',
                answer: '由程序设计语言所描述的、能为计算机所理解和处理的一组语句序列，包括源代码和可执行代码两种形式。',
                explanation: '程序是软件的基础组成部分，是用程序设计语言编写的计算机指令集合。',
                tags: ['软件基本概念', '程序定义'],
                difficulty: 1,
                score: 60
            },
            {
                id: 'se_overview_002',
                type: 'fill',
                question: '软件（Software）的完整定义是什么？',
                answer: '软件 = 程序 + 数据 + 文档',
                explanation: '软件不仅包含程序代码，还包括相关的数据（初始化数据、测试数据、日常数据）和文档（开发文档、管理文档、产品文档）。',
                tags: ['软件基本概念', '软件定义', '软件组成'],
                difficulty: 2,
                score: 70
            },
            {
                id: 'se_overview_003',
                type: 'fill',
                question: '软件的四个主要特点是什么？',
                answer: '1. 逻辑性（思维活动结果，不会磨损）\n2. 复杂性（规模大、运行状态复杂）\n3. 易变性（需求难以把控）\n4. 缺陷隐蔽性（错误难以发现）',
                explanation: '这四个特点说明了软件相比硬件的独特性质，理解这些特点有助于更好地进行软件开发和维护。',
                tags: ['软件特点', '软件属性'],
                difficulty: 3,
                score: 80
            },
            {
                id: 'se_overview_004',
                type: 'fill',
                question: '软件质量的八个要素是什么？',
                answer: '1. 正确性（满足需求程度）\n2. 可靠性（限定时间内完成功能）\n3. 健壮性（异常情况响应能力）\n4. 有效性（利用计算资源和存储资源实现功能）\n5. 安全性（Safety vs Security）\n6. 可维护性（易于修改）\n7. 可移植性（迁移到另一环境的难易程度）\n8. 可重用性（被再次使用程度）',
                explanation: '软件质量要素是评估软件优劣的重要标准，涵盖了功能性、性能、安全性等多个维度。',
                tags: ['软件质量', '质量要素', '软件评估'],
                difficulty: 4,
                score: 90
            },
            {
                id: 'se_overview_005',
                type: 'fill',
                question: '软件危机的四个主要表现是什么？',
                answer: '1. 进度延迟\n2. 成本超支\n3. 质量缺陷\n4. 维护困难',
                explanation: '软件危机是软件发展早期遇到的普遍问题，推动了软件工程学科的诞生。',
                tags: ['软件危机', '软件工程历史'],
                difficulty: 2,
                score: 70
            },
            {
                id: 'se_overview_006',
                type: 'fill',
                question: '解决软件危机的两种途径是什么？',
                answer: '1. 技术措施：开发方法/工具改进\n2. 管理措施：工程化原则、文档规范化',
                explanation: '解决软件危机需要从技术和管理两个层面入手，这也是软件工程学科的核心内容。',
                tags: ['软件危机', '解决方案', '软件工程'],
                difficulty: 3,
                score: 75
            },
            {
                id: 'se_overview_007',
                type: 'fill',
                question: 'IEEE 1993年对软件工程的定义是什么？',
                answer: '将系统的、规范的、可量化的方法应用于软件开发、运行和维护的过程。',
                explanation: 'IEEE的定义强调了软件工程的方法论特征：系统化、规范化、可量化，适用于软件的全生命周期。',
                tags: ['软件工程定义', 'IEEE定义', '方法论'],
                difficulty: 3,
                score: 80
            },
            {
                id: 'se_overview_008',
                type: 'fill',
                question: '软件工程三要素中的"过程（Process）"包含哪些内容？',
                answer: '典型模型：瀑布模型、增量模型、敏捷开发\n管理活动：配置管理、质量管理',
                explanation: '过程是软件工程的核心要素之一，规定了软件开发的流程和管理方式。',
                tags: ['软件工程三要素', '过程', '开发模型'],
                difficulty: 3,
                score: 75
            },
            {
                id: 'se_overview_009',
                type: 'fill',
                question: '软件工程三要素中的"方法学（Methodology）"包括哪三种主要方法？',
                answer: '1. 结构化方法\n2. 面向对象方法\n3. 基于构件的方法',
                explanation: '方法学是软件工程的理论基础，不同的方法学适用于不同类型的软件项目。',
                tags: ['软件工程三要素', '方法学', '开发方法'],
                difficulty: 3,
                score: 75
            },
            {
                id: 'se_overview_010',
                type: 'fill',
                question: '软件工程三要素中的"工具（Tool）"有哪些典型例子？',
                answer: '开发工具：Eclipse、Visual Studio\n质量工具：SonarQube',
                explanation: '工具是软件工程实践的重要支撑，好的工具能显著提高开发效率和软件质量。',
                tags: ['软件工程三要素', '工具', '开发环境'],
                difficulty: 2,
                score: 65
            },
            {
                id: 'se_overview_011',
                type: 'fill',
                question: '软件工程的五个基本原则是什么？',
                answer: '1. 抽象和建模（提取关键要素）\n2. 模块化（高内聚低耦合）\n3. 信息隐藏（封装实现细节）\n4. 关注点分离（多视角开发）\n5. 分而治之（分解复杂系统）',
                explanation: '这五个原则是软件工程实践的基本指导思想，贯穿于软件开发的全过程。',
                tags: ['软件工程原则', '设计原则', '基本概念'],
                difficulty: 4,
                score: 85
            },
            {
                id: 'se_overview_012',
                type: 'fill',
                question: '软件文档分为哪三类？',
                answer: '1. 开发文档（需求规格说明书等）\n2. 管理文档（项目计划等）\n3. 产品文档（用户手册等）',
                explanation: '文档是软件工程的重要组成部分，不同类型的文档服务于不同的目标和受众。',
                tags: ['软件文档', '文档分类', '项目管理'],
                difficulty: 2,
                score: 70
            },
            {
                id: 'se_overview_013',
                type: 'fill',
                question: '软件文档的层次关系（从上到下）是什么？',
                answer: '《软件合同》→《用户需求报告》→《需求规格说明书》→《概要设计说明书》→《详细设计说明书》→《源程序》→《目标程序》',
                explanation: '这个层次关系体现了软件开发从抽象到具体、从需求到实现的逐步细化过程。',
                tags: ['软件文档', '文档层次', '开发流程'],
                difficulty: 4,
                score: 90
            }
        ];
        
        console.log(`解析出 ${overviewKnowledge.length} 个概要知识点`);
        
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
        
        // 检查是否已存在概要知识区
        const data = window.storageManager.getData();
        const baseIndex = data.knowledgeBases.findIndex(base => base.id === 'software_engineering_base');
        
        if (baseIndex === -1) {
            throw new Error('软件工程知识库未找到');
        }
        
        let overviewArea = data.knowledgeBases[baseIndex].areas.find(area => area.id === 'overview');
        const existingOverviewKnowledge = data.knowledge.filter(k => 
            k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'overview'
        );
        
        if (overviewArea && existingOverviewKnowledge.length > 0) {
            const confirmMessage = `⚠️ 软件工程概要知识区已存在！\n\n当前数据：\n• 知识区：${overviewArea.name}\n• 知识点数量：${existingOverviewKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入软件工程概要知识点', 'info');
                } else {
                    alert('取消导入软件工程概要知识点');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有概要知识区数据');
            
            // 删除原有概要知识点
            data.knowledge = data.knowledge.filter(k => 
                !(k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'overview')
            );
        } else {
            // 创建概要知识区
            overviewArea = {
                id: 'overview',
                name: '概要',
                description: '软件工程基本概念和理论基础',
                color: '#52c41a',
                knowledgePoints: []
            };
            
            data.knowledgeBases[baseIndex].areas.push(overviewArea);
        }
        
        // 将知识点转换为标准格式
        const formattedKnowledge = overviewKnowledge.map(item => ({
            ...item,
            category: '概要',
            areaId: 'overview',
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
        
        console.log(`成功导入${validKnowledge.length}个软件工程概要知识点！`);
        
        // 显示成功通知
        const successMessage = `✅ 软件工程概要知识点导入成功！\n\n包含内容：\n- 知识区：概要\n- ${validKnowledge.length}个概念性知识点\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
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
        console.error('导入软件工程概要知识点失败:', error);
        const errorMessage = '❌ 导入软件工程概要知识点失败：' + error.message;
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
    }
}

// 将新导入函数添加到全局作用域
window.importSoftwareEngineeringOverview = importSoftwareEngineeringOverview;

console.log('软件工程概要导入功能已加载');

// 软件过程与项目管理知识点解析与导入
function importSoftwareProcessManagement() {
    try {
        console.log('开始解析软件过程与项目管理文档...');
        
        // 软件过程与项目管理知识点
        const processManagementKnowledge = [
            // 概念类知识点 - 填空题
            {
                id: 'se_process_001',
                type: 'fill',
                question: '软件过程的定义是什么？',
                answer: '软件过程是为了获得高质量软件所需要的一系列任务的框架，它规定了完成各项任务的工作步骤。',
                explanation: '软件过程是软件开发的指导框架，确保开发活动的有序性和质量。',
                tags: ['软件过程', '基本概念', '定义'],
                difficulty: 2,
                score: 70
            },
            {
                id: 'se_process_002',
                type: 'fill',
                question: '软件项目管理的定义是什么？',
                answer: '软件项目管理是为了使软件项目能够按照预定的成本、进度、质量顺利完成，而对人员、产品、过程和项目进行分析和管理的活动。',
                explanation: '项目管理是确保软件项目成功的关键管理活动，涉及多个管理维度。',
                tags: ['项目管理', '基本概念', '定义'],
                difficulty: 2,
                score: 70
            },
            {
                id: 'se_process_003',
                type: 'fill',
                question: 'CMM（能力成熟度模型）的定义是什么？',
                answer: 'CMM是衡量软件组织能力成熟度的模型，描述了软件过程改进的进化路径，分为5个成熟度等级。',
                explanation: 'CMM是评估和改进软件开发组织能力的重要标准。',
                tags: ['CMM', '成熟度模型', '过程改进'],
                difficulty: 3,
                score: 75
            },
            {
                id: 'se_process_004',
                type: 'fill',
                question: '敏捷开发的核心价值观是什么？',
                answer: '个体和互动胜过流程和工具；工作的软件胜过详尽的文档；客户合作胜过合同谈判；响应变化胜过遵循计划。',
                explanation: '敏捷宣言定义了敏捷开发的四个核心价值观，强调适应性和响应能力。',
                tags: ['敏捷开发', '价值观', '敏捷宣言'],
                difficulty: 3,
                score: 80
            },
            
            // 知识点+属性类型 - 选择题
            {
                id: 'se_process_005',
                type: 'choice',
                choiceType: 'single',
                question: '瀑布模型的主要特点是什么？',
                options: [
                    { key: 'A', text: '严格按照线性顺序进行，前一阶段完成后才能进入下一阶段' },
                    { key: 'B', text: '支持快速迭代和频繁交付' },
                    { key: 'C', text: '强调团队自组织和客户协作' },
                    { key: 'D', text: '采用螺旋式开发和风险驱动' }
                ],
                correctAnswer: 'A',
                explanation: '瀑布模型的特点是严格的线性顺序，每个阶段有明确的输入输出，适合需求稳定的项目。',
                tags: ['瀑布模型', '开发模型', '特点'],
                difficulty: 2,
                score: 65
            },
            {
                id: 'se_process_006',
                type: 'choice',
                choiceType: 'multiple',
                question: 'Scrum框架中的三个核心角色是什么？',
                options: [
                    { key: 'A', text: 'Product Owner（产品负责人）' },
                    { key: 'B', text: 'Scrum Master（敏捷教练）' },
                    { key: 'C', text: 'Development Team（开发团队）' },
                    { key: 'D', text: 'Project Manager（项目经理）' }
                ],
                correctAnswer: 'A,B,C',
                explanation: 'Scrum框架定义了三个核心角色：Product Owner负责产品需求，Scrum Master负责流程促进，Development Team负责开发实现。',
                tags: ['Scrum', '敏捷角色', '团队组织'],
                difficulty: 3,
                score: 75
            },
            {
                id: 'se_process_007',
                type: 'choice',
                choiceType: 'single',
                question: 'CMM的5个成熟度等级中，哪个等级被称为"已定义级"？',
                options: [
                    { key: 'A', text: '第2级：可重复级' },
                    { key: 'B', text: '第3级：已定义级' },
                    { key: 'C', text: '第4级：已管理级' },
                    { key: 'D', text: '第5级：优化级' }
                ],
                correctAnswer: 'B',
                explanation: 'CMM第3级被称为"已定义级"，此时组织已经建立了标准的软件过程，并在项目中一致使用。',
                tags: ['CMM', '成熟度等级', '已定义级'],
                difficulty: 3,
                score: 70
            },
            {
                id: 'se_process_008',
                type: 'choice',
                choiceType: 'multiple',
                question: '软件项目管理的主要活动包括哪些？',
                options: [
                    { key: 'A', text: '项目计划制定' },
                    { key: 'B', text: '进度监控' },
                    { key: 'C', text: '风险管理' },
                    { key: 'D', text: '代码编写' }
                ],
                correctAnswer: 'A,B,C',
                explanation: '软件项目管理包括计划制定、进度监控、风险管理等管理活动，代码编写属于开发活动。',
                tags: ['项目管理', '管理活动', '项目计划'],
                difficulty: 2,
                score: 70
            },
            {
                id: 'se_process_009',
                type: 'choice',
                choiceType: 'single',
                question: '增量模型与原型模型的主要区别是什么？',
                options: [
                    { key: 'A', text: '增量模型每次增量都是可运行的完整子系统，原型模型主要用于需求确认' },
                    { key: 'B', text: '原型模型比增量模型开发速度更快' },
                    { key: 'C', text: '增量模型不支持用户反馈' },
                    { key: 'D', text: '原型模型适用于大型复杂系统开发' }
                ],
                correctAnswer: 'A',
                explanation: '增量模型每次交付可运行的产品增量，原型模型主要通过快速原型来理解和确认需求。',
                tags: ['增量模型', '原型模型', '开发模型对比'],
                difficulty: 4,
                score: 80
            },
            {
                id: 'se_process_010',
                type: 'choice',
                choiceType: 'multiple',
                question: '风险管理过程包括哪些主要活动？',
                options: [
                    { key: 'A', text: '风险识别' },
                    { key: 'B', text: '风险分析' },
                    { key: 'C', text: '风险监控' },
                    { key: 'D', text: '风险消除' }
                ],
                correctAnswer: 'A,B,C',
                explanation: '风险管理包括风险识别、分析、规划、监控等活动，风险通常无法完全消除，只能控制和缓解。',
                tags: ['风险管理', '项目管理', '风险过程'],
                difficulty: 3,
                score: 75
            },
            {
                id: 'se_process_011',
                type: 'choice',
                choiceType: 'single',
                question: '螺旋模型的主要驱动因素是什么？',
                options: [
                    { key: 'A', text: '进度驱动' },
                    { key: 'B', text: '成本驱动' },
                    { key: 'C', text: '风险驱动' },
                    { key: 'D', text: '质量驱动' }
                ],
                correctAnswer: 'C',
                explanation: '螺旋模型是风险驱动的过程模型，每个螺旋周期都要进行风险分析和风险处理。',
                tags: ['螺旋模型', '风险驱动', '开发模型'],
                difficulty: 3,
                score: 70
            },
            {
                id: 'se_process_012',
                type: 'choice',
                choiceType: 'multiple',
                question: '软件配置管理的主要活动包括什么？',
                options: [
                    { key: 'A', text: '版本控制' },
                    { key: 'B', text: '变更控制' },
                    { key: 'C', text: '配置审核' },
                    { key: 'D', text: '需求分析' }
                ],
                correctAnswer: 'A,B,C',
                explanation: '软件配置管理包括版本控制、变更控制、配置审核等活动，需求分析属于需求工程活动。',
                tags: ['配置管理', '版本控制', '变更管理'],
                difficulty: 3,
                score: 75
            },
            {
                id: 'se_process_013',
                type: 'choice',
                choiceType: 'single',
                question: '在项目管理中，关键路径法（CPM）主要用于什么？',
                options: [
                    { key: 'A', text: '成本估算' },
                    { key: 'B', text: '质量控制' },
                    { key: 'C', text: '进度规划和控制' },
                    { key: 'D', text: '风险评估' }
                ],
                correctAnswer: 'C',
                explanation: '关键路径法（CPM）是项目进度管理的重要工具，用于确定项目的最短完成时间和关键活动。',
                tags: ['关键路径法', '进度管理', '项目规划'],
                difficulty: 3,
                score: 70
            },
            {
                id: 'se_process_014',
                type: 'choice',
                choiceType: 'multiple',
                question: '敏捷开发的主要实践包括哪些？',
                options: [
                    { key: 'A', text: '迭代开发' },
                    { key: 'B', text: '持续集成' },
                    { key: 'C', text: '测试驱动开发（TDD）' },
                    { key: 'D', text: '详细的前期设计' }
                ],
                correctAnswer: 'A,B,C',
                explanation: '敏捷开发强调迭代开发、持续集成、TDD等实践，避免过度的前期设计。',
                tags: ['敏捷实践', '迭代开发', 'TDD'],
                difficulty: 3,
                score: 75
            }
        ];
        
        console.log(`解析出 ${processManagementKnowledge.length} 个软件过程与项目管理知识点`);
        
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
        
        // 检查是否已存在软件过程与项目管理知识区
        const data = window.storageManager.getData();
        const baseIndex = data.knowledgeBases.findIndex(base => base.id === 'software_engineering_base');
        
        if (baseIndex === -1) {
            throw new Error('软件工程知识库未找到');
        }
        
        let processArea = data.knowledgeBases[baseIndex].areas.find(area => area.id === 'process_management');
        const existingProcessKnowledge = data.knowledge.filter(k => 
            k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'process_management'
        );
        
        if (processArea && existingProcessKnowledge.length > 0) {
            const confirmMessage = `⚠️ 软件过程与项目管理知识区已存在！\n\n当前数据：\n• 知识区：${processArea.name}\n• 知识点数量：${existingProcessKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入软件过程与项目管理知识点', 'info');
                } else {
                    alert('取消导入软件过程与项目管理知识点');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有软件过程与项目管理知识区数据');
            
            // 删除原有知识点
            data.knowledge = data.knowledge.filter(k => 
                !(k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'process_management')
            );
        } else {
            // 创建软件过程与项目管理知识区
            processArea = {
                id: 'process_management',
                name: '软件过程与项目管理',
                description: '软件开发过程模型和项目管理方法',
                color: '#ff7875',
                knowledgePoints: []
            };
            
            data.knowledgeBases[baseIndex].areas.push(processArea);
        }
        
        // 将知识点转换为标准格式
        const formattedKnowledge = processManagementKnowledge.map(item => ({
            ...item,
            category: '软件过程与项目管理',
            areaId: 'process_management',
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
        
        console.log(`成功导入${validKnowledge.length}个软件过程与项目管理知识点！`);
        
        // 显示成功通知
        const fillCount = validKnowledge.filter(k => k.type === 'fill').length;
        const choiceCount = validKnowledge.filter(k => k.type === 'choice').length;
        
        const successMessage = `✅ 软件过程与项目管理知识点导入成功！\n\n包含内容：\n- 知识区：软件过程与项目管理\n- ${fillCount}个填空题（概念类）\n- ${choiceCount}个选择题（知识点+属性类）\n- 总计：${validKnowledge.length}个知识点\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
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
        console.error('导入软件过程与项目管理知识点失败:', error);
        const errorMessage = '❌ 导入软件过程与项目管理知识点失败：' + error.message;
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
    }
}

// 将新导入函数添加到全局作用域
window.importSoftwareProcessManagement = importSoftwareProcessManagement;

console.log('软件过程与项目管理导入功能已加载'); 