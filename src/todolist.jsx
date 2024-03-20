import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import ConfirmationModal from './ConfirmationModal';
import deleteIcon from './assets/delete.png';
import editIcon from './assets/edit.png';
import './todolist.css';

const TodoList = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [todoText, setTodoText] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (todoText.trim() !== '') {
            setTodos([...todos, { text: todoText, done: false }]);
            setTodoText('');
        }
    };

    const handleDeleteTodo = (index) => {
        setDeleteIndex(index);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteAll = () => {
        setShowDeleteConfirmation(true);
    };

    const handleMarkAllDone = () => {
        const updatedTodos = todos.map((todo) => ({ ...todo, done: true }));
        setTodos(updatedTodos);
    };

    const handleEditTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].text = prompt('Enter new todo text:', todos[index].text) || todos[index].text;
        setTodos(updatedTodos);
    };

    const handleMarkDone = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].done = !updatedTodos[index].done;
        setTodos(updatedTodos);
    };

    const handleDeleteConfirm = () => {
        if (deleteIndex !== null) {
            const updatedTodos = todos.filter((_, i) => i !== deleteIndex);
            setTodos(updatedTodos);
            setDeleteIndex(null);
        } else {
            setTodos([]);
        }
        setShowDeleteConfirmation(false);
    };

    return (
        <div className="todo-list-container">
            <div className="header">To-Do List</div>
            <div className="actions">
                <InputGroup className="mb-3">
                    <FormControl
                        className="todo-input"
                        placeholder="Add a new to-do..."
                        value={todoText}
                        onChange={(e) => setTodoText(e.target.value)}
                    />
                    <Button className="add-btn" onClick={handleAddTodo}>
                        Add
                    </Button>
                </InputGroup>
                <div>
                    <Button variant="danger" className="delete-all-btn" onClick={handleDeleteAll}>
                        Delete All
                    </Button>
                    <Button variant="success" className="mark-all-btn" onClick={handleMarkAllDone}>
                        Mark All as Done
                    </Button>
                </div>
            </div>
            {todos.length === 0 ? (
                <p className="no-task">No task created.</p>
            ) : (
                <ul className="todos">
                    {todos.map((todo, index) => (
                        <li key={index} className={todo.done ? 'done' : ''}>
                            <div className="todo-item">
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => handleMarkDone(index)}
                                />
                                <span>{todo.text}</span>
                            </div>
                            <div className="actions">
                                <Button className="edit-btn" variant="outline-secondary" onClick={() => handleEditTodo(index)}>
                                <img src={editIcon} alt="Edit" width={20} height={20} />
                                </Button>
                                <Button className="delete-btn" variant="outline-danger" onClick={() => handleDeleteTodo(index)}>
                                <img src={deleteIcon} alt="Delete" width={20} height={20} />
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <ConfirmationModal
                show={showDeleteConfirmation}
                onHide={() => setShowDeleteConfirmation(false)}
                onConfirm={handleDeleteConfirm}
                deleteIndex={deleteIndex}
            />
        </div>
    );
};

export default TodoList;