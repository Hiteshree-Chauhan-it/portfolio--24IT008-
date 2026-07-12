import './App.css'
import Header from './components/Header';
import portfolioData from './data/portfolioData';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <Header siteTitle={portfolioData.siteTitle} name={portfolioData.name}/>
      <Navbar navlinks={portfolioData.navlinks}/>
    </div>
  )
}

export default App;
