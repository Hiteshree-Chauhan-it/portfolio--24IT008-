import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import portfolioData from "./data/portfolioData";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header siteTitle={portfolioData.siteTitle} name={portfolioData.name} />

        <Navbar navLinks={portfolioData.navLinks} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer name={portfolioData.name} year={portfolioData.footer.year} />
      </div>
    </AuthProvider>
  );
}

export default App;