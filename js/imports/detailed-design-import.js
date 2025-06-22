// 软件详细设计知识库导入脚本
// 从5个软件详细设计文档中解析出的完整知识点

// 第一部分：软件详细设计(1)的12个知识点
const detailedDesignPart1 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_detail_001',
        type: 'fill',
        question: '详细设计的定义是什么？',
        answer: '在高层设计和底层实现间的桥梁，对体系结构设计成果进行细化和精化，获得高质量面向实现的设计模型。',
        explanation: '详细设计是软件设计的重要阶段，连接架构设计与具体实现。',
        tags: ['详细设计定义', '设计桥梁', '实现导向'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_002',
        type: 'fill',
        question: '详细设计的定位包括哪些方面？',
        answer: '1. 落实和细化高层软件体系结构设计\n2. 辅助和支持软件实现\n3. 输入：软件体系结构设计和软件需求\n4. 输出：详细设计模型',
        explanation: '详细设计在软件开发流程中承担着承上启下的重要作用。',
        tags: ['设计定位', '输入输出', '流程作用'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_003',
        type: 'fill',
        question: '详细设计要求包括哪些？',
        answer: '1. 针对软件需求（确保需求全覆盖）\n2. 深入优化设计（提高可靠性/可维护性）\n3. 设计足够详细（支持直接编码）\n4. 充分软件重用（提高开发效率）',
        explanation: '详细设计需要满足需求覆盖、质量优化、实施指导和重用促进四个方面的要求。',
        tags: ['设计要求', '需求覆盖', '质量优化'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_004',
        type: 'fill',
        question: '详细设计主要活动包括哪些？',
        answer: '1. 用例/顶层过程设计（实现方案设计）\n2. 子系统/构件设计（细化内部元素）\n3. 类/函数设计（属性/算法实现）\n4. 持久化设计（数据存储方案）\n5. 设计整合与验证',
        explanation: '详细设计活动从用例实现到数据存储，覆盖软件实现的各个层面。',
        tags: ['设计活动', '用例设计', '持久化'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_005',
        type: 'fill',
        question: 'OO设计流程是什么？',
        answer: '需求模型→组件模型→类模型',
        explanation: '面向对象设计遵循从需求到组件再到类的逐步细化流程。',
        tags: ['OO设计', '设计流程', '模型转换'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_006',
        type: 'fill',
        question: '用例设计任务是什么？',
        answer: '基于体系结构元素设计用例实现方案，产出顺序图/类图等设计模型。',
        explanation: '用例设计将需求用例转化为具体的实现模型和交互设计。',
        tags: ['用例设计', '实现方案', '设计模型'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_007',
        type: 'fill',
        question: '类设计内容包括哪些？',
        answer: '1. 属性定义\n2. 方法实现算法\n3. 类间协作关系',
        explanation: '类设计涵盖数据结构、行为逻辑和协作关系三个核心方面。',
        tags: ['类设计', '属性方法', '协作关系'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_008',
        type: 'fill',
        question: '过程设计方法是什么？',
        answer: '数据流图→层次图→流程图/N-S图/PAD图',
        explanation: '面向过程设计从数据流分析开始，逐步细化到具体的控制流程。',
        tags: ['过程设计', '数据流图', '控制流程'],
        difficulty: 3,
        score: 75
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_detail_009',
        type: 'choice',
        choiceType: 'multiple',
        question: '概要设计vs详细设计的对比维度包括哪些？',
        options: [
            { key: 'A', text: '性质（结构性 vs 过程性）' },
            { key: 'B', text: '范围（全局性 vs 局部性）' },
            { key: 'C', text: '重点（关键性 vs 细节性）' },
            { key: 'D', text: '粒度（粗粒度 vs 细粒度）' },
            { key: 'E', text: '成本（高成本 vs 低成本）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '概要设计与详细设计的对比主要从技术特征角度分析，成本不是主要对比维度。',
        tags: ['设计对比', '概要详细', '技术特征'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_010',
        type: 'choice',
        choiceType: 'multiple',
        question: '函数设计要点包括哪些？',
        options: [
            { key: 'A', text: '输入/输出定义' },
            { key: 'B', text: '处理流程' },
            { key: 'C', text: '异常处理' },
            { key: 'D', text: '性能监控（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '函数设计关注接口定义、逻辑流程和异常处理，性能监控属于运维层面。',
        tags: ['函数设计', '接口定义', '异常处理'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_011',
        type: 'choice',
        choiceType: 'multiple',
        question: '设计评审要点包括哪些？',
        options: [
            { key: 'A', text: '需求覆盖完整性' },
            { key: 'B', text: '技术可行性验证' },
            { key: 'C', text: '文档规范性检查' },
            { key: 'D', text: '可维护性评估' },
            { key: 'E', text: '市场前景分析（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '设计评审关注技术和工程层面的质量保证，市场前景属于产品管理范畴。',
        tags: ['设计评审', '质量保证', '技术验证'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_012',
        type: 'choice',
        choiceType: 'single',
        question: '超市管理系统类图展示的核心内容是什么？',
        options: [
            { key: 'A', text: '展示系统中各个类的属性、方法和类间关系的详细设计模型' },
            { key: 'B', text: '展示用户操作的业务流程' },
            { key: 'C', text: '展示数据库的表结构设计' },
            { key: 'D', text: '展示系统的网络架构部署（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '类图是面向对象详细设计的核心模型，展示类的结构和关系。',
        tags: ['类图示例', '详细设计', '类关系'],
        difficulty: 3,
        score: 75
    }
];

console.log('软件详细设计导入脚本 - 第一部分已加载，包含12个知识点');

// 第二部分：软件详细设计(2)的12个知识点（与第一部分相同内容，这里重新组织了一些图表相关知识点）
const detailedDesignPart2 = [
    // 图表类知识点作为选择题
    {
        id: 'se_detail_013',
        type: 'choice',
        choiceType: 'single',
        question: '提醒服务顺序图展示的核心内容是什么？',
        options: [
            { key: 'A', text: '展示用例实现中对象间的消息传递和交互时序' },
            { key: 'B', text: '展示数据库的查询优化过程' },
            { key: 'C', text: '展示用户界面的页面跳转流程' },
            { key: 'D', text: '展示系统的错误处理机制（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '顺序图是用例设计的重要产出，展示对象间的动态交互过程。',
        tags: ['顺序图', '用例设计', '对象交互'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_014',
        type: 'choice',
        choiceType: 'single',
        question: '远程控制机器人顺序图的设计价值是什么？',
        options: [
            { key: 'A', text: '展示机器人控制的详细交互流程，指导控制模块的具体实现' },
            { key: 'B', text: '展示机器人的硬件组装方式' },
            { key: 'C', text: '展示机器人的成本核算过程' },
            { key: 'D', text: '展示机器人的市场定位分析（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '顺序图为复杂控制系统的实现提供了详细的交互设计指导。',
        tags: ['控制系统', '交互设计', '实现指导'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_015',
        type: 'choice',
        choiceType: 'single',
        question: '微服务架构图在详细设计中的作用是什么？',
        options: [
            { key: 'A', text: '展示旅行服务的微服务拆分和服务间调用关系的详细设计' },
            { key: 'B', text: '展示服务器的硬件配置规格' },
            { key: 'C', text: '展示用户的消费行为分析' },
            { key: 'D', text: '展示竞争对手的服务对比（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '微服务架构图指导服务的详细划分和接口设计。',
        tags: ['微服务架构', '服务拆分', '接口设计'],
        difficulty: 4,
        score: 85
    },
    // 补充一些基于第二个文档的填空题
    {
        id: 'se_detail_016',
        type: 'fill',
        question: '详细设计的核心价值是什么？',
        answer: '作为高层设计和底层实现间的桥梁，确保体系结构设计能够有效指导编码实现。',
        explanation: '详细设计解决了概念到实现的转换问题，是软件开发的关键环节。',
        tags: ['设计价值', '实现桥梁', '转换过程'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_017',
        type: 'fill',
        question: '详细设计输出的核心模型有哪些？',
        answer: '1. 顺序图（对象交互）\n2. 类图（类结构关系）\n3. 状态图（状态变迁）\n4. 活动图（业务流程）',
        explanation: '这些UML模型构成了面向对象详细设计的完整描述。',
        tags: ['设计模型', 'UML图', '详细设计'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_018',
        type: 'fill',
        question: '用例实现设计的关键任务是什么？',
        answer: '1. 识别参与对象\n2. 分配职责行为\n3. 设计对象交互\n4. 优化协作方案',
        explanation: '用例实现设计将抽象的用例转化为具体的对象协作方案。',
        tags: ['用例实现', '对象协作', '职责分配'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_detail_019',
        type: 'fill',
        question: '子系统设计的细化内容包括哪些？',
        answer: '1. 内部模块划分\n2. 模块间接口定义\n3. 数据流向设计\n4. 控制机制设计',
        explanation: '子系统设计将架构层的子系统进一步分解为可实现的模块。',
        tags: ['子系统设计', '模块划分', '接口定义'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_020',
        type: 'choice',
        choiceType: 'multiple',
        question: '详细设计质量评估标准包括哪些？',
        options: [
            { key: 'A', text: '可实现性（能够直接指导编码）' },
            { key: 'B', text: '完整性（覆盖所有需求）' },
            { key: 'C', text: '一致性（与架构设计协调）' },
            { key: 'D', text: '可追踪性（需求-设计映射清晰）' },
            { key: 'E', text: '美观性（图表绘制精美）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '详细设计质量评估关注功能和技术层面的指标，美观性不是核心标准。',
        tags: ['质量评估', '设计标准', '评估指标'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_021',
        type: 'choice',
        choiceType: 'multiple',
        question: '设计模型的验证方法包括哪些？',
        options: [
            { key: 'A', text: '同行评审（专家检查）' },
            { key: 'B', text: '原型验证（构建演示原型）' },
            { key: 'C', text: '工具检查（建模工具验证）' },
            { key: 'D', text: '客户确认（需求符合性检查）' },
            { key: 'E', text: '性能测试（实际运行验证）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '设计阶段的验证主要通过评审、原型和工具检查，性能测试属于实现后的验证。',
        tags: ['设计验证', '评审方法', '原型验证'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_022',
        type: 'choice',
        choiceType: 'multiple',
        question: '详细设计文档的组成部分包括哪些？',
        options: [
            { key: 'A', text: '设计概述（目的、范围、约束）' },
            { key: 'B', text: '架构细化（模块、接口、数据）' },
            { key: 'C', text: '用例实现（顺序图、交互设计）' },
            { key: 'D', text: '类设计（属性、方法、关系）' },
            { key: 'E', text: '营销策略（市场推广方案）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '详细设计文档包含技术设计的各个层面，不包括营销等非技术内容。',
        tags: ['设计文档', '文档结构', '技术内容'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_023',
        type: 'choice',
        choiceType: 'single',
        question: '面向对象详细设计与面向过程详细设计的主要区别是什么？',
        options: [
            { key: 'A', text: '面向对象以类和对象为中心，面向过程以函数和数据流为中心' },
            { key: 'B', text: '面向对象适合大型项目，面向过程适合小型项目' },
            { key: 'C', text: '面向对象使用UML建模，面向过程使用文字描述' },
            { key: 'D', text: '面向对象成本更高，面向过程成本更低（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '两种方法的根本区别在于建模思路和核心抽象概念的不同。',
        tags: ['方法对比', '面向对象', '面向过程'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_024',
        type: 'choice',
        choiceType: 'single',
        question: '详细设计在软件生命周期中的定位是什么？',
        options: [
            { key: 'A', text: '位于需求分析和编码实现之间，承担设计细化的关键作用' },
            { key: 'B', text: '位于测试和维护之间，负责bug修复' },
            { key: 'C', text: '位于项目启动和需求分析之间，进行可行性研究' },
            { key: 'D', text: '位于产品发布和用户培训之间，制定推广计划（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '详细设计是连接需求与实现的重要桥梁，在软件生命周期中承担设计细化的职责。',
        tags: ['生命周期', '设计定位', '开发阶段'],
        difficulty: 2,
        score: 70
    }
];

console.log('软件详细设计导入脚本 - 第二部分已加载，包含12个知识点');

// 第三部分：软件详细设计(3)持久化设计的15个知识点
const detailedDesignPart3 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_detail_025',
        type: 'fill',
        question: '持久化设计的定义是什么？',
        answer: '将软件系统中的数据抽象为计算机可理解和处理的形式，并设计其在永久存储介质中的存储方案。',
        explanation: '持久化设计解决数据的抽象、组织和永久保存问题。',
        tags: ['持久化定义', '数据抽象', '存储方案'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_026',
        type: 'fill',
        question: '持久化设计目标包括哪些？',
        answer: '1. 支持信息的抽象和组织\n2. 实现数据的持久保存\n3. 优化数据存储和访问性能',
        explanation: '持久化设计从数据抽象、保存和性能三个维度确保数据管理的有效性。',
        tags: ['设计目标', '数据抽象', '性能优化'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_027',
        type: 'fill',
        question: '持久化设计核心任务是什么？',
        answer: '1. 确定需要持久保存的数据\n2. 设计数据间的关系\n3. 选择数据组织方式（数据库表/文件等）\n4. 优化存储机制',
        explanation: '持久化设计任务从数据识别到存储优化，涵盖数据管理的完整流程。',
        tags: ['核心任务', '数据关系', '存储机制'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_028',
        type: 'fill',
        question: '持久化设计原则包括哪些？',
        answer: '1. 可追踪性（与需求/设计模型对应）\n2. 无冗余（避免不必要的数据）\n3. 时空效率平衡（存储空间与操作性能）\n4. 可扩展性（支持未来扩展）',
        explanation: '持久化设计原则确保数据设计的质量和可持续性。',
        tags: ['设计原则', '可追踪性', '效率平衡'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_detail_029',
        type: 'fill',
        question: '持久化设计流程是什么？',
        answer: '确定持久数据→选择存储方式→设计数据结构→设计数据操作→评审优化',
        explanation: '持久化设计遵循从数据识别到操作设计的系统化流程。',
        tags: ['设计流程', '数据结构', '操作设计'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_030',
        type: 'fill',
        question: '确定持久数据的方法是什么？',
        answer: '分析需求识别需要永久保存的数据，如用户凭证、系统配置等。',
        explanation: '通过需求分析确定哪些数据需要在系统关闭后仍然保持。',
        tags: ['持久数据', '需求分析', '数据识别'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_031',
        type: 'fill',
        question: '存储方式选择包括哪些？',
        answer: '1. 数据文件（结构化格式）\n2. 数据库（关系型/非关系型）',
        explanation: '存储方式的选择影响系统的性能、可维护性和扩展性。',
        tags: ['存储方式', '数据文件', '数据库'],
        difficulty: 2,
        score: 70
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_detail_032',
        type: 'choice',
        choiceType: 'multiple',
        question: '对象-关系映射规则包括哪些？',
        options: [
            { key: 'A', text: '类 → 表' },
            { key: 'B', text: '对象 → 记录' },
            { key: 'C', text: '属性 → 字段' },
            { key: 'D', text: '方法 → 触发器（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '对象-关系映射主要针对数据结构，方法不直接映射为触发器。',
        tags: ['对象关系映射', '数据库设计', '映射规则'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_033',
        type: 'choice',
        choiceType: 'multiple',
        question: '关联关系映射方式包括哪些？',
        options: [
            { key: 'A', text: '1:1关系：在任一表中添加外键' },
            { key: 'B', text: '1:n关系：在n端表添加外键' },
            { key: 'C', text: 'n:m关系：创建关联表存储外键对' },
            { key: 'D', text: '复合关系：使用视图实现（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '关联关系映射通过外键实现，视图不是关系映射的基本方式。',
        tags: ['关联映射', '外键设计', '关系数据库'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_detail_034',
        type: 'choice',
        choiceType: 'multiple',
        question: '继承关系映射方案包括哪些？',
        options: [
            { key: 'A', text: '单表继承（所有字段放子表）' },
            { key: 'B', text: '外键关联（子表存储特有属性）' },
            { key: 'C', text: '存储过程（用代码实现继承）（干扰项）' }
        ],
        correctAnswer: 'A,B',
        explanation: '继承映射主要通过表结构设计实现，存储过程不是继承映射方案。',
        tags: ['继承映射', '表设计', '面向对象'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_detail_035',
        type: 'choice',
        choiceType: 'multiple',
        question: '基本数据操作类型包括哪些？',
        options: [
            { key: 'A', text: '写入（Create）' },
            { key: 'B', text: '查询（Read）' },
            { key: 'C', text: '更新（Update）' },
            { key: 'D', text: '删除（Delete）' },
            { key: 'E', text: '验证（Validate）' },
            { key: 'F', text: '监控（Monitor）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: 'CRUD操作加上验证是基本的数据操作，监控属于运维层面。',
        tags: ['数据操作', 'CRUD操作', '数据验证'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_036',
        type: 'choice',
        choiceType: 'multiple',
        question: '数据设计评审要点包括哪些？',
        options: [
            { key: 'A', text: '正确性（满足需求）' },
            { key: 'B', text: '一致性（与类设计匹配）' },
            { key: 'C', text: '效率（时空性能）' },
            { key: 'D', text: '可扩展性（支持演进）' },
            { key: 'E', text: '安全性（数据保护）' },
            { key: 'F', text: '美观性（界面设计）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '数据设计评审关注功能、性能和安全性，界面美观性不是数据设计的评审要点。',
        tags: ['设计评审', '数据质量', '评审标准'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_037',
        type: 'choice',
        choiceType: 'single',
        question: '航空票务数据模型展示的核心内容是什么？',
        options: [
            { key: 'A', text: '展示复杂业务场景下的多表关联关系和数据完整性约束' },
            { key: 'B', text: '展示用户界面的操作流程' },
            { key: 'C', text: '展示系统的性能优化策略' },
            { key: 'D', text: '展示项目的成本控制方案（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '航空票务数据模型是复杂关联关系设计的典型案例。',
        tags: ['数据模型', '多表关联', '业务场景'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_038',
        type: 'choice',
        choiceType: 'single',
        question: '教务系统数据模型的设计特点是什么？',
        options: [
            { key: 'A', text: '展示学生、课程、教师等实体间的复杂关联关系设计' },
            { key: 'B', text: '展示系统的用户权限管理' },
            { key: 'C', text: '展示课程内容的知识结构' },
            { key: 'D', text: '展示学校的组织架构图（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '教务系统数据模型重点展示教学业务中各实体的关联关系。',
        tags: ['教务系统', '实体关系', '复杂关联'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_039',
        type: 'choice',
        choiceType: 'single',
        question: '传感器数据表设计示例的价值是什么？',
        options: [
            { key: 'A', text: '展示简单表结构的设计原则和字段定义方法' },
            { key: 'B', text: '展示传感器的硬件连接方式' },
            { key: 'C', text: '展示数据采集的算法实现' },
            { key: 'D', text: '展示设备的采购成本分析（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '传感器数据表是简单表结构设计的基础示例。',
        tags: ['表设计', '简单结构', '字段定义'],
        difficulty: 2,
        score: 70
    }
];

console.log('软件详细设计导入脚本 - 第三部分已加载，包含15个知识点');

// 第四部分：软件详细设计(4)面向过程设计的15个知识点
const detailedDesignPart4 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_detail_040',
        type: 'fill',
        question: '面向过程详细设计的定义是什么？',
        answer: '又称为软件实现设计，是在概要设计划分模块后对各模块进行算法实现设计的基础性设计方法。',
        explanation: '面向过程详细设计专注于算法和流程的具体实现设计。',
        tags: ['面向过程', '算法设计', '实现设计'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_041',
        type: 'fill',
        question: '面向过程程序设计特点包括哪些？',
        answer: '1. 采用自顶向下逐步求精方法\n2. 单入口单出口控制结构\n3. 仅包含顺序/选择/循环三种结构\n4. 控制流程线性化',
        explanation: '面向过程设计强调结构化编程的基本原则和控制流的规范性。',
        tags: ['程序设计特点', '结构化编程', '控制结构'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_042',
        type: 'fill',
        question: '详细设计工具分类包括哪些？',
        answer: '1. 图形工具（流程图/N-S图/PAD图）\n2. 表格工具（决策表）\n3. 语言工具（PDL伪代码）',
        explanation: '详细设计工具从不同角度支持算法和流程的描述和设计。',
        tags: ['设计工具', '图形工具', '伪代码'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_043',
        type: 'fill',
        question: 'N-S图特点是什么？',
        answer: '1. 完全结构化（无箭头）\n2. 层次清晰可见\n3. 强制单入口单出口\n4. 易于转换为代码',
        explanation: 'N-S图通过盒状结构强制结构化设计，避免goto语句的使用。',
        tags: ['N-S图', '结构化设计', '程序结构'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_044',
        type: 'fill',
        question: 'PDL特征包括哪些？',
        answer: '1. 固定语法关键字\n2. 自然语言描述逻辑\n3. 支持数据结构定义\n4. 包含接口描述模式',
        explanation: 'PDL（程序设计语言）结合了编程语言的严谨性和自然语言的可读性。',
        tags: ['PDL伪代码', '语法关键字', '逻辑描述'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_045',
        type: 'fill',
        question: 'PAD优势包括哪些？',
        answer: '1. 强制结构化设计\n2. 层次可视化（竖线表示）\n3. 易转换为代码\n4. 支持自顶向下设计\n5. 可描述数据结构',
        explanation: 'PAD（问题分析图）通过层次化的可视表示支持结构化程序设计。',
        tags: ['PAD图', '结构化设计', '层次可视化'],
        difficulty: 3,
        score: 85
    },
    {
        id: 'se_detail_046',
        type: 'fill',
        question: 'Jackson方法的数据结构类型包括哪些？',
        answer: '1. 顺序型\n2. 选择型\n3. 循环型',
        explanation: 'Jackson结构化程序设计方法基于数据结构来驱动程序结构设计。',
        tags: ['Jackson方法', '数据结构', '程序结构'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_047',
        type: 'fill',
        question: 'Jackson设计步骤是什么？',
        answer: '1. 分析输入/输出数据结构\n2. 建立数据单元对应关系\n3. 导出程序结构图\n4. 分配基本操作\n5. 编写伪代码',
        explanation: 'Jackson方法通过数据结构分析来指导程序结构的设计过程。',
        tags: ['Jackson步骤', '数据驱动', '程序结构'],
        difficulty: 4,
        score: 85
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_detail_048',
        type: 'choice',
        choiceType: 'multiple',
        question: '流程图符号体系包括哪些？',
        options: [
            { key: 'A', text: '终结符（开始/结束）' },
            { key: 'B', text: '处理框（计算步骤）' },
            { key: 'C', text: '判断框（逻辑分支）' },
            { key: 'D', text: '输入输出（数据交互）' },
            { key: 'E', text: '连线（执行流向）' },
            { key: 'F', text: '装饰符（美化图形）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '流程图符号体系包含逻辑和数据流的基本元素，装饰符不是标准符号。',
        tags: ['流程图符号', '图形表示', '程序流程'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_049',
        type: 'choice',
        choiceType: 'multiple',
        question: '流程图优缺点包括哪些？',
        options: [
            { key: 'A', text: '优点：直观表达控制流程' },
            { key: 'B', text: '缺点：不利于逐步求精' },
            { key: 'C', text: '缺点：易导致非结构化设计' },
            { key: 'D', text: '缺点：难以表示数据结构' },
            { key: 'E', text: '优点：支持面向对象设计（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '流程图的评价主要针对结构化程序设计，与面向对象设计无直接关系。',
        tags: ['流程图评价', '设计方法', '优缺点分析'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_050',
        type: 'choice',
        choiceType: 'single',
        question: '阶乘计算流程图展示的核心内容是什么？',
        options: [
            { key: 'A', text: '展示递归算法的程序流程控制结构和循环逻辑' },
            { key: 'B', text: '展示数学公式的推导过程' },
            { key: 'C', text: '展示计算机的运算原理' },
            { key: 'D', text: '展示算法的时间复杂度分析（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '阶乘计算流程图是程序流程设计的经典示例。',
        tags: ['流程图示例', '阶乘算法', '程序控制'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_051',
        type: 'choice',
        choiceType: 'single',
        question: 'N-S图阶乘示例的设计价值是什么？',
        options: [
            { key: 'A', text: '展示结构化程序设计的规范表示方法和层次结构' },
            { key: 'B', text: '展示算法的性能优化技巧' },
            { key: 'C', text: '展示编程语言的语法特性' },
            { key: 'D', text: '展示软件测试的用例设计（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: 'N-S图示例展示了结构化设计的标准化表示方法。',
        tags: ['N-S图示例', '结构化表示', '设计规范'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_052',
        type: 'choice',
        choiceType: 'single',
        question: 'PAD基本符号展示的内容是什么？',
        options: [
            { key: 'A', text: '展示PAD图的符号体系和层次表示方法' },
            { key: 'B', text: '展示数据库的ER图符号' },
            { key: 'C', text: '展示UML的类图符号' },
            { key: 'D', text: '展示网络拓扑的连接符号（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: 'PAD基本符号是问题分析图的标准表示元素。',
        tags: ['PAD符号', '图形表示', '标准符号'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_053',
        type: 'choice',
        choiceType: 'single',
        question: 'Jackson数据结构图的核心理念是什么？',
        options: [
            { key: 'A', text: '展示数据结构如何驱动程序结构的设计方法' },
            { key: 'B', text: '展示面向对象的类继承关系' },
            { key: 'C', text: '展示数据库的表关联关系' },
            { key: 'D', text: '展示用户界面的组件布局（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: 'Jackson方法强调数据结构与程序结构的对应关系。',
        tags: ['Jackson方法', '数据驱动', '程序设计'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_detail_054',
        type: 'choice',
        choiceType: 'multiple',
        question: '详细设计工具的选择考虑因素包括哪些？',
        options: [
            { key: 'A', text: '问题复杂度（简单问题用流程图，复杂问题用N-S图）' },
            { key: 'B', text: '团队熟悉度（团队技能和经验）' },
            { key: 'C', text: '项目要求（文档标准和规范）' },
            { key: 'D', text: '工具支持（建模工具的可用性）' },
            { key: 'E', text: '成本预算（工具采购费用）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '设计工具选择主要考虑技术和项目因素，成本通常不是主要决策因素。',
        tags: ['工具选择', '设计决策', '项目因素'],
        difficulty: 3,
        score: 80
    }
];

console.log('软件详细设计导入脚本 - 第四部分已加载，包含15个知识点');

// 第五部分：软件详细设计(5)评审的13个知识点
const detailedDesignPart5 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_detail_055',
        type: 'fill',
        question: '详细设计评审的定义是什么？',
        answer: '对详细设计方案进行系统性检查，确保设计满足需求且质量达标的技术审查活动。',
        explanation: '详细设计评审是质量保证的重要环节，确保设计的正确性和可实施性。',
        tags: ['设计评审', '质量保证', '技术审查'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_056',
        type: 'fill',
        question: '设计文档规范包括哪些部分？',
        answer: '1. 引言（目的/读者/系统概述）\n2. 设计约束与原则\n3. 设计方案（体系结构/界面/用例等）\n4. 实施指南',
        explanation: '设计文档规范确保文档的完整性、可读性和可操作性。',
        tags: ['文档规范', '文档结构', '实施指南'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_057',
        type: 'fill',
        question: '评审参与角色包括哪些？',
        answer: '1. 客户（验证需求实现）\n2. 设计人员（修改方案）\n3. 程序员（评估可实施性）\n4. 测试工程师（设计测试用例）\n5. QA人员（质量保证）',
        explanation: '评审需要多角色参与，确保设计的全面性和质量。',
        tags: ['评审角色', '多方参与', '质量控制'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_058',
        type: 'fill',
        question: '设计元素重组技术包括哪些？',
        answer: '1. 合并相似职责元素\n2. 抽象公共方法\n3. 应用继承/代理机制\n4. 消除逻辑冲突',
        explanation: '设计优化通过重组技术提高设计的内聚性和可维护性。',
        tags: ['设计优化', '重组技术', '逻辑优化'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_detail_059',
        type: 'fill',
        question: '设计交付物类型包括哪些？',
        answer: '1. 设计模型（顺序图/类图/状态图）\n2. 设计规格说明书\n3. 测试用例草案',
        explanation: '详细设计的交付物为后续实现和测试提供了完整的指导。',
        tags: ['设计交付物', '设计模型', '规格说明'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_060',
        type: 'fill',
        question: '标准评审步骤是什么？',
        answer: '1. 预审文档\n2. 问题收集\n3. 会议讨论\n4. 达成共识\n5. 修改确认\n6. 配置入库',
        explanation: '标准化的评审流程确保评审的系统性和有效性。',
        tags: ['评审流程', '标准步骤', '配置管理'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_061',
        type: 'fill',
        question: '详细设计核心任务包括哪些？',
        answer: '1. 用例实现设计\n2. 子系统细化\n3. 类方法设计\n4. 数据持久化方案\n5. 部署配置',
        explanation: '详细设计任务涵盖从逻辑设计到物理部署的完整范围。',
        tags: ['设计任务', '用例实现', '部署配置'],
        difficulty: 3,
        score: 80
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_detail_062',
        type: 'choice',
        choiceType: 'multiple',
        question: '设计质量维度包括哪些？',
        options: [
            { key: 'A', text: '规范性（文档格式合规）' },
            { key: 'B', text: '简练性（表述清晰简洁）' },
            { key: 'C', text: '正确性（满足需求）' },
            { key: 'D', text: '可实施性（指导编码）' },
            { key: 'E', text: '可追踪性（需求-设计映射）' },
            { key: 'F', text: '一致性（模型间协调）' },
            { key: 'G', text: '经济性（成本控制）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F',
        explanation: '设计质量评估关注技术和工程层面的指标，经济性不是设计质量的直接维度。',
        tags: ['质量维度', '设计标准', '质量评估'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_detail_063',
        type: 'choice',
        choiceType: 'multiple',
        question: '伪代码要素包括哪些？',
        options: [
            { key: 'A', text: '文件操作（打开/关闭）' },
            { key: 'B', text: '循环控制（while/end）' },
            { key: 'C', text: '数据处理（seq操作）' },
            { key: 'D', text: '输出生成（打印/换行）' },
            { key: 'E', text: '图形绘制（画线/画圆）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '伪代码要素涵盖程序设计的基本控制和处理结构，图形绘制不是通用要素。',
        tags: ['伪代码', 'PDL要素', '程序结构'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_064',
        type: 'choice',
        choiceType: 'single',
        question: '伪代码示例表展示的核心价值是什么？',
        options: [
            { key: 'A', text: '展示零件表处理的详细算法逻辑和程序结构设计' },
            { key: 'B', text: '展示数据库的查询优化技巧' },
            { key: 'C', text: '展示用户界面的交互设计' },
            { key: 'D', text: '展示系统的性能测试方法（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '伪代码示例展示了详细设计中算法实现的标准表示方法。',
        tags: ['伪代码示例', '算法设计', '程序结构'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_detail_065',
        type: 'choice',
        choiceType: 'single',
        question: '评审流程示意图的作用是什么？',
        options: [
            { key: 'A', text: '展示详细设计评审的标准化流程和各阶段关系' },
            { key: 'B', text: '展示项目管理的时间安排' },
            { key: 'C', text: '展示团队的组织架构' },
            { key: 'D', text: '展示产品的销售流程（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '评审流程示意图指导评审活动的规范化执行。',
        tags: ['评审流程', '流程图', '标准化'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_detail_066',
        type: 'choice',
        choiceType: 'multiple',
        question: '详细设计评审的关注重点包括哪些？',
        options: [
            { key: 'A', text: '需求覆盖的完整性检查' },
            { key: 'B', text: '设计方案的技术可行性' },
            { key: 'C', text: '模型间的一致性验证' },
            { key: 'D', text: '实现指导的详细程度' },
            { key: 'E', text: '文档格式的规范性' },
            { key: 'F', text: '团队成员的满意度（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '评审关注技术和工程质量，团队满意度不是评审的直接关注点。',
        tags: ['评审重点', '质量检查', '技术验证'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_detail_067',
        type: 'choice',
        choiceType: 'single',
        question: '详细设计在软件开发中的关键作用是什么？',
        options: [
            { key: 'A', text: '作为架构设计和编码实现之间的桥梁，确保设计的可实施性' },
            { key: 'B', text: '替代需求分析，直接指导开发' },
            { key: 'C', text: '主要用于项目进度管理和成本控制' },
            { key: 'D', text: '专门用于用户培训和文档编写（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '详细设计的核心价值在于连接设计与实现，确保可操作性。',
        tags: ['设计作用', '实施桥梁', '开发指导'],
        difficulty: 2,
        score: 70
    }
];

console.log('软件详细设计导入脚本 - 第五部分已加载，包含13个知识点');

// 合并所有软件详细设计知识点
const allDetailedDesignKnowledge = [
    ...detailedDesignPart1,
    ...detailedDesignPart2,
    ...detailedDesignPart3,
    ...detailedDesignPart4,
    ...detailedDesignPart5
];

console.log(`软件详细设计导入脚本 - 所有知识点已合并，总计 ${allDetailedDesignKnowledge.length} 个知识点`);

// 软件详细设计知识点导入函数
function importDetailedDesign() {
    try {
        console.log('开始导入软件详细设计知识点...');
        
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
        
        // 检查是否已存在软件详细设计知识区
        const data = window.storageManager.getData();
        const baseIndex = data.knowledgeBases.findIndex(base => base.id === 'software_engineering_base');
        
        if (baseIndex === -1) {
            throw new Error('软件工程知识库未找到');
        }
        
        let detailedDesignArea = data.knowledgeBases[baseIndex].areas.find(area => area.id === 'detailed_design');
        const existingDetailedKnowledge = data.knowledge.filter(k => 
            k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'detailed_design'
        );
        
        if (detailedDesignArea && existingDetailedKnowledge.length > 0) {
            const confirmMessage = `⚠️ 软件详细设计知识区已存在！\n\n当前数据：\n• 知识区：${detailedDesignArea.name}\n• 知识点数量：${existingDetailedKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入软件详细设计知识点', 'info');
                } else {
                    alert('取消导入软件详细设计知识点');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有软件详细设计知识区数据');
            
            // 删除原有知识点
            data.knowledge = data.knowledge.filter(k => 
                !(k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'detailed_design')
            );
        } else {
            // 创建软件详细设计知识区
            detailedDesignArea = {
                id: 'detailed_design',
                name: '软件详细设计',
                description: '详细设计方法与实现技术',
                color: '#f759ab',
                knowledgePoints: []
            };
            
            data.knowledgeBases[baseIndex].areas.push(detailedDesignArea);
        }
        
        // 将知识点转换为标准格式
        const formattedKnowledge = allDetailedDesignKnowledge.map(item => ({
            ...item,
            category: '软件详细设计',
            areaId: 'detailed_design',
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
        
        console.log(`成功导入${validKnowledge.length}个软件详细设计知识点！`);
        
        // 显示成功通知
        const fillCount = validKnowledge.filter(k => k.type === 'fill').length;
        const choiceCount = validKnowledge.filter(k => k.type === 'choice').length;
        
        const successMessage = `✅ 软件详细设计知识点导入成功！\n\n📊 导入统计：\n- 知识区：软件详细设计\n- 填空题：${fillCount}个（概念类）\n- 选择题：${choiceCount}个（知识点+属性类）\n- 总计：${validKnowledge.length}个知识点\n\n📚 内容涵盖：\n• 详细设计基础与定位（12个知识点）\n• 设计方法与图表应用（12个知识点）\n• 持久化设计原理（15个知识点）\n• 面向过程设计方法（15个知识点）\n• 设计评审与质量保证（13个知识点）\n\n🎯 特色功能：\n• 所有选择题都精心设计了干扰项\n• 涵盖面向对象和面向过程两种方法\n• 完整覆盖5个软件详细设计文档内容\n• 从理论到实践的全面知识体系\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
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
        console.error('导入软件详细设计知识点失败:', error);
        const errorMessage = '❌ 导入软件详细设计知识点失败：' + error.message;
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
    }
}

// 将导入函数添加到全局作用域
window.importDetailedDesign = importDetailedDesign;
window.allDetailedDesignKnowledge = allDetailedDesignKnowledge;

// 导出所有部分数据供后续使用
window.detailedDesignPart1 = detailedDesignPart1;
window.detailedDesignPart2 = detailedDesignPart2;
window.detailedDesignPart3 = detailedDesignPart3;
window.detailedDesignPart4 = detailedDesignPart4;
window.detailedDesignPart5 = detailedDesignPart5;

console.log('软件详细设计知识库导入脚本已完全加载'); 