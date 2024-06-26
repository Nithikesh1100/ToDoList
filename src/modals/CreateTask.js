// src/modals/CreateTask.js
import React, { useState, useContext } from 'react';
import '../Styles/CreateTask.css';
import { TaskContext } from '../contexts/TaskContext';

const CreateTask = ({ isOpen, onClose }) => {
    const { dispatch } = useContext(TaskContext);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleCreate = () => {
        if (!taskName.trim()) {
            alert('Task name cannot be empty');
            return;
        }

        dispatch({ type: 'ADD_TASK', payload: { taskName, description: taskDescription } });
        setTaskName('');
        setTaskDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-container">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>

                <h2>Create Task</h2>
                <div>
                    Task Name<br />
                    <input
                        type="text"
                        className="create"
                        name='createTaskName'
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <div>
                    Task Description<br/>
                    <textarea
                        className="textarea"
                        name='createTaskDescription'
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </div>

                <div className="buttons">
                    <button className="create-button" onClick={handleCreate}>Create</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;
