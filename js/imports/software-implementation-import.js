// 软件实现知识库导入脚本
// 从2个软件实现文档中解析出的完整知识点

// 第一部分：软件实现(1)的20个知识点
const softwareImplementationPart1 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_impl_001',
        type: 'fill',
        question: '软件实现的定义是什么？',
        answer: '根据软件设计模型编写目标系统的程序代码，并进行必要的测试和调试，最终将可运行代码部署到目标计算机上的过程。',
        explanation: '软件实现是将设计转化为可执行代码的关键阶段，包含编码、测试、调试和部署等活动。',
        tags: ['软件实现定义', '编码过程', '系统部署'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_impl_002',
        type: 'fill',
        question: '面向对象实现的特点是什么？',
        answer: '按照详细设计说明书要求，从各类代码库中挑选部件，遵循编程规范组装实现各模块功能的过程。',
        explanation: '面向对象实现强调部件复用和组装，体现了软件重用的思想。',
        tags: ['面向对象实现', '部件组装', '代码重用'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_impl_003',
        type: 'fill',
        question: '软件实现的主要任务包括哪些？',
        answer: '1. 编码实现功能模块\n2. 进行单元测试\n3. 调试修复缺陷\n4. 集成测试验证\n5. 部署运行系统',
        explanation: '软件实现任务涵盖从编码到部署的完整流程，确保系统的正确性和可用性。',
        tags: ['实现任务', '编码测试', '系统部署'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_004',
        type: 'fill',
        question: '代码编写原则包括哪些？',
        answer: '1. 易读性（清晰缩进和注释）\n2. 易维护性（模块化参数化）\n3. 异常处理（容错设计）\n4. 一致性（与设计文档同步）\n5. 低复杂度（避免嵌套过深）\n6. 可重用性（抽象公共方法）',
        explanation: '良好的编码原则确保代码的质量、可维护性和可扩展性。',
        tags: ['编码原则', '代码质量', '可维护性'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_impl_005',
        type: 'fill',
        question: '良好编码风格包括哪些要素？',
        answer: '1. 统一命名规范\n2. 适当代码注释\n3. 合理代码布局\n4. 避免冗余代码\n5. 结构化控制流程\n6. 单入口单出口',
        explanation: '编码风格规范提高代码的可读性和团队协作效率。',
        tags: ['编码风格', '命名规范', '代码布局'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_006',
        type: 'fill',
        question: '编码调试流程是什么？',
        answer: '编写代码→单元测试→定位缺陷→修复问题→集成测试',
        explanation: '编码调试流程确保代码质量，通过迭代优化实现系统功能。',
        tags: ['调试流程', '测试验证', '缺陷修复'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_impl_007',
        type: 'fill',
        question: 'IDE发展趋势包括哪些？',
        answer: '1. 功能服务化\n2. 架构云化\n3. 高度可定制\n4. 智能辅助',
        explanation: 'IDE向着更智能、更灵活、更协作的方向发展，提高开发效率。',
        tags: ['IDE趋势', '云化开发', '智能辅助'],
        difficulty: 3,
        score: 80
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_impl_008',
        type: 'choice',
        choiceType: 'multiple',
        question: '程序设计语言分类包括哪些？',
        options: [
            { key: 'A', text: '机器语言（二进制指令）' },
            { key: 'B', text: '汇编语言（助记符）' },
            { key: 'C', text: '高级语言（C/Java等）' },
            { key: 'D', text: '面向对象语言（Java/C++）' },
            { key: 'E', text: '描述性语言（Prolog）' },
            { key: 'F', text: '自然语言（英语/中文）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '程序设计语言分类基于抽象级别和编程范式，自然语言不是程序设计语言。',
        tags: ['语言分类', '编程语言', '抽象级别'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_impl_009',
        type: 'choice',
        choiceType: 'multiple',
        question: '语言选择因素包括哪些？',
        options: [
            { key: 'A', text: '应用领域需求' },
            { key: 'B', text: '遗留系统兼容' },
            { key: 'C', text: '特殊功能要求' },
            { key: 'D', text: '目标平台支持' },
            { key: 'E', text: '开发团队经验' },
            { key: 'F', text: '编程语言流行度排名（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '语言选择应基于项目需求和技术约束，流行度排名不是主要决策因素。',
        tags: ['语言选择', '技术决策', '项目需求'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_010',
        type: 'choice',
        choiceType: 'multiple',
        question: '主流IDE包括哪些？',
        options: [
            { key: 'A', text: 'Eclipse（Java开发）' },
            { key: 'B', text: 'Visual Studio（.NET）' },
            { key: 'C', text: 'IntelliJ IDEA（多语言）' },
            { key: 'D', text: 'PyCharm（Python）' },
            { key: 'E', text: 'VS Code（轻量级）' },
            { key: 'F', text: 'Microsoft Word（文档编辑）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '这些是主流的集成开发环境，Microsoft Word是文档编辑软件而非IDE。',
        tags: ['开发工具', 'IDE环境', '编程工具'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_impl_011',
        type: 'choice',
        choiceType: 'multiple',
        question: '代码重构场景包括哪些？',
        options: [
            { key: 'A', text: '重复代码' },
            { key: 'B', text: '过长函数' },
            { key: 'C', text: '复杂循环' },
            { key: 'D', text: '低内聚类' },
            { key: 'E', text: '过多参数' },
            { key: 'F', text: '注释太多（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '代码重构针对结构和逻辑问题，注释多通常是好事而非重构理由。',
        tags: ['代码重构', '代码优化', '结构改进'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_012',
        type: 'choice',
        choiceType: 'single',
        question: '实现过程示意图展示的核心内容是什么？',
        options: [
            { key: 'A', text: '展示编码-测试-调试的软件实现流程和各阶段关系' },
            { key: 'B', text: '展示项目管理的时间进度安排' },
            { key: 'C', text: '展示团队成员的角色分工' },
            { key: 'D', text: '展示用户需求的功能列表（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '实现过程示意图主要展示软件实现的技术流程和活动关系。',
        tags: ['实现流程', '流程图', '技术过程'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_impl_013',
        type: 'choice',
        choiceType: 'single',
        question: 'IDE发展历程图的价值是什么？',
        options: [
            { key: 'A', text: '展示主流IDE的演进时间线和技术发展趋势' },
            { key: 'B', text: '展示各个IDE的市场占有率统计' },
            { key: 'C', text: '展示IDE的安装使用教程' },
            { key: 'D', text: '展示程序员的薪资水平变化（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: 'IDE发展历程图展示开发工具的技术演进和发展规律。',
        tags: ['IDE发展', '技术演进', '工具历史'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_impl_014',
        type: 'choice',
        choiceType: 'single',
        question: '编程语言排名表的作用是什么？',
        options: [
            { key: 'A', text: '展示TIOBE和IEEE语言排行榜，反映编程语言的流行趋势' },
            { key: 'B', text: '确定项目必须使用的编程语言' },
            { key: 'C', text: '评估编程语言的技术优劣' },
            { key: 'D', text: '预测程序员的就业前景（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '编程语言排名表反映市场趋势，为技术选择提供参考。',
        tags: ['语言排名', '市场趋势', '技术参考'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_impl_015',
        type: 'choice',
        choiceType: 'multiple',
        question: '软件实现质量保证措施包括哪些？',
        options: [
            { key: 'A', text: '代码审查（同行评审）' },
            { key: 'B', text: '单元测试覆盖' },
            { key: 'C', text: '集成测试验证' },
            { key: 'D', text: '性能测试评估' },
            { key: 'E', text: '版本控制管理' },
            { key: 'F', text: '用户培训计划（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '质量保证措施关注代码和系统质量，用户培训不属于实现阶段的质量保证。',
        tags: ['质量保证', '测试验证', '代码审查'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_016',
        type: 'choice',
        choiceType: 'multiple',
        question: '编程规范的重要性体现在哪些方面？',
        options: [
            { key: 'A', text: '提高代码可读性' },
            { key: 'B', text: '降低维护成本' },
            { key: 'C', text: '促进团队协作' },
            { key: 'D', text: '减少代码缺陷' },
            { key: 'E', text: '支持代码重用' },
            { key: 'F', text: '增加程序运行速度（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '编程规范主要影响代码质量和开发效率，对运行速度的直接影响有限。',
        tags: ['编程规范', '代码质量', '团队协作'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_017',
        type: 'choice',
        choiceType: 'multiple',
        question: '软件实现阶段的输入包括哪些？',
        options: [
            { key: 'A', text: '详细设计文档' },
            { key: 'B', text: '编程规范标准' },
            { key: 'C', text: '开发环境配置' },
            { key: 'D', text: '第三方组件库' },
            { key: 'E', text: '测试用例设计' },
            { key: 'F', text: '用户操作手册（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '实现阶段的输入是技术相关的文档和资源，用户手册是实现的输出而非输入。',
        tags: ['实现输入', '技术文档', '开发资源'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_impl_018',
        type: 'choice',
        choiceType: 'multiple',
        question: '调试技术包括哪些方法？',
        options: [
            { key: 'A', text: '断点调试（设置断点观察）' },
            { key: 'B', text: '日志输出（记录执行信息）' },
            { key: 'C', text: '单步执行（逐行跟踪）' },
            { key: 'D', text: '变量监视（实时查看值）' },
            { key: 'E', text: '异常捕获（错误处理）' },
            { key: 'F', text: '代码重写（完全重构）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '调试技术用于定位和分析问题，代码重写是解决方案而非调试技术。',
        tags: ['调试技术', '问题定位', '错误分析'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_019',
        type: 'choice',
        choiceType: 'single',
        question: '软件实现与软件设计的关系是什么？',
        options: [
            { key: 'A', text: '实现是设计的具体化，将抽象的设计模型转换为可执行的代码' },
            { key: 'B', text: '实现完全独立于设计，可以忽略设计文档' },
            { key: 'C', text: '实现是设计的替代，可以边实现边设计' },
            { key: 'D', text: '实现主要关注用户界面，设计关注业务逻辑（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '软件实现是设计的具体化过程，需要严格按照设计文档进行编码实现。',
        tags: ['实现设计关系', '设计转换', '编码实现'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_impl_020',
        type: 'choice',
        choiceType: 'single',
        question: '软件部署的主要目的是什么？',
        options: [
            { key: 'A', text: '将开发完成的软件安装到目标环境中，使其能够正常运行' },
            { key: 'B', text: '对软件进行最终的功能测试' },
            { key: 'C', text: '编写软件的用户使用文档' },
            { key: 'D', text: '制定软件的市场推广策略（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '软件部署是实现阶段的最后环节，确保软件在目标环境中正确运行。',
        tags: ['软件部署', '系统安装', '环境配置'],
        difficulty: 2,
        score: 70
    }
];

console.log('软件实现导入脚本 - 第一部分已加载，包含20个知识点');

// 第二部分：软件实现(2)的18个知识点
const softwareImplementationPart2 = [
    // 概念类知识点 - 填空题
    {
        id: 'se_impl_021',
        type: 'fill',
        question: '编码实现任务分类包括哪些？',
        answer: '1. 编程类的代码（实现类、方法、关联等）\n2. 编程界面代码（UI元素、事件处理）\n3. 编程数据代码（数据库操作）\n4. 基于框架编写代码（Spring/JavaEE等）',
        explanation: '编码实现任务涵盖业务逻辑、用户界面、数据操作和框架应用等多个层面。',
        tags: ['编码分类', '任务类型', '实现层面'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_022',
        type: 'fill',
        question: '类代码实现步骤是什么？',
        answer: '1. 根据类图定义类结构（属性、方法）\n2. 实现类方法的具体逻辑\n3. 处理类间关联关系\n4. 实现聚合/组合关系\n5. 实现接口关系\n6. 实现继承关系\n7. 组织包结构',
        explanation: '类实现遵循从结构定义到关系处理的系统化步骤，确保面向对象设计的正确实现。',
        tags: ['类实现', '面向对象', '类关系'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_impl_023',
        type: 'fill',
        question: '界面代码实现要点包括哪些？',
        answer: '1. 定义界面元素（按钮、输入框等）\n2. 实现事件处理方法\n3. 处理界面跳转逻辑\n4. 数据绑定与展示',
        explanation: '界面实现需要处理用户交互、数据展示和页面导航等多个方面。',
        tags: ['界面实现', '用户交互', '事件处理'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_impl_024',
        type: 'fill',
        question: '数据库操作实现包括哪些？',
        answer: '1. 创建数据库表结构\n2. 实现CRUD操作\n3. 处理数据验证\n4. 管理数据库连接',
        explanation: '数据库操作实现涵盖数据结构定义、基本操作、验证和连接管理。',
        tags: ['数据库操作', 'CRUD操作', '数据验证'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_025',
        type: 'fill',
        question: 'JavaEE实现分层包括哪些？',
        answer: '1. 表示层（JSP/Thymeleaf）\n2. 控制层（Servlet/Spring MVC）\n3. 业务层（Service类）\n4. 数据访问层（JPA/Hibernate）\n5. 领域模型层（Entity类）',
        explanation: 'JavaEE分层架构确保关注点分离，提高系统的可维护性和扩展性。',
        tags: ['JavaEE分层', '分层架构', '关注点分离'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_impl_026',
        type: 'fill',
        question: '微服务实现要点包括哪些？',
        answer: '1. 服务注册与发现（Nacos）\n2. API网关配置（Spring Cloud Gateway）\n3. 服务间通信（RestTemplate）\n4. 配置中心管理',
        explanation: '微服务实现需要解决服务发现、通信、配置管理等分布式系统的核心问题。',
        tags: ['微服务实现', '分布式系统', '服务通信'],
        difficulty: 4,
        score: 90
    },
    {
        id: 'se_impl_027',
        type: 'fill',
        question: '用户指南编写要求包括哪些？',
        answer: '1. 统一使用Word工具\n2. 完整描述系统功能\n3. 术语统一规范\n4. 语言简洁准确\n5. 格式统一标准',
        explanation: '用户指南是软件实现的重要交付物，需要规范化的编写标准。',
        tags: ['用户指南', '文档编写', '规范标准'],
        difficulty: 2,
        score: 70
    },
    {
        id: 'se_impl_028',
        type: 'fill',
        question: '文档审核要点包括哪些？',
        answer: '1. 内容正确性评审\n2. 格式规范性检查\n3. 术语一致性验证\n4. 功能完整性确认',
        explanation: '文档审核确保交付文档的质量和规范性，支持后续维护和使用。',
        tags: ['文档审核', '质量控制', '规范检查'],
        difficulty: 3,
        score: 75
    },

    // 知识点+属性类型 - 选择题（添加干扰项）
    {
        id: 'se_impl_029',
        type: 'choice',
        choiceType: 'multiple',
        question: '类方法实现的关键要素包括哪些？',
        options: [
            { key: 'A', text: '方法签名定义（参数、返回值）' },
            { key: 'B', text: '算法逻辑实现' },
            { key: 'C', text: '异常处理机制' },
            { key: 'D', text: '性能优化考虑' },
            { key: 'E', text: '单元测试编写' },
            { key: 'F', text: '方法注释美化（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '方法实现需要考虑接口、逻辑、异常、性能和测试，注释美化不是核心要素。',
        tags: ['方法实现', '算法逻辑', '异常处理'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_030',
        type: 'choice',
        choiceType: 'multiple',
        question: '界面事件处理类型包括哪些？',
        options: [
            { key: 'A', text: '点击事件（按钮点击）' },
            { key: 'B', text: '输入事件（文本输入）' },
            { key: 'C', text: '选择事件（下拉选择）' },
            { key: 'D', text: '导航事件（页面跳转）' },
            { key: 'E', text: '生命周期事件（页面加载）' },
            { key: 'F', text: '网络延迟事件（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '界面事件处理涵盖用户交互和页面生命周期，网络延迟不是界面事件类型。',
        tags: ['事件处理', '用户交互', '界面逻辑'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_impl_031',
        type: 'choice',
        choiceType: 'multiple',
        question: '数据验证实现方式包括哪些？',
        options: [
            { key: 'A', text: '前端验证（即时反馈）' },
            { key: 'B', text: '后端验证（安全保障）' },
            { key: 'C', text: '数据库约束（完整性）' },
            { key: 'D', text: '业务规则验证（逻辑校验）' },
            { key: 'E', text: '格式验证（数据类型）' },
            { key: 'F', text: '用户满意度验证（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '数据验证从多个层面确保数据质量，用户满意度不是数据验证方式。',
        tags: ['数据验证', '完整性约束', '业务规则'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_032',
        type: 'choice',
        choiceType: 'multiple',
        question: 'Spring Cloud微服务组件包括哪些？',
        options: [
            { key: 'A', text: 'Eureka（服务注册发现）' },
            { key: 'B', text: 'Gateway（API网关）' },
            { key: 'C', text: 'Config（配置中心）' },
            { key: 'D', text: 'Feign（服务调用）' },
            { key: 'E', text: 'Hystrix（熔断器）' },
            { key: 'F', text: 'MySQL（数据库）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: 'Spring Cloud提供微服务治理组件，MySQL是数据库而非Spring Cloud组件。',
        tags: ['Spring Cloud', '微服务组件', '分布式架构'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_impl_033',
        type: 'choice',
        choiceType: 'single',
        question: '类图到代码映射示例的核心价值是什么？',
        options: [
            { key: 'A', text: '展示UML设计模型如何转换为JavaEE具体代码实现' },
            { key: 'B', text: '展示类图的绘制技巧和工具使用' },
            { key: 'C', text: '展示面向对象设计的理论知识' },
            { key: 'D', text: '展示项目管理的进度安排（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '类图到代码映射展示了设计模型向具体实现的转换过程。',
        tags: ['类图映射', '代码转换', '设计实现'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_034',
        type: 'choice',
        choiceType: 'single',
        question: '微服务架构图的实现指导作用是什么？',
        options: [
            { key: 'A', text: '展示Spring Cloud微服务组件关系，指导分布式系统实现' },
            { key: 'B', text: '展示服务器硬件的配置要求' },
            { key: 'C', text: '展示团队组织架构和人员分工' },
            { key: 'D', text: '展示软件的商业模式设计（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '微服务架构图为分布式系统的技术实现提供架构指导。',
        tags: ['微服务架构', '系统实现', '组件关系'],
        difficulty: 4,
        score: 85
    },
    {
        id: 'se_impl_035',
        type: 'choice',
        choiceType: 'single',
        question: '顺序图实现示例的价值是什么？',
        options: [
            { key: 'A', text: '展示服务间调用的具体实现逻辑和交互时序' },
            { key: 'B', text: '展示数据库表的设计结构' },
            { key: 'C', text: '展示用户界面的视觉设计' },
            { key: 'D', text: '展示软件测试的用例设计（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '顺序图实现示例指导服务间交互的具体编码实现。',
        tags: ['顺序图实现', '服务交互', '实现逻辑'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_036',
        type: 'choice',
        choiceType: 'multiple',
        question: '框架应用实现的优势包括哪些？',
        options: [
            { key: 'A', text: '提高开发效率（减少重复代码）' },
            { key: 'B', text: '保证代码质量（标准化实现）' },
            { key: 'C', text: '降低维护成本（统一架构）' },
            { key: 'D', text: '促进团队协作（共同标准）' },
            { key: 'E', text: '支持快速部署（容器化）' },
            { key: 'F', text: '减少服务器成本（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '框架应用主要提升开发和维护效率，对服务器成本的直接影响有限。',
        tags: ['框架优势', '开发效率', '代码质量'],
        difficulty: 3,
        score: 80
    },
    {
        id: 'se_impl_037',
        type: 'choice',
        choiceType: 'multiple',
        question: '实现文档的质量要求包括哪些？',
        options: [
            { key: 'A', text: '内容准确性（与实现一致）' },
            { key: 'B', text: '结构完整性（涵盖所有功能）' },
            { key: 'C', text: '语言规范性（术语统一）' },
            { key: 'D', text: '格式一致性（标准模板）' },
            { key: 'E', text: '可操作性（易于理解使用）' },
            { key: 'F', text: '页面美观性（视觉设计）（干扰项）' }
        ],
        correctAnswer: 'A,B,C,D,E',
        explanation: '实现文档质量关注内容和可用性，页面美观性不是主要质量要求。',
        tags: ['文档质量', '内容规范', '可操作性'],
        difficulty: 3,
        score: 75
    },
    {
        id: 'se_impl_038',
        type: 'choice',
        choiceType: 'single',
        question: '软件实现阶段的核心目标是什么？',
        options: [
            { key: 'A', text: '将设计模型转换为可运行的软件系统，确保功能正确性和性能要求' },
            { key: 'B', text: '完成用户需求的收集和分析工作' },
            { key: 'C', text: '制定详细的项目计划和时间安排' },
            { key: 'D', text: '进行市场调研和竞品分析（干扰项）' }
        ],
        correctAnswer: 'A',
        explanation: '软件实现的核心目标是将设计转化为可执行的软件系统。',
        tags: ['实现目标', '系统转换', '功能实现'],
        difficulty: 2,
        score: 70
    }
];

console.log('软件实现导入脚本 - 第二部分已加载，包含18个知识点');

// 合并所有软件实现知识点
const allSoftwareImplementationKnowledge = [
    ...softwareImplementationPart1,
    ...softwareImplementationPart2
];

console.log(`软件实现导入脚本 - 所有知识点已合并，总计 ${allSoftwareImplementationKnowledge.length} 个知识点`);

// 软件实现知识点导入函数
function importSoftwareImplementation() {
    try {
        console.log('开始导入软件实现知识点...');
        
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
        
        // 检查是否已存在软件实现知识区
        const data = window.storageManager.getData();
        const baseIndex = data.knowledgeBases.findIndex(base => base.id === 'software_engineering_base');
        
        if (baseIndex === -1) {
            throw new Error('软件工程知识库未找到');
        }
        
        let implementationArea = data.knowledgeBases[baseIndex].areas.find(area => area.id === 'software_implementation');
        const existingImplementationKnowledge = data.knowledge.filter(k => 
            k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'software_implementation'
        );
        
        if (implementationArea && existingImplementationKnowledge.length > 0) {
            const confirmMessage = `⚠️ 软件实现知识区已存在！\n\n当前数据：\n• 知识区：${implementationArea.name}\n• 知识点数量：${existingImplementationKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入软件实现知识点', 'info');
                } else {
                    alert('取消导入软件实现知识点');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有软件实现知识区数据');
            
            // 删除原有知识点
            data.knowledge = data.knowledge.filter(k => 
                !(k.knowledgeBaseId === 'software_engineering_base' && k.areaId === 'software_implementation')
            );
        } else {
            // 创建软件实现知识区
            implementationArea = {
                id: 'software_implementation',
                name: '软件实现',
                description: '编码实现技术与开发实践',
                color: '#52c41a',
                knowledgePoints: []
            };
            
            data.knowledgeBases[baseIndex].areas.push(implementationArea);
        }
        
        // 将知识点转换为标准格式
        const formattedKnowledge = allSoftwareImplementationKnowledge.map(item => ({
            ...item,
            category: '软件实现',
            areaId: 'software_implementation',
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
        
        console.log(`成功导入${validKnowledge.length}个软件实现知识点！`);
        
        // 显示成功通知
        const fillCount = validKnowledge.filter(k => k.type === 'fill').length;
        const choiceCount = validKnowledge.filter(k => k.type === 'choice').length;
        
        const successMessage = `✅ 软件实现知识点导入成功！\n\n📊 导入统计：\n- 知识区：软件实现\n- 填空题：${fillCount}个（概念类）\n- 选择题：${choiceCount}个（知识点+属性类）\n- 总计：${validKnowledge.length}个知识点\n\n📚 内容涵盖：\n• 软件实现基础与原则（20个知识点）\n• 编码实现技术与框架（18个知识点）\n\n🎯 特色功能：\n• 涵盖从基础概念到实际应用的完整知识体系\n• 包含面向对象、界面、数据库、微服务等实现技术\n• 所有选择题都精心设计了干扰项\n• 从编码规范到部署实施的全流程覆盖\n\n💡 技术要点：\n• 编程语言分类与选择\n• IDE工具与开发环境\n• 代码质量与重构技术\n• JavaEE分层架构实现\n• Spring Cloud微服务开发\n• 文档编写与质量保证\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
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
        console.error('导入软件实现知识点失败:', error);
        const errorMessage = '❌ 导入软件实现知识点失败：' + error.message;
        if (window.app && window.app.showNotification) {
            window.app.showNotification(errorMessage, 'error');
        } else {
            alert(errorMessage);
        }
    }
}

// 将导入函数添加到全局作用域
window.importSoftwareImplementation = importSoftwareImplementation;
window.allSoftwareImplementationKnowledge = allSoftwareImplementationKnowledge;

// 导出所有部分数据供后续使用
window.softwareImplementationPart1 = softwareImplementationPart1;
window.softwareImplementationPart2 = softwareImplementationPart2;

console.log('软件实现知识库导入脚本已完全加载'); 