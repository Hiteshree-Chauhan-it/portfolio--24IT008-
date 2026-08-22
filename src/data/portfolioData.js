const portfolioData = {
  siteTitle: "My Portfolio",
  name: "Hiteshree Chauhan",

  // Must be objects with name + path, NOT plain strings.
  // This is likely why your navbar links were invisible.
  navLinks: [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
    { name: "Tasks", path: "/tasks" },
  ],

  about: {
    heading: "About Me",
    paragraph:
      "I'm a passionate software developer with a strong foundation in C++ and Data Structures & Algorithms."+"I enjoy building modern web applications with the MERN stack and am currently implementing and enhancing my full-stack skills through open-source contributions in Girlscript Summer of Code 2026. I've also recently started exploring System Design to better understand scalable software architectures. Alongside this, I'm expanding my knowledge in AI/ML using Python and libraries such as NumPy, Pandas, and Matplotlib. I enjoy collaborating on impactful projects, continuously learning new technologies, and building solutions that create real-world value.",
  },

  skills: {
    heading: "My Skills",
    skillList: ["HTML", "CSS", "JavaScript", "React", "Git & GitHub", "C Programming"],
  },

  projects: [
    {
      title: "Portfolio Website",
      description: "A personal portfolio built using React and Vite, showcasing my skills and background.",
      tech: ["React", "Vite", "CSS"],
    },
    {
      title: "Student Result Tracker",
      description: "A small app to record and display student marks and calculate grades.",
      tech: ["JavaScript", "HTML", "CSS"],
    },
    {
      title: "Simple To-Do App",
      description: "A basic task manager app to add, complete, and remove daily tasks.",
      tech: ["React", "useState"],
    },
  ],

  // New: GitHub username used to fetch live repositories from the GitHub API.
  // Change this to your own GitHub username.
  githubUsername: "Hiteshree-Chauhan-it",

  footer: {
    year: 2026,
  },
};

export default portfolioData;