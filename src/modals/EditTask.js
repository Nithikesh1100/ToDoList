// src/modals/EditTask.js
import React, { useState, useContext, useEffect } from 'react';
import '../Styles/EditTask.css';
import { TaskContext } from '../contexts/TaskContext';

const EditTask = ({ isOpen, onClose, task }) => {
    const { dispatch } = useContext(TaskContext);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTaskName(task.taskName);
            setTaskDescription(task.description);
        }
    }, [task]);

    const handleUpdate = () => {
        if (!taskName.trim()) {
            alert('Task name cannot be empty');
            return;
        }

        dispatch({ type: 'UPDATE_TASK', payload: { id: task.id, taskName, description: taskDescription } });
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

                <h2>Update Task</h2>
                <div>
                    Task Name<br />
                    <input
                        type="text"
                        className="update-input"
                        name='updateTaskName'
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
    
                    />
                </div>
                <div>
                    Task Description<br/>
                    <textarea
                        className="textarea"
                        name='updateTaskDescription'
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </div>

                <div className="buttons">
                    <button className="update-button" onClick={handleUpdate}>Update</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
