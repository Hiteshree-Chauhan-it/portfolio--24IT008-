import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./components/Spinner";
import { AuthProvider } from "./context/AuthContext";
import portfolioData from "./data/portfolioData";
import "./App.css";
 
// Lazy-load below-the-fold pages on demand
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header siteTitle={portfolioData.siteTitle} name={portfolioData.name} />

        <Navbar navLinks={portfolioData.navLinks} />

        <Suspense fallback={<Spinner message="Loading section..." />}>
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
        </Suspense>

        <Footer name={portfolioData.name} year={portfolioData.footer.year} />
      </div>
    </AuthProvider>
  );
}

export default App;