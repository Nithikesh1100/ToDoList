// src/contexts/TaskContext.js
import React, { createContext, useReducer, useEffect } from 'react';

const TaskContext = createContext();

const loadTasksFromLocalStorage = () => {
    try {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log('Loaded tasks:', tasks);
        return tasks || [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        return [];
    }
};

const initialState = loadTasksFromLocalStorage();

const taskReducer = (state, action) => {
    switch (action.type) {
        // case 'SET_TASKS':
        //     return action.payload; // Replace state with new tasks
        case 'ADD_TASK':
            return [...state, { ...action.payload, id: Date.now() }];
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'UPDATE_TASK':
            return state.map(task => task.id === action.payload.id
                ? { ...task, taskName: action.payload.taskName, description: action.payload.description }
                : task
            );
        default:
            return state;
    }
};




const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);



    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    console.log('Tasks in TaskProvider:', tasks);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskContext, TaskProvider };
