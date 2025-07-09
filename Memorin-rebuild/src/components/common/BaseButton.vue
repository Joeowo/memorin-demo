<template>
  <button 
    :class="['base-btn', `base-btn--${variant}`, { 'base-btn--loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

// Props定义
interface Props {
  variant?: 'primary' | 'secondary' | 'info'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false
})

// 事件定义
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.base-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 120px;
}

.base-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.base-btn:hover::before {
  left: 100%;
}

.base-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* Primary variant */
.base-btn--primary {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.base-btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
}

/* Secondary variant */
.base-btn--secondary {
  background: rgba(108, 117, 125, 0.8);
  color: white;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
}

.base-btn--secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
  background: rgba(108, 117, 125, 0.9);
}

/* Info variant */
.base-btn--info {
  background: rgba(23, 162, 184, 0.8);
  color: white;
  box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
}

.base-btn--info:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
  background: rgba(23, 162, 184, 0.9);
}

/* Loading state */
.base-btn--loading {
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .base-btn {
    width: 100%;
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .base-btn {
    font-size: 0.9rem;
    padding: 0.9rem 1.2rem;
  }
}
</style> 