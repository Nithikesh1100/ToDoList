import React, { useState, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import CreateTask from './modals/CreateTask';
import EditTask from './modals/EditTask';
import Card from './components/Card';
import { TaskContext } from './contexts/TaskContext';

function App() {
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const { tasks, dispatch } = useContext(TaskContext);

    const openTask = () => {
        setIsTaskOpen(true);
    };

    const closeTask = () => {
        setIsTaskOpen(false);
    };

    const openEditTask = (task) => {
        setSelectedTask(task);
        setIsEditTaskOpen(true);
    };

    const closeEditTask = () => {
        setIsEditTaskOpen(false);
        setSelectedTask(null);
    };

    const handleCreateTask = (name, description) => {
        dispatch({ type: 'ADD_TASK', payload: { taskName: name, description } });
    };

    return (
        <>
            <div className="App">
                <h2>Ninjas To Do List</h2>
                <button className="create-task" onClick={openTask}>Create Task</button>
            </div>

            <div className="task-container">
                <TransitionGroup component={null}>
                    {tasks.map((task) => (
                        <CSSTransition
                            key={task.id}
                            timeout={300}
                            classNames="card"
                        >
                            <Card task={task} onEdit={() => openEditTask(task)} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>

            <CreateTask isOpen={isTaskOpen} onClose={closeTask} onCreate={handleCreateTask} />
            <EditTask isOpen={isEditTaskOpen} onClose={closeEditTask} task={selectedTask} />
        </>
    );
}

export default App;
