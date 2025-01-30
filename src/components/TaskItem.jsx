import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleEdit = () => {
        onEdit(task.id, {
            title: editedTitle,
            description: editedDescription
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="border border-gray-700 rounded-lg p-4 mb-4 bg-gray-800/50">
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full mb-2 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                />
                <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full mb-2 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleEdit}
                        className="p-2 text-green-400 hover:bg-gray-700 rounded"
                    >
                        <Check size={16} />
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="p-2 text-red-400 hover:bg-gray-700 rounded"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`border border-gray-700 rounded-lg p-4 mb-4 ${task.status === 'completed' ? 'bg-gray-800/30' : 'bg-gray-800/50'
            }`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-200'
                        }`}>
                        {task.title}
                    </h3>
                    <p className={`mt-1 ${task.status === 'completed' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                        {task.description}
                    </p>
                </div>
                <div className="flex gap-2 ml-4">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-sky-400 hover:bg-gray-700 rounded"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-red-400 hover:bg-gray-700 rounded"
                    >
                        <Trash2 size={16} />
                    </button>
                    <button
                        onClick={() => onToggle(task.id)}
                        className={`p-2 rounded ${task.status === 'completed'
                                ? 'text-gray-400 hover:bg-gray-700'
                                : 'text-green-400 hover:bg-gray-700'
                            }`}
                    >
                        <Check size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;