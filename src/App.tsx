import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import HTMLContent from './components/HTMLContent';
import Scene from './components/Scene';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Lenis is synced with ScrollTrigger in the ReactLenis root via options or manually
    // For lenis/react, passing options is easy, but ReactLenis handles requestAnimationFrame.
    // We just need to ensure ScrollTrigger updates on scroll.
  }, []);

  return (
    <ReactLenis root options={{ smoothWheel: true, syncTouch: true }}>
      <Scene />
      <HTMLContent />
    </ReactLenis>
  );
}

export default App;
