import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Use a typical square-ish resolution
    canvas.width = 800; 
    canvas.height = 800;

    const frameCount = 112;
    const currentFrame = (index: number) => (
      `/Frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
    );

    const images: HTMLImageElement[] = [];
    const sequence = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      if (images[sequence.frame]) {
        const img = images[sequence.frame];
        if (img.complete && img.naturalWidth > 0) {
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.width * ratio) / 2;
          const centerShift_y = (canvas.height - img.height * ratio) / 2;  
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, img.width, img.height,
                             centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        }
      }
    };

    // Render first frame as soon as it loads
    images[0].onload = render;

    gsap.to(sequence, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Pin and scroll for 200% of viewport height
        scrub: 0.5,
        pin: true,
        onUpdate: render
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Canvas Container with Bloom & Edge Fade */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        maxWidth: '600px',
        maxHeight: '600px',
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 0 80px 30px rgba(255, 107, 107, 0.4)', // Bloom effect
        maskImage: 'radial-gradient(circle, black 65%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 95%)',
        zIndex: 5
      }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', filter: 'contrast(1.1) brightness(1.1)' }} />
      </div>
    </section>
  );
}
