# Task-2.2: 知识管理模块重构

> **任务状态**: ⏳ 待开始  
> **预计耗时**: 6天  
> **负责人**: 全栈开发工程师  

## 📋 任务概述

重构知识管理模块（knowledge.js，1900行）为Vue3+微服务架构，实现三级层次结构（知识库→知识区→知识点）的CRUD操作，保持毛玻璃视觉效果，优化性能和用户体验。

## 🎯 任务目标

1. 重构三级层次结构为Vue3组件
2. 实现知识点多题型支持（填空题、选择题）
3. 优化搜索和筛选功能
4. 实现导入导出功能
5. 建立完整的后端API服务

## 📊 任务拆解

### 子任务2.2.1: 后端知识库服务 (2天)
- 设计知识库、知识区、知识点数据模型
- 实现CRUD API接口
- 实现搜索和筛选API
- 添加数据验证和异常处理

### 子任务2.2.2: 三级导航组件 (1.5天)
- 实现KnowledgeHierarchy导航组件
- 实现KnowledgeBaseCard卡片组件
- 实现知识区和知识点列表组件
- 添加面包屑导航

### 子任务2.2.3: 知识点表单组件 (2天)
- 实现KnowledgePointForm复杂表单
- 支持填空题和选择题切换
- 实现动态表单验证
- 添加题型预览功能

### 子任务2.2.4: 搜索筛选组件 (0.5天)
- 实现实时搜索功能
- 实现标签筛选
- 实现高级搜索选项
- 优化搜索性能

## 🧪 测试方法

### 后端API测试
```java
@Test
void shouldCreateKnowledgeBaseSuccessfully() {
    CreateKnowledgeBaseRequest request = CreateKnowledgeBaseRequest.builder()
        .name("测试知识库")
        .description("测试描述")
        .icon("📚")
        .color("#667eea")
        .build();
    
    KnowledgeBaseResponse response = knowledgeBaseService.create(request);
    
    assertThat(response.getId()).isNotNull();
    assertThat(response.getName()).isEqualTo("测试知识库");
}

@Test
void shouldValidateKnowledgePointData() {
    CreateKnowledgePointRequest request = CreateKnowledgePointRequest.builder()
        .question("")  // 空题目
        .type(QuestionType.CHOICE)
        .build();
    
    assertThrows(ValidationException.class, 
        () -> knowledgePointService.create(request));
}

@Test
void shouldSearchKnowledgePoints() {
    // 创建测试数据
    createKnowledgePoint("Java基础", Arrays.asList("Java", "基础"));
    createKnowledgePoint("Spring框架", Arrays.asList("Spring", "框架"));
    
    SearchRequest request = SearchRequest.builder()
        .query("Java")
        .tags(Arrays.asList("基础"))
        .build();
    
    SearchResponse response = knowledgePointService.search(request);
    
    assertThat(response.getResults()).hasSize(1);
    assertThat(response.getResults().get(0).getQuestion()).contains("Java基础");
}
```

### 前端组件测试
```typescript
// 知识点表单测试
describe('KnowledgePointForm.vue', () => {
  it('应该支持题型切换', async () => {
    const wrapper = mount(KnowledgePointForm);
    
    // 默认是填空题
    expect(wrapper.find('#answer-input').exists()).toBe(true);
    expect(wrapper.find('.choice-options').exists()).toBe(false);
    
    // 切换到选择题
    await wrapper.find('#question-type').setValue('choice');
    
    expect(wrapper.find('#answer-input').exists()).toBe(false);
    expect(wrapper.find('.choice-options').exists()).toBe(true);
  });
  
  it('应该验证必填字段', async () => {
    const wrapper = mount(KnowledgePointForm);
    
    await wrapper.find('#submit-btn').trigger('click');
    
    expect(wrapper.text()).toContain('题目不能为空');
  });
  
  it('应该验证选择题选项', async () => {
    const wrapper = mount(KnowledgePointForm, {
      props: {
        initialData: {
          type: 'choice',
          question: '测试题目'
        }
      }
    });
    
    // 不添加选项直接提交
    await wrapper.find('#submit-btn').trigger('click');
    
    expect(wrapper.text()).toContain('至少需要2个选项');
  });
});

// 三级导航测试
describe('KnowledgeHierarchy.vue', () => {
  it('应该正确显示导航路径', async () => {
    const wrapper = mount(KnowledgeHierarchy, {
      props: {
        currentPath: [
          { id: '1', name: '编程知识库', type: 'base' },
          { id: '2', name: 'Java基础', type: 'area' }
        ]
      }
    });
    
    expect(wrapper.text()).toContain('编程知识库');
    expect(wrapper.text()).toContain('Java基础');
    expect(wrapper.find('.breadcrumb').exists()).toBe(true);
  });
  
  it('应该触发导航事件', async () => {
    const wrapper = mount(KnowledgeHierarchy, {
      props: {
        knowledgeBases: [
          { id: '1', name: '测试库', icon: '📚' }
        ]
      }
    });
    
    await wrapper.find('[data-base-id="1"]').trigger('click');
    
    expect(wrapper.emitted('navigate')).toBeTruthy();
    expect(wrapper.emitted('navigate')[0]).toEqual([
      { type: 'base', id: '1' }
    ]);
  });
});
```

### 搜索功能测试
```typescript
describe('KnowledgeSearch.vue', () => {
  it('应该实现实时搜索', async () => {
    const mockSearch = vi.fn().mockResolvedValue([
      { id: '1', question: 'Java基础知识' }
    ]);
    
    const wrapper = mount(KnowledgeSearch, {
      global: {
        provide: {
          knowledgeService: { search: mockSearch }
        }
      }
    });
    
    await wrapper.find('#search-input').setValue('Java');
    
    // 等待防抖
    await new Promise(resolve => setTimeout(resolve, 300));
    
    expect(mockSearch).toHaveBeenCalledWith({
      query: 'Java',
      tags: [],
      limit: 20
    });
  });
  
  it('应该支持标签筛选', async () => {
    const wrapper = mount(KnowledgeSearch);
    
    await wrapper.find('#tag-filter').trigger('click');
    await wrapper.find('[data-tag="Java"]').trigger('click');
    
    expect(wrapper.vm.selectedTags).toContain('Java');
  });
});
```

### 数据迁移测试
```java
@Test
void shouldMigrateLocalStorageData() {
    // 模拟LocalStorage数据
    String localStorageData = """
        {
          "knowledgeBases": [
            {
              "id": "kb_1",
              "name": "测试库",
              "areas": [
                {
                  "id": "area_1",
                  "name": "测试区",
                  "knowledgePoints": []
                }
              ]
            }
          ],
          "knowledge": [
            {
              "id": "kp_1",
              "question": "测试题目",
              "answer": "测试答案",
              "knowledgeBaseId": "kb_1",
              "areaId": "area_1"
            }
          ]
        }
        """;
    
    MigrationResult result = dataMigrationService.migrateFromLocalStorage(
        "user123", localStorageData);
    
    assertThat(result.isSuccess()).isTrue();
    assertThat(result.getMigratedKnowledgeBases()).hasSize(1);
    assertThat(result.getMigratedKnowledgePoints()).hasSize(1);
    
    // 验证数据正确性
    KnowledgeBase kb = knowledgeBaseService.findByUserIdAndName(
        "user123", "测试库");
    assertThat(kb).isNotNull();
}
```

## ✅ 验收标准

1. **功能完整性**
   - 三级层次结构正常工作
   - 知识点CRUD操作正常
   - 多题型支持完整
   - 搜索筛选功能正常
   - 导入导出功能正常

2. **数据一致性**
   - 数据验证规则完整
   - 关联关系维护正确
   - 级联删除正常工作
   - 数据迁移准确无误

3. **性能指标**
   - 知识点列表加载 < 1秒
   - 搜索响应时间 < 500ms
   - 表单提交响应 < 300ms
   - 支持1000+知识点流畅操作

4. **用户体验**
   - 三级导航清晰直观
   - 表单操作流畅自然
   - 搜索结果准确相关
   - 错误提示友好明确

5. **代码质量**
   - 后端API文档完整
   - 前端组件可复用性好
   - 单元测试覆盖率 > 85%
   - TypeScript类型定义完整

---

**下一任务**: Task-2.3-复习系统模块重构 