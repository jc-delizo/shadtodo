import React, { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'

const TodoForm = () => {
    const { dispatch } = useTodosContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [priority, setPriority] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields ] = useState([])

    const statusOptions = ['pending', 'in progress', 'done'];
    const priorityOptions = ['low', 'medium', 'high'];

    const handleSubmit = async (e) => {
        e.preventDefault()

        const todo = { title, description, status, dueDate, priority }

        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setStatus('')
            setDueDate('')
            setPriority('')
            setError(null)
            setEmptyFields([])
            console.log('New Task Added', json)
            dispatch({type: 'CREATE_TODO', payload: json})
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new Task</h3>

            <label>Task Name:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Status:</label>
            <select
                onChange={(e) => setStatus(e.target.value)}
                value={status} // Bind the selected value
                className={emptyFields.includes('status') ? 'error' : ''}
            >
                <option value=''>Select Status</option> {/* Default empty option */}
                {statusOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <label>Due Date:</label>
            <input
                type="date"
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
                className={emptyFields.includes('dueDate') ? 'error' : ''}
            />

            <label>Priority:</label>
            <select
                onChange={(e) => setPriority(e.target.value)}
                value={priority} // Bind the selected value
                className={emptyFields.includes('priority') ? 'error' : ''}
            >
                <option value=''>Select Priority</option> {/* Default empty option */}
                {priorityOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div>
                <button>Save</button>
                {error && <div className='error'>{error}</div>}
            </div>
        </form>
    )
}

export default TodoForm