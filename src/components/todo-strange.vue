<script setup>
import { ref, reactive, computed } from "vue";

const text = ref('')
const todo = reactive({
    list: [{text:'2112'},{text:'22332'}]
});

const todoList = computed(() => todo.list)

const addOne = () => {
    if(text.value === ""){
        alert("Пожалуйста, введите содержание")
        return
    }
    const content = {"text":text.value}
    todo.list.push(content)
    text.value = ""
};
const deleteOne = (listText) => {
    todo.list = todo.list.filter(list => list.text !== listText)
};
</script>

<template>
    <div>
        <h2>Пример todo list</h2>
        <input placeholder="Пожалуйста, введите список дел" v-model="text" @keyup.enter="addOne"/>
        <button @click="addOne">Разместить</button>
        <p v-for="(list,i) in todoList" :key="i">
            <span>{{list.text}}</span>
            <button @click.prevent="deleteOne(list.text)">Удалить</button>
        </p>
        <div class="line-block"></div>
    </div>
</template>
  
<style scoped>
h2 {
    color: #4fc08d;
    padding-bottom: 20px;
    border-bottom: 1px solid green;
}

h2,
p {
    font-family: Arial, Helvetica, sans-serif;
}

.line-block {
    border-bottom: 3px solid black;
}
</style>