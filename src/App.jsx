import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "low", // Default priority
  });
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false); // State for modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // Task being edited

  // Open the add task modal
  const openAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  // Close the add task modal
  const closeAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "low",
    });
  };

  // Add a new task
  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        stage: "todo", // Default stage for new tasks
      };
      setTasks([...tasks, task]);
      closeAddTaskModal(); // Close the modal after adding the task
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Open edit modal and set task to edit
  const openEditModal = (task) => {
    setTaskToEdit(task); // Set the task to edit
    setIsEditModalOpen(true); // Open the modal
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null); // Reset the task to edit
  };

  // Save edited task
  const saveEditedTask = () => {
    if (taskToEdit.title.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === taskToEdit.id ? { ...task, ...taskToEdit } : task
        )
      );
      closeEditModal();
    } else {
      alert("Title is required!");
    }
  };

  // Handle input changes in the edit modal
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setTaskToEdit({ ...taskToEdit, [name]: value });
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
        <div className="board">
          {["todo", "in-progress", "done"].map((stage) => (
            <div
              key={stage}
              className="column"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, stage)}
              onClick={stage === "todo" ? openAddTaskModal : undefined} // Open modal when clicking on "Todo"
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
                      <h3>Title: {task.title}</h3>
                      <p>Description: {task.description}</p>
                      <p>Deadline: {task.deadline}</p>
                      <p>Priority: {task.priority}</p>
                      <button onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                      <button onClick={() => openEditModal(task)}>Edit</button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Title"
            />
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Description"
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
            />
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="modal-actions">
              <button onClick={closeAddTaskModal}>Cancel</button>
              <button onClick={addTask}>Add Task</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <input
              type="text"
              name="title"
              value={taskToEdit.title}
              onChange={handleEditInputChange}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={taskToEdit.description}
              onChange={handleEditInputChange}
              placeholder="Description"
            />
            <input
              type="date"
              name="deadline"
              value={taskToEdit.deadline}
              onChange={handleEditInputChange}
            />
            <select
              name="priority"
              value={taskToEdit.priority}
              onChange={handleEditInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="modal-actions">
              <button onClick={closeEditModal}>Cancel</button>
              <button onClick={saveEditedTask}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
