import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

export const useTodoStore = defineStore('todo', () => {
    const count = ref(1)
    const name = ref('Иван')
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }
  
    return { count, name, doubleCount, increment }
})