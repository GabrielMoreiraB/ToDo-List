import './App.css'
import { useState,} from 'react'
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


function App() {

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("itens")) || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false
    };

    
    console.log(todos)
    setTodos([...todos,todo])
    
    setTitle('');
    setTime('')
    toast.success("Tarefa Adicionada!")
  }


  localStorage.setItem("itens", JSON.stringify(todos));


  const handleDelete = (id) => {
    setTodos((prevState) => prevState.filter(todo => todo.id !== id));
    localStorage.setItem("itens", JSON.stringify(todos))
  }

  const handleEdit = (todo) => {
    todo.done = !todo.done;
    setTodos((prevState) => prevState.map(e => e.id === todo.id ? e = todo : e))
    localStorage.setItem("itens", JSON.stringify(todos))
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>Just Do</h1>
      </div>
      <div className='form-todo'>
        <h2>Insira sua Próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>

          <div className='form-control'>
            <label htmlFor='title'>O que você vai fazer?</label>
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
        {todos.length === 0 && <p>Não há tarefas! <span>😴</span> </p>}
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}h</p>
            <div>
            <span onClick={() => handleEdit(todo)}>
              {(!todo.done) ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
            </span>
            <BsTrash onClick={() => handleDelete(todo.id)}/>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
    
  )
}

export default App
