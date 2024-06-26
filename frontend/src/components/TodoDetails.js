import React from 'react'
import { useTodosContext } from '../hooks/useTodosContext'

const TodoDetails = ({ todo }) => {
  // Convert the dueDate string to a Date object
  const dueDate = new Date(todo.dueDate);
  const { dispatch } = useTodosContext()

  // Options for formatting the date
  const options = {
    year: 'numeric',
    month: 'long', // 'long' for full month name (e.g., "March")
    day: 'numeric',
  };

  const handleClick = async () => {
    const response = await fetch('/api/todos/' + todo._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TODO', payload: json})
    }
  }

  // Format the dueDate
  const formattedDueDate = dueDate.toLocaleDateString(undefined, options);

  return (
    <div className='todo-details'>
        <h4>{todo.title}</h4>
        <p><strong>Description: </strong>{todo.description}</p>
        <p><strong>Status: </strong>{todo.status}</p>
        <p><strong>Due Date: </strong>{formattedDueDate}</p>
        <p><strong>Priority: </strong>{todo.priority}</p>
        <span onClick={handleClick}>Delete</span>
    </div>
  )
}

export default TodoDetails