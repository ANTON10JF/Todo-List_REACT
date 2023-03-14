import 'semantic-ui-css/semantic.min.css'
import Container from './components/Container';
import Header from './components/Header';
import InputTask from './components/InputTask';
import { useEffect, useState } from 'react';
import TaskContent from './components/TaskContent';


function App() {

  // Pasar las tareas a Localstorage
  let inicialTasks = JSON.parse(localStorage.getItem("tasks"))

  // Si inicialTasks no tiene tareas, lo inicializamos a vacio. 
  if (!inicialTasks) {
    inicialTasks = [];
  }

  // vamos a guardar dentro del estado tasks todas nuestras tareas de inicio
  const [tasks, setTasks] = useState(inicialTasks);

  // con el useEffect vamos a comprobar continuamente si nuestro inicialTasks ha cambiado y añadirlo al locastorage
  useEffect(() => {
    if (inicialTasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, [inicialTasks, tasks])

  // Copiamos el array de tareas y añadimos las nueva tarea
  const createTask = (task) => {

    setTasks([...tasks, task])
  }

  // Para elimnar la tarea, pasamos task.id por parámetro 
  const deleteTask = (id) => {
    // filtramos y guardamos todas las tareas menos la que hemos pulsado
    const currentTask = tasks.filter((task) => task.idTask !== id)

    // se lo pasamos a tasks para que actualice las tareas

    setTasks(currentTask);
  }



  return (
    <Container>
      <Header />
      <InputTask createTask={createTask} />
      <TaskContent tasks={tasks} deleteTask={deleteTask} />
    </Container>
  );
}

export default App;
