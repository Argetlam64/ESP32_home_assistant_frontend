import NewTaskForm from "./new_task_form";
import TaskList from "./task_list";
import { useState, useEffect } from "react";

function Tasks({users, BACKEND_URL, userData, setUserData}){
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentUser, setCurrentUser] = useState(users[0]);

    //run on every start
    useEffect(() => {
        async function getCategories(){
            try{
                const data = await fetch(`${BACKEND_URL}/tasks/categories`);
                let jsonData = await data.json();
                jsonData.push({id: "0000", name: "all"});
                setCategories(jsonData);
            }
            catch(err){
                alert("Unable to fetch categories....");
                console.error(err);
            }
        };
        getCategories();
    }, []);

    return(<div>
        <NewTaskForm 
            setTasks={setTasks} 
            users={users} 
            BACKEND_URL={BACKEND_URL}
            categories={categories}
            currentUser={currentUser}
        >
        </NewTaskForm>
        <TaskList 
            tasks={tasks} 
            setTasks={setTasks} 
            users={users} 
            BACKEND_URL={BACKEND_URL} 
            userData={userData} 
            setUserData={setUserData} 
            categories={categories}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
        >
        </TaskList>
    </div>);
}

export default Tasks;