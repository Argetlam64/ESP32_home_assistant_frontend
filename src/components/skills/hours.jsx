import AddSkillForm from "./add_skill_form.jsx"
import SkillList from "./skill_list.jsx";
import { useState } from "react";

function Hours({users, BACKEND_URL}){ 
    const [data, setData] = useState([]);
    return(
        <div>
            <AddSkillForm users={users} BACKEND_URL={BACKEND_URL} setData={setData}/>
            <SkillList users={users} BACKEND_URL={BACKEND_URL} data={data} setData={setData}/>
        </div>
    );
}


export default Hours;