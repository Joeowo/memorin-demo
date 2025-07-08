# Task-2.1: 仪表盘模块重构

> **任务状态**: ⏳ 待开始  
> **预计耗时**: 3天  
> **负责人**: 前端开发工程师  

## 📋 任务概述

将现有的仪表盘模块（app.js，595行）重构为Vue3组件化架构，保持原有的毛玻璃视觉效果，实现统计数据展示、快速操作和知识库信息管理功能。

## 🎯 任务目标

1. 重构MemoryApp类为Vue3组件
2. 实现统计数据的响应式管理
3. 保持原有的毛玻璃视觉效果
4. 优化性能和用户体验
5. 添加完整的单元测试

## 📊 任务拆解

### 子任务2.1.1: 组件架构设计 (0.5天)
- 设计Dashboard主组件结构
- 拆分StatCard、QuickActions等子组件
- 设计Pinia状态管理结构

### 子任务2.1.2: 统计数据组件 (1天)
- 实现StatCard毛玻璃卡片组件
- 实现StatsGrid网格布局
- 集成统计数据API调用
- 添加加载状态和错误处理

### 子任务2.1.3: 快速操作组件 (1天)
- 实现QuickActions操作面板
- 实现ActionButton毛玻璃按钮
- 集成各种快速操作功能
- 添加操作确认和反馈

### 子任务2.1.4: 知识库信息组件 (0.5天)
- 实现KnowledgeBasesInfo组件
- 集成Element Plus表格并应用毛玻璃样式
- 实现数据分页和搜索

## 🧪 测试方法

### 组件单元测试
```typescript
// StatCard组件测试
describe('StatCard.vue', () => {
  it('应该正确显示统计数据', () => {
    const wrapper = mount(StatCard, {
      props: {
        title: '总知识点',
        value: 150,
        icon: '📚',
        variant: 'knowledge'
      }
    });
    
    expect(wrapper.text()).toContain('总知识点');
    expect(wrapper.text()).toContain('150');
    expect(wrapper.text()).toContain('📚');
    expect(wrapper.classes()).toContain('glass-knowledge');
  });
  
  it('应该显示加载状态', () => {
    const wrapper = mount(StatCard, {
      props: {
        title: '总知识点',
        value: 0,
        loading: true
      }
    });
    
    expect(wrapper.find('.loading-skeleton').exists()).toBe(true);
  });
});

// QuickActions组件测试
describe('QuickActions.vue', () => {
  it('应该触发正确的操作事件', async () => {
    const wrapper = mount(QuickActions);
    
    await wrapper.find('[data-action="start-review"]').trigger('click');
    
    expect(wrapper.emitted('action')).toBeTruthy();
    expect(wrapper.emitted('action')[0]).toEqual(['start-review']);
  });
  
  it('应该显示确认对话框', async () => {
    const wrapper = mount(QuickActions);
    
    await wrapper.find('[data-action="clear-data"]').trigger('click');
    
    expect(wrapper.find('.confirm-dialog').exists()).toBe(true);
  });
});
```

### 状态管理测试
```typescript
// Dashboard Store测试
describe('useDashboardStore', () => {
  it('应该正确计算完成率', () => {
    const store = useDashboardStore();
    store.stats = {
      totalKnowledge: 100,
      masteredCount: 80,
      todayReview: 20,
      mistakesCount: 5
    };
    
    expect(store.completionRate).toBe(80);
  });
  
  it('应该正确刷新统计数据', async () => {
    const store = useDashboardStore();
    const mockApi = vi.fn().mockResolvedValue({
      totalKnowledge: 150,
      masteredCount: 100,
      todayReview: 25,
      mistakesCount: 8
    });
    
    // Mock API调用
    vi.mocked(dashboardApi.getStats).mockImplementation(mockApi);
    
    await store.refreshStats();
    
    expect(store.stats.totalKnowledge).toBe(150);
    expect(mockApi).toHaveBeenCalled();
  });
});
```

### 集成测试
```typescript
// Dashboard页面集成测试
describe('Dashboard页面', () => {
  it('应该正确加载和显示所有数据', async () => {
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [router, pinia]
      }
    });
    
    // 等待数据加载
    await flushPromises();
    
    expect(wrapper.find('.stats-grid').exists()).toBe(true);
    expect(wrapper.find('.quick-actions').exists()).toBe(true);
    expect(wrapper.find('.knowledge-bases-info').exists()).toBe(true);
  });
  
  it('应该处理数据加载错误', async () => {
    // Mock API错误
    vi.mocked(dashboardApi.getStats).mockRejectedValue(new Error('API Error'));
    
    const wrapper = mount(Dashboard, {
      global: {
        plugins: [router, pinia]
      }
    });
    
    await flushPromises();
    
    expect(wrapper.find('.error-message').exists()).toBe(true);
    expect(wrapper.find('.retry-button').exists()).toBe(true);
  });
});
```

### 视觉回归测试
```typescript
// 毛玻璃效果测试
describe('毛玻璃视觉效果', () => {
  it('StatCard应该有正确的毛玻璃样式', () => {
    const wrapper = mount(StatCard, {
      props: { title: 'Test', value: 100 }
    });
    
    const cardElement = wrapper.find('.glass-card').element as HTMLElement;
    const styles = window.getComputedStyle(cardElement);
    
    expect(styles.backdropFilter).toContain('blur');
    expect(styles.background).toContain('rgba');
    expect(styles.borderRadius).toBe('15px');
  });
});
```

## ✅ 验收标准

1. **功能完整性**
   - 所有原有功能正常工作
   - 统计数据正确计算和显示
   - 快速操作功能正常
   - 知识库信息正确展示

2. **视觉一致性**
   - 毛玻璃效果与原系统一致
   - 响应式布局正常工作
   - 动画和过渡效果流畅
   - 加载状态和错误状态友好

3. **性能指标**
   - 页面加载时间 < 1秒
   - 统计数据刷新 < 500ms
   - 内存使用合理
   - 无内存泄漏

4. **代码质量**
   - TypeScript类型覆盖率 > 95%
   - 单元测试覆盖率 > 90%
   - ESLint零警告
   - 组件可复用性好

5. **用户体验**
   - 操作响应及时
   - 错误提示清晰
   - 加载状态明确
   - 交互反馈友好

---

**下一任务**: Task-2.2-知识管理模块重构 