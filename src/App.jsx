import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Navbar from './components/navbar'


function App() {
  const [todo, setTodo] = useState("")
  // todo is for input text
  const [todos, setTodos] = useState([])
  // it holds all todos
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
    console.log(showFinished)
  
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()

  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className='py-5  bg-[#f8edde] md:h-[100vh] md:w-[99vw] h-[100vh] w-[100vw]'>
      <div className='md:container   bg-violet-300 md:mx-auto mx-5 rounded-xl p-5 md:min-h-[90vh] md:w-1/2 min-h-[80vh] w-[90vw]' >
        <h1 className='font-bold text-center md:text-3xl text-2xl py-2'>iTask - Manage your todos at one place</h1>
        <div className='addTodo my-5 flex flex-row md:justify-evenly items-center md:gap-2 gap-3 '>
          <h2 className='text-sm font-semibold md:text-lg'>Add a Todo</h2>
          
          <input onChange={handleChange} value={todo} type="text" className='w-1/2 md:w-2/3 rounded-xl px-2' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md  w-12 md:w-20'>Save</button>
        </div>
        <div className='py-2 text-sm flex gap-1 md:px-16 px-2 justify-end'>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        </div>
        <div className='h-[1px] bg-black opacity-40 mx-auto my-3 w-3/4'></div>
        <h1 className='font-bold text-xl text-center'>Your Todos</h1>
        <div className='todos px-3'>
          {todos.length === 0 && <div className='m-12 font-semibold text-center'>No Todos to display</div>}

          {todos.filter(item => showFinished ? item.isCompleted : !item.isCompleted).map(item => {
            return (showFinished || !item.isCompleted) &&
              <div key={item.id} className="todo flex md:w-full my-3 justify-between ">
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full self-center">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-900 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 w-8'><FaEdit /></button>
                  <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-900 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 w-8'><AiFillDelete />
                    </button>
                </div>
              </div>

          })}
        </div>

      </div>
      </div>
    </>
  )
}

export default App

