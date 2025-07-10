-- ====================================================================
-- Memorin 智能知识复习系统 - 种子数据脚本
-- 版本: v2.0 - 模块化设计
-- 用途: 提供系统初始化数据和演示数据
-- 创建时间: 2025-01-08
-- ====================================================================

USE memorin_db;

-- 禁用外键检查（插入数据时）
SET FOREIGN_KEY_CHECKS = 0;

-- ====================================================================
-- 1. 用户认证模块种子数据
-- ====================================================================

-- 1.1 创建系统管理员用户
INSERT INTO users (id, username, email, password_hash, status) VALUES 
(1, 'admin', 'admin@memorin.com', '$2b$12$dummyHashForAdmin123456789', 'active'),
(2, 'demo_teacher', 'teacher@demo.com', '$2b$12$dummyHashForTeacher123456', 'active'),
(3, 'demo_student1', 'student1@demo.com', '$2b$12$dummyHashForStudent123456', 'active'),
(4, 'demo_student2', 'student2@demo.com', '$2b$12$dummyHashForStudent223456', 'active'),
(5, 'system', 'system@memorin.com', '$2b$12$dummyHashForSystem1234567', 'active');

-- 1.2 用户扩展信息
INSERT INTO user_profiles (user_id, nickname, avatar_url, bio, timezone, language) VALUES 
(1, '系统管理员', '/avatars/admin.jpg', 'Memorin系统管理员', 'Asia/Shanghai', 'zh-CN'),
(2, '演示教师', '/avatars/teacher.jpg', '计算机科学专业教师，专注软件工程教学', 'Asia/Shanghai', 'zh-CN'),
(3, '学生甲', '/avatars/student1.jpg', '计算机科学专业本科生', 'Asia/Shanghai', 'zh-CN'),
(4, '学生乙', '/avatars/student2.jpg', '软件工程专业研究生', 'Asia/Shanghai', 'zh-CN'),
(5, '系统用户', '/avatars/system.jpg', '系统内置用户，用于官方内容', 'Asia/Shanghai', 'zh-CN');

-- 1.3 用户设置
INSERT INTO user_settings (user_id, theme, daily_review_goal, difficulty_preference) VALUES 
(1, 'auto', 50, 4),
(2, 'light', 30, 3),
(3, 'dark', 20, 2),
(4, 'auto', 25, 3),
(5, 'light', 0, 3);

-- ====================================================================
-- 2. 知识库管理模块种子数据
-- ====================================================================

-- 2.1 创建官方知识库
INSERT INTO knowledge_bases (id, owner_id, name, visibility, is_official, status) VALUES 
(1, 5, '软件工程基础', 'public', TRUE, 'active'),
(2, 5, '数据结构与算法', 'public', TRUE, 'active'),
(3, 5, '计算机网络', 'public', TRUE, 'active'),
(4, 2, '面向对象程序设计', 'public', FALSE, 'active'),
(5, 2, '软件测试实践', 'shared', FALSE, 'active');

-- 2.2 知识库元数据
INSERT INTO knowledge_base_metadata (knowledge_base_id, description, icon, color, category, tags, difficulty_level, estimated_time_hours, learning_objectives, license) VALUES 
(1, '涵盖软件工程的基本概念、开发方法、项目管理等核心内容', '🛠️', '#2196F3', '计算机科学', '["软件工程", "开发方法", "项目管理"]', 3.2, 40, '["理解软件工程基本概念", "掌握软件开发生命周期", "学会项目管理基础"]', 'CC BY-SA 4.0'),
(2, '数据结构的基本概念和常用算法的实现与分析', '🔢', '#4CAF50', '计算机科学', '["数据结构", "算法", "编程"]', 3.8, 60, '["掌握基本数据结构", "理解算法复杂度", "能够实现常用算法"]', 'CC BY-SA 4.0'),
(3, '计算机网络的基本原理、协议和网络编程', '🌐', '#FF9800', '计算机科学', '["网络", "协议", "通信"]', 3.5, 50, '["理解网络基本原理", "掌握TCP/IP协议", "学会网络编程"]', 'CC BY-SA 4.0'),
(4, '面向对象编程思想和Java语言实践', '☕', '#795548', '编程语言', '["面向对象", "Java", "编程"]', 3.0, 45, '["掌握面向对象思想", "熟练使用Java", "能够设计面向对象程序"]', 'CC BY-NC 4.0'),
(5, '软件测试的理论、方法和工具使用', '🧪', '#9C27B0', '软件质量', '["测试", "质量保证", "工具"]', 3.3, 35, '["理解测试理论", "掌握测试方法", "熟练使用测试工具"]', 'CC BY-NC 4.0');

-- 2.3 创建知识区
INSERT INTO knowledge_areas (id, creator_id, name, parent_area_id, level, sort_order) VALUES 
(1, 5, '软件工程概论', NULL, 1, 1),
(2, 5, '需求分析', 1, 2, 1),
(3, 5, '系统设计', 1, 2, 2),
(4, 5, '编码实现', 1, 2, 3),
(5, 5, '软件测试', 1, 2, 4),
(6, 5, '项目管理', 1, 2, 5),
(7, 5, '数据结构基础', NULL, 1, 2),
(8, 5, '线性结构', 7, 2, 1),
(9, 5, '树形结构', 7, 2, 2),
(10, 5, '图形结构', 7, 2, 3);

-- 2.4 知识区元数据
INSERT INTO knowledge_area_metadata (knowledge_area_id, description, color, icon, category, tags) VALUES 
(1, '软件工程的基本概念和原理', '#2196F3', '📚', '理论基础', '["概念", "原理"]'),
(2, '软件需求的分析和管理', '#4CAF50', '📝', '需求工程', '["需求分析", "需求管理"]'),
(3, '软件系统的架构和详细设计', '#FF9800', '🏗️', '设计方法', '["架构设计", "详细设计"]'),
(4, '软件的编码和实现技术', '#9C27B0', '💻', '实现技术', '["编码", "实现"]'),
(5, '软件测试的方法和技术', '#F44336', '🧪', '质量保证', '["测试方法", "质量控制"]'),
(6, '软件项目的管理和控制', '#607D8B', '📊', '项目管理', '["项目控制", "团队管理"]'),
(7, '数据结构的基本概念', '#3F51B5', '🔢', '基础理论', '["数据结构", "抽象数据类型"]'),
(8, '数组、链表、栈、队列等线性结构', '#009688', '📏', '线性结构', '["数组", "链表", "栈", "队列"]'),
(9, '二叉树、平衡树、堆等树形结构', '#8BC34A', '🌳', '树形结构', '["二叉树", "平衡树", "堆"]'),
(10, '图的表示、遍历和应用', '#CDDC39', '🕸️', '图形结构', '["图", "遍历", "最短路径"]');

-- ====================================================================
-- 3. 知识点内容模块种子数据
-- ====================================================================

-- 3.1 创建知识点内容（填空题）
INSERT INTO knowledge_point_contents (id, content_hash, type, question, answer, explanation, created_by, is_public) VALUES 
(1, SHA2('什么是软件工程？软件工程是一门运用计算机科学理论和技术以及工程管理原则和方法，按照工程化的原则和方法来指导软件开发和维护的学科。', 256), 'fill', '什么是软件工程？', '软件工程是一门运用计算机科学理论和技术以及工程管理原则和方法，按照工程化的原则和方法来指导软件开发和维护的学科。', '软件工程强调系统性、规范性和可度量性，是解决软件危机的重要途径。', 5, TRUE),

(2, SHA2('软件开发生命周期包括哪些阶段？软件开发生命周期包括需求分析、系统设计、编码实现、软件测试、部署运维等阶段。', 256), 'fill', '软件开发生命周期包括哪些阶段？', '软件开发生命周期包括需求分析、系统设计、编码实现、软件测试、部署运维等阶段。', '这些阶段可以采用不同的开发模型来组织，如瀑布模型、迭代模型、敏捷模型等。', 5, TRUE),

(3, SHA2('什么是需求分析？需求分析是确定系统必须具备的功能和性能的过程，包括功能需求和非功能需求的识别、分析和文档化。', 256), 'fill', '什么是需求分析？', '需求分析是确定系统必须具备的功能和性能的过程，包括功能需求和非功能需求的识别、分析和文档化。', '需求分析是软件开发的基础，直接影响后续设计和实现的质量。', 5, TRUE),

(4, SHA2('数组的特点是什么？数组是一种线性数据结构，具有随机访问、内存连续、类型相同等特点。', 256), 'fill', '数组的特点是什么？', '数组是一种线性数据结构，具有随机访问、内存连续、类型相同等特点。', '数组支持O(1)时间复杂度的随机访问，但插入和删除操作可能需要O(n)时间。', 5, TRUE),

(5, SHA2('什么是栈？栈是一种后进先出（LIFO）的线性数据结构，只能在栈顶进行插入和删除操作。', 256), 'fill', '什么是栈？', '栈是一种后进先出（LIFO）的线性数据结构，只能在栈顶进行插入和删除操作。', '栈的主要操作包括push（入栈）、pop（出栈）、top（查看栈顶元素）等。', 5, TRUE);

-- 3.2 创建选择题内容
INSERT INTO knowledge_point_contents (id, content_hash, type, question, answer, explanation, created_by, is_public) VALUES 
(6, SHA2('下列哪个不是软件工程的基本原则？A', 256), 'choice', '下列哪个不是软件工程的基本原则？', 'A', '软件工程的基本原则包括分阶段开发、严格管理、明确责任、产品标准化等，但不包括降低成本优先。', 5, TRUE),

(7, SHA2('瀑布模型的主要特点是什么？B', 256), 'choice', '瀑布模型的主要特点是什么？', 'B', '瀑布模型是一种线性顺序的软件开发模型，各阶段依次进行，前一阶段完成后才能进入下一阶段。', 5, TRUE),

(8, SHA2('二叉树的遍历方式有几种？C', 256), 'choice', '二叉树的遍历方式有几种？', 'C', '二叉树有三种基本的遍历方式：前序遍历、中序遍历、后序遍历。', 5, TRUE);

-- 3.3 知识点元数据
INSERT INTO knowledge_point_metadata (content_id, difficulty, estimated_time, score, tags, cognitive_level, learning_objective) VALUES 
(1, 2, 90, 2.0, '["软件工程", "基础概念"]', 'understand', '理解软件工程的基本定义和目标'),
(2, 3, 120, 3.0, '["生命周期", "开发过程"]', 'remember', '掌握软件开发生命周期的各个阶段'),
(3, 3, 100, 2.5, '["需求分析", "系统分析"]', 'understand', '理解需求分析的重要性和基本方法'),
(4, 2, 80, 2.0, '["数组", "数据结构"]', 'understand', '掌握数组的基本特点和使用场景'),
(5, 2, 75, 2.0, '["栈", "LIFO"]', 'remember', '理解栈的基本概念和操作'),
(6, 3, 90, 3.0, '["软件工程", "原则"]', 'analyze', '分析软件工程的基本原则'),
(7, 3, 85, 2.5, '["瀑布模型", "开发模型"]', 'understand', '理解瀑布模型的特点和适用场景'),
(8, 2, 70, 2.0, '["二叉树", "遍历"]', 'remember', '掌握二叉树的基本遍历方法');

-- 3.4 选择题选项
INSERT INTO knowledge_point_choice_options (content_id, choice_type, option_key, option_text, is_correct, sort_order) VALUES 
(6, 'single', 'A', '降低成本优先', TRUE, 1),
(6, 'single', 'B', '分阶段开发', FALSE, 2),
(6, 'single', 'C', '严格管理', FALSE, 3),
(6, 'single', 'D', '产品标准化', FALSE, 4),

(7, 'single', 'A', '可以随时回到前面的阶段', FALSE, 1),
(7, 'single', 'B', '各阶段依次进行，不可逆转', TRUE, 2),
(7, 'single', 'C', '支持并行开发', FALSE, 3),
(7, 'single', 'D', '适合需求变化频繁的项目', FALSE, 4),

(8, 'single', 'A', '1种', FALSE, 1),
(8, 'single', 'B', '2种', FALSE, 2),
(8, 'single', 'C', '3种', TRUE, 3),
(8, 'single', 'D', '4种', FALSE, 4);

-- ====================================================================
-- 4. 关联关系模块种子数据
-- ====================================================================

-- 4.1 知识库-内容关联
INSERT INTO knowledge_base_content_relations (knowledge_base_id, content_id, category, chapter, sort_order, added_by) VALUES 
(1, 1, '基础概念', '第1章 软件工程概述', 1, 5),
(1, 2, '开发过程', '第2章 软件开发过程', 2, 5),
(1, 3, '需求工程', '第3章 需求分析', 3, 5),
(1, 6, '基础概念', '第1章 软件工程概述', 4, 5),
(1, 7, '开发模型', '第2章 软件开发过程', 5, 5),

(2, 4, '线性结构', '第1章 基本数据结构', 1, 5),
(2, 5, '线性结构', '第1章 基本数据结构', 2, 5),
(2, 8, '树形结构', '第2章 树和图', 3, 5);

-- 4.2 知识区-内容关联
INSERT INTO knowledge_area_content_relations (knowledge_area_id, content_id, relevance_score, is_primary, relationship_type, added_by) VALUES 
(1, 1, 1.0, TRUE, 'contains', 5),
(1, 6, 0.9, TRUE, 'contains', 5),
(2, 3, 1.0, TRUE, 'contains', 5),
(3, 7, 0.8, FALSE, 'relates', 5),
(7, 4, 1.0, TRUE, 'contains', 5),
(8, 4, 1.0, TRUE, 'contains', 5),
(8, 5, 1.0, TRUE, 'contains', 5),
(9, 8, 1.0, TRUE, 'contains', 5);

-- ====================================================================
-- 5. 用户学习状态模块种子数据
-- ====================================================================

-- 5.1 用户知识点状态（演示用户的学习数据）
INSERT INTO user_knowledge_point_states (user_id, content_id, mastery_level, review_count, correct_count, consecutive_correct, first_learned_at, last_reviewed_at, next_review_at, is_bookmarked) VALUES 
(3, 1, 4, 5, 4, 2, '2024-12-01 10:00:00', '2024-12-15 14:30:00', '2025-01-10 09:00:00', TRUE),
(3, 2, 3, 3, 2, 1, '2024-12-02 11:00:00', '2024-12-10 15:00:00', '2025-01-08 10:00:00', FALSE),
(3, 4, 5, 8, 7, 5, '2024-11-20 09:30:00', '2024-12-20 16:00:00', '2025-01-25 11:00:00', TRUE),
(3, 5, 2, 2, 1, 0, '2024-12-05 13:00:00', '2024-12-06 14:00:00', '2025-01-09 12:00:00', FALSE),

(4, 1, 5, 6, 6, 6, '2024-11-15 08:00:00', '2024-12-18 10:30:00', '2025-02-01 09:00:00', FALSE),
(4, 2, 4, 4, 3, 2, '2024-11-16 09:00:00', '2024-12-12 11:00:00', '2025-01-15 10:00:00', TRUE),
(4, 3, 3, 2, 1, 1, '2024-12-01 10:00:00', '2024-12-03 15:00:00', '2025-01-12 14:00:00', FALSE),
(4, 6, 4, 3, 3, 3, '2024-12-04 11:00:00', '2024-12-16 16:00:00', '2025-01-20 12:00:00', TRUE);

-- 5.2 SM-2算法数据
INSERT INTO user_knowledge_point_sm2_data (user_id, content_id, easiness_factor, repetition_number, inter_repetition_interval, last_interval) VALUES 
(3, 1, 2.6, 3, 6, 3),
(3, 2, 2.4, 2, 3, 1),
(3, 4, 2.8, 5, 15, 6),
(3, 5, 2.3, 1, 1, 1),

(4, 1, 2.9, 6, 25, 15),
(4, 2, 2.7, 3, 8, 4),
(4, 3, 2.5, 2, 3, 1),
(4, 6, 2.6, 3, 6, 3);

-- 5.3 用户学习表现数据
INSERT INTO user_knowledge_point_performance (user_id, content_id, personal_difficulty, personal_notes, avg_response_time, fastest_time, confidence_level) VALUES 
(3, 1, 2, '软件工程的定义需要重点记忆', 75, 45, 4),
(3, 2, 3, '生命周期各阶段容易混淆', 95, 60, 3),
(3, 4, 1, '数组很简单，基础概念', 55, 30, 5),
(3, 5, 4, '栈的概念还需要加强理解', 120, 80, 2),

(4, 1, 1, '基础概念，已经掌握', 50, 35, 5),
(4, 2, 2, '比较容易理解', 65, 45, 4),
(4, 3, 3, '需求分析在实践中应用较多', 85, 60, 3),
(4, 6, 2, '选择题需要仔细分析选项', 70, 50, 4);

-- ====================================================================
-- 6. 题目列表模块种子数据
-- ====================================================================

-- 6.1 创建自定义题目列表
INSERT INTO custom_question_lists (id, user_id, name, type, status, total_count, is_public) VALUES 
(1, 3, '软件工程基础复习', 'review', 'active', 4, FALSE),
(2, 4, '数据结构入门练习', 'practice', 'active', 3, TRUE),
(3, 2, '期末考试模拟卷', 'exam', 'active', 6, TRUE);

-- 6.2 题目列表元数据
INSERT INTO question_list_metadata (question_list_id, description, estimated_time, difficulty_level, category, learning_objectives) VALUES 
(1, '针对软件工程基础概念的复习题目集合', 25, 2.8, '软件工程', '["巩固基础概念", "准备考试"]'),
(2, '数据结构的入门级练习题目', 20, 2.3, '数据结构', '["理解基本概念", "培养编程思维"]'),
(3, '模拟期末考试的综合题目', 90, 3.2, '综合测试', '["检验学习效果", "模拟考试环境"]');

-- 6.3 题目列表-知识点关联
INSERT INTO question_list_point_relations (question_list_id, content_id, sequence_order, source_type, selection_reason) VALUES 
(1, 1, 1, 'knowledge-base', '软件工程基础概念'),
(1, 2, 2, 'knowledge-base', '生命周期理解'),
(1, 3, 3, 'knowledge-base', '需求分析重点'),
(1, 6, 4, 'knowledge-base', '原则理解测试'),

(2, 4, 1, 'knowledge-area', '数组基础'),
(2, 5, 2, 'knowledge-area', '栈概念'),
(2, 8, 3, 'knowledge-area', '树遍历'),

(3, 1, 1, 'custom', '综合测试-概念'),
(3, 2, 2, 'custom', '综合测试-过程'),
(3, 4, 3, 'custom', '综合测试-数据结构'),
(3, 6, 4, 'custom', '综合测试-原则'),
(3, 7, 5, 'custom', '综合测试-模型'),
(3, 8, 6, 'custom', '综合测试-算法');

-- ====================================================================
-- 7. 复习队列模块种子数据
-- ====================================================================

-- 7.1 生成当前复习队列
INSERT INTO user_review_queues (user_id, content_id, queue_type, priority, scheduled_at, estimated_duration) VALUES 
(3, 2, 'due', 4, '2025-01-08 09:00:00', 120),
(3, 5, 'due', 3, '2025-01-08 09:30:00', 90),
(3, 3, 'new', 2, '2025-01-08 10:00:00', 100),

(4, 3, 'due', 3, '2025-01-08 10:00:00', 85),
(4, 7, 'new', 2, '2025-01-08 10:30:00', 85);

-- 7.2 复习队列元数据
INSERT INTO review_queue_metadata (user_id, queue_date, total_items, completed_items, due_items, new_items, review_goal, estimated_total_time) VALUES 
('3', '2025-01-08', 3, 0, 2, 1, 20, 52),
('4', '2025-01-08', 2, 0, 1, 1, 25, 28);

-- ====================================================================
-- 8. 订阅关系模块种子数据
-- ====================================================================

-- 8.1 用户知识库订阅
INSERT INTO user_knowledge_base_subscriptions (user_id, knowledge_base_id, role, subscription_type, subscribed_at, last_accessed_at, access_count) VALUES 
(3, 1, 'viewer', 'free', '2024-11-15 10:00:00', '2024-12-20 15:30:00', 45),
(3, 2, 'viewer', 'free', '2024-11-20 11:00:00', '2024-12-18 14:00:00', 32),
(4, 1, 'viewer', 'premium', '2024-11-10 09:00:00', '2024-12-19 16:45:00', 58),
(4, 2, 'viewer', 'premium', '2024-11-12 10:30:00', '2024-12-15 13:20:00', 41),
(4, 4, 'contributor', 'premium', '2024-11-25 14:00:00', '2024-12-17 11:15:00', 28),
(3, 4, 'viewer', 'free', '2024-12-01 16:00:00', '2024-12-10 12:30:00', 15);

-- 8.2 订阅设置
INSERT INTO subscription_settings (subscription_id, personal_name, personal_color, sort_order, notification_enabled, sync_frequency) VALUES 
(1, '软工基础', '#2196F3', 1, TRUE, 'daily'),
(2, '数据结构', '#4CAF50', 2, TRUE, 'daily'),
(3, NULL, '#2196F3', 1, TRUE, 'realtime'),
(4, NULL, '#4CAF50', 2, TRUE, 'realtime'),
(5, '面向对象', '#795548', 3, FALSE, 'weekly'),
(6, 'OOP课程', '#795548', 3, TRUE, 'daily');

-- ====================================================================
-- 9. 系统配置数据更新
-- ====================================================================

-- 更新系统配置
UPDATE system_configs SET config_value = '2025-01-08' WHERE config_key = 'system.last_seed_date';
INSERT INTO system_configs (config_key, config_value, config_type, description, is_public) VALUES
('system.last_seed_date', '2025-01-08', 'string', '最后种子数据更新日期', FALSE),
('demo.enabled', 'true', 'boolean', '是否启用演示模式', TRUE),
('demo.users', '["demo_teacher", "demo_student1", "demo_student2"]', 'json', '演示用户列表', FALSE),
('system.official_knowledge_bases', '[1, 2, 3]', 'json', '官方知识库ID列表', FALSE),
('review.queue_generation_time', '08:00:00', 'string', '复习队列生成时间', TRUE);

-- ====================================================================
-- 10. 统计数据更新
-- ====================================================================

-- 更新知识库统计数据
UPDATE knowledge_bases kb 
SET content_count = (
    SELECT COUNT(*) 
    FROM knowledge_base_content_relations kbcr 
    WHERE kbcr.knowledge_base_id = kb.id
),
subscriber_count = (
    SELECT COUNT(*) 
    FROM user_knowledge_base_subscriptions ukbs 
    WHERE ukbs.knowledge_base_id = kb.id AND ukbs.is_active = TRUE
);

-- 更新知识点使用次数
UPDATE knowledge_point_contents kpc 
SET usage_count = (
    SELECT COUNT(*) 
    FROM user_knowledge_point_states ukps 
    WHERE ukps.content_id = kpc.id
);

-- 更新题目列表实际数量
UPDATE custom_question_lists cql 
SET total_count = (
    SELECT COUNT(*) 
    FROM question_list_point_relations qlpr 
    WHERE qlpr.question_list_id = cql.id AND qlpr.is_active = TRUE
);

-- ====================================================================
-- 11. 创建演示用触发器测试数据
-- ====================================================================

-- 测试触发器：添加新的知识库内容关联
INSERT INTO knowledge_base_content_relations (knowledge_base_id, content_id, category, added_by) VALUES 
(3, 1, '网络基础', 5);

-- 测试触发器：新用户订阅知识库
INSERT INTO user_knowledge_base_subscriptions (user_id, knowledge_base_id, role) VALUES 
(3, 3, 'viewer');

-- 恢复外键检查
SET FOREIGN_KEY_CHECKS = 1;

-- ====================================================================
-- 种子数据插入完成
-- ====================================================================

-- 输出统计信息
SELECT 
    '种子数据插入完成' as status,
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM knowledge_bases) as total_knowledge_bases,
    (SELECT COUNT(*) FROM knowledge_point_contents) as total_contents,
    (SELECT COUNT(*) FROM user_knowledge_point_states) as total_user_states,
    (SELECT COUNT(*) FROM custom_question_lists) as total_question_lists,
    (SELECT COUNT(*) FROM user_knowledge_base_subscriptions) as total_subscriptions; 