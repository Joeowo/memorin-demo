# Memorin项目重构继续 - 新对话Prompt

## 🚀 项目背景与现状

你正在协助一个**Memorin智能知识复习系统**的重构项目。这是一个从纯前端静态应用升级为**Vue3+微服务架构**的重构任务。

### 项目基本信息
- **当前系统**: HTML5 + CSS3 + JavaScript ES6+ (纯前端单体应用)
- **目标架构**: Vue3 + TypeScript + Spring Boot微服务 + MySQL集群 + Redis缓存
- **核心功能**: SM-2算法复习系统、三级知识管理、错题本、数据统计
- **UI特色**: 毛玻璃蓝紫色主题，必须100%保留现有视觉效果

### 已完成的重要工作 ✅

#### 数据库架构设计 (Task-1.3)
1. **数据结构分析完成**:
   - storage.js (1272行) - 数据模型和字段关系
   - knowledge.js (1900行) - 知识管理业务逻辑 
   - review.js (2099行) - SM-2算法实现
   - statistics.js - 统计计算逻辑
   - question-list-generator.js - 题目生成策略
   - notes-manager.js - 笔记管理逻辑

2. **数据库设计完成**:
   - MySQL数据库表结构设计 (12张核心表)
   - 数据库初始化脚本和种子数据
   - LocalStorage到MySQL数据迁移方案
   - 多用户共享知识库但复习状态独立的数据模型

3. **Redis缓存策略完成**:
   - 4层缓存架构设计 (热点数据、会话缓存、内容缓存、统计缓存)
   - 生产环境Redis配置文件
   - 缓存管理工具 (Python脚本)
   - 完整的缓存管理使用指南

#### 项目结构状态
```
Memorin-rebuild/
├── database/
│   ├── docs/ (Redis缓存策略、使用指南)
│   ├── migrations/ (数据库脚本、缓存管理工具)
│   └── README.md (数据库使用指南)
├── frontend/ (Vue3项目基础结构已搭建)
└── backend/ (微服务结构待搭建)
```

## 🎯 当前待办任务 (按优先级排序)

### 🔴 高优先级 - 立即执行
1. **database-performance-optimization**: 优化数据库查询性能和索引策略
   - 依赖: database-creation-scripts, redis-cache-design ✅

### 🟡 中优先级 - 后续任务 (参考Task-1.3文档)
2. **MySQL集群搭建**: 配置主从复制、读写分离
3. **微服务后端搭建**: Spring Boot微服务架构
4. **Vue3前端重构**: 组件化改造、状态管理
5. **API接口设计**: RESTful API规范
6. **数据迁移实施**: LocalStorage数据导入

## 📐 严格执行规则 (CRITICAL)

### 🐌 渐进式开发控制
- **每次对话限制**: 只能操作 1 个文件，修改 1 个函数/方法
- **代码量限制**: 单次生成不超过 50 行代码
- **强制确认**: 每次修改前必须询问用户确认
- **分步策略**: 分析→设计→实施→验证 四步走

### 🚫 严格禁止
```yaml
禁止行为:
  ❌ 一次性生成整个文件
  ❌ 同时修改多个函数 
  ❌ 跨文件操作 (除非明确指定)
  ❌ 提供"完整示例" (除非明确要求)
  ❌ 硬编码关键布局尺寸
  ❌ 破坏现有UI风格
  ❌ 使用Unix shell语法 (环境是Windows PowerShell)
```

### ✅ 必须遵守
```yaml
应该做的:
  ✅ 每次只专注一个小目标
  ✅ 详细解释每个修改的原因
  ✅ 提供清晰的修改前后对比
  ✅ 主动询问用户确认
  ✅ 优先阅读核心业务逻辑文件
  ✅ 保持毛玻璃蓝紫色UI风格100%一致
  ✅ 使用PowerShell兼容命令语法
  ✅ 遵守统一布局管理规范
```

## 🛠️ 技术环境信息

### 开发环境
- **操作系统**: Windows 10.0.26100
- **Shell**: PowerShell 5.1 (ExecutionPolicy: Restricted)
- **Node.js**: v22.17.0
- **工作目录**: E:\Code\memorin-demo
- **语言环境**: zh-CN (中文)

### PowerShell语法要求
```powershell
# ✅ 正确语法
Get-ChildItem           # 不是 ls
Set-Location "path"     # 不是 cd  
New-Item -ItemType      # 不是 mkdir
Get-Content "file"      # 不是 cat
$env:NODE_ENV = "dev"   # 不是 export
```

## 🎨 布局管理核心规范

### 统一容器原则 (CRITICAL)
- 所有页面必须使用 `.container` 类
- 使用预定义网格类 (`.stats-grid`, `.test-grid` 等)
- 禁止页面级重复定义布局样式
- 响应式样式由全局 `layout.css` 管理

### 标准布局模式
```vue
<template>
  <div class="page-view">
    <div class="stats-grid"><!-- 使用预定义网格 --></div>
    <div class="action-grid"><!-- 使用预定义网格 --></div>
  </div>
</template>

<style scoped>
/* ✅ 只定义页面特有样式 */
.page-header { text-align: center; }

/* ❌ 禁止重新定义网格和宽度 */
/* .stats-grid { max-width: 1400px; } */
</style>
```

## 📁 重要文件优先级

### 🔴 核心业务逻辑 (最高优先级)
```
js/
├── app.js              # 主应用控制器
├── review.js           # 复习管理 (2099行) 
├── knowledge.js        # 知识管理 (1900行)
├── storage.js          # 数据存储 (1272行)
└── statistics.js       # 统计分析
```

### 🟡 重构相关文档 (高优先级)
```
rebuildDocs/
├── 开发文档/tasks/     # 任务清单
├── 需求文档/           # 需求分析
└── Memorin-rebuild/    # 新架构代码
```

## 🔄 执行建议

### 立即开始任务
```
Step 1: 阅读 Task-1.3-数据库设计实现.md
Step 2: 检查 database/ 目录下已完成的工作
Step 3: 开始 database-performance-optimization 任务
Step 4: 每次只优化一个数据库性能点
```

### 常用工具优先级
1. **codebase_search**: 语义搜索，理解业务逻辑
2. **read_file**: 阅读核心文件，每次限3-5个文件
3. **edit_file**: 代码修改，每次只修改1个函数
4. **grep_search**: 精确文本搜索
5. **run_terminal_cmd**: PowerShell命令执行

### 沟通模式
- 每次操作前询问: "现在要修改哪个文件的哪个函数？"
- 说明修改原因: "这个修改解决什么问题？"
- 等待确认: "您确认只修改这一个函数吗？"
- 提供对比: "修改前后的区别是..."

## 💡 成功标准

### 技术指标
- 数据库查询性能提升 > 50%
- 缓存命中率 > 90%
- 系统并发用户数 > 1000
- 响应时间 < 5ms

### 质量标准
- 代码覆盖率 > 80%
- 无TypeScript类型错误
- 通过ESLint检查
- 保持UI视觉效果100%一致

---

**开始指令**: "请开始 database-performance-optimization 任务，先分析当前数据库结构的性能瓶颈。" 