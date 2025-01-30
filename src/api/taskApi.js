const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const data = await response.json();
    return data.slice(0, 10).map(item => ({
        id: item.id,
        title: item.title,
        description: 'Task imported from JSONPlaceholder',
        status: item.completed ? 'completed' : 'pending',
        priority: 'Medium'
    }));
};

export const createTask = async (task) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            title: task.title,
            description: task.description,
            completed: false
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (!response.ok) throw new Error('Failed to create task');
    return await response.json();
};

export const updateTask = async (taskId, updates) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (!response.ok) throw new Error('Failed to update task');
    return await response.json();
};

export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return true;
};