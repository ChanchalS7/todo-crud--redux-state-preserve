import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	todos: JSON.parse(localStorage.getItem('todos')) || [],
	filter: localStorage.getItem('filter') || 'all'
}

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		//create todo
		addTodo: (state, action) => {
			state.todos.push(action.payload);
			localStorage.setItem('todos', JSON.stringify(state.todos))
		},
		// remove todo
		removeTodo: (state, action) => {
			state.todos = state.todos.filter(todo => todo.id !== action.payload);
			localStorage.setItem('todos', JSON.stringify(state.todos));
		},
		//toggle todo
		toggleTodo: (state, action) => {
			const todo = state.todos.find(todo => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
				localStorage.setItem("todos", JSON.stringify(state.todos));
			}
		},
		//filter todo
		setFilter: (state, action) => {
			state.filter = action.payload;
			localStorage.setItem('filter', state.filter)
		},
	},
});
export const { addTodo, removeTodo, toggleTodo, setFilter } = todoSlice.actions
export default todoSlice.reducer;