import React, { useReducer, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Initial state for the task management
const initialState = {
  tasks: {
    todo: [
      { id: "1", content: "Task 1" },
      { id: "2", content: "Task 2" },
    ],
    inProgress: [{ id: "3", content: "Task 3" }],
    completed: [],
  },
};

// Reducer function to manage task state
function taskReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          todo: [...state.tasks.todo, action.payload],
        },
      };
    case "DELETE_TASK":
      const updatedTasks = {
        ...state.tasks,
        [action.columnId]: state.tasks[action.columnId].filter(
          (task) => task.id !== action.taskId
        ),
      };
      return { ...state, tasks: updatedTasks };
    case "EDIT_TASK":
      const { taskId, newContent, columnId } = action.payload;
      const editedTasks = {
        ...state.tasks,
        [columnId]: state.tasks[columnId].map((task) =>
          task.id === taskId ? { ...task, content: newContent } : task
        ),
      };
      return { ...state, tasks: editedTasks };
    default:
      return state;
  }
}

function TaskManagement() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [taskContent, setTaskContent] = useState("");

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId && //iD is comparing to columns
      destination.index === source.index //index compares the position of task inside column
    ) {
      return;
    }

    const startColumn = state.tasks[source.droppableId];
    const finishColumn = state.tasks[destination.droppableId];

    const newStartColumn = Array.from(startColumn);
    const newFinishColumn =
      destination.droppableId === source.droppableId
        ? newStartColumn
        : Array.from(finishColumn);

    const [movedTask] = newStartColumn.splice(source.index, 1);
    newFinishColumn.splice(destination.index, 0, movedTask);

    const newTasks = {
      ...state.tasks,
      [source.droppableId]: newStartColumn,
      [destination.droppableId]: newFinishColumn,
    };

    dispatch({ type: "UPDATE_TASKS", payload: newTasks });
  };

  // Function to add a new task
  const addTask = () => {
    if (!taskContent) return; // Prevent adding empty tasks

    const newTask = {
      id: String(Date.now()), // Unique ID for the task
      content: taskContent,
    };

    dispatch({ type: "ADD_TASK", payload: newTask });
    setTaskContent(""); // Clear the input after adding the task
  };

  // Function to delete a task
  const deleteTask = (taskId, columnId) => {
    dispatch({ type: "DELETE_TASK", taskId, columnId });
  };

  // Function to edit a task
  const editTask = (taskId, columnId) => {
    const newContent = prompt("Edit the task content:");
    if (newContent) {
      dispatch({
        type: "EDIT_TASK",
        payload: { taskId, newContent, columnId },
      });
    }
  };

  return (
    <div className="task-manager-container">
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Add a new task"
        className="task-input"
      />
      <button onClick={addTask} className="add-task-button">
        Add Task
      </button>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="task-columns">
          {Object.keys(state.tasks).map((columnId) => (
            <Column
              key={columnId}
              title={columnId}
              tasks={state.tasks[columnId]}
              columnId={columnId}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

function Column({ title, tasks, columnId, deleteTask, editTask }) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="task-column"
        >
          <h3>{title}</h3>
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              columnId={columnId}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function Task({ task, index, columnId, deleteTask, editTask }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task-card"
        >
          <div className="task-content">
            <p>{task.content}</p>
            <div className="task-buttons">
              <button
                className="edit-button"
                onClick={() => editTask(task.id, columnId)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id, columnId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskManagement;
