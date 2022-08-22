

import { useEffect, useState } from 'react';
import './App.css';
import { Container } from './components/Container';
import { TaskCreator } from './components/TaskCreator'
import { TaskTable } from './components/TaskTable';
import { VisibilityControl } from './components/VisibilityControl';

function App() {


  const [tasksItems, setTasksItems] = useState([])
  const [showCompleted, setShowCompleted] = useState(false)

  function createTask(taskname) {
    if (!tasksItems.find(task => task.name === taskname)) {
      setTasksItems([...tasksItems, { name: taskname, done: false }])
    }
  }

  const toggleTask = task => {
    setTasksItems(
      tasksItems.map(t => (t.name === task.name) ? { ...t, done: !t.done } : t)
    );
  }

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data) {
      setTasksItems(JSON.parse(data))
    }
  }, [])

  const cleanTasks = () => {
    setTasksItems(tasksItems.filter(t => !t.done))
    setShowCompleted(false)
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksItems))
  }, [tasksItems])


  return (
    <>
      <main className="bg-dark vh-100 text-white">
        <Container>
          <TaskCreator createTask={createTask} />
          <TaskTable tasks={tasksItems} toggleTask={toggleTask} />

          <VisibilityControl
            isChecked={showCompleted}
            setShowCompleted={(checked) => setShowCompleted(checked)}
            cleanTasks={cleanTasks}
          />

          {
            showCompleted === true && (
              <TaskTable tasks={tasksItems} toggleTask={toggleTask} showCompleted={showCompleted} />
            )
          }
        </Container>
      </main>
    </>

  );
}

export default App;
