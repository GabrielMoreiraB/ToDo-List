import './App.css'
import { useState, useEffect } from 'react'
//import { BsTrash, BSBookmarkCheck, BSBookmarkCheckFill} from 'react-icons/bs'

const API = "https://localhost:3000"

function App() {

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const[loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false
    };

    setTodos([...todos,todo])
    console.log(todos)


    setTitle('');
    setTime('')
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>ToDo react</h1>
      </div>
      <div className='form-todo'>
        <h2>Insira sua Próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>

          <div className='form-control'>
            <label htmlFor='title'>O que você vai fazer? </label>
            <input 
            type="text" 
            name="title" 
            placeholder='Nome da tarefa'
            onChange={(e)=>setTitle(e.target.value)}
            value={title || ""}
            required
            minLength={4}
            />
          </div>

          <div className='form-control'>
            <label htmlFor='time'>Duração: </label>
            <input 
            type="text" 
            name="time" 
            placeholder='Duração da tarefa (em horas)'
            onChange={(e)=>setTime(e.target.value)}
            value={time || ""}
            required
            />
          </div>

          <input type="submit" className='submite' value="Criar Tarefa" />
        </form>
        
      </div>
      <div className='list-todo'>
        <h2>Lista ce Tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas! 😁</p>}
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <p>{todo.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
