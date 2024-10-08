import logo from "./logo.svg";
import "./App.css";

import TaskManagement from "./TaskManagement";

function App() {
  return (
    <div className="App">
      <h1>Task Organizer</h1>
      <TaskManagement />
    </div>
  );
}

export default App;
// import React, { useReducer, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // Initial state for the task management
// const initialState = {
//   tasks: {
//     todo: [
//       { id: "1", content: "Task 1" },
//       { id: "2", content: "Task 2" },
//     ],
//     inProgress: [{ id: "3", content: "Task 3" }],
//     completed: [],
//   },
// };

// // Reducer function to manage task state
// function taskReducer(state, action) {
//   switch (action.type) {
//     case "UPDATE_TASKS":
//       return { ...state, tasks: action.payload };
//     case "ADD_TASK":
//       return {
//         ...state,
//         tasks: {
//           ...state.tasks,
//           todo: [...state.tasks.todo, action.payload],
//         },
//       };
//     default:
//       return state;
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(taskReducer, initialState);
//   const [taskContent, setTaskContent] = useState("");

//   const handleOnDragEnd = (result) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) return;

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const startColumn = state.tasks[source.droppableId];
//     const finishColumn = state.tasks[destination.droppableId];

//     const newStartColumn = Array.from(startColumn);
//     const newFinishColumn =
//       destination.droppableId === source.droppableId
//         ? newStartColumn
//         : Array.from(finishColumn);

//     const [movedTask] = newStartColumn.splice(source.index, 1);
//     newFinishColumn.splice(destination.index, 0, movedTask);

//     const newTasks = {
//       ...state.tasks,
//       [source.droppableId]: newStartColumn,
//       [destination.droppableId]: newFinishColumn,
//     };

//     dispatch({ type: "UPDATE_TASKS", payload: newTasks });
//   };

//   // Function to add a new task
//   const addTask = () => {
//     if (!taskContent) return; // Prevent adding empty tasks

//     const newTask = {
//       id: String(Date.now()), // Unique ID for the task
//       content: taskContent,
//     };

//     dispatch({ type: "ADD_TASK", payload: newTask });
//     setTaskContent(""); // Clear the input after adding the task
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={taskContent}
//         onChange={(e) => setTaskContent(e.target.value)}
//         placeholder="Add a new task"
//       />
//       <button onClick={addTask}>Add Task</button>

//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <div style={{ display: "flex", justifyContent: "space-around" }}>
//           {Object.keys(state.tasks).map((columnId) => (
//             <Column
//               key={columnId}
//               title={columnId}
//               tasks={state.tasks[columnId]}
//               columnId={columnId}
//             />
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }

// function Column({ title, tasks, columnId }) {
//   return (
//     <Droppable droppableId={columnId}>
//       {(provided) => (
//         <div
//           {...provided.droppableProps}
//           ref={provided.innerRef}
//           style={{
//             background: "#f4f5f7",
//             padding: "8px",
//             width: "250px",
//             minHeight: "400px",
//           }}
//         >
//           <h3>{title}</h3>
//           {tasks.map((task, index) => (
//             <Task key={task.id} task={task} index={index} />
//           ))}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>
//   );
// }

// function Task({ task, index }) {
//   return (
//     <Draggable draggableId={task.id} index={index}>
//       {(provided) => (
//         <div
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//           style={{
//             ...provided.draggableProps.style,
//             userSelect: "none",
//             padding: "16px",
//             margin: "0 0 8px 0",
//             backgroundColor: "#fff",
//             borderRadius: "4px",
//             boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           {task.content}
//         </div>
//       )}
//     </Draggable>
//   );
// }

// export default App;
