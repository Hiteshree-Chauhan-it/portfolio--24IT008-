import About from "../components/About";
import Skills from "../components/Skills";
import portfolioData from "../data/portfolioData";


function Home()
{
    return(
        <>
            <About
                heading={portfolioData.about.heading}
                paragraph={portfolioData.about.paragraph}
            />
            <Skills 
                heading={portfolioData.skills.heading}
                skillList={portfolioData.skills.skillList}
            />
        </>
    );
}

export default Home;