// 软件概要设计知识库导入脚本
// 从4个软件概要设计文档中解析出的完整知识点

// 第一部分：软件概要设计(1)的19个知识点
const softwareDesignPart1 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_design_001',
        type: 'fill',
        question: '软件设计的定义是什么？',
        answer: '针对软件需求，综合考虑各种制约因素（时间/人力/技术平台等），探究软件实现的解决方案，形成模块结构、接口定义、算法设计等实现图纸。',
        explanation: '软件设计是将需求转化为实现方案的关键过程，需要综合考虑多种约束条件。',
        tags: ['软件设计定义', '设计过程', '实现方案'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_design_002',
        type: 'fill',
        question: '设计阶段划分包括哪些？',
        answer: '1. 体系结构设计（宏观模块划分）\n2. 详细设计（类/算法细化）\n3. 设计评审（质量验证）',
        explanation: '软件设计分为三个主要阶段，从宏观到微观，最后进行质量验证。',
        tags: ['设计阶段', '设计过程', '质量控制'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_design_003',
        type: 'fill',
        question: '抽象原则的内容是什么？',
        answer: '通过分层抽象（体系结构→类→算法）控制复杂度，避免过早陷入细节。',
        explanation: '抽象是软件设计的基本原则，通过分层的方式管理复杂度。',
        tags: ['抽象原则', '设计原则', '复杂度控制'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_004',
        type: 'fill',
        question: '模块化实施要点是什么？',
        answer: '分解为功能独立的模块（包/类/方法等）；通过接口组装模块；目标：高内聚低耦合。',
        explanation: '模块化是软件设计的核心思想，追求功能独立和接口清晰。',
        tags: ['模块化', '高内聚低耦合', '接口设计'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_005',
        type: 'fill',
        question: '架构设计关注点包括哪些？',
        answer: '模块职责分配；接口定义；交互协议；质量属性设计（可扩展性/可移植性等）。',
        explanation: '架构设计需要从多个维度考虑系统的整体结构和质量要求。',
        tags: ['架构设计', '模块职责', '质量属性'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_006',
        type: 'fill',
        question: '详细设计内容包括哪些？',
        answer: '类属性/方法设计；对象交互流程；算法实现；界面原型。',
        explanation: '详细设计是架构设计的细化，具体到类和算法层面的实现。',
        tags: ['详细设计', '类设计', '算法设计'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_007',
        type: 'fill',
        question: '评审参与方包括哪些？',
        answer: '程序员、测试工程师、用户代表、QA人员、架构师。',
        explanation: '设计评审需要多方参与，确保设计的全面性和质量。',
        tags: ['设计评审', '评审参与方', '质量保证'],
        difficulty: 2,
        score: 65
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_design_008',
        type: 'choice',
        choiceType: 'multiple',
        question: '设计核心要素包括哪些？',
        options: [
            { key: 'A', text: '模块功能与接口' },
            { key: 'B', text: '模块组织关系' },
            { key: 'C', text: '交互流程设计' },
            { key: 'D', text: '数据结构设计' },
            { key: 'E', text: '数据库设计' },
            { key: 'F', text: '人机交互设计' },
            { key: 'G', text: '营销策略设计（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F',
        explanation: '设计核心要素涵盖模块、交互、数据、数据库和人机界面等技术层面，不包括营销策略。',
        tags: ['设计要素', '核心内容', '设计范围'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_009',
        type: 'choice',
        choiceType: 'multiple',
        question: '高质量设计的标准包括哪些？',
        options: [
            { key: 'A', text: '正确性：无需求遗漏和逻辑冲突' },
            { key: 'B', text: '充分性：设计细化到可直接编码' },
            { key: 'C', text: '优化性：具备良好质量属性（可靠性/可维护性等）' },
            { key: 'D', text: '简单性：模块功能单一、关系直观' },
            { key: 'E', text: '复杂性：功能越复杂越好（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '高质量设计追求正确、充分、优化和简单，复杂性不是设计质量的标准。',
        tags: ['设计质量', '质量标准', '设计评估'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_010',
        type: 'choice',
        choiceType: 'multiple',
        question: '内聚度类型（从高到低）包括哪些？',
        options: [
            { key: 'A', text: '功能性内聚（最佳）' },
            { key: 'B', text: '顺序性内聚' },
            { key: 'C', text: '通信性内聚' },
            { key: 'D', text: '过程性内聚' },
            { key: 'E', text: '时间内聚' },
            { key: 'F', text: '逻辑性内聚' },
            { key: 'G', text: '偶然性内聚（最差）' },
            { key: 'H', text: '随机性内聚（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F,G',
        explanation: '内聚度分为7种类型，从功能性（最高）到偶然性（最低），随机性内聚不是标准分类。',
        tags: ['内聚度', '模块设计', '设计质量'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_011',
        type: 'choice',
        choiceType: 'multiple',
        question: '耦合度类型（从低到高）包括哪些？',
        options: [
            { key: 'A', text: '非直接耦合（最佳）' },
            { key: 'B', text: '数据耦合' },
            { key: 'C', text: '标记耦合' },
            { key: 'D', text: '控制耦合' },
            { key: 'E', text: '外部耦合' },
            { key: 'F', text: '公共耦合' },
            { key: 'G', text: '内容耦合（最差）' },
            { key: 'H', text: '接口耦合（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E,F,G',
        explanation: '耦合度分为7种类型，从非直接（最低）到内容（最高），接口耦合不是独立的耦合类型。',
        tags: ['耦合度', '模块关系', '设计质量'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_012',
        type: 'choice',
        choiceType: 'multiple',
        question: '评审检查项包括哪些？',
        options: [
            { key: 'A', text: '需求覆盖完整性' },
            { key: 'B', text: '技术可行性' },
            { key: 'C', text: '文档规范性' },
            { key: 'D', text: '设计一致性' },
            { key: 'E', text: '可维护性评估' },
            { key: 'F', text: '市场竞争力分析（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '设计评审关注技术和工程层面的检查项，市场竞争力分析属于产品管理范畴。',
        tags: ['设计评审', '评审内容', '质量检查'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_013',
        type: 'choice',
        choiceType: 'multiple',
        question: '常用设计工具包括哪些？',
        options: [
            { key: 'A', text: '建模工具：StarUML/Visual Paradigm' },
            { key: 'B', text: '版本管理：Git/GitLab' },
            { key: 'C', text: '文档工具：Microsoft Visio' },
            { key: 'D', text: '财务软件：Excel预算表（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '设计工具包括建模、版本管理和文档工具等技术支持工具，财务软件不属于设计工具。',
        tags: ['设计工具', '开发工具', '工具支持'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_design_014',
        type: 'choice',
        choiceType: 'single',
        question: '分层架构示意图的核心内容是什么？',
        options: [
            { key: 'A', text: '展示系统的分层体系结构风格，从表示层到数据层的组织方式' },
            { key: 'B', text: '展示项目的时间进度安排' },
            { key: 'C', text: '展示团队的组织架构' },
            { key: 'D', text: '展示产品的功能列表（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '分层架构示意图主要展示系统的技术架构分层，体现了设计的组织方式。',
        tags: ['分层架构', '架构图', '系统结构'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_015',
        type: 'choice',
        choiceType: 'single',
        question: '内聚耦合对比表的作用是什么？',
        options: [
            { key: 'A', text: '对比不同内聚性和耦合度类型的特点和质量水平' },
            { key: 'B', text: '对比不同编程语言的特性' },
            { key: 'C', text: '对比不同开发工具的功能' },
            { key: 'D', text: '对比不同项目的成本预算（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '内聚耦合对比表用于理解和评估模块设计质量的重要参考工具。',
        tags: ['内聚耦合', '设计质量', '对比分析'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_016',
        type: 'choice',
        choiceType: 'multiple',
        question: '软件设计的基本原则包括哪些？',
        options: [
            { key: 'A', text: '抽象原则（分层抽象控制复杂度）' },
            { key: 'B', text: '模块化（功能独立的模块组装）' },
            { key: 'C', text: '信息隐藏（封装实现细节）' },
            { key: 'D', text: '关注点分离（多视角开发）' },
            { key: 'E', text: '分而治之（分解复杂系统）' },
            { key: 'F', text: '完美主义（追求零缺陷）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '软件设计的基本原则注重工程方法和实用性，完美主义不是工程原则。',
        tags: ['设计原则', '基本原则', '工程方法'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_017',
        type: 'choice',
        choiceType: 'multiple',
        question: '模块化设计的优势包括哪些？',
        options: [
            { key: 'A', text: '提高代码复用性' },
            { key: 'B', text: '便于团队并行开发' },
            { key: 'C', text: '降低系统复杂度' },
            { key: 'D', text: '便于测试和维护' },
            { key: 'E', text: '减少开发成本' },
            { key: 'F', text: '增加代码行数（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '模块化带来多方面的工程优势，增加代码行数不是优势而是副作用。',
        tags: ['模块化优势', '工程效益', '开发效率'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_018',
        type: 'choice',
        choiceType: 'multiple',
        question: '设计文档的类型包括哪些？',
        options: [
            { key: 'A', text: '概要设计说明书' },
            { key: 'B', text: '详细设计说明书' },
            { key: 'C', text: '接口设计文档' },
            { key: 'D', text: '数据库设计文档' },
            { key: 'E', text: '用户培训手册（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '设计文档包括各种技术设计说明，用户培训手册属于产品文档而非设计文档。',
        tags: ['设计文档', '技术文档', '文档类型'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_design_019',
        type: 'choice',
        choiceType: 'single',
        question: '高内聚低耦合的目标是什么？',
        options: [
            { key: 'A', text: '提高模块内部功能相关性，降低模块间的依赖关系' },
            { key: 'B', text: '增加系统的复杂度和功能数量' },
            { key: 'C', text: '提高代码执行的性能速度' },
            { key: 'D', text: '减少项目开发的时间成本（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '高内聚低耦合是模块化设计的核心目标，追求功能聚合和依赖最小化。',
        tags: ['高内聚低耦合', '设计目标', '模块质量'],
        difficulty: 3,
        score: 75
    }
];

console.log('软件概要设计导入脚本 - 第一部分已加载，包含19个知识点');

// 第二部分：软件概要设计(2)的18个知识点
const softwareDesignPart2 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_design_020',
        type: 'fill',
        question: '软件体系结构设计的定义是什么？',
        answer: '针对软件需求，综合考虑功能需求、质量需求和开发约束，设计系统的顶层结构方案，包括模块划分、职责分配和协作关系。',
        explanation: '体系结构设计是软件设计的顶层活动，确定系统的整体组织方式。',
        tags: ['体系结构设计', '顶层设计', '系统架构'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_021',
        type: 'fill',
        question: '体系结构设计核心任务包括哪些？',
        answer: '1. 模块职责划分\n2. 协作关系定义\n3. 物理部署方案',
        explanation: '体系结构设计的三个核心任务涵盖了逻辑和物理两个层面的设计。',
        tags: ['核心任务', '模块划分', '协作关系'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_022',
        type: 'fill',
        question: '体系结构设计流程是什么？',
        answer: '1. 初步设计（选择架构风格）\n2. 软件资产重用（开源/遗留系统）\n3. 结构精化（子系统划分）\n4. 文档化与评审',
        explanation: '体系结构设计遵循从粗到细、从重用到创新的流程。',
        tags: ['设计流程', '架构风格', '重用'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_023',
        type: 'fill',
        question: '子系统划分原则是什么？',
        answer: '1. 用例相关性分组\n2. 业务处理职责聚合\n3. 实体类管理维度',
        explanation: '子系统划分需要从功能相关性和业务职责的角度进行合理分组。',
        tags: ['子系统划分', '用例分组', '职责聚合'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_024',
        type: 'fill',
        question: '构件设计要点是什么？',
        answer: '高内聚功能封装；接口标准化；规模小于子系统。',
        explanation: '构件是比子系统更小的设计单元，强调封装性和标准化。',
        tags: ['构件设计', '功能封装', '接口标准化'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_025',
        type: 'fill',
        question: '架构评审指标包括哪些？',
        answer: '1. 需求满足性（功能/质量）\n2. 设计优化度\n3. 扩展灵活性\n4. 需求可追踪性',
        explanation: '架构评审从多个维度评估设计质量和可行性。',
        tags: ['架构评审', '评审指标', '质量评估'],
        difficulty: 3,
        score: 80
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_design_026',
        type: 'choice',
        choiceType: 'multiple',
        question: '体系结构设计目标包括哪些？',
        options: [
            { key: 'A', text: '满足功能需求实现' },
            { key: 'B', text: '保障质量属性（可扩展/可伸缩/易维护等）' },
            { key: 'C', text: '适应开发约束条件' },
            { key: 'D', text: '降低硬件成本投入（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '体系结构设计关注功能实现、质量保障和约束适应，硬件成本不是主要设计目标。',
        tags: ['设计目标', '质量属性', '约束条件'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_027',
        type: 'choice',
        choiceType: 'multiple',
        question: '体系结构设计特点包括哪些？',
        options: [
            { key: 'A', text: '解决全局性技术问题' },
            { key: 'B', text: '多视角设计（逻辑/开发/部署/运行）' },
            { key: 'C', text: '战略层次决策' },
            { key: 'D', text: '详细代码实现（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '体系结构设计属于高层设计活动，不涉及详细的代码实现。',
        tags: ['设计特点', '全局视角', '战略决策'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_028',
        type: 'choice',
        choiceType: 'multiple',
        question: '常见架构风格包括哪些？',
        options: [
            { key: 'A', text: '管道/过滤器（数据流处理，组件可重组）' },
            { key: 'B', text: '层次风格（分层抽象，低耦合）' },
            { key: 'C', text: 'MVC/MVP/MVVM（职责分离，组件可复用）' },
            { key: 'D', text: 'SOA风格（服务化构件，支持异构互操作）' },
            { key: 'E', text: '消息总线（统一消息通道）' },
            { key: 'F', text: '单体应用（所有功能集成在一起）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '这些是经典的架构风格，单体应用是架构类型而非架构风格。',
        tags: ['架构风格', '设计模式', '系统组织'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_029',
        type: 'choice',
        choiceType: 'multiple',
        question: '管道/过滤器风格的适用场景包括哪些？',
        options: [
            { key: 'A', text: '编译器系统' },
            { key: 'B', text: '数据处理系统' },
            { key: 'C', text: '图像处理系统' },
            { key: 'D', text: '用户界面系统（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '管道/过滤器风格适用于数据流处理场景，用户界面系统更适合MVC等风格。',
        tags: ['管道过滤器', '适用场景', '数据流'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_030',
        type: 'choice',
        choiceType: 'multiple',
        question: 'SOA风格的适用场景包括哪些？',
        options: [
            { key: 'A', text: '云平台系统' },
            { key: 'B', text: '企业集成系统' },
            { key: 'C', text: '异构系统互操作' },
            { key: 'D', text: '嵌入式实时系统（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: 'SOA风格适用于分布式、异构环境，嵌入式实时系统通常使用其他架构风格。',
        tags: ['SOA风格', '云平台', '异构集成'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_031',
        type: 'choice',
        choiceType: 'multiple',
        question: '开源资源平台包括哪些？',
        options: [
            { key: 'A', text: 'GitHub（全球最大开源社区）' },
            { key: 'B', text: 'SourceForge（经典开源仓库）' },
            { key: 'C', text: 'Gitee（国内开源平台）' },
            { key: 'D', text: '讯飞开放平台（AI能力服务）' },
            { key: 'E', text: '微软Office官网（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '这些是主要的开源和开放平台，微软Office是商业软件平台。',
        tags: ['开源平台', '软件重用', '开发资源'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_design_032',
        type: 'choice',
        choiceType: 'multiple',
        question: '架构风格选择考虑因素包括哪些？',
        options: [
            { key: 'A', text: '系统功能特点' },
            { key: 'B', text: '质量属性要求' },
            { key: 'C', text: '技术约束条件' },
            { key: 'D', text: '团队技能水平' },
            { key: 'E', text: '项目预算规模' },
            { key: 'F', text: '客户个人喜好（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '架构风格选择需要考虑技术和项目因素，客户个人喜好不是技术决策依据。',
        tags: ['架构选择', '考虑因素', '技术决策'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_033',
        type: 'choice',
        choiceType: 'single',
        question: '体系结构设计示意图的主要内容是什么？',
        options: [
            { key: 'A', text: '展示软件体系结构设计的完整流程：初步设计→资产重用→结构精化→文档评审' },
            { key: 'B', text: '展示项目管理的时间进度计划' },
            { key: 'C', text: '展示团队成员的角色分工' },
            { key: 'D', text: '展示用户界面的页面布局（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '体系结构设计示意图主要展示架构设计的方法流程和各阶段关系。',
        tags: ['设计流程图', '架构方法', '流程展示'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_034',
        type: 'choice',
        choiceType: 'single',
        question: '空巢老人系统架构图的设计理念是什么？',
        options: [
            { key: 'A', text: '采用分层架构风格，从表示层、业务层到数据层的清晰分层设计' },
            { key: 'B', text: '采用单一模块设计，所有功能集中处理' },
            { key: 'C', text: '采用点对点通信模式，去中心化设计' },
            { key: 'D', text: '采用批处理模式，定时执行任务（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '空巢老人系统是分层架构设计的典型案例，体现了分层架构的设计思想。',
        tags: ['分层架构', '案例设计', '架构实例'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_035',
        type: 'choice',
        choiceType: 'multiple',
        question: '架构风格对比表的维度包括哪些？',
        options: [
            { key: 'A', text: '风格特点描述' },
            { key: 'B', text: '适用场景分析' },
            { key: 'C', text: '优缺点对比' },
            { key: 'D', text: '实现技术要求' },
            { key: 'E', text: '市场占有率统计（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '架构风格对比从技术角度分析各风格的特点、适用性和实现要求，不包括市场数据。',
        tags: ['架构对比', '风格分析', '技术评估'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_036',
        type: 'choice',
        choiceType: 'multiple',
        question: '软件资产重用的类型包括哪些？',
        options: [
            { key: 'A', text: '开源组件重用' },
            { key: 'B', text: '遗留系统集成' },
            { key: 'C', text: '第三方服务调用' },
            { key: 'D', text: '设计模式应用' },
            { key: 'E', text: '竞争对手代码复制（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '软件资产重用包括合法的开源、遗留系统、第三方服务和设计模式，不包括侵权复制。',
        tags: ['软件重用', '资产类型', '合法重用'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_037',
        type: 'choice',
        choiceType: 'single',
        question: '消息总线架构风格的核心特征是什么？',
        options: [
            { key: 'A', text: '提供统一的消息通道，支持异构系统间的消息传递和协调' },
            { key: 'B', text: '将所有数据存储在中央数据库中' },
            { key: 'C', text: '使用客户端-服务器直连模式' },
            { key: 'D', text: '采用同步调用机制处理所有请求（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '消息总线的核心是提供统一的消息传递机制，支持系统间的松耦合通信。',
        tags: ['消息总线', '架构特征', '异构通信'],
        difficulty: 3,
        score: 75
    }
];

console.log('软件概要设计导入脚本 - 第二部分已加载，包含18个知识点');

// 第三部分：软件概要设计(3)的17个知识点
const softwareDesignPart3 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_design_038',
        type: 'fill',
        question: '软件体系结构(Software Architecture)的本质是什么？',
        answer: '从高层抽象角度刻画组成软件系统的设计元素及它们之间的逻辑关联，体现系统的宏观结构和组织方式。',
        explanation: '软件体系结构强调高层抽象和宏观组织，是系统设计的顶层视图。',
        tags: ['软件体系结构', '高层抽象', '宏观结构'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_039',
        type: 'fill',
        question: '组件(Component)的特点是什么？',
        answer: '1. 可分离（独立部署）\n2. 可替换（接口兼容即可替换）\n3. 可配置（通过配置修改行为）\n4. 可复用（跨项目使用）',
        explanation: '组件的四个特点体现了模块化设计的核心理念：独立性、可替换性、可配置性和可复用性。',
        tags: ['组件特点', '模块化', '可复用性'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_040',
        type: 'fill',
        question: '包图(Package Diagram)的作用是什么？',
        answer: '1. 描述系统高层静态结构，管理大型模型\n2. 降低开发团队间干扰\n3. 用于子系统划分、访问控制、任务分配',
        explanation: '包图是UML中重要的结构图，用于大型系统的组织和管理。',
        tags: ['包图', 'UML', '系统组织'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_041',
        type: 'fill',
        question: '包依赖常见问题及解决方案是什么？',
        answer: '1. 循环依赖（解决方案：引入第三方包）\n2. 耦合过高（解决方案：接口隔离）',
        explanation: '包依赖设计中需要避免循环依赖和过度耦合，通过引入中间层和接口隔离来解决。',
        tags: ['包依赖', '循环依赖', '接口隔离'],
        difficulty: 4,
        score: 80
    },
    {
        id: 'se_design_042',
        type: 'fill',
        question: '数据流设计过程是什么？',
        answer: '精化DFD→识别流类型→映射结构→优化设计→导出接口→复查',
        explanation: '数据流设计是结构化设计方法的重要流程，从数据流图到程序结构的映射过程。',
        tags: ['数据流设计', '结构化设计', '设计流程'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_043',
        type: 'fill',
        question: '面向对象设计流程是什么？',
        answer: '需求模型→组件模型（包图+组件顺序图）→类模型（类图+状态图）',
        explanation: '面向对象设计遵循从需求到组件再到类的逐步细化过程。',
        tags: ['面向对象设计', '设计流程', '模型转换'],
        difficulty: 3,
        score: 80
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_design_044',
        type: 'choice',
        choiceType: 'multiple',
        question: '组件图(Component Diagram)的组成元素包括哪些？',
        options: [
            { key: 'A', text: '组件(Component)' },
            { key: 'B', text: '接口(Interface)' },
            { key: 'C', text: '端口(Port)' },
            { key: 'D', text: '参与者(Actor)（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '组件图包含组件、接口和端口三个主要元素，参与者属于用例图的元素。',
        tags: ['组件图', 'UML元素', '结构建模'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_045',
        type: 'choice',
        choiceType: 'multiple',
        question: '组件接口的类型包括哪些？',
        options: [
            { key: 'A', text: '供给接口(Provided Interface)' },
            { key: 'B', text: '需求接口(Required Interface)' },
            { key: 'C', text: '管理接口(Management Interface)（干扰项）' }
        ],
        correctAnswer: 'A,B',
        explanation: '组件接口分为供给接口（组件提供的服务）和需求接口（组件需要的服务），管理接口不是标准分类。',
        tags: ['组件接口', '接口类型', '服务定义'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_046',
        type: 'choice',
        choiceType: 'multiple',
        question: '结构图的类型包括哪些？',
        options: [
            { key: 'A', text: 'HIPO图（层次图+输入/处理/输出图）' },
            { key: 'B', text: '层次结构图（模块调用关系表示）' },
            { key: 'C', text: '变换型数据流映射（传入→变换→传出）' },
            { key: 'D', text: '事务型数据流映射（事务中心+动作分支）' },
            { key: 'E', text: '用例图（用户交互建模）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '这些都是面向过程的结构图类型，用例图属于面向对象的行为建模图。',
        tags: ['结构图', '面向过程', '数据流映射'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_047',
        type: 'choice',
        choiceType: 'multiple',
        question: 'UML图类型与用途的对应关系包括哪些？',
        options: [
            { key: 'A', text: '包图：系统静态结构（结构视角）' },
            { key: 'B', text: '组件图：构件依赖关系（结构视角）' },
            { key: 'C', text: '顺序图：对象间消息传递（行为视角）' },
            { key: 'D', text: '状态图：状态变迁（行为视角）' },
            { key: 'E', text: '部署图：物理环境部署（部署视角）' },
            { key: 'F', text: '数据流图：数据处理过程（行为视角）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: 'UML图分为结构、行为、部署等视角，数据流图属于结构化方法而非UML。',
        tags: ['UML图分类', '视角分类', '建模用途'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_048',
        type: 'choice',
        choiceType: 'multiple',
        question: '架构评审要点包括哪些？',
        options: [
            { key: 'A', text: '需求覆盖完整性' },
            { key: 'B', text: '接口定义完备性' },
            { key: 'C', text: '变更影响可控性' },
            { key: 'D', text: '代码实现正确性（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '架构评审关注高层设计的完整性、完备性和可控性，代码实现属于详细设计和编码阶段。',
        tags: ['架构评审', '评审要点', '设计质量'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_049',
        type: 'choice',
        choiceType: 'multiple',
        question: '软件体系结构的设计元素包括哪些？',
        options: [
            { key: 'A', text: '计算组件（处理数据的元素）' },
            { key: 'B', text: '连接件（组件间通信）' },
            { key: 'C', text: '约束（组件组装规则）' },
            { key: 'D', text: '用户界面样式（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '软件体系结构的设计元素包括计算组件、连接件和约束，用户界面样式属于界面设计层面。',
        tags: ['体系结构元素', '设计要素', '架构组成'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_050',
        type: 'choice',
        choiceType: 'multiple',
        question: '包图的元素包括哪些？',
        options: [
            { key: 'A', text: '包(Package)' },
            { key: 'B', text: '构成关系(Composition)' },
            { key: 'C', text: '依赖关系(Dependency)' },
            { key: 'D', text: '继承关系(Inheritance)（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '包图包含包、构成关系和依赖关系，继承关系主要出现在类图中。',
        tags: ['包图元素', '关系类型', 'UML建模'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_051',
        type: 'choice',
        choiceType: 'single',
        question: '包图示例（空巢老人系统分层架构图）展示的主要内容是什么？',
        options: [
            { key: 'A', text: '展示分层架构中各层的包组织和依赖关系' },
            { key: 'B', text: '展示数据库表之间的关系' },
            { key: 'C', text: '展示用户操作的业务流程' },
            { key: 'D', text: '展示系统的网络拓扑结构（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '包图示例主要展示分层架构中包的组织方式和层间依赖关系。',
        tags: ['包图示例', '分层架构', '依赖关系'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_052',
        type: 'choice',
        choiceType: 'single',
        question: '组件图示例（医疗共享系统组件依赖关系图）的核心作用是什么？',
        options: [
            { key: 'A', text: '展示系统中各组件的接口定义和依赖关系，评估变更影响范围' },
            { key: 'B', text: '展示数据流在系统中的传递路径' },
            { key: 'C', text: '展示用户的操作权限分配' },
            { key: 'D', text: '展示系统的性能监控指标（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '组件图的核心作用是展示组件间的依赖关系，帮助评估变更影响和制定设计规约。',
        tags: ['组件图示例', '依赖分析', '变更影响'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_053',
        type: 'choice',
        choiceType: 'single',
        question: '数据流映射图展示的内容是什么？',
        options: [
            { key: 'A', text: '变换型和事务型数据流到程序结构的映射关系' },
            { key: 'B', text: '对象之间的继承关系' },
            { key: 'C', text: '用户界面的页面跳转流程' },
            { key: 'D', text: '数据库的备份恢复策略（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '数据流映射图展示如何将数据流图中的数据流转换为程序的模块结构。',
        tags: ['数据流映射', '变换型', '事务型'],
        difficulty: 4,
        score: 80
    },
    {
        id: 'se_design_054',
        type: 'choice',
        choiceType: 'multiple',
        question: '面向对象与结构化方法的对比维度包括哪些？',
        options: [
            { key: 'A', text: '建模方法（对象模型 vs 功能模型）' },
            { key: 'B', text: '抽象机制（封装继承多态 vs 功能分解）' },
            { key: 'C', text: '设计原则（高内聚低耦合的实现方式）' },
            { key: 'D', text: '开发工具（IDE vs 文本编辑器）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '两种方法的对比主要在建模方法、抽象机制和设计原则等方法论层面，开发工具不是本质区别。',
        tags: ['方法对比', '面向对象', '结构化'],
        difficulty: 4,
        score: 85
    }
];

console.log('软件概要设计导入脚本 - 第三部分已加载，包含17个知识点');

// 第四部分：软件概要设计(4)的17个知识点
const softwareDesignPart4 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_design_055',
        type: 'fill',
        question: '软件体系结构风格的定义是什么？',
        answer: '描述某一特定应用领域中系统组织方式的惯用模式，反映领域中众多系统所共有的结构和语义特性，指导如何将模块和子系统组织成完整系统。',
        explanation: '架构风格是特定领域中系统组织的经验总结和模式抽象。',
        tags: ['架构风格定义', '系统组织', '惯用模式'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_056',
        type: 'fill',
        question: '设计模式的定义是什么？',
        answer: '以设计重用为目的，采用良定义的、正规的方式记录的软件设计经验，关注可能重复出现的设计问题并提供已验证的解决方案。',
        explanation: '设计模式是可复用的设计经验的规范化表达。',
        tags: ['设计模式定义', '设计重用', '解决方案'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_057',
        type: 'fill',
        question: '分层模式思想是什么？',
        answer: '将系统按抽象级别组织为若干层次，每层由抽象级别相同的构件组成。',
        explanation: '分层模式通过抽象级别的分层来组织系统结构。',
        tags: ['分层模式', '抽象层次', '系统组织'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_design_058',
        type: 'fill',
        question: '典型层次划分包括哪些？',
        answer: '1. 顶层：用户交互界面\n2. 中间层：业务处理\n3. 底层：基础技术服务',
        explanation: '典型的三层架构从用户界面到业务逻辑再到技术服务的分层。',
        tags: ['层次划分', '三层架构', '系统分层'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_design_059',
        type: 'fill',
        question: 'SOA核心要素包括哪些？',
        answer: '1. 服务注册中心（UDDI）\n2. 服务提供方\n3. 服务请求方\n4. 服务描述协议（WSDL）',
        explanation: 'SOA架构的四个核心要素构成了完整的服务化体系。',
        tags: ['SOA要素', 'UDDI', 'WSDL'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_060',
        type: 'fill',
        question: 'ESB特征包括哪些？',
        answer: '1. 协议转换（SOAP/HTTP等）\n2. 数据格式转换（XSLT）\n3. 消息路由（发布/订阅）\n4. 平台中立（支持异构系统）',
        explanation: 'ESB（企业服务总线）提供异构系统集成的核心能力。',
        tags: ['ESB特征', '协议转换', '异构集成'],
        difficulty: 4,
        score: 85
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_design_061',
        type: 'choice',
        choiceType: 'multiple',
        question: '分层模式特点包括哪些？',
        options: [
            { key: 'A', text: '松耦合（层次间接口明确）' },
            { key: 'B', text: '可替换（层次可独立替换）' },
            { key: 'C', text: '可复用（层次可跨系统重用）' },
            { key: 'D', text: '标准化（支持接口标准化）' },
            { key: 'E', text: '高性能（减少系统响应时间）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '分层模式的特点在于架构组织的优势，高性能不是分层模式的直接特点。',
        tags: ['分层特点', '架构优势', '系统组织'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_062',
        type: 'choice',
        choiceType: 'multiple',
        question: 'MVC/MVP/MVVM架构模式对比的维度包括哪些？',
        options: [
            { key: 'A', text: '入口点（Controller vs View）' },
            { key: 'B', text: '视图-模型关系（直接访问 vs 中介 vs 双向绑定）' },
            { key: 'C', text: '典型应用（SmallTalk vs WPF vs AngularJS）' },
            { key: 'D', text: '开发成本（项目预算对比）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '架构模式对比关注技术特征和应用场景，开发成本不是架构模式的核心对比维度。',
        tags: ['MVC对比', '架构模式', '技术特征'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_063',
        type: 'choice',
        choiceType: 'multiple',
        question: '管道过滤器组成包括哪些？',
        options: [
            { key: 'A', text: '过滤器（处理步骤封装）' },
            { key: 'B', text: '管道（数据流动通道）' },
            { key: 'C', text: '数据源/数据汇（起点/终点）' },
            { key: 'D', text: '控制器（流程控制）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '管道过滤器模式包含过滤器、管道和数据源汇，控制器不是此模式的标准组件。',
        tags: ['管道过滤器', '架构组件', '数据流'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_064',
        type: 'choice',
        choiceType: 'multiple',
        question: '过滤器类型包括哪些？',
        options: [
            { key: 'A', text: '主动过滤器（主动拉取数据）' },
            { key: 'B', text: '被动过滤器（等待数据推送）' },
            { key: 'C', text: '智能过滤器（AI驱动过滤）（干扰项）' }
        ],
        correctAnswer: 'A,B',
        explanation: '过滤器按工作方式分为主动和被动两种类型，智能过滤器不是标准分类。',
        tags: ['过滤器类型', '工作方式', '数据处理'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_065',
        type: 'choice',
        choiceType: 'multiple',
        question: '领域模型对比（贫血模型vs充血模型）的维度包括哪些？',
        options: [
            { key: 'A', text: '业务逻辑位置（Service层 vs Domain层）' },
            { key: 'B', text: '设计优点（易于理解 vs 高内聚）' },
            { key: 'C', text: '开发复杂度（简单 vs 复杂）' },
            { key: 'D', text: '运行性能（高性能 vs 低性能）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '领域模型对比关注设计特征和开发特点，运行性能不是两种模型的主要区别。',
        tags: ['领域模型', '贫血充血', '设计对比'],
        difficulty: 4,
        score: 80
    },
    {
        id: 'se_design_066',
        type: 'choice',
        choiceType: 'single',
        question: 'OSI七层模型展示的核心内容是什么？',
        options: [
            { key: 'A', text: '网络协议的分层结构，从物理层到应用层的标准化组织' },
            { key: 'B', text: '软件开发的生命周期阶段' },
            { key: 'C', text: '数据库的存储层次结构' },
            { key: 'D', text: '用户界面的设计层次（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: 'OSI七层模型是网络协议分层架构的经典案例，展示了分层设计的思想。',
        tags: ['OSI模型', '网络分层', '协议栈'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_067',
        type: 'choice',
        choiceType: 'single',
        question: '云计算三层架构的组成是什么？',
        options: [
            { key: 'A', text: 'SaaS（软件即服务）、PaaS（平台即服务）、IaaS（基础设施即服务）' },
            { key: 'B', text: '表示层、业务层、数据层' },
            { key: 'C', text: '用户层、应用层、系统层' },
            { key: 'D', text: '前端、中间件、后端（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '云计算三层架构是SaaS、PaaS、IaaS的服务化分层模式。',
        tags: ['云计算架构', 'SaaS', 'PaaS', 'IaaS'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_068',
        type: 'choice',
        choiceType: 'single',
        question: 'MVC交互流程图展示的核心流程是什么？',
        options: [
            { key: 'A', text: '用户输入→Controller处理→Model更新→View显示的数据流向' },
            { key: 'B', text: '需求分析→设计→编码→测试的开发流程' },
            { key: 'C', text: '数据采集→处理→存储→分析的数据流程' },
            { key: 'D', text: '登录→验证→授权→访问的安全流程（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: 'MVC交互流程图展示了Model-View-Controller之间的数据流和控制流。',
        tags: ['MVC流程', '交互模式', '数据流向'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_design_069',
        type: 'choice',
        choiceType: 'single',
        question: 'ESB架构图展示的核心理念是什么？',
        options: [
            { key: 'A', text: '企业服务总线作为中心枢纽，连接各个异构系统和服务' },
            { key: 'B', text: '数据库集群的负载均衡架构' },
            { key: 'C', text: '用户界面的组件化设计' },
            { key: 'D', text: '云存储的分布式架构（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: 'ESB架构图展示了企业服务总线在异构系统集成中的中心枢纽作用。',
        tags: ['ESB架构', '服务总线', '系统集成'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_design_070',
        type: 'choice',
        choiceType: 'multiple',
        question: '架构风格与设计模式的区别包括哪些？',
        options: [
            { key: 'A', text: '粒度层次（系统级 vs 类级）' },
            { key: 'B', text: '应用范围（特定领域 vs 通用问题）' },
            { key: 'C', text: '抽象程度（架构组织 vs 实现细节）' },
            { key: 'D', text: '开发工具（不同IDE支持）（干扰项）' }
        ],
        correctAnswer: 'A,B,C',
        explanation: '架构风格与设计模式在粒度、范围、抽象程度等方面有本质区别，开发工具支持不是核心区别。',
        tags: ['架构风格', '设计模式', '概念区别'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_design_071',
        type: 'choice',
        choiceType: 'multiple',
        question: '软件架构评估的关注点包括哪些？',
        options: [
            { key: 'A', text: '功能适合性（满足需求程度）' },
            { key: 'B', text: '质量属性（性能、可靠性等）' },
            { key: 'C', text: '技术风险（实现难度和风险）' },
            { key: 'D', text: '经济效益（成本收益分析）' },
            { key: 'E', text: '团队满意度（开发人员喜好）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D',
        explanation: '架构评估关注技术和商业层面的客观指标，团队满意度不是架构评估的主要关注点。',
        tags: ['架构评估', '评估维度', '质量属性'],
        difficulty: 4,
        score: 85
    }
];

console.log('软件概要设计导入脚本 - 第四部分已加载，包含17个知识点');

// 合并所有软件概要设计知识点
const allSoftwareDesignKnowledge = [
    ...softwareDesignPart1,
    ...softwareDesignPart2,
    ...softwareDesignPart3,
    ...softwareDesignPart4
];

console.log(`软件概要设计导入脚本 - 所有知识点已合并，总计 ${allSoftwareDesignKnowledge.length} 个知识点`);

// 软件概要设计知识点导入函数
function importSoftwareDesign() {
    try {
        console.log('开始导入软件概要设计知识点...');
        
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
        
        // 检查是否已存在软件概要设计知识区
        const data = window.storageManager.getData();
        const baseIndex = data.knowledgeBases.findIndex(base => base.id === 'software_engineering_base');
        
        if (baseIndex === -1) {
            throw new Error('软件工程知识库未找到');
        }
        
        let designArea = data.knowledgeBases[baseIndex].areas.find(area => area.id === 'software_design');
        const existingDesignKnowledge = data.knowledge.filter(k => 
            k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'software_design'
        );
        
        if (designArea && existingDesignKnowledge.length > 0) {
            const confirmMessage = `⚠️ 软件概要设计知识区已存在！\n\n当前数据：\n• 知识区：${designArea.name}\n• 知识点数量：${existingDesignKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入软件概要设计知识点', 'info');
                } else {
                    alert('取消导入软件概要设计知识点');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有软件概要设计知识区数据');
            
            // 删除原有知识点
            data.knowledge = data.knowledge.filter(k => 
                !(k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'software_design')
            );
        } else {
            // 创建软件概要设计知识区
            designArea = {
                id: 'software_design',
                name: '软件概要设计',
                description: '软件体系结构设计与建模方法',
                color: '#13c2c2',
                knowledgePoints: []
            };
            
            data.knowledgeBases[baseIndex].areas.push(designArea);
        }
        
        // 将知识点转换为标准格式
        const formattedKnowledge = allSoftwareDesignKnowledge.map(item => ({
            ...item,
            category: '软件概要设计',
            areaId: 'software_design',
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
        
        console.log(`成功导入${validKnowledge.length}个软件概要设计知识点！`);
        
        // 显示成功通知
        const fillCount = validKnowledge.filter(k => k.type === 'fill').length;
        const choiceCount = validKnowledge.filter(k => k.type === 'choice').length;
        
        const successMessage = `✅ 软件概要设计知识点导入成功！\n\n📊 导入统计：\n- 知识区：软件概要设计\n- 填空题：${fillCount}个（概念类）\n- 选择题：${choiceCount}个（知识点+属性类）\n- 总计：${validKnowledge.length}个知识点\n\n📚 内容涵盖：\n• 软件设计基础与原则（19个知识点）\n• 体系结构设计方法（18个知识点）\n• 面向对象与UML建模（17个知识点）\n• 架构风格与设计模式（17个知识点）\n\n🎯 特色功能：\n• 所有选择题都精心设计了干扰项\n• 支持多选题（最多9个选项）\n• 完整覆盖4个软件概要设计文档内容\n• 涵盖设计理论、方法和实践\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
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
        console.error('导入软件概要设计知识点失败:', error);
        const errorMessage = '❌ 导入软件概要设计知识点失败：' + error.message;
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
    }
}

// 将导入函数添加到全局作用域
window.importSoftwareDesign = importSoftwareDesign;
window.allSoftwareDesignKnowledge = allSoftwareDesignKnowledge;

// 导出所有部分数据供后续使用
window.softwareDesignPart1 = softwareDesignPart1;
window.softwareDesignPart2 = softwareDesignPart2;
window.softwareDesignPart3 = softwareDesignPart3;
window.softwareDesignPart4 = softwareDesignPart4;

console.log('软件概要设计知识库导入脚本已完全加载'); 