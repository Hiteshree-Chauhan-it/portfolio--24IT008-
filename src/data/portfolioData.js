const portfolioData = {
  siteTitle: "My Portfolio",
  name: "Hiteshree Chauhan",

  // Must be objects with name + path, NOT plain strings.
  // This is likely why your navbar links were invisible.
  navLinks: [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ],

  about: {
    heading: "About Me",
    paragraph:
      "I am a final-year IT student passionate about web development. " +
      "I enjoy building clean, functional websites and learning new " +
      "technologies like React. This portfolio is my first step into " +
      "building real-world frontend projects.",
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

  footer: {
    year: 2026,
  },
};

export default portfolioData;