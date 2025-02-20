import NewTaskForm from "./new_task_form";
import TaskList from "./task_list";
import { useState, useEffect } from "react";

function Tasks({users, BACKEND_URL}){
    const [tasks, setTasks] = useState([]);

    return(<div>
        <NewTaskForm tasks={tasks} setTasks={setTasks} users={users} BACKEND_URL={BACKEND_URL}></NewTaskForm>
        <TaskList tasks={tasks} setTasks={setTasks} users={users} BACKEND_URL={BACKEND_URL}></TaskList>
    </div>);
}

export default Tasks;