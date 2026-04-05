import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Capabilities from './components/Capabilities';
import Skills from './components/Skills';
import WorkGrid from './components/WorkGrid';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectOpen = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Skills />
        <WorkGrid onProjectOpen={handleProjectOpen} />
      </main>
      <Footer />

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
