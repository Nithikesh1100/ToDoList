// Card.js
import React, { useContext } from 'react';
import '../Styles/Card.css';
import { ReactComponent as EditIcon } from '../Icons/EditIcon.svg';
import { ReactComponent as DeleteIcon } from '../Icons/DeleteIcon.svg';
import { TaskContext } from '../contexts/TaskContext';



const Card = ({ task, onEdit }) => {
    const { dispatch } = useContext(TaskContext);
    

    const deleteCard = () => {
        dispatch({ type: 'DELETE_TASK', payload: task.id });
    };

    return (
        <div className='card-container'>
            <h1 className='task-name'>{task.taskName}</h1>
            <p className='task-description'>{task.description}</p>
            <div className='icons-container'>
                <EditIcon className='editicon' onClick={onEdit} />
                <DeleteIcon className='deleteicon' onClick={deleteCard} />
            </div>
        </div>
    );
};

export default Card;
