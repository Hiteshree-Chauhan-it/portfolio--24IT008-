import { lazy, Suspense } from "react";
import About from "../components/About";
import portfolioData from "../data/portfolioData";
import Spinner from "../components/Spinner";

// Skills is a below-the-fold section on the Home page, lazy loaded dynamically
const Skills = lazy(() => import("../components/Skills"));

function Home() {
  return ( 
    <>
      {/* Above-the-fold section loaded immediately */}
      <About
        heading={portfolioData.about.heading}
        paragraph={portfolioData.about.paragraph}
      />

      {/* Below-the-fold section lazy-loaded */}
      <Suspense fallback={<Spinner message="Loading skills..." />}>
        <Skills
          heading={portfolioData.skills.heading}
          skillList={portfolioData.skills.skillList}
        />
      </Suspense>
    </>
  );
}

export default Home;
