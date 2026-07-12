import "./Skills.css"

function Skills({heading,skillList}){
    return(
        <section id="skills" className="skills">
            <h2>{heading}</h2>
            <ul className="skills-list">
                {skillList.map((skills) => (
                    <li key={skills} className="skill-list">
                        {skills}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Skills;