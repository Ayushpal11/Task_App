import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import FilterButtons from "./components/FilterButtons";
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi';
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), status: "pending" }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const reorderTasks = (startIndex, endIndex) => {
    const currentTasks = getFilteredTasks();

    // Get the actual tasks being moved
    const sourceTask = currentTasks[startIndex];
    const destinationTask = currentTasks[endIndex];

    // Find their positions in the original array
    const allTasks = [...tasks];
    const sourcePos = allTasks.findIndex(t => t.id === sourceTask.id);
    const destPos = allTasks.findIndex(t => t.id === destinationTask.id);

    // Perform the reorder
    const taskToMove = allTasks[sourcePos];
    allTasks.splice(sourcePos, 1);
    allTasks.splice(destPos, 0, taskToMove);

    setTasks(allTasks);
  };

  const toggleStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
          : task
      )
    );
  };

  const editTask = (taskId, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task))
    );
  };

  const getFilteredTasks = () => {
    return tasks
      .filter((task) => (filter === "all" ? true : task.status === filter))
      .filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const pendingTasks = getFilteredTasks().filter(task => task.status === "pending");
  const completedTasks = getFilteredTasks().filter(task => task.status === "completed");

  const handleReorderWithinSection = (startIndex, endIndex, status) => {
    const relevantTasks = status === "pending" ? pendingTasks : completedTasks;
    const sourceTask = relevantTasks[startIndex];
    const destTask = relevantTasks[endIndex];

    // Find positions in the original array
    const allTasks = [...tasks];
    const sourcePos = allTasks.findIndex(t => t.id === sourceTask.id);
    const destPos = allTasks.findIndex(t => t.id === destTask.id);

    // Perform the reorder
    const [taskToMove] = allTasks.splice(sourcePos, 1);
    allTasks.splice(destPos, 0, taskToMove);

    setTasks(allTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 flex justify-center items-center px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400">
          Task Manager
        </h1>

        {/* Task Form */}
        <div className="mb-6">
          <TaskForm onSubmit={addTask} />
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-gray-800/60 backdrop-blur-lg rounded-lg shadow-lg p-4 border border-gray-700 mb-6">
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FilterButtons currentFilter={filter} setFilter={setFilter} />
          </div>
        </div>

        {/* Task Lists Container */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 p-4">
          {/* Pending Tasks Section */}
          {(filter === "all" || filter === "pending") && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Pending Tasks</h2>
              {pendingTasks.length > 0 ? (
                <TaskList
                  tasks={pendingTasks}
                  onDelete={deleteTask}
                  onToggle={toggleStatus}
                  onEdit={editTask}
                  onReorder={(start, end) => handleReorderWithinSection(start, end, "pending")}
                />
              ) : (
                <div className="task-card text-center text-gray-400 p-4 rounded-lg">
                  No pending tasks
                </div>
              )}
            </div>
          )}

          {/* Completed Tasks Section */}
          {(filter === "all" || filter === "completed") && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Completed Tasks</h2>
              {completedTasks.length > 0 ? (
                <TaskList
                  tasks={completedTasks}
                  onDelete={deleteTask}
                  onToggle={toggleStatus}
                  onEdit={editTask}
                  onReorder={(start, end) => handleReorderWithinSection(start, end, "completed")}
                />
              ) : (
                <div className="task-card text-center text-gray-400 p-4 rounded-lg">
                  No completed tasks
                </div>
              )}
            </div>
          )}

          {/* No Tasks Message */}
          {pendingTasks.length === 0 && completedTasks.length === 0 && (
            <div className="task-card text-center text-gray-400 p-4 rounded-lg">
              No tasks found. Add some tasks to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;