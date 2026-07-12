import './App.css'
import Header from './components/Header';
import portfolioData from './data/portfolioData';

function App() {
  return (
    <div className="app">
      <Header siteTitle={portfolioData.siteTitle} name={portfolioData.name}/>
    </div>
  )
}

export default App;
