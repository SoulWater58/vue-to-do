<script setup>
import { computed, reactive, ref } from 'vue';

const text = ref('')
const num = ref('Легко')

const nameTable = ref('')

const todo = reactive({
    list: [{text: 'qwerty', table: 'Легко'}, {text: 'hello', table: 'Не, ну это полная...'}]
})

const table = reactive({
    list: [{text: 'Легко'}, {text: 'Я просто не подготовился'}, {text: 'Не, ну это полная...'}]
})

const tableList = computed(() => table.list)

function addTask() {
    let something = false

    if (text.value === '') {
        return
    }

    todo.list.forEach(item => {
        if (item.text === text.value) {
            something = true
        }
    });

    if (something == true) {
        alert('Такая задача уже есть')
        return
    }

    const content = {
        text: text.value,
        table: num.value
    }

    todo.list.push(content)
    text.value = ''
}

function deleteTask(text) {
    todo.list = todo.list.filter(list => list.text !== text)
}

function deleteTable(text) {
    let isVoid = true

    todo.list.forEach(item => {
        if (item.table === text) {
            isVoid = false
        }
    });

    if (!isVoid) {
        const isRemove = confirm('На этой доске еще весят задачи. Все равно удалить?')

        if (isRemove) {
            isVoid = true
            todo.list = todo.list.filter(list => list.table !== text)
        }
    }

    if (isVoid) {
        table.list = table.list.filter(list => list.text !== text)
    }
}

function addTable() {
    let something = false

    if (nameTable.value === '') {
        return
    }

    table.list.forEach(item => {
        if (item.text === nameTable.value) {
            something = true
        }
    });

    if (something == true) {
        alert('Доска с таким именем уже существует')
        return
    }

    const content = {text: nameTable.value}

    table.list.push(content)
    nameTable.value = ''

    setTimeout(initLastTable, 100)
}

window.addEventListener('DOMContentLoaded', () => {
    initTable()
})

function initTable() {
    const list = document.querySelectorAll('.list')
    
    list.forEach(item => {
        item.addEventListener('dragstart', (event) => {
            event.target.classList.add('selected')
        })
    
        item.addEventListener('dragend', (event) => {
            event.target.classList.remove('selected')
        })

        item.addEventListener('dragover', (event) => {
            const el = document.querySelector('.selected')
            item.appendChild(el)
        })
    });
}

function initLastTable() {
    const list = document.querySelectorAll('.list')
    const index = list.length - 1
    
    list[index].addEventListener('dragstart', (event) => {
        event.target.classList.add('selected')
    })

    list[index].addEventListener('dragend', (event) => {
        event.target.classList.remove('selected')
    })

    list[index].addEventListener('dragover', (event) => {
        const el = document.querySelector('.selected')
        list[index].appendChild(el)
    })
}

</script>

<template>
    <h2>Мой todo list</h2>
    <div class="top">
        <div class="top-container">
            <input class="top__input" v-model="text" placeholder="Добавить задачу" @keyup.enter="addTask">
            <select class="top__num-list" v-model="num">
                <option class="top__num-item" v-for="item in tableList">{{ item.text }}</option>
            </select>
        </div>
        <button class="top__button" @click="addTask">Добавить</button>
    </div>
    <div class="top top2">
        <input class="top__input top__input2" v-model="nameTable" placeholder="Добавить доску" @keyup.enter="addTable">
        <button class="top__button" @click="addTable">Добавить</button>
    </div>
    <div class="list-block">
        <div class="list" v-for="(item, i) in tableList" :key="i">
            <h4>{{ item.text }}</h4>
            <div class="list-item" v-for="(item, i) in todo.list.filter(list => list.table === item.text)" :key="i" draggable="true">
                <div class="list-item__text">{{ item.text }}</div>
                <button class="list-item__del" @click="deleteTask(item.text)">X</button>
            </div>
            <button class="top__button list__button" @click="deleteTable(item.text)">Удалить таблицу</button>
        </div>
    </div>
</template>

<style scoped>

h2 {
    color: rgb(18, 0, 48);
    border-bottom: 1px solid purple;
    padding-bottom: 40px;
}

h4 {
    margin: 0 0 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #000;
}

.top {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.top2 {
    margin-top: 15px;
}

.top__input, .top__button {
    font-size: 18px;
    padding: 5px 10px;
    color: rgb(35, 0, 92);
}

.top__input {
    display: block;
    border: 1px solid #17015200;
    border-bottom: 1px solid #160152;
    transition: 300ms;
    outline: none;
}

.top__num-list {
    border: 1px solid #160152;
    border-radius: 8px;
    outline: none;
    transition: 300ms;
    width: 100%;
    padding: 5px;
    margin-top: 5px;
}

.top__num-list:focus {
    border-radius: 10px;
    border: 1px solid #160152;
}

.top__input:focus {
    border-radius: 10px;
    border: 1px solid #160152;
}

.top__button {
    border: 1px solid #160152;
    transition: 300ms;
}

.top__button:hover {
    border-radius: 10px;
    background-color: #160152;
    color: #fff;
}

.top__button:active {
    background-color: #26018b;
}

.list-block {
    display: flex;
    justify-content: flex-start;
    padding-inline: 50px;
    gap: 20px;
    overflow-x: auto;
}

.list {
    margin: 40px 0;
    width: fit-content;
    padding: 10px 20px 20px;
    border: 1px solid black;
    position: relative;
    min-width: 300px;
    min-height: 400px;
}

.list-item {
    display: flex;
    justify-content: space-between;
    margin: 0 auto 10px;
    max-width: 400px;
    border-radius: 8px;
    padding: 5px 10px;
    border: 1px solid #160152;
    cursor: grab;
}

.list-item__text {
    word-break: break-all;
}

.list-item__del {
    padding: 0;
    margin: 0;
    line-height: 0;
    color: #6b0202;
    font-weight: 900;
    cursor: pointer;
    border: none;
    transition: 300ms;
}
.list-item__del:hover {
    border: none;
    color: #a70404;
}

.list-item__del:active {
    border: none;
    color: #914242;
}

.selected {
    opacity: 0.4;
}

.list__button {
    position: absolute;
    bottom: -20px;
}

.list__button:hover {
    background-color: #6b0202;
    border: 1px solid #6b0202;
}

.list__button:active {
    background-color: #501c1c;
    border: 1px solid #501c1c;
}

</style>