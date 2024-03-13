import { useEffect, useState } from 'react'
import Header from './Components/Header';
import Form from './Components/Form';
import Filter from './Components/Filter';
import TodoList from './Components/TodoList';
import todoList from '../data.json';
import './Styles/App.css'

function App() {
  const MY_TASKS = localStorage.getItem('myTasks') != 'undefined'
  ? JSON.parse(localStorage.getItem('myTasks'))
  : [...todoList]; 
  // console.log(MY_TASKS);
  const [theme, setTheme] = useState('light');
  const [items, setItems] = useState(MY_TASKS);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [nextId, setNextId] = useState(MY_TASKS.length+2);

  useEffect(()=>{
    document.body.className = theme
    localStorage.setItem('myTasks', JSON.stringify(items))
  }, [theme, items])

  const toggleTheme = () =>{
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const addItem = (newItem) => {
    setItems(items => [...items, newItem])
    setNextId(nextId + 1)
  }

  const updateItem = (id) => {
    const newList = [...items]
    
    const editItem = newList.find((item => item.id === id))
    
    if (editItem) {
      editItem.checked = !editItem.checked 
    }

    setItems(newList)
  }

  const updateFilter = (selected) => {
    setSelectedFilter(selected)
  }

  const updateItems = (updatedList) => {
    setItems(updatedList)
  }

  const deleteItem = (id) => {
    const newList = [...items]
    setItems(newList.filter(item => item.id !== id))
  }

  const clearCompleted = () => {
    const itemsArray = [...items]
    setItems(itemsArray.filter(item => !item.checked))
  }

  return (
    <div className='container'>
      <div className="main">
        <Header theme={theme} toggleTheme={toggleTheme}/>
        <Form nextId={nextId} addItem={addItem}/>
        <TodoList items={items} updateItem={updateItem} updateItems={updateItems} deleteItem={deleteItem} selectedFilter={selectedFilter} updateFilter={updateFilter} clearCompleted={clearCompleted}/>
        <div className="filter-mobile">
          <Filter selectedFilter={selectedFilter} updateFilter={updateFilter} theme={theme}/>
        </div>
        <span className={`dnd-info`}>Drag and drop to reorder list</span>
      </div>
      <section className="attribution">
          <p>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
          Coded with lots of<span className="love">❤️</span> by <a href=""> Anu</a>. </p>
        </section> 
    </div>
  )
}

export default App
