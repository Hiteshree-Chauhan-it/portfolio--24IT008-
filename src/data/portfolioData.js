//This file stores all data so that we can change things easily without touching actual component
const portfolioData = {
    siteTitle : "Hiteshree's Portfolio",
    name : "Hiteshree Chauhan",
    navlinks : ["About","Skills"],
    about : {
        heading:"About me",
        paragraph : "I'm a passionate software developer with a strong foundation in C++ and Data Structures & Algorithms. I enjoy building modern web applications with the MERN stack and am currently implementing and enhancing my full-stack skills through open-source contributions in Girlscript Summer of Code 2026. I've also recently started exploring System Design to better understand scalable software architectures. Alongside this, I'm expanding my knowledge in AI/ML using Python and libraries such as NumPy, Pandas, and Matplotlib. I enjoy collaborating on impactful projects, continuously learning new technologies, and building solutions that create real-world value."
    },
    skills : {
        heading:"My skills",
        skillList: ["HTML", "CSS", "JavaScript", "React", "Git & GitHub", "C Programming","Python","C++","Java","Data Structure","Algorithm","Python Libraries","Communication"],
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
    footer :{
        year : 2026,
    },
};

export default portfolioData;