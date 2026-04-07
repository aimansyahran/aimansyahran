import { useState, useCallback } from 'react';
import { LanguageProvider } from './i18n/LanguageProvider';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Capabilities from './components/Capabilities';
import Skills from './components/Skills';
import WorkGrid from './components/WorkGrid';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

import { portfolioData } from './data/portfolio';

function AppContent() {
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
        <div className="h-px mx-6 md:mx-12 bg-gradient-to-r from-transparent via-dark-600/30 to-transparent" aria-hidden="true" />
        <WorkGrid onProjectOpen={handleProjectOpen} />
      </main>
      <Footer />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          allProjects={portfolioData.projects}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
