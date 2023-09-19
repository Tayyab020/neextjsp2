"use client"
import axios from 'axios';
import React, { useState,useEffect } from 'react';

const TaskApp = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [todos, setTodos] = useState<any[]>([]);
  const[todo,setTodo]=useState({
    title:"",
    description:""
  })
 
const handelSubmit=async ()=>{
  try {
   
  console.log(todo)
  const res=await axios.post("api/todo/create",todo)
  setTodo({title:'',description:''
})
setIsPopupOpen(false);
  } catch (error:any) {
    console.log("failed "+error)
  }


}

const handleDelete = async (taskId:String) => {
 try {
    console.log(taskId);
    const res = await axios.delete(`/api/todo/delete?id=${taskId}`); // Make sure the URL is correct
    if (res.status === 200) {
      const updatedTodos = todos.filter(todo => todo._id !== taskId);
      setTodos(updatedTodos);
      console.log(`Task with ID ${taskId} deleted successfully.`);
      console.log(res.data); // Log the response data
    } else {
      console.error(`Error deleting task with ID ${taskId}:`, res);
    }
  } catch (error) {
    console.error(`Error deleting task with ID ${taskId}:`, error);
  }
};



useEffect(() => {
  const fetchTodos = async () => {
    try {
      const response = await axios.get("api/todo/read");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  fetchTodos();
}, [todo]);

  const handlePopupToggle = () => {
  
    setIsPopupOpen(true);
  };

  
  return (
      
   <div >
    <h1 className='py-3 text-center text-4xl font-bold text-white'>
     Todos App
    </h1>
    {todos.map((todo) => (
  <div key={todo._id} className='mt-2.5 w-full bg-white p-4 rounded-lg border-gray-200 shadow'>
    <div className="flex justify-between">
      <div>
        <h1 className='text-xl font-bold text-black'>{todo.title}</h1>
        <p className='text-gray-500'>{todo.description}</p>
      </div>
      <div className='flex gap-2'>
        <button 
       onClick= {() => handleDelete(todo._id)}
          type='button' 
          className='flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300'>
          D
        </button>
        <button 
          type='button' 
          className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'>
          E
        </button>
      </div>
    </div>
  </div>
))}

  <button type="button" className="fixed bottom-10 right-10 text-4xl rounded-full w-16 h-16 bg-red-700 text-white border-none cursor-pointer" onClick={handlePopupToggle}>
    +
 </button>


  {isPopupOpen && (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg shadow-lg relative">
      <button
        className="absolute top-3 right-4 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-x5"
      
        onClick={(e)=>setIsPopupOpen(false)}
      >
        X
      </button>
      <h2 className="text-xl font-bold mb-2 text-black">Add Task</h2>
      <div className="mb-4">
        <input
          type="text"
          className="w-full border p-2 rounded text-black"
          placeholder="Title"
          value={todo.title}
          onChange={(e) => setTodo({...todo,title:e.target.value})}
        />
      </div>
      <div className="mb-4">
        <textarea
          className="w-full border p-2 rounded text-black"
          placeholder="Description"
          value={todo.description}
        onChange={(e) =>setTodo ({...todo,description:e.target.value})}
        />
      </div>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handelSubmit}
      >
        Send
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default TaskApp;
