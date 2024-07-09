// //added instant update

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BiColor } from 'react-icons/bi';

// const TodoListDetails = ({ todoList, token, updateTodoLists }) => {
//   const [tasks, setTasks] = useState(todoList.tasks);
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//     priority: '',
//   });

//   useEffect(() => {
//     setTasks(todoList.tasks); // Sync tasks with the parent component's state
//   }, [todoList.tasks]);

//   const addTask = async (e) => {
//     e.preventDefault();
//     const response = await axios.post(
//       `https://todo-backend-1-cxgn.onrender.com/api/todos/add-task`,
//       { todoId: todoList._id, ...newTask },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setTasks([...tasks, response.data.todo.tasks[response.data.todo.tasks.length - 1]]);
//     setNewTask({ title: '', description: '', dueDate: '', priority: '' });
//     updateTodoLists(response.data.todo);
//   };

//   const handleDragStart = (e, task) => {
//     e.dataTransfer.setData('task', JSON.stringify(task));
//     e.dataTransfer.setData('sourceListId', todoList._id);
//   };

//   const handleDrop = async (e, destinationListId) => {
//     e.preventDefault();
//     const task = JSON.parse(e.dataTransfer.getData('task'));
//     const sourceListId = e.dataTransfer.getData('sourceListId');

//     if (sourceListId === destinationListId) {
//       return;
//     }

//     // Add the task to the new list
//     const addTaskResponse = await axios.post(
//       `https://todo-backend-1-cxgn.onrender.com/api/todos/add-task`,
//       { todoId: destinationListId, ...task },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // Remove the task from the old list
//     const removeTaskResponse = await axios.post(
//       `https://todo-backend-1-cxgn.onrender.com/api/todos/remove-task`,
//       { todoId: sourceListId, taskId: task._id },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // Fetch the updated lists
//     const updatedListsResponse = await axios.get(
//       `https://todo-backend-1-cxgn.onrender.com/api/todos/${token}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     updateTodoLists(addTaskResponse.data.todo);
//   };

//   return (
//     <div
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={(e) => handleDrop(e, todoList._id)}
//     >
//       <h3 className="text-3xl font-bold underline text-red-800" >{todoList.name}</h3>
//       <form onSubmit={addTask}>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={newTask.title}
//           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           required
//         />
//         <textarea
//           placeholder="Task Description"
//           value={newTask.description}
//           onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//           required
//         ></textarea>
//         <input
//           type="date"
//           value={newTask.dueDate}
//           onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
//           required
//         />
//         <select
//           value={newTask.priority}
//           onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
//           required
//         >
//           <option value="">Select Priority</option>
//           <option value="Low">Low</option>
//           <option value="Medium">Medium</option>
//           <option value="High">High</option>
//         </select>
//         <button type="submit">Add Task</button>
//       </form>
//       <ul>
//         {tasks.map((task) => (
//           <li
//             key={task._id}
//             draggable
//             onDragStart={(e) => handleDragStart(e, task)}
//           >
//             <h4 >{task.title}</h4>
//             <p>{task.description}</p>
//             <p>Due Date: {task.dueDate}</p>
//             <p>Priority: {task.priority}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoListDetails;




//new

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './TodoListDetails.css';

const TodoListDetails = ({ todoList, token, updateTodoLists }) => {
  const [tasks, setTasks] = useState(todoList.tasks);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
  });

  useEffect(() => {
    setTasks(todoList.tasks); // Sync tasks with the parent component's state
  }, [todoList.tasks]);

  const addTask = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `https://todo-backend-1-cxgn.onrender.com/api/todos/add-task`,
      { todoId: todoList._id, ...newTask },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks([...tasks, response.data.todo.tasks[response.data.todo.tasks.length - 1]]);
    setNewTask({ title: '', description: '', dueDate: '', priority: '' });
    updateTodoLists(response.data.todo);
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
    e.dataTransfer.setData('sourceListId', todoList._id);
  };

  const handleDrop = async (e, destinationListId) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('task'));
    const sourceListId = e.dataTransfer.getData('sourceListId');

    if (sourceListId === destinationListId) {
      return;
    }

    // Add the task to the new list
    const addTaskResponse = await axios.post(
      `https://todo-backend-1-cxgn.onrender.com/api/todos/add-task`,
      { todoId: destinationListId, ...task },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Remove the task from the old list
    const removeTaskResponse = await axios.post(
      `https://todo-backend-1-cxgn.onrender.com/api/todos/remove-task`,
      { todoId: sourceListId, taskId: task._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Fetch the updated lists
    const updatedListsResponse = await axios.get(
      `https://todo-backend-1-cxgn.onrender.com/api/todos/${token}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    updateTodoLists(addTaskResponse.data.todo);
  };

  const handlePriorityDrop = async (e, priority) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('task'));
    const updatedTask = { ...task, priority };

    // Update task priority in backend
    const updateTaskResponse = await axios.post(
      `https://todo-backend-1-cxgn.onrender.com/api/todos/update-task`,
      { todoId: todoList._id, taskId: task._id, priority },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    updateTodoLists(updateTaskResponse.data.todo);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, todoList._id)}
      className="todo-list-details"
    >
      <h3 className="text-3xl font-bold underline text-red-800">{todoList.name}</h3>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          required
        ></textarea>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          required
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          required
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <div className="priority-buttons">
        <button
          className="priority-button high"
          onDrop={(e) => handlePriorityDrop(e, 'High')}
          onDragOver={(e) => e.preventDefault()}
        >
          High
        </button>
        <button
          className="priority-button medium"
          onDrop={(e) => handlePriorityDrop(e, 'Medium')}
          onDragOver={(e) => e.preventDefault()}
        >
          Medium
        </button>
        <button
          className="priority-button low"
          onDrop={(e) => handlePriorityDrop(e, 'Low')}
          onDragOver={(e) => e.preventDefault()}
        >
          Low
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListDetails;
