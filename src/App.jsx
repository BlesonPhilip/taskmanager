// import React, { useState } from "react";
// import "./App.css";
// import Nav from "./components/nav";

// const App = () => {
//   const [tasks, setTasks] = useState([
//     { id: 1, text: "Task 1", stage: "todo" },
//     { id: 2, text: "Task 2", stage: "in-progress" },
//     { id: 3, text: "Task 3", stage: "done" },
//   ]);
//   const [newTask, setNewTask] = useState("");

//   // Add a new task
//   const addTask = () => {
//     if (newTask.trim()) {
//       const task = {
//         id: Date.now(),
//         text: newTask,
//         stage: "todo",
//       };
//       setTasks([...tasks, task]);
//       setNewTask("");
//     }
//   };

//   // Delete a task
//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   // Edit a task
//   const editTask = (id, newText) => {
//     setTasks(
//       tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
//     );
//   };

//   // Handle drag start
//   const onDragStart = (e, id) => {
//     e.dataTransfer.setData("taskId", id);
//   };

//   // Handle drag over
//   const onDragOver = (e) => {
//     e.preventDefault();
//   };

//   // Handle drop
//   const onDrop = (e, stage) => {
//     const taskId = e.dataTransfer.getData("taskId");
//     const updatedTasks = tasks.map((task) =>
//       task.id === +taskId ? { ...task, stage } : task
//     );
//     setTasks(updatedTasks);
//   };

//   return (
//     <>
//       <Nav />

//       <div className="App">
//         <h1>Task Management App</h1>
//         <div className="task-input">
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Enter a new task"
//           />
//           <button onClick={addTask}>Add Task</button>
//         </div>
//         <div className="board">
//           {["todo", "in-progress", "done"].map((stage) => (
//             <div
//               key={stage}
//               className="column"
//               onDragOver={onDragOver}
//               onDrop={(e) => onDrop(e, stage)}
//             >
//               <h2>{stage.toUpperCase()}</h2>
//               <div className="tasks">
//                 {tasks
//                   .filter((task) => task.stage === stage)
//                   .map((task) => (
//                     <div
//                       key={task.id}
//                       className="task"
//                       draggable
//                       onDragStart={(e) => onDragStart(e, task.id)}
//                     >
//                       <input
//                         type="text"
//                         value={task.text}
//                         onChange={(e) => editTask(task.id, e.target.value)}
//                       />
//                       <button onClick={() => deleteTask(task.id)}>
//                         Delete
//                       </button>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;
import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import TaskModal from "./components/TaskModal"; // Import the new modal component

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "This is the first task",
      deadline: "2023-12-31",
      stage: "todo",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is the second task",
      deadline: "2023-11-15",
      stage: "in-progress",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is the third task",
      deadline: "2023-10-30",
      stage: "done",
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        description: "",
        deadline: "",
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

  // Handle task click to open modal
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Save task changes
  const handleSaveTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
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
      <Nav />
      <div className="App">
        <h1>Task Management App</h1>
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task title"
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
                      onClick={() => handleTaskClick(task)} // Open modal on click
                    >
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <p>Deadline: {task.deadline}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <TaskModal
            task={selectedTask}
            onClose={handleCloseModal}
            onSave={handleSaveTask}
            onDelete={deleteTask}
          />
        )}
      </div>
    </>
  );
};

export default App;
