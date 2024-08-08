import { useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { addTodo, removeTodo, toggleTodo, setFilter } from "../redux/todoSlice"
const TodoApp = () => {
	const [input, setInput] = useState('');
	const todos = useSelector(state => state.todos.todos);
	const filter = useSelector(state => state.todos.filter);
	const dispatch = useDispatch();

	//adding todo
	const handleAddTodo = () => {
		if (input.trim()) {
			dispatch(addTodo({ id: Math.random * 1000, text: input, completed: false }));
			setInput('')
		}
	};
	//filter todo
	const filteredTodos = todos.filter(todo => {
		if (filter === 'completed') return todo.completed;
		if (filter === 'active') return !todo.completed;
		return true
	})
	return (
		<>
			<h1>Todo Application</h1>
			<input
				style={{ padding: "15px", outline: "none", border: "2px solid black", borderRadius: "2px" }}
				type="text"
				placeholder="Add a todo"
				value={input}
				onChange={(e) => setInput(e.target.value)}

			/>
			<button style={{ padding: "15px" }} onClick={handleAddTodo}>Add todo</button>
			<div style={{ display: "flex", gap: "10px", padding: "10px", color: "GrayText" }}>
				<button onClick={() => dispatch(setFilter('all'))}>All</button>
				<button onClick={() => dispatch(setFilter('active'))}>Active</button>
				<button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
			</div>
			<ul>
				{
					filteredTodos.map(todo => (
						<li key={todo.id}>
							<span
								style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
								onClick={() => {
									console.log('Todo clicked', todo.id);
									dispatch(toggleTodo(todo.id));
								}}
							>
								{todo.text}
							</span>
							<button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
						</li>
					))
				}
			</ul>
		</>
	)
}

export default TodoApp
