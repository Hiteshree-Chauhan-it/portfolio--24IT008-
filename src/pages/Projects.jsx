import { useState, useEffect } from "react";
import "./Projects.css";
import portfolioData from "../data/portfolioData";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Projects() {
  const { projects, githubUsername } = portfolioData;

  // Three state variables as required by the PDF:
  // - repos: stores the list of repositories once fetched
  // - loading: true while the request is in progress
  // - error: stores an error message if the fetch fails, otherwise null
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetchRepos is a normal function (not a hook) that performs the API call.
  // We separate it out so the Retry button can call it again later.
  const fetchRepos = () => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${githubUsername}/repos`)
      .then((res) => {
        if (!res.ok) {
          // If GitHub responds with an error status (like 404), throw
          // so it is caught below in .catch()
          throw new Error("Could not fetch repositories");
        }
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false)); // runs whether it succeeded or failed
  };

  // useEffect runs this function ONCE when the component first mounts,
  // because the dependency array [] is empty.
  // Without useEffect, calling fetch() directly in the component body
  // would run on every single re-render, causing infinite requests.
  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <section className="projects">
      <h2>My Projects</h2>

      {/* --- Existing hardcoded projects from Practical 2 --- */}
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

      {/* --- New: Live GitHub repositories fetched from the API --- */}
      <h2 className="repo-heading">My GitHub Repositories</h2>

      {/* Conditional rendering: only ONE of these three blocks shows
          at a time, depending on the current state. */}
      {loading && <Spinner />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={fetchRepos} />
      )}

      {!loading && !error && (
        <div className="repo-list">
          {repos.map((repo) => (
            <div className="repo-card" key={repo.id}>
              <h3>{repo.name}</h3>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.html_url}
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;