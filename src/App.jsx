import './App.css'
import Header from './components/Header';
import portfolioData from './data/portfolioData';
import Navbar from './components/Navbar';
import About from './components/About'
import Skills from './components/Skills';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header siteTitle={portfolioData.siteTitle} name={portfolioData.name}/>
      <Navbar navlinks={portfolioData.navlinks}/>

      <About
        heading={portfolioData.about.heading} 
        paragraph={portfolioData.about.paragraph}
      />

      <Skills
        heading={portfolioData.skills.heading}  skillList={portfolioData.skills.skillList}
      />

      <Footer name={portfolioData.name} year={portfolioData.footer.year}/>
    </div>
  )
}

export default App;
