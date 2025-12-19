import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (input.trim() === "") {
      setError("Task cannot be empty");
      return;
    }

    setTasks([
      ...tasks,
      { text: input, completed: false }
    ]);

    setInput("");
    setError("");
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Toggle complete
  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Add task using Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="container">
      <div className="card">
        <h2>TODO - ITEMS</h2>

        <p className="counter">
          Completed: {completedCount} / {tasks.length}
        </p>

        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <span className={task.completed ? "done" : ""}>
              {task.text}
            </span>

            <button
              className="complete"
              onClick={() => toggleComplete(index)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button
              className="delete"
              onClick={() => deleteTask(index)}
            >
              ✖
            </button>
          </div>
        ))}

        <input
          type="text"
          placeholder="Add new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {error && <p className="error">{error}</p>}

        <button className="add" onClick={addTask}>
          Add Task
        </button>
      </div>
    </div>
  );
}

export default App;
