import { useEffect, useState } from "react";
import api from "./services/api";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    api.get("/").then((response) => setTasks(response.data));
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) {
      alert("Please add a task before continuing.");
      return;
    }

    const response = await api.post("/", { title: newTask });
    setTasks([...tasks, response.data]);
    setNewTask("");
  };

  const toggleTask = async (id: string, completed: boolean) => {
    await api.put(`/${id}`, { completed: !completed });
    setTasks(tasks.map((task) => (task._id === id ? { ...task, completed: !completed } : task)));
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div className="container">
        <div className="input-container">
          <input
            className="input-field"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button className="btn-add" onClick={addTask}>
            Add
          </button>
        </div>
        <div className="span-container">
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <span className="span-task" onClick={() => toggleTask(task._id, task.completed)}>
                  {task.completed ? "✅" : "⬜"} {task.title}
                </span>
                <button className="btn-delete" onClick={() => deleteTask(task._id)}>🗑</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
