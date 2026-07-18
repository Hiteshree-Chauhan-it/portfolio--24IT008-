import "./Projects.css"
import portfolioData from "../data/portfolioData"

function Projects()
{
    const {projects} = portfolioData;
    return(
        <section className="projects">
            <h2>My projects</h2>
            <div className="projects-list">
                {projects.map((project) => (
                <div className="project-card" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p className="tech-used">
                <strong>Tech:</strong> {project.tech.join(", ")}
                </p>
          </div>
        ))}
      </div>
        </section>

    );
}

export default Projects;