import { reactive } from 'vue'

export const store = {
    storeTodo: reactive({
        list: [{text: 'qwerty', table: 'Легко'}, {text: 'hello', table: 'Не, ну это полная...'}]
    }),
    storeTable: reactive({
        list: [{text: 'Легко'}, {text: 'Я просто не подготовился'}, {text: 'Не, ну это полная...'}]
    })
}