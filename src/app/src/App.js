import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]); // state for storing todos
  const [newTodo, setNewTodo] = useState(''); // state for new todo input

  // Fetch todos from the server
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8000/todos/');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);


  const handleAddTodo = async (event) => {
    event.preventDefault();
    if (newTodo.trim()) {
      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      const newTodoObj = { id: newId, text: newTodo };
      // Add new todo to the server
      try {
        const response = await fetch('http://localhost:8000/todos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodoObj),
        });
        if (!response.ok) {
          throw new Error('Failed to add todo');
        }
        const data = await response.json();
        // Update the todos state with the new todo
        setTodos([...todos, data]);
        setNewTodo(''); // clear the new todo input
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // Add hardcoded todos on initial component loading
    const addHardcodedTodos = async () => {
      const hardcodedTodos = [
        { text: 'Learn Docker' },
        { text: 'Learn React' }
      ];

      try {
        for (const todo of hardcodedTodos) {
          // Add each hardcoded todo to the server
          const response = await fetch('http://localhost:8000/todos/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
          });

          if (!response.ok) {
            throw new Error('Failed to add todo');
          }

          const data = await response.json();
          // Update the todos state with the new todo
          setTodos((prevTodos) => [...prevTodos, data]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    addHardcodedTodos();

    const pollingInterval = 1000; // Polling interval of 1 second for updates from server
    const intervalId = setInterval(fetchTodos, pollingInterval);

    return () => {
      // Cleanup the polling interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <div className='todo-list'>
        <h1>List of TODOs</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">{todo.text}</li>
          ))}
        </ul>
      </div>
      <div className="todo-form">
        <h1>Create a ToDo</h1>
        <form onSubmit={handleAddTodo} >
          <div>
            <div className='label'>
            <label htmlFor="todo">ToDo: </label>
            </div>
            <input
              type="text"
              id="todo"
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
            />
          </div>
          <div style={{ marginTop: '5px' }}>
            <button type="submit" id='button' >
              Add ToDo!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
