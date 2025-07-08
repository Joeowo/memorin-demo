# Task-2.6: 社区功能模块实现

> **任务状态**: ⏳ 待开始  
> **预计耗时**: 4天  
> **负责人**: 全栈开发工程师  

## 📋 任务概述

实现全新的社区功能模块，允许用户分享知识库、交流学习经验、协作创建内容，构建学习社区生态，提升用户粘性和学习效果。

## 🎯 任务目标

1. 实现知识库分享和发现功能
2. 构建用户交流和评论系统
3. 实现协作编辑和贡献机制
4. 添加社区内容推荐算法
5. 建立用户声誉和激励体系

## 📊 任务拆解

### 子任务2.6.1: 后端社区服务 (2天)
- 设计社区数据模型（帖子、评论、点赞等）
- 实现知识库分享API
- 实现评论和互动API
- 添加内容推荐算法

### 子任务2.6.2: 社区广场组件 (1天)
- 实现CommunityFeed社区动态组件
- 实现KnowledgeBaseCard知识库卡片
- 添加内容筛选和搜索功能
- 实现无限滚动加载

### 子任务2.6.3: 互动功能组件 (1天)
- 实现CommentSystem评论系统
- 实现LikeButton点赞功能
- 添加用户关注和私信功能
- 实现内容举报和审核

## 🧪 测试方法

### 后端社区服务测试
```java
@Test
void shouldShareKnowledgeBaseSuccessfully() {
    ShareKnowledgeBaseRequest request = ShareKnowledgeBaseRequest.builder()
        .userId("user123")
        .knowledgeBaseId("kb_1")
        .title("Java学习资料分享")
        .description("适合初学者的Java基础知识")
        .tags(Arrays.asList("Java", "编程", "基础"))
        .isPublic(true)
        .build();
    
    ShareResponse response = communityService.shareKnowledgeBase(request);
    
    assertThat(response.getShareId()).isNotNull();
    assertThat(response.getStatus()).isEqualTo(ShareStatus.PUBLISHED);
}

@Test
void shouldCreateCommentSuccessfully() {
    CreateCommentRequest request = CreateCommentRequest.builder()
        .userId("user123")
        .shareId("share_1")
        .content("很棒的分享，感谢！")
        .parentCommentId(null)
        .build();
    
    CommentResponse response = communityService.createComment(request);
    
    assertThat(response.getId()).isNotNull();
    assertThat(response.getContent()).isEqualTo("很棒的分享，感谢！");
    assertThat(response.getAuthor().getId()).isEqualTo("user123");
}

@Test
void shouldRecommendRelevantContent() {
    // 创建用户学习历史
    createUserLearningHistory("user123", Arrays.asList("Java", "Spring"));
    
    RecommendationRequest request = RecommendationRequest.builder()
        .userId("user123")
        .limit(10)
        .build();
    
    RecommendationResponse response = communityService.getRecommendations(request);
    
    assertThat(response.getRecommendations()).isNotEmpty();
    assertThat(response.getRecommendations().get(0).getRelevanceScore()).isGreaterThan(0.0);
}
```

### 前端社区组件测试
```typescript
// 社区动态组件测试
describe('CommunityFeed.vue', () => {
  it('应该正确显示社区动态', async () => {
    const mockFeedData = [
      {
        id: '1',
        type: 'knowledge_share',
        author: { id: 'user1', name: '张三', avatar: 'avatar1.jpg' },
        title: 'Java学习资料分享',
        description: '适合初学者的Java基础知识',
        tags: ['Java', '编程'],
        likeCount: 15,
        commentCount: 8,
        createdAt: new Date()
      },
      {
        id: '2',
        type: 'study_achievement',
        author: { id: 'user2', name: '李四', avatar: 'avatar2.jpg' },
        title: '完成了Spring框架学习',
        description: '经过一个月的学习，终于掌握了Spring',
        tags: ['Spring', '成就'],
        likeCount: 23,
        commentCount: 12,
        createdAt: new Date()
      }
    ];
    
    const wrapper = mount(CommunityFeed, {
      props: { feedData: mockFeedData }
    });
    
    expect(wrapper.findAll('.feed-item')).toHaveLength(2);
    expect(wrapper.text()).toContain('Java学习资料分享');
    expect(wrapper.text()).toContain('完成了Spring框架学习');
  });
  
  it('应该支持内容筛选', async () => {
    const wrapper = mount(CommunityFeed, {
      props: { feedData: mockFeedData }
    });
    
    await wrapper.find('#content-filter').setValue('knowledge_share');
    
    expect(wrapper.emitted('filter-change')).toBeTruthy();
    expect(wrapper.emitted('filter-change')[0]).toEqual([
      { type: 'knowledge_share' }
    ]);
  });
  
  it('应该实现无限滚动', async () => {
    const wrapper = mount(CommunityFeed, {
      props: { feedData: mockFeedData }
    });
    
    // 模拟滚动到底部
    const scrollContainer = wrapper.find('.feed-container');
    await scrollContainer.trigger('scroll', { 
      target: { scrollTop: 1000, scrollHeight: 1200, clientHeight: 400 }
    });
    
    expect(wrapper.emitted('load-more')).toBeTruthy();
  });
});

// 评论系统组件测试
describe('CommentSystem.vue', () => {
  it('应该正确显示评论列表', () => {
    const mockComments = [
      {
        id: '1',
        author: { id: 'user1', name: '张三', avatar: 'avatar1.jpg' },
        content: '很棒的分享，感谢！',
        likeCount: 5,
        replies: [
          {
            id: '2',
            author: { id: 'user2', name: '李四', avatar: 'avatar2.jpg' },
            content: '同意，很有用！',
            likeCount: 2,
            createdAt: new Date()
          }
        ],
        createdAt: new Date()
      }
    ];
    
    const wrapper = mount(CommentSystem, {
      props: { comments: mockComments, shareId: 'share_1' }
    });
    
    expect(wrapper.findAll('.comment-item')).toHaveLength(1);
    expect(wrapper.findAll('.reply-item')).toHaveLength(1);
    expect(wrapper.text()).toContain('很棒的分享，感谢！');
    expect(wrapper.text()).toContain('同意，很有用！');
  });
  
  it('应该支持添加评论', async () => {
    const wrapper = mount(CommentSystem, {
      props: { comments: [], shareId: 'share_1' }
    });
    
    await wrapper.find('#comment-input').setValue('这是一条新评论');
    await wrapper.find('#submit-comment').trigger('click');
    
    expect(wrapper.emitted('comment-added')).toBeTruthy();
    expect(wrapper.emitted('comment-added')[0]).toEqual([
      { content: '这是一条新评论', shareId: 'share_1' }
    ]);
  });
  
  it('应该支持回复评论', async () => {
    const wrapper = mount(CommentSystem, {
      props: { comments: mockComments, shareId: 'share_1' }
    });
    
    await wrapper.find('[data-comment-id="1"] .reply-btn').trigger('click');
    
    expect(wrapper.find('.reply-form').exists()).toBe(true);
    
    await wrapper.find('.reply-input').setValue('这是一条回复');
    await wrapper.find('.submit-reply').trigger('click');
    
    expect(wrapper.emitted('reply-added')).toBeTruthy();
  });
});

// 点赞功能组件测试
describe('LikeButton.vue', () => {
  it('应该正确显示点赞状态', () => {
    const wrapper = mount(LikeButton, {
      props: {
        targetId: 'share_1',
        targetType: 'share',
        likeCount: 15,
        isLiked: true
      }
    });
    
    expect(wrapper.text()).toContain('15');
    expect(wrapper.find('.like-btn').classes()).toContain('liked');
  });
  
  it('应该处理点赞操作', async () => {
    const wrapper = mount(LikeButton, {
      props: {
        targetId: 'share_1',
        targetType: 'share',
        likeCount: 15,
        isLiked: false
      }
    });
    
    await wrapper.find('.like-btn').trigger('click');
    
    expect(wrapper.emitted('like-toggled')).toBeTruthy();
    expect(wrapper.emitted('like-toggled')[0]).toEqual([
      { targetId: 'share_1', targetType: 'share', action: 'like' }
    ]);
  });
});
```

### 推荐算法测试
```typescript
describe('内容推荐算法', () => {
  it('应该基于用户兴趣推荐内容', () => {
    const userProfile = {
      interests: ['Java', 'Spring', 'Web开发'],
      learningHistory: ['Java基础', 'Spring Boot'],
      interactionHistory: ['like', 'comment', 'share']
    };
    
    const availableContent = [
      { id: '1', tags: ['Java', 'Advanced'], title: 'Java高级特性' },
      { id: '2', tags: ['Python', 'Basic'], title: 'Python入门' },
      { id: '3', tags: ['Spring', 'MVC'], title: 'Spring MVC详解' }
    ];
    
    const recommendations = recommendContent(userProfile, availableContent);
    
    expect(recommendations[0].id).toBe('3'); // Spring相关内容排第一
    expect(recommendations[1].id).toBe('1'); // Java相关内容排第二
  });
  
  it('应该考虑内容质量和热度', () => {
    const content = [
      { id: '1', quality: 0.9, popularity: 0.8, tags: ['Java'] },
      { id: '2', quality: 0.7, popularity: 0.9, tags: ['Java'] },
      { id: '3', quality: 0.8, popularity: 0.7, tags: ['Java'] }
    ];
    
    const ranked = rankContentByQuality(content);
    
    expect(ranked[0].id).toBe('1'); // 质量最高的排第一
  });
});
```

### 性能测试
```typescript
describe('社区模块性能', () => {
  it('应该支持大量内容的流畅滚动', async () => {
    const largeFeedData = generateMockFeedData(1000);
    
    const wrapper = mount(CommunityFeed, {
      props: { feedData: largeFeedData }
    });
    
    // 验证虚拟滚动正常工作
    expect(wrapper.findAll('.feed-item').length).toBeLessThan(20);
    
    // 模拟快速滚动
    for (let i = 0; i < 10; i++) {
      const scrollContainer = wrapper.find('.feed-container');
      await scrollContainer.trigger('scroll', { 
        target: { scrollTop: i * 500 }
      });
    }
    
    // 验证性能稳定
    expect(wrapper.vm.renderTime).toBeLessThan(100);
  });
  
  it('应该优化图片加载', async () => {
    const wrapper = mount(CommunityFeed, {
      props: { feedData: mockFeedDataWithImages }
    });
    
    // 验证懒加载
    const images = wrapper.findAll('img[data-lazy]');
    expect(images.length).toBeGreaterThan(0);
    
    // 模拟图片进入视口
    const firstImage = images[0];
    await firstImage.trigger('intersect');
    
    expect(firstImage.attributes('src')).toBeDefined();
  });
});
```

## ✅ 验收标准

1. **社区功能完整性**
   - 知识库分享功能正常
   - 评论和互动系统完整
   - 内容筛选和搜索有效
   - 推荐算法准确合理

2. **用户体验**
   - 界面美观符合毛玻璃主题
   - 交互响应及时流畅
   - 无限滚动加载顺畅
   - 移动端适配良好

3. **内容质量**
   - 内容审核机制完善
   - 垃圾内容过滤有效
   - 用户举报处理及时
   - 内容推荐相关性高

4. **性能指标**
   - 动态加载时间 < 2秒
   - 评论提交响应 < 1秒
   - 支持1000+内容流畅展示
   - 图片懒加载优化

5. **社区生态**
   - 用户参与度高
   - 内容质量持续提升
   - 社区氛围积极正面
   - 激励机制有效

---

**下一任务**: Task-3.1-性能优化与测试 