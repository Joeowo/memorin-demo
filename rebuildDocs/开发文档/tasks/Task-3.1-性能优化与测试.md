# Task-3.1: 性能优化与测试

> **任务状态**: ⏳ 待开始  
> **预计耗时**: 3天  
> **负责人**: 全栈开发工程师  

## 📋 任务概述

对整个系统进行全面的性能优化和测试，包括前端性能优化、后端性能调优、数据库优化、缓存策略优化等，确保系统在高并发和大数据量情况下的稳定运行。

## 🎯 任务目标

1. 前端性能优化（首屏加载、运行时性能）
2. 后端API性能调优
3. 数据库查询优化
4. 缓存策略优化
5. 全链路性能测试

## 📊 任务拆解

### 子任务3.1.1: 前端性能优化 (1天)
- 代码分割和懒加载优化
- 图片资源优化和懒加载
- 虚拟滚动性能优化
- 内存泄漏检测和修复

### 子任务3.1.2: 后端性能调优 (1天)
- API响应时间优化
- 数据库连接池优化
- JVM参数调优
- 接口并发性能测试

### 子任务3.1.3: 全链路性能测试 (1天)
- 压力测试和负载测试
- 性能监控和指标收集
- 性能瓶颈分析和解决
- 性能基线建立

## 🧪 测试方法

### 前端性能测试
```typescript
// 首屏加载性能测试
describe('首屏加载性能', () => {
  it('应该在2秒内完成首屏加载', async () => {
    const startTime = performance.now();
    
    const wrapper = mount(App, {
      global: {
        plugins: [router, pinia]
      }
    });
    
    await router.push('/dashboard');
    await flushPromises();
    
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    expect(loadTime).toBeLessThan(2000);
  });
  
  it('应该正确实现代码分割', async () => {
    const initialChunks = document.querySelectorAll('script[src*="chunk"]').length;
    
    // 导航到知识管理页面
    await router.push('/knowledge');
    await flushPromises();
    
    const afterNavChunks = document.querySelectorAll('script[src*="chunk"]').length;
    
    expect(afterNavChunks).toBeGreaterThan(initialChunks);
  });
});

// 运行时性能测试
describe('运行时性能', () => {
  it('应该在100ms内完成列表渲染', async () => {
    const largeDataset = generateMockData(1000);
    
    const startTime = performance.now();
    
    const wrapper = mount(KnowledgeList, {
      props: { data: largeDataset }
    });
    
    await nextTick();
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(100);
  });
  
  it('应该正确实现虚拟滚动', async () => {
    const wrapper = mount(VirtualScrollList, {
      props: { items: generateMockData(10000) }
    });
    
    // 验证只渲染可见项目
    const renderedItems = wrapper.findAll('.list-item');
    expect(renderedItems.length).toBeLessThan(50);
    
    // 模拟滚动
    await wrapper.find('.scroll-container').trigger('scroll', {
      target: { scrollTop: 5000 }
    });
    
    // 验证滚动性能
    expect(wrapper.vm.scrollPerformance).toBeLessThan(16); // 60fps
  });
});

// 内存泄漏检测
describe('内存泄漏检测', () => {
  it('应该正确清理组件内存', async () => {
    const initialMemory = performance.memory?.usedJSHeapSize || 0;
    
    // 创建和销毁大量组件
    for (let i = 0; i < 100; i++) {
      const wrapper = mount(TestComponent);
      wrapper.unmount();
    }
    
    // 强制垃圾回收
    if (global.gc) {
      global.gc();
    }
    
    const finalMemory = performance.memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;
    
    expect(memoryIncrease).toBeLessThan(1024 * 1024); // 小于1MB
  });
});
```

### 后端性能测试
```java
// API性能测试
@Test
void shouldHandleHighConcurrency() throws InterruptedException {
    int threadCount = 100;
    int requestsPerThread = 10;
    CountDownLatch latch = new CountDownLatch(threadCount);
    List<Long> responseTimes = Collections.synchronizedList(new ArrayList<>());
    
    ExecutorService executor = Executors.newFixedThreadPool(threadCount);
    
    for (int i = 0; i < threadCount; i++) {
        executor.submit(() -> {
            try {
                for (int j = 0; j < requestsPerThread; j++) {
                    long startTime = System.currentTimeMillis();
                    
                    ResponseEntity<String> response = restTemplate.getForEntity(
                        "/api/knowledge/list", String.class);
                    
                    long endTime = System.currentTimeMillis();
                    responseTimes.add(endTime - startTime);
                    
                    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
                }
            } finally {
                latch.countDown();
            }
        });
    }
    
    latch.await(30, TimeUnit.SECONDS);
    
    // 验证性能指标
    double avgResponseTime = responseTimes.stream()
        .mapToLong(Long::longValue)
        .average()
        .orElse(0.0);
    
    assertThat(avgResponseTime).isLessThan(500); // 平均响应时间小于500ms
    
    long p95ResponseTime = responseTimes.stream()
        .mapToLong(Long::longValue)
        .sorted()
        .skip((long) (responseTimes.size() * 0.95))
        .findFirst()
        .orElse(0L);
    
    assertThat(p95ResponseTime).isLessThan(1000); // P95响应时间小于1秒
}

// 数据库性能测试
@Test
void shouldOptimizeQueries() {
    // 测试复杂查询性能
    long startTime = System.currentTimeMillis();
    
    Page<KnowledgePoint> result = knowledgePointRepository.findByUserIdWithFilters(
        "user123", 
        KnowledgePointFilter.builder()
            .tags(Arrays.asList("Java", "Spring"))
            .difficulty(Difficulty.MEDIUM)
            .build(),
        PageRequest.of(0, 20)
    );
    
    long endTime = System.currentTimeMillis();
    long queryTime = endTime - startTime;
    
    assertThat(queryTime).isLessThan(200); // 查询时间小于200ms
    assertThat(result.getContent()).isNotEmpty();
}

// 缓存性能测试
@Test
void shouldUtilizeCacheEffectively() {
    String userId = "user123";
    
    // 第一次查询（缓存未命中）
    long startTime1 = System.currentTimeMillis();
    List<KnowledgeBase> result1 = knowledgeBaseService.getUserKnowledgeBases(userId);
    long endTime1 = System.currentTimeMillis();
    
    // 第二次查询（缓存命中）
    long startTime2 = System.currentTimeMillis();
    List<KnowledgeBase> result2 = knowledgeBaseService.getUserKnowledgeBases(userId);
    long endTime2 = System.currentTimeMillis();
    
    long firstQueryTime = endTime1 - startTime1;
    long secondQueryTime = endTime2 - startTime2;
    
    assertThat(result1).isEqualTo(result2);
    assertThat(secondQueryTime).isLessThan(firstQueryTime / 10); // 缓存查询至少快10倍
}
```

### 负载测试
```javascript
// 使用K6进行负载测试
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // 2分钟内增加到100个用户
    { duration: '5m', target: 100 }, // 保持100个用户5分钟
    { duration: '2m', target: 200 }, // 2分钟内增加到200个用户
    { duration: '5m', target: 200 }, // 保持200个用户5分钟
    { duration: '2m', target: 0 },   // 2分钟内减少到0个用户
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95%的请求响应时间小于500ms
    http_req_failed: ['rate<0.1'],    // 错误率小于10%
  },
};

export default function() {
  // 用户登录
  let loginResponse = http.post('http://localhost:8080/api/auth/login', {
    username: 'testuser',
    password: 'password'
  });
  
  check(loginResponse, {
    '登录成功': (r) => r.status === 200,
    '获取到token': (r) => r.json('token') !== '',
  });
  
  let token = loginResponse.json('token');
  let headers = { 'Authorization': `Bearer ${token}` };
  
  // 获取知识库列表
  let knowledgeResponse = http.get('http://localhost:8080/api/knowledge/bases', {
    headers: headers
  });
  
  check(knowledgeResponse, {
    '知识库列表获取成功': (r) => r.status === 200,
    '响应时间合理': (r) => r.timings.duration < 500,
  });
  
  // 开始复习
  let reviewResponse = http.get('http://localhost:8080/api/review/questions', {
    headers: headers
  });
  
  check(reviewResponse, {
    '复习题目获取成功': (r) => r.status === 200,
    '题目数量正确': (r) => r.json('questions').length > 0,
  });
  
  sleep(1); // 等待1秒模拟用户思考时间
}
```

### 性能监控
```typescript
// 性能指标收集
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  
  measureApiCall(name: string, fn: () => Promise<any>) {
    const startTime = performance.now();
    
    return fn().finally(() => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      
      this.metrics.get(name)!.push(duration);
    });
  }
  
  getMetrics(name: string) {
    const values = this.metrics.get(name) || [];
    
    return {
      count: values.length,
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      p95: this.percentile(values, 95),
      p99: this.percentile(values, 99)
    };
  }
  
  private percentile(values: number[], p: number): number {
    const sorted = values.slice().sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * p / 100) - 1;
    return sorted[index];
  }
}

// 使用示例
const monitor = new PerformanceMonitor();

// 监控API调用
await monitor.measureApiCall('getKnowledgeBases', () => 
  knowledgeService.getKnowledgeBases()
);

// 监控组件渲染
await monitor.measureApiCall('renderKnowledgeList', () => 
  new Promise(resolve => {
    const wrapper = mount(KnowledgeList, { props: { data: largeDataset } });
    nextTick(resolve);
  })
);
```

## ✅ 验收标准

1. **前端性能指标**
   - 首屏加载时间 < 2秒
   - 页面切换时间 < 500ms
   - 列表渲染时间 < 100ms
   - 内存使用稳定无泄漏

2. **后端性能指标**
   - API平均响应时间 < 300ms
   - P95响应时间 < 500ms
   - 支持100+并发用户
   - 数据库查询时间 < 200ms

3. **系统整体性能**
   - 支持1000+知识点流畅操作
   - 支持100+用户同时在线
   - 缓存命中率 > 80%
   - 系统可用性 > 99.9%

4. **用户体验指标**
   - 操作响应时间 < 200ms
   - 页面加载无明显卡顿
   - 滚动操作流畅（60fps）
   - 错误率 < 1%

5. **资源使用效率**
   - 内存使用合理
   - CPU使用率 < 70%
   - 网络带宽利用率优化
   - 存储空间使用合理

---

**下一任务**: Task-3.2-部署与运维 