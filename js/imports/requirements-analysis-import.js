// 需求分析知识库导入脚本
// 从5个文档中解析出的完整需求分析知识点

// 第一部分：需求分析（1）的17个知识点
const requirementsAnalysisPart1 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_req_001',
        type: 'fill',
        question: '软件需求的三个层次定义是什么？',
        answer: '1. 用户解决问题或达到目标所需的条件或能力\n2. 系统要满足合同、标准等正式文档所需的条件或能力\n3. 反映上述条件的文档说明',
        explanation: '软件需求从不同角度有三个层次的定义，分别从用户需求、系统需求和文档需求三个维度来描述。',
        tags: ['需求定义', '基本概念', '需求层次'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_002',
        type: 'fill',
        question: '利益相关者（Stakeholder）包括哪四类？',
        answer: '1. 用户：最终使用软件的人\n2. 客户：获取利益的组织\n3. 系统：与待开发系统交互的系统\n4. 开发者：开发软件系统的人',
        explanation: '利益相关者是软件需求的重要来源，涵盖了软件生命周期中的所有关键参与方。',
        tags: ['利益相关者', 'Stakeholder', '项目参与方'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_003',
        type: 'fill',
        question: '需求工程的定义是什么？',
        answer: '涉及需求获取、分析、规约、验证和管理的一系列工程活动。',
        explanation: '需求工程是系统化的需求处理过程，包含完整的需求生命周期管理。',
        tags: ['需求工程', '工程活动', '系统化方法'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_004',
        type: 'fill',
        question: '需求工程的五个主要过程是什么？',
        answer: '1. 需求获取\n2. 需求分析\n3. 需求规约\n4. 需求验证\n5. 需求管理',
        explanation: '需求工程是一个完整的过程体系，每个过程都有特定的目标和活动。',
        tags: ['需求工程过程', '工程阶段', 'RE过程'],
        difficulty: 2,
        score: 75
    },
    {
        id: 'se_req_005',
        type: 'fill',
        question: '需求精化的四个主要任务是什么？',
        answer: '1. 消除歧义\n2. 发现遗漏\n3. 解决冲突\n4. 组织需求',
        explanation: '需求精化旨在提高需求质量，确保需求的完整性和一致性。',
        tags: ['需求精化', '需求改进', '质量提升'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_006',
        type: 'fill',
        question: '需求确认与需求验证的区别是什么？',
        answer: '需求确认：检查需求是否正确反映了用户需求\n需求验证：检查需求是否满足质量要求',
        explanation: '确认关注正确性（是否是用户想要的），验证关注规范性（是否符合标准）。',
        tags: ['需求确认', '需求验证', '质量保证'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_007',
        type: 'fill',
        question: '需求冲突的四种典型类型是什么？',
        answer: '1. 价格与利润冲突\n2. 质量与成本冲突\n3. 个性化与隐私保护冲突\n4. 推广活动与供应商利益冲突',
        explanation: '需求冲突是软件开发中的常见问题，需要通过协商和权衡来解决。',
        tags: ['需求冲突', '冲突类型', '需求管理'],
        difficulty: 3,
        score: 80
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_req_008',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求的特点包括哪些？',
        options: [
            { key: 'A', text: '隐式性：难以辨别和获取' },
            { key: 'B', text: '隐晦性：存在模糊性和歧义性' },
            { key: 'C', text: '多源性：多个利益相关方' },
            { key: 'D', text: '易变性：经常发生变化' },
            { key: 'E', text: '领域知识相关性：与特定领域相关' },
            { key: 'F', text: '价值不均性：有核心和外围需求之分' },
            { key: 'G', text: '稳定性：一旦确定就不会改变（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F',
        explanation: '需求具有隐式性、隐晦性、多源性、易变性、领域知识相关性、价值不均性等特点，而非稳定性。',
        tags: ['需求特点', '需求属性', '需求管理'],
        difficulty: 3,
        score: 85
    },
    {
        id: 'se_req_009',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求质量要求包括哪些方面？',
        options: [
            { key: 'A', text: '有价值' },
            { key: 'B', text: '正确' },
            { key: 'C', text: '完整' },
            { key: 'D', text: '无二义' },
            { key: 'E', text: '可行' },
            { key: 'F', text: '一致' },
            { key: 'G', text: '可追踪' },
            { key: 'H', text: '可验证' },
            { key: 'I', text: '复杂抽象（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F,G,H',
        explanation: '高质量需求应该具备价值性、正确性、完整性、无二义性、可行性、一致性、可追踪性、可验证性，而非复杂抽象。',
        tags: ['需求质量', '质量要求', '需求标准'],
        difficulty: 4,
        score: 90
    },
    {
        id: 'se_req_010',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求获取的主要来源包括哪些？',
        options: [
            { key: 'A', text: '利益相关者' },
            { key: 'B', text: '现有文档' },
            { key: 'C', text: '领域专家' },
            { key: 'D', text: '类似系统' },
            { key: 'E', text: '竞争对手机密资料（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '需求获取的主要来源是利益相关者、现有文档、领域专家和类似系统，而非竞争对手的机密资料。',
        tags: ['需求获取', '需求来源', '信息收集'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_011',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求获取的常用方法包括哪些？',
        options: [
            { key: 'A', text: '访谈' },
            { key: 'B', text: '问卷调查' },
            { key: 'C', text: '观察' },
            { key: 'D', text: '原型法' },
            { key: 'E', text: '头脑风暴' },
            { key: 'F', text: '主观臆断（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '需求获取需要使用科学的方法如访谈、问卷、观察、原型、头脑风暴等，而非主观臆断。',
        tags: ['需求获取方法', '调研技术', '需求分析'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_012',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求规约的主要形式包括哪些？',
        options: [
            { key: 'A', text: '自然语言需求' },
            { key: 'B', text: '结构化自然语言需求' },
            { key: 'C', text: '用例图' },
            { key: 'D', text: '系统级顺序图/状态图/活动图' },
            { key: 'E', text: '概念类图' },
            { key: 'F', text: '数据流图' },
            { key: 'G', text: '源代码注释（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F',
        explanation: '需求规约使用各种建模技术，包括自然语言、UML图、数据流图等，而非源代码注释。',
        tags: ['需求规约', '建模技术', '文档形式'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_013',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求确认与验证的方法包括哪些？',
        options: [
            { key: 'A', text: '评审' },
            { key: 'B', text: '原型' },
            { key: 'C', text: '测试用例' },
            { key: 'D', text: '形式化验证' },
            { key: 'E', text: '随意猜测（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '需求确认与验证需要采用科学方法如评审、原型、测试用例、形式化验证等，而非随意猜测。',
        tags: ['需求验证', '确认方法', '质量保证'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_014',
        type: 'choice',
        choiceType: 'multiple',
        question: '可行性分析的主要方面包括哪些？',
        options: [
            { key: 'A', text: '技术可行性' },
            { key: 'B', text: '设备可行性' },
            { key: 'C', text: '进度可行性' },
            { key: 'D', text: '成本可行性' },
            { key: 'E', text: '商业可行性' },
            { key: 'F', text: '社会可行性' },
            { key: 'G', text: '个人偏好可行性（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F',
        explanation: '可行性分析从技术、设备、进度、成本、商业、社会等多个维度评估项目的可行性，个人偏好不是标准维度。',
        tags: ['可行性分析', '项目评估', '风险评估'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_015',
        type: 'choice',
        choiceType: 'multiple',
        question: '可行性研究报告的主要内容包括哪些？',
        options: [
            { key: 'A', text: '项目背景' },
            { key: 'B', text: '管理概要' },
            { key: 'C', text: '候选方案' },
            { key: 'D', text: '系统描述' },
            { key: 'E', text: '经济可行性' },
            { key: 'F', text: '技术可行性' },
            { key: 'G', text: '社会可行性' },
            { key: 'H', text: '其他相关问题' },
            { key: 'I', text: '项目终止建议（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F,G,H',
        explanation: '可行性研究报告包含项目背景、管理概要、候选方案、系统描述、各类可行性分析和其他相关问题，而非预设的项目终止建议。',
        tags: ['可行性报告', '报告内容', '项目文档'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_req_016',
        type: 'choice',
        choiceType: 'single',
        question: '软件利益相关者关系图的核心是什么？',
        options: [
            { key: 'A', text: '用户-其他系统-利益相关方-软件需求的关系' },
            { key: 'B', text: '开发者-测试者-管理者的层次关系' },
            { key: 'C', text: '成本-进度-质量的平衡关系' },
            { key: 'D', text: '技术-业务-流程的映射关系（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '软件利益相关者关系图展示了用户、其他系统、利益相关方与软件需求之间的相互关系。',
        tags: ['利益相关者关系', '系统分析', '需求建模'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_017',
        type: 'choice',
        choiceType: 'single',
        question: '需求可行性分析框架图的核心内容是什么？',
        options: [
            { key: 'A', text: '技术-设备-进度-成本-商业-社会可行性的关系' },
            { key: 'B', text: '功能-性能-质量需求的分层结构' },
            { key: 'C', text: '用户-系统-开发者的交互模式' },
            { key: 'D', text: '需求-设计-实现的顺序流程（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '需求可行性分析框架图展示了技术、设备、进度、成本、商业、社会等各维度可行性的关系。',
        tags: ['可行性框架', '分析维度', '系统评估'],
        difficulty: 3,
        score: 75
    }
];

console.log('需求分析导入脚本 - 第一部分已加载，包含17个知识点');

// 第二部分：需求分析（2）的12个知识点
const requirementsAnalysisPart2 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_req_018',
        type: 'fill',
        question: '需求工程（用工程理念指导需求实践）的完整定义是什么？',
        answer: '用工程的理念和方法指导软件需求实践，提供过程、策略、方法学和工具，帮助精准获取、分析、文档化和评审需求，以产生准确、一致、完整的软件需求制品。',
        explanation: '需求工程强调系统化的工程方法，确保需求活动的规范性和有效性。',
        tags: ['需求工程定义', '工程理念', '系统化方法'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_019',
        type: 'fill',
        question: '业务需求的定义是什么？',
        answer: '表示组织或客户高层次目标，描述组织为何开发系统（如项目前景文档），通常来自投资人、客户管理者或市场部门。',
        explanation: '业务需求是最高层次的需求，回答"为什么要开发这个系统"的问题。',
        tags: ['业务需求', '高层目标', '组织需求'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_020',
        type: 'fill',
        question: '用户需求的定义是什么？',
        answer: '用户对软件功能、操作方式、界面风格等的期望，通过沟通或问卷调查获取，需用自然语言和图表清晰表述。',
        explanation: '用户需求关注用户的使用体验和功能期望，是系统设计的重要输入。',
        tags: ['用户需求', '用户期望', '功能需求'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_021',
        type: 'fill',
        question: '系统需求的定义是什么？',
        answer: '面向开发者的技术性需求，包括功能性需求（系统做什么）和非功能性需求（性能、可靠性等约束）。',
        explanation: '系统需求是最具体的需求层次，直接指导系统的设计和实现。',
        tags: ['系统需求', '技术需求', '开发者视角'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_022',
        type: 'fill',
        question: '需求工程一般性过程的描述是什么？',
        answer: '迭代进行需求获取→分析→文档化→确认和验证→需求管理，逐步细化需求质量。',
        explanation: '需求工程是一个迭代的过程，通过反复的活动逐步提高需求的质量。',
        tags: ['需求工程过程', '迭代过程', '质量改进'],
        difficulty: 3,
        score: 75
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_req_023',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求错误的主要类型及占比包括哪些？',
        options: [
            { key: 'A', text: '需求不完整（15.1%）' },
            { key: 'B', text: '缺少用户参与（12.4%）' },
            { key: 'C', text: '需求变更（8.7%）' },
            { key: 'D', text: '技术选型错误（25%）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '根据统计数据，需求不完整、缺少用户参与、需求变更是主要的需求错误类型，技术选型错误不是统计的主要类型。',
        tags: ['需求错误', '统计数据', '常见问题'],
        difficulty: 4,
        score: 80
    },
    {
        id: 'se_req_024',
        type: 'choice',
        choiceType: 'multiple',
        question: '非功能性需求的分类包括哪些？',
        options: [
            { key: 'A', text: '外部质量属性（性能、可靠性）' },
            { key: 'B', text: '内部质量属性（可维护性、可扩展性）' },
            { key: 'C', text: '开发约束（成本、进度、技术选型）' },
            { key: 'D', text: '业务流程约束（工作流程定义）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '非功能性需求包括外部质量属性、内部质量属性和开发约束，业务流程约束通常属于功能需求范畴。',
        tags: ['非功能需求', '质量属性', '约束条件'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_025',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求工程的特点包括哪些？',
        options: [
            { key: 'A', text: '知识密集型（需多学科交叉）' },
            { key: 'B', text: '多方参与（用户、开发者、专家等）' },
            { key: 'C', text: '多种获取形式（访谈、原型等）' },
            { key: 'D', text: '持续迭代（贯穿生命周期）' },
            { key: 'E', text: '一次性完成（前期确定不变）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '需求工程具有知识密集、多方参与、多种获取形式、持续迭代的特点，而非一次性完成。',
        tags: ['需求工程特点', '工程属性', '过程特征'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_026',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求获取的抽象手段包括哪些？',
        options: [
            { key: 'A', text: '划分（整体/部分）' },
            { key: 'B', text: '抽象（一般/特例）' },
            { key: 'C', text: '投影（多维视图）' },
            { key: 'D', text: '复制（完全照搬现有系统）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '需求获取使用划分、抽象、投影三类抽象手段来处理复杂问题，而非简单复制现有系统。',
        tags: ['抽象手段', '需求获取', '分析方法'],
        difficulty: 4,
        score: 80
    },
    {
        id: 'se_req_027',
        type: 'choice',
        choiceType: 'single',
        question: '需求确认与验证的区别中，正确的描述是什么？',
        options: [
            { key: 'A', text: '确认：通过评审或原型确认需求正确性；验证：检查需求文档与后续设计的一致性' },
            { key: 'B', text: '确认：检查代码实现；验证：测试用户接受度' },
            { key: 'C', text: '确认：技术可行性评估；验证：商业价值评估' },
            { key: 'D', text: '确认：需求收集；验证：需求分析（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '需求确认重点是确认需求的正确性（是否符合用户期望），验证重点是检查需求与设计的一致性。',
        tags: ['需求确认', '需求验证', '质量保证'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_028',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求变更管理包括哪些活动？',
        options: [
            { key: 'A', text: '变更溯源（合法性判别）' },
            { key: 'B', text: '影响域分析' },
            { key: 'C', text: '配置管理（建立需求基线）' },
            { key: 'D', text: '直接修改（无需评估）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '需求变更管理需要科学的流程控制，包括溯源、影响分析、配置管理，而非直接修改。',
        tags: ['变更管理', '配置管理', '需求控制'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_029',
        type: 'choice',
        choiceType: 'single',
        question: '需求工程螺旋模型展示的主要内容是什么？',
        options: [
            { key: 'A', text: '三层次（业务/用户/系统需求）和三阶段（获取→精化→确认）的迭代过程' },
            { key: 'B', text: '瀑布式的线性开发流程' },
            { key: 'C', text: '敏捷开发的冲刺周期' },
            { key: 'D', text: '项目管理的时间进度安排（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '需求工程螺旋模型体现了三个需求层次和三个工程阶段的迭代关系。',
        tags: ['螺旋模型', '迭代开发', '需求层次'],
        difficulty: 3,
        score: 75
    }
];

console.log('需求分析导入脚本 - 第二部分已加载，包含12个知识点');

// 第三部分：需求分析（3）的14个知识点
const requirementsAnalysisPart3 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_req_030',
        type: 'fill',
        question: '需求工程（软件工程角度）的定义是什么？',
        answer: '需求工程是软件工程中关于确定、记录和维护需求的系统化方法，包括需求获取、需求分析、需求规格说明、需求验证和需求管理等活动。',
        explanation: '这是从软件工程学科角度对需求工程的完整定义，强调系统化方法和全过程管理。',
        tags: ['需求工程定义', '软件工程', '系统化方法'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_031',
        type: 'fill',
        question: '需求获取的定义是什么？',
        answer: '需求获取是指通过与利益相关者的交流、观察和分析现有系统等方式，收集和识别软件需求的过程。',
        explanation: '需求获取是需求工程的起始阶段，通过多种方式从各个来源收集需求信息。',
        tags: ['需求获取', '需求收集', '信息收集'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_032',
        type: 'fill',
        question: '需求精化与规约的定义是什么？',
        answer: '需求精化与规约是将初步获取的需求进行详细分析、整理和规范化的过程，形成明确、一致且可验证的需求文档。',
        explanation: '精化与规约是需求工程的核心阶段，确保需求的质量和可操作性。',
        tags: ['需求精化', '需求规约', '质量改进'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_033',
        type: 'fill',
        question: '需求确认与验证（第三个定义）是什么？',
        answer: '需求确认与验证是确保需求文档准确反映用户需求，并通过评审、原型等方法验证需求的正确性和完整性。',
        explanation: '这是需求工程的质量保证阶段，确保需求的准确性和完整性。',
        tags: ['需求确认', '需求验证', '质量保证'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_034',
        type: 'fill',
        question: '用户故事（User Story）的格式是什么？',
        answer: '作为一个<用户角色>，我想要<完成活动>，以便于<实现价值>',
        explanation: '用户故事是敏捷开发中描述需求的简洁方式，强调用户价值和目标导向。',
        tags: ['用户故事', '敏捷开发', '需求描述'],
        difficulty: 2,
        score: 65
    },
    {
        id: 'se_req_035',
        type: 'fill',
        question: 'EARS（Easy Approach to Requirements Syntax）是什么？',
        answer: 'EARS是一种结构化的自然语言需求描述方法，通过五个模板（普遍存在、事件驱动、状态驱动、不想要的行为、可选特性）编写需求文档。',
        explanation: 'EARS提供标准化的需求表达模板，提高需求文档的一致性和可理解性。',
        tags: ['EARS', '需求语法', '结构化描述'],
        difficulty: 3,
        score: 80
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_req_036',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求的三个层次包括哪些？',
        options: [
            { key: 'A', text: '业务需求' },
            { key: 'B', text: '用户需求' },
            { key: 'C', text: '系统需求' },
            { key: 'D', text: '技术需求（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '需求分为业务需求、用户需求和系统需求三个层次，技术需求属于系统需求的一部分。',
        tags: ['需求层次', '需求分类', '需求体系'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_037',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求获取的方法包括哪些？',
        options: [
            { key: 'A', text: '访谈和会议' },
            { key: 'B', text: '调查问卷' },
            { key: 'C', text: '现场观摩' },
            { key: 'D', text: '分析业务资料' },
            { key: 'E', text: '群体化方法' },
            { key: 'F', text: '大语言模型推荐' },
            { key: 'G', text: '网络爬虫自动采集（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F',
        explanation: '需求获取方法包括访谈、问卷、观摩、资料分析、群体化方法和新兴的AI推荐技术，但不包括自动爬虫采集。',
        tags: ['需求获取方法', '调研技术', '信息收集'],
        difficulty: 3,
        score: 85
    },
    {
        id: 'se_req_038',
        type: 'choice',
        choiceType: 'multiple',
        question: '非功能性需求的分类包括哪些？',
        options: [
            { key: 'A', text: '质量要求（性能、可靠性、易用性、安全性等）' },
            { key: 'B', text: '约束性要求（开发进度、成本、技术选型等）' },
            { key: 'C', text: '功能性要求（业务逻辑处理）（干扰项）' }
        ],
        correctAnswer: 'A,B',
        explanation: '非功能性需求包括质量要求和约束性要求，功能性要求属于功能需求范畴。',
        tags: ['非功能需求', '质量要求', '约束要求'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_039',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求评审的内容包括哪些方面？',
        options: [
            { key: 'A', text: '中肯性' },
            { key: 'B', text: '合理性' },
            { key: 'C', text: '完整性' },
            { key: 'D', text: '必要性' },
            { key: 'E', text: '溯源性' },
            { key: 'F', text: '准确性' },
            { key: 'G', text: '正确性' },
            { key: 'H', text: '一致性' },
            { key: 'I', text: '复杂性（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F,G,H',
        explanation: '需求评审检查需求的多个质量维度，追求简洁明确，而非复杂性。',
        tags: ['需求评审', '质量检查', '评审标准'],
        difficulty: 4,
        score: 90
    },
    {
        id: 'se_req_040',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求获取的一般过程包括哪些步骤？',
        options: [
            { key: 'A', text: '明确问题及基于软件的解决方案' },
            { key: 'B', text: '导出和构思软件需求' },
            { key: 'C', text: '描述初步软件需求' },
            { key: 'D', text: '评审初步软件需求' },
            { key: 'E', text: '直接编写代码（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '需求获取是一个循序渐进的过程，从问题分析到需求评审，不包括直接编写代码。',
        tags: ['需求获取过程', '获取步骤', '需求分析'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_041',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求精化与规约的任务包括哪些？',
        options: [
            { key: 'A', text: '明确系统边界' },
            { key: 'B', text: '明确利益相关者' },
            { key: 'C', text: '明确系统的使用场景' },
            { key: 'D', text: '构建用例模型（行为）' },
            { key: 'E', text: '构建领域概念模型（结构）' },
            { key: 'F', text: '确定技术架构（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '需求精化与规约关注需求层面的建模，确定技术架构属于设计阶段的任务。',
        tags: ['需求精化', '规约任务', '需求建模'],
        difficulty: 3,
        score: 85
    },
    {
        id: 'se_req_042',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求确认与验证的方法包括哪些？',
        options: [
            { key: 'A', text: '评审' },
            { key: 'B', text: '原型验证' },
            { key: 'C', text: '测试用例设计' },
            { key: 'D', text: '性能压力测试（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '需求确认与验证使用评审、原型、测试用例等方法，性能压力测试属于系统测试阶段。',
        tags: ['需求验证', '确认方法', '验证技术'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_043',
        type: 'choice',
        choiceType: 'single',
        question: '螺旋模型在需求工程中的特征是什么？',
        options: [
            { key: 'A', text: '包含业务、用户和系统需求三个层次，以及需求获取、精化与规约、确认与验证三个阶段的迭代过程' },
            { key: 'B', text: '线性的瀑布式需求开发流程' },
            { key: 'C', text: '敏捷开发的快速迭代模式' },
            { key: 'D', text: '原型驱动的增量式开发（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '需求工程中的螺旋模型体现了三层次需求和三阶段活动的螺旋迭代关系。',
        tags: ['螺旋模型', '迭代过程', '需求工程'],
        difficulty: 3,
        score: 80
    }
];

console.log('需求分析导入脚本 - 第三部分已加载，包含14个知识点');

// 第四部分：需求分析（4）的8个知识点
const requirementsAnalysisPart4 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_req_044',
        type: 'fill',
        question: '需求工程基础概念中，需求工程（Requirements Engineering）的定义是什么？',
        answer: '需求工程是系统化地获取、分析、验证和管理软件需求的过程，包含需求获取、精化与规约、确认与验证三个阶段。',
        explanation: '这是需求工程的基础定义，强调了系统化的过程和三个主要阶段。',
        tags: ['需求工程基础', 'RE定义', '系统化过程'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_045',
        type: 'fill',
        question: 'UML的本质是什么？',
        answer: '统一建模语言（UML）是标准化的图形化建模语言，用于面向对象系统分析与设计，独立于具体开发过程和方法。',
        explanation: 'UML是软件工程中重要的建模工具，为系统建模提供了标准化的图形表示方法。',
        tags: ['UML', '建模语言', '标准化'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_046',
        type: 'fill',
        question: '用例图（Use Case Diagram）的概念是什么？',
        answer: '描述系统边界及外部参与者观察到的功能，包含参与者(Actor)、用例(Use Case)和关系(Include/Extend)。',
        explanation: '用例图是UML中重要的行为建模图，从用户角度描述系统功能。',
        tags: ['用例图', 'UML', '行为建模'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_047',
        type: 'fill',
        question: '系统顺序图（System Sequence Diagram）的概念是什么？',
        answer: '按时间顺序展示对象间交互的二维图，包含对象、生命线、激活条和消息（同步/异步）。',
        explanation: '系统顺序图用于建模系统与外部参与者之间的交互时序。',
        tags: ['系统顺序图', 'UML', '交互建模'],
        difficulty: 3,
        score: 75
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_req_048',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求层次包括哪些？',
        options: [
            { key: 'A', text: '业务需求（企业级目标）' },
            { key: 'B', text: '用户需求（用户视角的功能）' },
            { key: 'C', text: '系统需求（可开发的详细需求）' },
            { key: 'D', text: '实现需求（代码级别要求）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '需求分为业务需求、用户需求和系统需求三个层次，实现需求属于设计实现阶段而非需求层次。',
        tags: ['需求层次', '需求分类', '需求体系'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_049',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求精化的任务包括哪些？',
        options: [
            { key: 'A', text: '分析需求优先级（核心/外围）' },
            { key: 'B', text: '建立需求模型（行为+结构）' },
            { key: 'C', text: '发现并修复需求缺陷' },
            { key: 'D', text: '形成高质量需求规格说明书' },
            { key: 'E', text: '编写程序代码（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '需求精化包括优先级分析、建模、缺陷修复和文档编写，不包括程序编写。',
        tags: ['需求精化', '需求建模', '质量保证'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_050',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求优先级判定因素包括哪些？',
        options: [
            { key: 'A', text: '用户价值高低' },
            { key: 'B', text: '实现技术难度' },
            { key: 'C', text: '业务风险等级' },
            { key: 'D', text: '开发成本估算' },
            { key: 'E', text: '开发人员个人喜好（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '需求优先级应基于客观因素如用户价值、技术难度、风险和成本，而非个人喜好。',
        tags: ['需求优先级', '价值评估', '风险管理'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_051',
        type: 'choice',
        choiceType: 'multiple',
        question: '面向对象 vs 结构化模型的对比中，正确的对应关系是什么？',
        options: [
            { key: 'A', text: '行为建模：用例图+顺序图 vs 数据流图' },
            { key: 'B', text: '结构建模：概念类图 vs E-R图' },
            { key: 'C', text: '约束表达：OCL语言 vs 数据字典' },
            { key: 'D', text: '交互描述：系统操作合约 vs 加工说明' },
            { key: 'E', text: '界面设计：原型图 vs 流程图（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '这些是面向对象与结构化方法在不同建模维度的正确对比，界面设计不是核心区别。',
        tags: ['建模方法对比', '面向对象', '结构化方法'],
        difficulty: 4,
        score: 85
    }
];

console.log('需求分析导入脚本 - 第四部分已加载，包含8个知识点');

// 第五部分：需求分析（5）的12个知识点
const requirementsAnalysisPart5 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_req_052',
        type: 'fill',
        question: '需求确认(Validation) vs 需求验证(Verification) 的区别是什么？',
        answer: '需求确认：确认需求定义的是利益相关者预期的正确系统\n需求验证：通过检查确认需求（单个或集合）是否规范',
        explanation: '确认关注"做正确的事"，验证关注"正确地做事"，是质量保证的两个不同维度。',
        tags: ['需求确认', '需求验证', '质量保证'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_053',
        type: 'fill',
        question: '良好需求的特征包括哪些？',
        answer: '1. 无二义性（消除模棱两可）\n2. 可验证性（可测试的具体需求）\n3. 可量化性（性能指标明确）\n4. 唯一性（需求标识可追踪）',
        explanation: '这四个特征是高质量需求的基本要求，确保需求的清晰性和可操作性。',
        tags: ['需求特征', '需求质量', '质量标准'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_054',
        type: 'fill',
        question: '需求工程三阶段流程是什么？',
        answer: '1. 需求获取(Elicitation)\n2. 需求精化与规约(Refinement & Specification)\n3. 需求确认与验证(Validation & Verification)',
        explanation: '这是需求工程的标准三阶段流程，每个阶段都有特定的目标和产出。',
        tags: ['需求工程流程', '三阶段', 'RE过程'],
        difficulty: 2,
        score: 75
    },
    {
        id: 'se_req_055',
        type: 'fill',
        question: '需求变更控制流程包括哪些步骤？',
        answer: '1. 建立变更控制委员会\n2. 影响分析\n3. 跟踪受影响工作产品\n4. 建立需求基准版本\n5. 使用管理工具（如IBM Doors）',
        explanation: '变更控制是需求管理的重要组成部分，确保变更的规范性和可追踪性。',
        tags: ['变更控制', '需求管理', '配置管理'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_req_056',
        type: 'fill',
        question: '可追踪性管理(Traceability)的内容是什么？',
        answer: '需求与设计/代码/测试用例关联；跟踪需求状态变更历史；验证各阶段成果满足上层需求',
        explanation: '可追踪性管理确保需求在整个软件生命周期中的连续性和一致性。',
        tags: ['可追踪性', '需求跟踪', '生命周期管理'],
        difficulty: 4,
        score: 85
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_req_057',
        type: 'choice',
        choiceType: 'multiple',
        question: '软件需求常见问题的类型及其解决方案包括哪些？',
        options: [
            { key: 'A', text: '遗漏需求 → 补充征求意见' },
            { key: 'B', text: '无源头需求 → 剔除或降优先级' },
            { key: 'C', text: '冲突需求 → 高层决策确定' },
            { key: 'D', text: '不准确需求 → 深入沟通理解' },
            { key: 'E', text: '不规范文档 → 按标准模板重构' },
            { key: 'F', text: '不规范模型 → 学习UML规范' },
            { key: 'G', text: '完美需求 → 直接采用（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F',
        explanation: '这些是需求工程中常见问题及其对应的解决策略，完美需求在实际项目中是不存在的。',
        tags: ['需求问题', '问题解决', '需求改进'],
        difficulty: 4,
        score: 90
    },
    {
        id: 'se_req_058',
        type: 'choice',
        choiceType: 'multiple',
        question: '螺旋模型的三层结构包括哪些？',
        options: [
            { key: 'A', text: '业务需求层' },
            { key: 'B', text: '用户需求层' },
            { key: 'C', text: '系统需求层' },
            { key: 'D', text: '技术实现层（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '螺旋模型包含三个需求层次，技术实现层属于后续的设计开发阶段。',
        tags: ['螺旋模型', '需求层次', '模型结构'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_req_059',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求验证的手段包括哪些？',
        options: [
            { key: 'A', text: '需求评审(Systematic manual analysis)' },
            { key: 'B', text: '原型生成(Executable model验证)' },
            { key: 'C', text: '测试用例生成(Testability检查)' },
            { key: 'D', text: '用户满意度调查（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '需求验证使用评审、原型、测试用例等技术手段，用户满意度调查属于需求确认范畴。',
        tags: ['需求验证', '验证手段', '质量检查'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_060',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求评审的检查项包括哪些？',
        options: [
            { key: 'A', text: '完整性（是否覆盖所有需求）' },
            { key: 'B', text: '正确性（反映真实期望）' },
            { key: 'C', text: '准确性（精确表达需求）' },
            { key: 'D', text: '一致性（无矛盾需求）' },
            { key: 'E', text: '可追踪性（需求标识唯一）' },
            { key: 'F', text: '文档规范性（符合标准模板）' },
            { key: 'G', text: '图符规范性（UML正确使用）' },
            { key: 'H', text: '代码质量（程序结构合理）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F,G',
        explanation: '需求评审关注需求文档的各个质量维度，代码质量属于实现阶段的评审内容。',
        tags: ['需求评审', '评审标准', '质量检查'],
        difficulty: 4,
        score: 90
    },
    {
        id: 'se_req_061',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求分析的输出形式包括哪些？',
        options: [
            { key: 'A', text: '需求模型（用例图/类图/状态图等）' },
            { key: 'B', text: '软件原型（可运行演示）' },
            { key: 'C', text: '需求文档（图文规格说明书）' },
            { key: 'D', text: '源代码文件（程序实现）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '需求分析的输出是各种需求制品，源代码文件属于实现阶段的产出。',
        tags: ['需求输出', '需求制品', '文档产物'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_req_062',
        type: 'choice',
        choiceType: 'multiple',
        question: '需求文档撰写的要点包括哪些？',
        options: [
            { key: 'A', text: '遵循标准模板' },
            { key: 'B', text: '图文结合表述' },
            { key: 'C', text: '功能/非功能需求完整' },
            { key: 'D', text: '多方共同参与' },
            { key: 'E', text: '语言简洁一致' },
            { key: 'F', text: '技术细节详尽（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '需求文档应该清晰、完整、规范，但不应包含过多技术实现细节。',
        tags: ['需求文档', '文档规范', '撰写要点'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_req_063',
        type: 'choice',
        choiceType: 'single',
        question: '需求追踪关系图展示的主要内容是什么？',
        options: [
            { key: 'A', text: '需求与设计/代码/测试用例的验证/满足关系' },
            { key: 'B', text: '项目进度与时间的关系' },
            { key: 'C', text: '团队成员与角色的分配关系' },
            { key: 'D', text: '成本与收益的平衡关系（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '需求追踪关系图展示了需求在软件开发各阶段的传递和满足关系。',
        tags: ['需求追踪', '关系图', '可追踪性'],
        difficulty: 3,
        score: 75
    }
];

console.log('需求分析导入脚本 - 第五部分已加载，包含12个知识点');

// 合并所有需求分析知识点
const allRequirementsAnalysisKnowledge = [
    ...requirementsAnalysisPart1,
    ...requirementsAnalysisPart2,
    ...requirementsAnalysisPart3,
    ...requirementsAnalysisPart4,
    ...requirementsAnalysisPart5
];

console.log(`需求分析导入脚本 - 所有知识点已合并，总计 ${allRequirementsAnalysisKnowledge.length} 个知识点`);

// 需求分析知识点导入函数
function importRequirementsAnalysis() {
    try {
        console.log('开始导入需求分析知识点...');
        
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
        
        // 检查是否已存在需求分析知识区
        const data = window.storageManager.getData();
        const baseIndex = data.knowledgeBases.findIndex(base => base.id === 'software_engineering_base');
        
        if (baseIndex === -1) {
            throw new Error('软件工程知识库未找到');
        }
        
        let requirementsArea = data.knowledgeBases[baseIndex].areas.find(area => area.id === 'requirements_analysis');
        const existingRequirementsKnowledge = data.knowledge.filter(k => 
            k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'requirements_analysis'
        );
        
        if (requirementsArea && existingRequirementsKnowledge.length > 0) {
            const confirmMessage = `⚠️ 需求分析知识区已存在！\n\n当前数据：\n• 知识区：${requirementsArea.name}\n• 知识点数量：${existingRequirementsKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入需求分析知识点', 'info');
                } else {
                    alert('取消导入需求分析知识点');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有需求分析知识区数据');
            
            // 删除原有知识点
            data.knowledge = data.knowledge.filter(k => 
                !(k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'requirements_analysis')
            );
        } else {
            // 创建需求分析知识区
            requirementsArea = {
                id: 'requirements_analysis',
                name: '需求分析',
                description: '软件需求工程理论与实践方法',
                color: '#722ed1',
                knowledgePoints: []
            };
            
            data.knowledgeBases[baseIndex].areas.push(requirementsArea);
        }
        
        // 将知识点转换为标准格式
        const formattedKnowledge = allRequirementsAnalysisKnowledge.map(item => ({
            ...item,
            category: '需求分析',
            areaId: 'requirements_analysis',
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
        
        console.log(`成功导入${validKnowledge.length}个需求分析知识点！`);
        
        // 显示成功通知
        const fillCount = validKnowledge.filter(k => k.type === 'fill').length;
        const choiceCount = validKnowledge.filter(k => k.type === 'choice').length;
        
        const successMessage = `✅ 需求分析知识点导入成功！\n\n📊 导入统计：\n- 知识区：需求分析\n- 填空题：${fillCount}个（概念类）\n- 选择题：${choiceCount}个（知识点+属性类）\n- 总计：${validKnowledge.length}个知识点\n\n📚 内容涵盖：\n• 需求基本概念和定义（17个知识点）\n• 需求工程过程和方法（12个知识点）\n• 需求获取和建模技术（14个知识点）\n• 需求精化和UML建模（8个知识点）\n• 需求验证和管理（12个知识点）\n\n🎯 特色功能：\n• 所有选择题都精心设计了干扰项\n• 支持多选题（最多9个选项）\n• 完整覆盖5个需求分析文档内容\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
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
        console.error('导入需求分析知识点失败:', error);
        const errorMessage = '❌ 导入需求分析知识点失败：' + error.message;
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
    }
}

// 将导入函数添加到全局作用域
window.importRequirementsAnalysis = importRequirementsAnalysis;
window.allRequirementsAnalysisKnowledge = allRequirementsAnalysisKnowledge;

console.log('需求分析知识库导入脚本已完全加载'); 