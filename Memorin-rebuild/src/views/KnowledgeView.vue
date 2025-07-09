<template>
  <div class="knowledge-view">
    <div class="container">
      <h2>📚 知识管理</h2>
      <p>知识管理功能正在开发中...</p>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// 知识管理页面逻辑
</script>

<style scoped>
.knowledge-view {
  color: #333;
  padding: 2rem 0;
}

.knowledge-view h2 {
  color: #2c3e50;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.knowledge-view p {
  color: #6c757d;
}
</style> 