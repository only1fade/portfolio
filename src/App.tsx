import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { ProjectGrid } from './components/ProjectGrid'
import { Skills } from './components/Skills'
import { Footer } from './components/Footer'
import { PersistentBackground } from './components/PersistentBackground'

import { useRef, useEffect, lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'

const ProjectPage = lazy(() => import('./components/ProjectPage').then(module => ({ default: module.ProjectPage })))

function ScrollToTopOrHash() {
  const location = useLocation();
  const lastKey = useRef(location.key);

  useEffect(() => {
    // strict-mode safe: only fire when React Router issues a NEW location key
    if (lastKey.current === location.key) {
      return;
    }
    
    lastKey.current = location.key;

    if (location.hash) {
      // Use requestAnimationFrame alongside a larger timeout to guarantee all DOM painting
      // and layout reflows (fonts, image placeholders) from the route change are totally finished.
      setTimeout(() => {
        requestAnimationFrame(() => {
          const id = location.hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            // Calculate absolute top instead of scrollIntoView, which is sometimes more robust
            const yOffset = -50; 
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        });
      }, 200);
    } else {
      // Temporarily disable smooth scroll to avoid scrolling animation from previous page's scroll position
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Force instantaneous scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // Re-enable smooth scroll after layout paint
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'smooth';
        }, 10);
      });
    }
  }, [location]);

  return null;
}

function Layout() {
  return (
    <div className="relative w-full flex flex-col items-center" style={{ minHeight: '100svh' }}>
      {/* Fixed viewport background — more reliable than background-attachment:fixed on mobile */}
      <div className="fixed inset-0 -z-10 theme-bg" aria-hidden="true" />
      <ScrollToTopOrHash />
      <Navigation />
      <div className="w-full relative flex flex-col flex-grow">
        <main className="w-full flex flex-col flex-grow items-start">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Hero />
      <div ref={containerRef} className="relative w-full border-b-0">
        <PersistentBackground containerRef={containerRef} />
        <About />
        <Skills />
      </div>
      <ProjectGrid />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="project/:projectId" element={
            <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center text-neutral-500">Loading details...</div>}>
              <ProjectPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
