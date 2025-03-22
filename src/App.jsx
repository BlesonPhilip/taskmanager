import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", stage: "todo" },
    { id: 2, text: "Task 2", stage: "in-progress" },
    { id: 3, text: "Task 3", stage: "done" },
  ]);
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        stage: "todo",
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit a task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  // Handle drag start
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  // Handle drag over
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const onDrop = (e, stage) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) =>
      task.id === +taskId ? { ...task, stage } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="App">
        <h1>Task Management App</h1>
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="board">
          {["todo", "in-progress", "done"].map((stage) => (
            <div
              key={stage}
              className="column"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, stage)}
            >
              <h2>{stage.toUpperCase()}</h2>
              <div className="tasks">
                {tasks
                  .filter((task) => task.stage === stage)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="task"
                      draggable
                      onDragStart={(e) => onDragStart(e, task.id)}
                    >
                      <input
                        type="text"
                        value={task.text}
                        onChange={(e) => editTask(task.id, e.target.value)}
                      />
                      <button onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
