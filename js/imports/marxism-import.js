// 马克思主义基本原理目录知识库导入脚本
const marxismKnowledge = {
    id: 'marxism_theory',
    name: '马原目录知识库',
    description: '马克思主义基本原理课程目录完整知识体系',
    icon: '📖',
    color: '#e74c3c',
    areas: [
        {
            id: 'area_introduction',
            name: '导论',
            description: '马克思主义基本概念、特征、价值和学习方法',
            color: '#e74c3c',
            knowledgePoints: [
                {
                    id: 'marx_intro_001',
                    type: 'fill',
                    question: '什么是马克思主义？',
                    answer: '马克思主义是由马克思和恩格斯创立的，为他们的后继者所发展的，以反对资本主义，建设社会主义和实现共产主义为目标的科学理论体系，是关于无产阶级和人类解放的科学。',
                    explanation: '这是马克思主义的基本定义，概括了其创立者、发展历程、目标和本质。',
                    tags: ['马克思主义', '基本概念', '定义'],
                    difficulty: 2,
                    score: 75
                },
                {
                    id: 'marx_intro_002',
                    type: 'fill',
                    question: '马克思主义的创立与发展经历了什么过程？',
                    answer: '马克思主义经历了从创立到发展的历史过程，在不同历史时期和不同国家的实践中不断丰富和发展，形成了完整的理论体系。',
                    explanation: '马克思主义不是一成不变的教条，而是在实践中不断发展的科学理论。',
                    tags: ['马克思主义', '发展历程', '理论建构'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_intro_003',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '马克思主义的基本特征包括哪些？',
                    options: [
                        { key: 'A', text: '科学性' },
                        { key: 'B', text: '人民性' },
                        { key: 'C', text: '时代性' },
                        { key: 'D', text: '发展性' },
                        { key: 'E', text: '权威性' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '马克思主义具有科学性、人民性、时代性、发展性四个基本特征，权威性不是其基本特征。',
                    tags: ['马克思主义', '基本特征'],
                    difficulty: 3,
                    score: 85
                },
                {
                    id: 'marx_intro_004',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '马克思主义的当代价值体现在哪些方面？',
                    options: [
                        { key: 'A', text: '观察当代世界变化的认识工具' },
                        { key: 'B', text: '指引当代中国发展的行动指南' },
                        { key: 'C', text: '引领人类社会进步的科学真理' },
                        { key: 'D', text: '维护西方价值观的理论武器' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '马克思主义的当代价值主要体现在认识工具、行动指南和科学真理三个方面，不是维护西方价值观的工具。',
                    tags: ['马克思主义', '当代价值'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_intro_005',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '自觉学习和运用马克思主义应该做到哪些？',
                    options: [
                        { key: 'A', text: '努力学习和掌握马克思主义的基本立场观点方法' },
                        { key: 'B', text: '努力学习和掌握马克思主义中国化时代化的理论成果' },
                        { key: 'C', text: '坚持理论联系实际的马克思主义学风' },
                        { key: 'D', text: '自觉将马克思主义内化于心、外化于行' },
                        { key: 'E', text: '完全照搬马克思主义经典著作的具体结论' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '学习马克思主义要掌握基本立场观点方法、理论成果，坚持理论联系实际，内化于心外化于行，而不是照搬具体结论。',
                    tags: ['马克思主义', '学习方法', '运用'],
                    difficulty: 4,
                    score: 90
                }
            ]
        },
        {
            id: 'area_chapter1',
            name: '第一章 世界的物质性及发展规律',
            description: '世界的物质统一性、事物的联系发展规律、唯物辩证法',
            color: '#3498db',
            knowledgePoints: [
                {
                    id: 'marx_ch1_001',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第一节 世界的多样性与物质统一性包括哪些内容？',
                    options: [
                        { key: 'A', text: '物质及其存在方式' },
                        { key: 'B', text: '物质与意识的辩证关系' },
                        { key: 'C', text: '世界的物质统一性' },
                        { key: 'D', text: '意识的能动作用机制' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '第一节主要包括物质及其存在方式、物质与意识的辩证关系、世界的物质统一性三个内容，意识的能动作用机制不属于本节内容。',
                    tags: ['第一章', '物质统一性', '章节内容'],
                    difficulty: 2,
                    score: 70
                },
                {
                    id: 'marx_ch1_002',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第二节 事物的普遍联系和变化发展包括哪些内容？',
                    options: [
                        { key: 'A', text: '联系和发展的普遍性' },
                        { key: 'B', text: '对立统一规律是事物发展的根本规律' },
                        { key: 'C', text: '量变质变规律和否定之否定规律' },
                        { key: 'D', text: '联系和发展的基本环节' },
                        { key: 'E', text: '物质与精神的对立统一' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '第二节包括联系和发展的普遍性、对立统一规律、量变质变规律和否定之否定规律、联系和发展的基本环节四个内容。',
                    tags: ['第一章', '联系发展', '章节内容'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_ch1_003',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第三节 唯物辩证法是认识世界和改造世界的根本方法包括哪些内容？',
                    options: [
                        { key: 'A', text: '唯物辩证法的本质特征和认识功能' },
                        { key: 'B', text: '学习唯物辩证法，不断增强思维能力' },
                        { key: 'C', text: '辩证法与形而上学的根本对立' },
                        { key: 'D', text: '实践在认识中的决定作用' }
                    ],
                    correctAnswer: 'A,B',
                    explanation: '第三节主要包括唯物辩证法的本质特征和认识功能、学习唯物辩证法不断增强思维能力两个内容。',
                    tags: ['第一章', '唯物辩证法', '章节内容'],
                    difficulty: 2,
                    score: 75
                }
            ]
        },
        {
            id: 'area_chapter2',
            name: '第二章 实践与认识及其发展规律',
            description: '实践与认识、真理与价值、认识世界和改造世界',
            color: '#27ae60',
            knowledgePoints: [
                {
                    id: 'marx_ch2_001',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第一节 实践与认识包括哪些内容？',
                    options: [
                        { key: 'A', text: '科学的实践观及其意义' },
                        { key: 'B', text: '实践的本质与基本结构' },
                        { key: 'C', text: '认识的本质与过程' },
                        { key: 'D', text: '实践认识的真理性及其规律' },
                        { key: 'E', text: '价值判断的主观性特征' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '第一节包括科学的实践观及其意义、实践的本质与基本结构、认识的本质与过程、实践认识的真理性及其规律四个内容。',
                    tags: ['第二章', '实践认识', '章节内容'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_ch2_002',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第二节 真理与价值包括哪些内容？',
                    options: [
                        { key: 'A', text: '真理的客观性、绝对性和相对性' },
                        { key: 'B', text: '真理的检验标准' },
                        { key: 'C', text: '真理与价值的辩证统一' },
                        { key: 'D', text: '认识的感性和理性阶段' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '第二节包括真理的客观性、绝对性和相对性、真理的检验标准、真理与价值的辩证统一三个内容。',
                    tags: ['第二章', '真理价值', '章节内容'],
                    difficulty: 2,
                    score: 75
                },
                {
                    id: 'marx_ch2_003',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第三节 认识世界和改造世界包括哪些内容？',
                    options: [
                        { key: 'A', text: '认识世界的根本目的在于改造世界' },
                        { key: 'B', text: '一切从实际出发，实事求是' },
                        { key: 'C', text: '坚持守正创新，实现理论创新和实践创新的良性互动' },
                        { key: 'D', text: '物质决定意识的基本原理' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '第三节包括认识世界的根本目的在于改造世界、一切从实际出发实事求是、坚持守正创新实现理论创新和实践创新的良性互动三个内容。',
                    tags: ['第二章', '认识改造', '章节内容'],
                    difficulty: 3,
                    score: 80
                }
            ]
        },
        {
            id: 'area_chapter3',
            name: '第三章 人类社会及其发展规律',
            description: '人类社会的存在与发展、社会历史发展的动力、人民群众在历史发展中的作用',
            color: '#f39c12',
            knowledgePoints: [
                {
                    id: 'marx_ch3_001',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第一节 人类社会的存在与发展包括哪些内容？',
                    options: [
                        { key: 'A', text: '社会存在与社会意识' },
                        { key: 'B', text: '社会基本矛盾及其运动规律' },
                        { key: 'C', text: '人类普遍交往与世界历史的形成发展' },
                        { key: 'D', text: '社会进步与社会形态更替' },
                        { key: 'E', text: '文明及其多样性' },
                        { key: 'F', text: '个人意识的独立性表现' }
                    ],
                    correctAnswer: 'A,B,C,D,E',
                    explanation: '第一节包括社会存在与社会意识、社会基本矛盾及其运动规律、人类普遍交往与世界历史的形成发展、社会进步与社会形态更替、文明及其多样性五个内容。',
                    tags: ['第三章', '社会存在发展', '章节内容'],
                    difficulty: 4,
                    score: 85
                },
                {
                    id: 'marx_ch3_002',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第二节 社会历史发展的动力包括哪些内容？',
                    options: [
                        { key: 'A', text: '社会基本矛盾在历史发展中的作用' },
                        { key: 'B', text: '阶级斗争、社会革命在社会发展中的作用' },
                        { key: 'C', text: '科学技术在社会发展中的作用' },
                        { key: 'D', text: '文化在社会发展中的作用' },
                        { key: 'E', text: '地理环境的决定性作用' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '第二节包括社会基本矛盾在历史发展中的作用、阶级斗争社会革命在社会发展中的作用、科学技术在社会发展中的作用、文化在社会发展中的作用四个内容。',
                    tags: ['第三章', '历史发展动力', '章节内容'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_ch3_003',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第三节 人民群众在历史发展中的作用包括哪些内容？',
                    options: [
                        { key: 'A', text: '人民群众是历史的创造者' },
                        { key: 'B', text: '个人在社会历史中的作用' },
                        { key: 'C', text: '群众、阶级、政党、领袖的关系' },
                        { key: 'D', text: '英雄史观的合理内核' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '第三节包括人民群众是历史的创造者、个人在社会历史中的作用、群众阶级政党领袖的关系三个内容。',
                    tags: ['第三章', '人民群众作用', '章节内容'],
                    difficulty: 2,
                    score: 75
                }
            ]
        },
        {
            id: 'area_chapter4',
            name: '第四章 资本主义的本质及规律',
            description: '商品经济和价值规律、资本主义经济制度、资本主义上层建筑',
            color: '#3498db',
            knowledgePoints: [
                {
                    id: 'marx_ch4_001',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第一节 商品经济和价值规律包括哪些内容？',
                    options: [
                        { key: 'A', text: '商品经济的形成和发展' },
                        { key: 'B', text: '价值规律及其作用' },
                        { key: 'C', text: '以私有制为基础的商品经济的基本矛盾' },
                        { key: 'D', text: '深刻认识马克思劳动价值论的当代价值' },
                        { key: 'E', text: '资本主义政治制度的本质' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '第一节包括商品经济的形成和发展、价值规律及其作用、以私有制为基础的商品经济的基本矛盾、深刻认识马克思劳动价值论的当代价值四个内容。',
                    tags: ['第四章', '商品经济', '价值规律'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_ch4_002',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第二节 资本主义经济制度包括哪些内容？',
                    options: [
                        { key: 'A', text: '资本主义经济制度的产生' },
                        { key: 'B', text: '劳动力成为商品与货币转化为资本' },
                        { key: 'C', text: '生产剩余价值是资本主义生产方式的绝对规律' },
                        { key: 'D', text: '资本主义的基本矛盾与经济危机' },
                        { key: 'E', text: '资本主义意识形态的本质' }
                    ],
                    correctAnswer: 'A,B,C,D',
                    explanation: '第二节包括资本主义经济制度的产生、劳动力成为商品与货币转化为资本、生产剩余价值是资本主义生产方式的绝对规律、资本主义的基本矛盾与经济危机四个内容。',
                    tags: ['第四章', '资本主义', '经济制度'],
                    difficulty: 4,
                    score: 85
                },
                {
                    id: 'marx_ch4_003',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第三节 资本主义上层建筑包括哪些内容？',
                    options: [
                        { key: 'A', text: '资本主义政治制度及其本质' },
                        { key: 'B', text: '资本主义意识形态及其本质' },
                        { key: 'C', text: '商品经济的形成和发展' },
                        { key: 'D', text: '劳动力成为商品的条件' }
                    ],
                    correctAnswer: 'A,B',
                    explanation: '第三节包括资本主义政治制度及其本质、资本主义意识形态及其本质两个内容。',
                    tags: ['第四章', '资本主义', '上层建筑'],
                    difficulty: 2,
                    score: 75
                }
            ]
        },
        {
            id: 'area_chapter5',
            name: '第五章 资本主义的发展及其趋势',
            description: '垄断资本主义的形成与发展、当代资本主义的新变化、资本主义的历史地位和发展趋势',
            color: '#e74c3c',
            knowledgePoints: [
                {
                    id: 'marx_ch5_001',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第一节 垄断资本主义的形成与发展包括哪些内容？',
                    options: [
                        { key: 'A', text: '资本主义从自由竞争到垄断' },
                        { key: 'B', text: '垄断资本主义的发展' },
                        { key: 'C', text: '经济全球化及其影响' },
                        { key: 'D', text: '社会主义从空想到科学' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '第一节包括资本主义从自由竞争到垄断、垄断资本主义的发展、经济全球化及其影响三个内容。',
                    tags: ['第五章', '垄断资本主义', '经济全球化'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_ch5_002',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第二节 正确认识当代资本主义的新变化包括哪些内容？',
                    options: [
                        { key: 'A', text: '第二次世界大战后资本主义的变化及其本质' },
                        { key: 'B', text: '当代资本主义变化的新特征' },
                        { key: 'C', text: '世界大变局下资本主义的矛盾与冲突' },
                        { key: 'D', text: '科学社会主义基本原则' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '第二节包括第二次世界大战后资本主义的变化及其本质、当代资本主义变化的新特征、世界大变局下资本主义的矛盾与冲突三个内容。',
                    tags: ['第五章', '当代资本主义', '新变化'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_ch5_003',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第三节 资本主义的历史地位和发展趋势包括哪些内容？',
                    options: [
                        { key: 'A', text: '资本主义的历史地位' },
                        { key: 'B', text: '资本主义向社会主义过渡的历史必然性' },
                        { key: 'C', text: '共产主义社会的基本特征' },
                        { key: 'D', text: '经济全球化的消极影响' }
                    ],
                    correctAnswer: 'A,B',
                    explanation: '第三节主要包括资本主义的历史地位一个内容（根据目录，此节内容相对简化）。',
                    tags: ['第五章', '资本主义', '历史地位'],
                    difficulty: 2,
                    score: 75
                }
            ]
        },
        {
            id: 'area_chapter6',
            name: '第六章 社会主义的发展及其规律',
            description: '社会主义五百年的历史进程、科学社会主义基本原则、现实社会主义的发展规律',
            color: '#27ae60',
            knowledgePoints: [
                {
                    id: 'marx_ch6_001',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第一节 社会主义五百年的历史进程包括哪些内容？',
                    options: [
                        { key: 'A', text: '社会主义从空想到科学' },
                        { key: 'B', text: '社会主义从理想到现实、从一国到多国的发展' },
                        { key: 'C', text: '社会主义在中国焕发出蓬勃生机' },
                        { key: 'D', text: '资本主义的基本矛盾' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '第一节包括社会主义从空想到科学、社会主义从理想到现实从一国到多国的发展、社会主义在中国焕发出蓬勃生机三个内容。',
                    tags: ['第六章', '社会主义', '历史进程'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_ch6_002',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第二节 科学社会主义基本原则包括哪些内容？',
                    options: [
                        { key: 'A', text: '科学社会主义基本原则的主要内容' },
                        { key: 'B', text: '正确把握科学社会主义基本原则' },
                        { key: 'C', text: '科学社会主义基本原则与中国特色社会主义' },
                        { key: 'D', text: '共产主义远大理想的实现' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '第二节包括科学社会主义基本原则的主要内容、正确把握科学社会主义基本原则、科学社会主义基本原则与中国特色社会主义三个内容。',
                    tags: ['第六章', '科学社会主义', '基本原则'],
                    difficulty: 3,
                    score: 80
                },
                {
                    id: 'marx_ch6_003',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第三节 在实践中探索现实社会主义的发展规律包括哪些内容？',
                    options: [
                        { key: 'A', text: '社会主义建设过程的长期性' },
                        { key: 'B', text: '社会主义发展道路的多样性' },
                        { key: 'C', text: '社会主义在实践中开拓前进' },
                        { key: 'D', text: '垄断资本主义的形成' }
                    ],
                    correctAnswer: 'A,B,C',
                    explanation: '第三节包括社会主义建设过程的长期性、社会主义发展道路的多样性、社会主义在实践中开拓前进三个内容。',
                    tags: ['第六章', '社会主义', '发展规律'],
                    difficulty: 3,
                    score: 80
                }
            ]
        },
        {
            id: 'area_chapter7',
            name: '第七章 共产主义崇高理想及其最终实现',
            description: '展望未来共产主义新社会、实现共产主义的历史必然性、共产主义远大理想与共同理想',
            color: '#f39c12',
            knowledgePoints: [
                {
                    id: 'marx_ch7_001',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第一节 展望未来共产主义新社会包括哪些内容？',
                    options: [
                        { key: 'A', text: '预见未来社会的方法论原则' },
                        { key: 'B', text: '共产主义社会的基本特征' },
                        { key: 'C', text: '社会主义建设过程的长期性' },
                        { key: 'D', text: '资本主义政治制度的本质' }
                    ],
                    correctAnswer: 'A,B',
                    explanation: '第一节包括预见未来社会的方法论原则、共产主义社会的基本特征两个内容。',
                    tags: ['第七章', '共产主义', '未来社会'],
                    difficulty: 2,
                    score: 75
                },
                {
                    id: 'marx_ch7_002',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第二节 实现共产主义是历史发展的必然趋势包括哪些内容？',
                    options: [
                        { key: 'A', text: '实现共产主义是历史发展的必然' },
                        { key: 'B', text: '实现共产主义是长期的历史过程' },
                        { key: 'C', text: '科学社会主义基本原则的主要内容' },
                        { key: 'D', text: '当代资本主义变化的新特征' }
                    ],
                    correctAnswer: 'A,B',
                    explanation: '第二节包括实现共产主义是历史发展的必然、实现共产主义是长期的历史过程两个内容。',
                    tags: ['第七章', '共产主义', '历史必然性'],
                    difficulty: 2,
                    score: 75
                },
                {
                    id: 'marx_ch7_003',
                    type: 'choice',
                    choiceType: 'multiple',
                    question: '第三节 共产主义远大理想与中国特色社会主义共同理想包括哪些内容？',
                    options: [
                        { key: 'A', text: '坚持远大理想与共同理想的辩证统一' },
                        { key: 'B', text: '坚定理想信念，投身新时代中国特色社会主义伟大事业' },
                        { key: 'C', text: '社会主义从空想到科学' },
                        { key: 'D', text: '经济全球化及其影响' }
                    ],
                    correctAnswer: 'A,B',
                    explanation: '第三节包括坚持远大理想与共同理想的辩证统一、坚定理想信念投身新时代中国特色社会主义伟大事业两个内容。',
                    tags: ['第七章', '共产主义', '理想信念'],
                    difficulty: 3,
                    score: 80
                }
            ]
        }
    ]
};

// 导入马原目录知识库的函数
function importMarxismKnowledge() {
    try {
        console.log('开始导入马原目录知识库...');
        
        // 检查是否已存在马原知识库
        const existingBases = window.storageManager.getAllKnowledgeBases();
        const existingBase = existingBases.find(base => base.id === 'marxism_theory_base');
        
        if (existingBase) {
            const existingKnowledge = window.storageManager.getKnowledgeByBaseId('marxism_theory_base');
            const confirmMessage = `⚠️ 马原目录知识库已存在！\n\n当前数据：\n• 知识库：${existingBase.name}\n• 知识点数量：${existingKnowledge.length}个\n\n是否要重新导入？\n（重新导入将覆盖现有数据）`;
            
            if (!confirm(confirmMessage)) {
                if (window.app && window.app.showNotification) {
                    window.app.showNotification('取消导入马原目录知识库', 'info');
                } else {
                    alert('取消导入马原目录知识库');
                }
                return;
            }
            
            console.log('用户确认重新导入，将覆盖现有马原目录知识库数据');
        }
        
        // 构建完整的知识库结构
        const completeKnowledgeBase = {
            ...marxismKnowledge,
            id: 'marxism_theory_base',  // 设置固定的知识库ID
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
            window.storageManager.deleteKnowledgeBase('marxism_theory_base');
            console.log('已删除原有马原目录知识库数据');
        }
        
        // 使用存储管理器添加知识库
        const result = window.storageManager.addKnowledgeBase(completeKnowledgeBase);
        
        if (!result) {
            throw new Error('添加马原目录知识库失败');
        }
        
        console.log('知识库添加成功:', result);
        
        // 获取现有数据并添加知识点
        const data = window.storageManager.getData();
        
        // 过滤掉原有的马原知识点（如果存在）
        const existingKnowledge = data.knowledge.filter(k => k.knowledgeBaseId !== completeKnowledgeBase.id);
        
        // 添加新的马原知识点
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
        
        console.log(`成功导入${validKnowledge.length}个马原目录知识点！`);
        
        // 显示成功消息
        const successMessage = `✅ 马原目录知识库${existingBase ? '重新' : ''}导入成功！\n\n包含${validKnowledge.length}个知识点：\n- 导论 (5个)\n- 第一章：世界的物质性及发展规律 (3个)\n- 第二章：实践与认识及其发展规律 (3个)\n- 第三章：人类社会及其发展规律 (3个)\n- 第四章：资本主义的本质及规律 (3个)\n- 第五章：资本主义的发展及其趋势 (3个)\n- 第六章：社会主义的发展及其规律 (3个)\n- 第七章：共产主义崇高理想及其最终实现 (3个)\n\n您现在可以在知识管理页面查看，或开始复习！`;
        
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
        console.error('导入马原目录知识点失败：', error);
        if (window.app && window.app.showNotification) {
            window.app.showNotification('导入失败：' + error.message, 'error');
        } else {
            alert('导入失败：' + error.message);
        }
    }
}

// 如果在浏览器环境中，提供全局函数
if (typeof window !== 'undefined') {
    window.importMarxismKnowledge = importMarxismKnowledge;
    window.marxismKnowledge = marxismKnowledge;
}

console.log('马原目录知识库导入脚本已加载（完整版：全部7章内容）'); 