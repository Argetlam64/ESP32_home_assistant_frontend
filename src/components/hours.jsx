import AddSkillForm from "./add_skill_form.jsx"
import SkillList from "./skill_list.jsx";
import { useState } from "react";

function Hours({users, BACKEND_URL}){ 
    const [currentSkill, setCurrentSkill] = useState({
        skillName: "",
        goalHours: 0,
    })
    return(
        <div>
            <AddSkillForm users={users} BACKEND_URL={BACKEND_URL}/>
            <SkillList users={users} BACKEND_URL={BACKEND_URL}/>
        </div>
    );
}


export default Hours;