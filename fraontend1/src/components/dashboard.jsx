import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const navigate = useNavigate();

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index]);
  };

  const submitEdit = (index) => {
    if (editedTask.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="px-3 py-2 border rounded"
          placeholder="Add a new task..."
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>

      <ul className="w-80 bg-white shadow-md rounded-md p-4">
        {tasks.length === 0 ? (
          <li className="text-gray-500 text-center">No tasks yet!</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-b">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => submitEdit(index)}
                    className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                  >
                    ✅
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="ml-2 px-2 py-1 bg-gray-400 text-white rounded"
                  >
                    ❌
                  </button>
                </>
              ) : (
                <>
                  {task}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(index)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => removeTask(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>

      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};
