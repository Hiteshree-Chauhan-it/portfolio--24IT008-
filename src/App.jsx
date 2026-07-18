import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import portfolioData from "./data/portfolioData";
import "./App.css";

// App.jsx is now the "page layout controller".
// Header, Navbar, and Footer stay fixed on every page.
// Only the middle part changes based on the current URL, using <Routes>.
function App() {
  return (
    <div className="app">
      <Header siteTitle={portfolioData.siteTitle} name={portfolioData.name} />

      <Navbar navLinks={portfolioData.navLinks} />

      {/* Routes checks the current URL and renders the matching Route's element.
          Only ONE Route renders at a time - this is what gives us "pages"
          without ever reloading the browser. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer name={portfolioData.name} year={portfolioData.footer.year} />
    </div>
  );
}

export default App;