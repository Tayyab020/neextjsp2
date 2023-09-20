"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface Todo {
  _id: string;
  title: string;
  description: string;
}

const TaskApp: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo>({
    _id: '',
    title: '',
    description: ''
  });

  const handlePopupToggle = () => {
    setIsEditing(false);
    setIsPopupOpen(true);
  };

  const resetForm = () => {
    setIsEditing(false);
    setTodo({
      _id: '',
      title: '',
      description: ''
    });
    setIsPopupOpen(false);
  };

  const handelSubmit = async () => {
    if (!isEditing) {
      try {
        const res = await axios.post("/api/todo/create", todo);
        console.log("Todo is " + todo);
        setTodo({
          _id: '',
          title: '',
          description: ''
        });
        setIsPopupOpen(false);
      } catch (error: any) {
        console.log("Failed " + error);
      }
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const res = await axios.delete(`/api/todo/delete?id=${taskId}`);
      if (res.status === 200) {
        const updatedTodos = todos.filter(todo => todo._id !== taskId);
        setTodos(updatedTodos);
        console.log(`Task with ID ${taskId} deleted successfully.`);
      } else {
        console.error(`Error deleting task with ID ${taskId}:`, res);
      }
    } catch (error: any) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/api/todo/update?id=${todo._id}`, todo);
      setIsEditing(false);
      // After successful edit, clear the form and close the popup
      setTodo({
        _id: '',
        title: '',
        description: ''
      });
      setIsPopupOpen(false);
    } catch (error: any) {
      console.error(`Error editing task with ID ${todo._id}:`, error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todo/read");
        setTodos(response.data);
      } catch (error: any) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [todo]);

  return (
    <div>
      <h1 className='py-3 text-center text-4xl font-bold text-white'>
        Todos App
      </h1>

      {todos.map(todo => (
        <div
          key={todo._id}
          className='mt-2.5 w-full bg-white p-4 rounded-lg border-gray-200 shadow'
        >
          <div className='flex justify-between'>
            <div>
              <h1 className='text-xl font-bold text-black'>{todo.title}</h1>
              <p className='text-gray-500'>{todo.description}</p>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => handleDelete(todo._id)}
                type='button'
                className='flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300'
              >
                D
              </button>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setIsPopupOpen(true);
                  setTodo({
                    _id: todo._id,
                    title: todo.title,
                    description: todo.description
                  });
                }}
                type='button'
                className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
              >
                E
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="fixed bottom-10 right-10 text-4xl rounded-full w-16 h-16 bg-red-700 text-white border-none cursor-pointer"
        onClick={handlePopupToggle}
      >
        +
      </button>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-4 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-x5"
              onClick={resetForm}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-2 text-black">
              {isEditing ? "Edit Task" : "Add Task"}
            </h2>
            <div className="mb-4">
              <input
                type="text"
                className="w-full border p-2 rounded text-black"
                placeholder="Title"
                value={todo.title}
                onChange={e => setTodo({ ...todo, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full border p-2 rounded text-black"
                placeholder="Description"
                value={todo.description}
                onChange={e =>
                  setTodo({ ...todo, description: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={isEditing ? handleEdit : handelSubmit}
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskApp;
