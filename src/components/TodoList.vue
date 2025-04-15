<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Todo {
  text: string
  completed: boolean
}

const todoInput = ref('')
const todos = ref<Todo[]>([])

// 从本地存储加载待办事项
onMounted(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
})

// 监听todos变化，保存到本地存储
watch(
  todos,
  (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  },
  { deep: true }
)

// 添加新的待办事项
function addTodo() {
  const text = todoInput.value.trim()
  if (text) {
    todos.value.push({
      text,
      completed: false
    })
    todoInput.value = ''
  }
}

// 切换待办事项的完成状态
function toggleComplete(index: number) {
  todos.value[index].completed = !todos.value[index].completed
}

// 删除待办事项
function deleteTodo(index: number) {
  todos.value.splice(index, 1)
}
</script>

<template>
  <div class="container">
    <h1>Todo App</h1>

    <div class="todo-input">
      <input 
        type="text" 
        v-model="todoInput" 
        placeholder="添加一个待办事项" 
        @keyup.enter="addTodo" 
      />
      <button @click="addTodo">添加 Todo</button>
    </div>

    <div class="todo-list">
      <div 
        v-for="(todo, index) in todos" 
        :key="index" 
        class="todo-item"
      >
        <input 
          type="checkbox" 
          :checked="todo.completed" 
          @change="toggleComplete(index)" 
        />
        <span 
          class="text" 
          :class="{ completed: todo.completed }"
        >
          {{ todo.text }}
        </span>
        <button 
          class="delete-btn" 
          @click="deleteTodo(index)"
        >
          del
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.todo-input {
  display: flex;
  margin-bottom: 2rem;
}

.todo-input input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 30px 0 0 30px;
  outline: none;
}

.todo-input button {
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 0 30px 30px 0;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo-input button:hover {
  background-color: #5b4cdb;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.todo-item input[type="checkbox"] {
  margin-right: 10px;
  cursor: pointer;
}

.todo-item .text {
  flex: 1;
}

.todo-item .completed {
  text-decoration: line-through;
  color: #aaa;
}

.todo-item .delete-btn {
  color: #e74c3c;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}
</style> 