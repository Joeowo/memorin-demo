# Task-2.0: 用户模块实现

> **任务状态**: ⏳ 待开始  
> **预计耗时**: 5天  
> **负责人**: 全栈开发工程师  

## 📋 任务概述

实现完整的用户认证授权系统，包括用户注册、登录、权限管理、数据隔离等功能。这是从单用户系统向多用户系统转换的关键模块。

## 🎯 任务目标

1. 实现用户注册和登录功能
2. 建立JWT令牌认证机制
3. 实现RBAC权限模型
4. 配置用户数据隔离
5. 支持第三方登录（可选）

## 📊 任务拆解

### 子任务2.0.1: 后端用户服务实现 (2天)
- 用户注册、登录API
- JWT令牌生成和验证
- 密码加密和安全策略
- 用户信息管理API

### 子任务2.0.2: 前端认证页面 (1.5天)
- 登录页面组件
- 注册页面组件
- 密码重置功能
- 表单验证和错误处理

### 子任务2.0.3: 权限控制实现 (1天)
- 路由守卫配置
- API权限拦截
- 角色权限管理
- 数据访问权限控制

### 子任务2.0.4: 数据迁移适配 (0.5天)
- LocalStorage数据关联用户
- 现有数据迁移脚本
- 数据隔离验证

## 🧪 测试方法

### 后端API测试
```java
@Test
void shouldAuthenticateUserSuccessfully() {
    LoginRequest request = new LoginRequest("testuser", "password");
    
    LoginResponse response = authService.login(request);
    
    assertThat(response.getToken()).isNotNull();
    assertThat(response.getUser().getUsername()).isEqualTo("testuser");
}

@Test
void shouldRejectInvalidCredentials() {
    LoginRequest request = new LoginRequest("testuser", "wrongpassword");
    
    assertThrows(AuthenticationException.class, 
        () -> authService.login(request));
}
```

### 前端组件测试
```typescript
describe('LoginForm.vue', () => {
  it('应该显示验证错误', async () => {
    const wrapper = mount(LoginForm);
    
    await wrapper.find('#username').setValue('');
    await wrapper.find('#password').setValue('');
    await wrapper.find('form').trigger('submit');
    
    expect(wrapper.text()).toContain('用户名不能为空');
    expect(wrapper.text()).toContain('密码不能为空');
  });
  
  it('应该成功提交登录表单', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ token: 'test-token' });
    const wrapper = mount(LoginForm, {
      global: {
        provide: { authService: { login: mockLogin } }
      }
    });
    
    await wrapper.find('#username').setValue('testuser');
    await wrapper.find('#password').setValue('password');
    await wrapper.find('form').trigger('submit');
    
    expect(mockLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password'
    });
  });
});
```

### 权限控制测试
```typescript
describe('路由守卫', () => {
  it('未登录用户应该重定向到登录页', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/login', name: 'Login', component: Login },
        { path: '/dashboard', name: 'Dashboard', component: Dashboard }
      ]
    });
    
    // 模拟未登录状态
    const authStore = useAuthStore();
    authStore.isAuthenticated = false;
    
    await router.push('/dashboard');
    
    expect(router.currentRoute.value.name).toBe('Login');
  });
});
```

### 数据隔离测试
```java
@Test
void shouldIsolateUserData() {
    // 用户1创建知识点
    User user1 = createUser("user1");
    KnowledgePoint kp1 = knowledgeService.createKnowledgePoint(
        user1.getId(), createKnowledgePointRequest());
    
    // 用户2不应该能访问用户1的数据
    User user2 = createUser("user2");
    List<KnowledgePoint> user2Data = knowledgeService
        .getKnowledgePoints(user2.getId());
    
    assertThat(user2Data).doesNotContain(kp1);
}
```

## ✅ 验收标准

1. **用户注册登录**
   - 用户可以成功注册新账户
   - 用户可以使用正确凭据登录
   - 密码加密存储
   - 表单验证完整

2. **令牌认证**
   - JWT令牌正确生成和验证
   - 令牌过期自动处理
   - 刷新令牌机制工作正常

3. **权限控制**
   - 路由守卫正确拦截未授权访问
   - API权限验证正常工作
   - 不同角色权限隔离正确

4. **数据隔离**
   - 用户只能访问自己的数据
   - 数据创建时正确关联用户ID
   - 跨用户数据访问被阻止

5. **用户体验**
   - 登录注册界面美观易用
   - 错误提示清晰友好
   - 加载状态和反馈及时

---

**下一任务**: Task-2.1-仪表盘模块重构 