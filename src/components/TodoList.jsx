import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoListDetails from './TodoListDetails';

const TodoList = ({ token }) => {
  const [todoLists, setTodoLists] = useState([]);
  const [newTodoListName, setNewTodoListName] = useState('');
  const userId = token;

  useEffect(() => {
    const fetchTodoLists = async () => {
      const response = await axios.get(`https://todo-backend-1-cxgn.onrender.com/api/todos/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodoLists(response.data);
    };

    fetchTodoLists(); // Initial fetch

    const interval = setInterval(fetchTodoLists, 1000); // Fetch every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [token]);

  const addTodoList = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      'https://todo-backend-1-cxgn.onrender.com/api/todos/create',
      { name: newTodoListName, userId: `${userId}` },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTodoLists([...todoLists, response.data.toodo]);
    setNewTodoListName('');
  };

  const updateTodoLists = (updatedTodoList) => {
    setTodoLists((prevTodoLists) =>
      prevTodoLists.map((todoList) =>
        todoList._id === updatedTodoList._id ? updatedTodoList : todoList
      )
    );
  };

  return (
    <div>
      <h2>Todo Lists</h2>
      <form onSubmit={addTodoList}>
        <input
          type="text"
          placeholder="New Todo List"
          value={newTodoListName}
          onChange={(e) => setNewTodoListName(e.target.value)}
          required
        />
        <button type="submit">Add Todo List</button>
      </form>
      {todoLists.map((todoList) => (
        <TodoListDetails
          key={todoList._id}
          todoList={todoList}
          token={token}
          updateTodoLists={updateTodoLists}
        />
      ))}
    </div>
  );
};

export default TodoList;



