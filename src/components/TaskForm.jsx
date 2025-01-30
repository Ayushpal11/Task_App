import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //const [priority, setPriority] = useState("Medium");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({ title, description });
        setTitle('');
        setDescription('');
        setPriority("Medium");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                    Task Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Enter task title"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500"
                    rows="3"
                    placeholder="Enter task description"
                />
            </div>
            {/* <select
                className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="High">🔥 High Priority</option>
                <option value="Medium">⚡ Medium Priority</option>
                <option value="Low">📉 Low Priority</option>
            </select> */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-purple-500 text-white py-2 px-4 rounded-md hover:from-sky-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;