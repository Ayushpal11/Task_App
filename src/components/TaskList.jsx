import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onToggle, onEdit, onReorder }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    if (tasks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No tasks found. Add some tasks to get started!
            </div>
        );
    }

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (index !== dragOverIndex) {
            setDragOverIndex(index);
        }
    };

    const handleDragEnd = () => {
        if (draggedIndex !== null && dragOverIndex !== null) {
            onReorder(draggedIndex, dragOverIndex);
        }
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragLeave = (e) => {
        // Only reset if we're actually leaving the list item
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setDragOverIndex(null);
        }
    };

    return (
        <div className="space-y-4">
            {tasks.map((task, index) => (
                <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragLeave={handleDragLeave}
                    className={`
            transform transition-transform duration-200
            ${draggedIndex === index ? 'opacity-50' : ''}
            ${dragOverIndex === index ? 'border-t-2 border-blue-500' : ''}
          `}
                >
                    <div className={`
            relative
            ${dragOverIndex === index ? 'translate-y-2' : ''}
            transition-all duration-200
          `}>
                        <TaskItem
                            task={task}
                            onDelete={onDelete}
                            onToggle={onToggle}
                            onEdit={onEdit}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;