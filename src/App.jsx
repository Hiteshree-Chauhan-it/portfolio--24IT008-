import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import portfolioData from './data/portfolioData';
import Navbar from './components/Navbar';
import About from './components/About'
import Skills from './components/Skills';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
// import Contact from './pages/Contact';


function App() {
  return (
    <div className="app">
      <Header siteTitle={portfolioData.siteTitle} name={portfolioData.name}/>
      <Navbar navlinks={portfolioData.navlinks}/>

      <Routes>
        <Route path="/" element={<home></home>} />
        <Route path="/projects" element={<Projects/>}/>
        {/* <Route path="/contact" element={<Contact/>}/> */}
      </Routes>

      <Footer name={portfolioData.name} year={portfolioData.footer.year}/>
    </div>
  )
}

export default App;
