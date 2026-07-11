//Each Data is Stored here So that Easy to manipulate and will be easy to pass using Props
export const personalInfo = {
    name: "Hiteshree Chauhan",
    title: "",
    tagline: "A C++ developer passionate about DSA, and learning Webdevelopment",
    email: "hiteshreechauhanit@gmail.com",
    location: "Gujarat,India",
    github : "https://github.com/Hiteshree-Chauhan-it",
}

export const aboutText = {
    paragraphs: 
        "I'm a passionate software developer with a strong foundation in C++ and Data Structures & Algorithms. I enjoy building modern web applications with the MERN stack and am currently implementing and enhancing my full-stack skills through open-source contributions in Girlscript Summer of Code 2026. I've also recently started exploring System Design to better understand scalable software architectures. Alongside this, I'm expanding my knowledge in AI/ML using Python and libraries such as NumPy, Pandas, and Matplotlib. I enjoy collaborating on impactful projects, continuously learning new technologies, and building solutions that create real-world value.",
}

//array
export const skills = [
    //Programming Language
    {name: "C", category:"Programming language"},
    {name: "C++", category:"Programming language"},
    {name: "Java", category:"Programming language"},
    {name: "Python", category:"Programming language"},
    {name: "Javascript", category:"Programming language"},

    //Web development
    {name:"HTML",category:"Web Development"},
    {name:"CSS",category:"Web Development"},
    {name:"Tailwind CSS",category:"Web Development"},
    {name:"React.js",category:"Web Development"},

    //Database
    {name:"MySQL",category:"Database"},
    {name:"MongoDB",category:"Database"},
    {name:"SQL",category:"Database"},

    //Core CS
    {name:"Data Structures",category:"Core CS"},
    {name:"Algorithms",category:"Core CS"},
    {name:"DBMS",category:"Core CS"},
    {name:"Software Development",category:"Core CS"},

    //Soft Skill
    {name:"Teamwork",category:"Soft Skill"},
    {name:"Leadership",category:"Soft Skill"},
    {name:"Effective Communication",category:"Soft Skill"},
    {name:"Self-learning",category:"Soft Skill"},
];

//Array of navbar links
export const navLinks = [
    {label :"About",href:"#about"},
    {label:"Skills",href:"#skills"},
    {label:"Contact",href:"#contact"},
];