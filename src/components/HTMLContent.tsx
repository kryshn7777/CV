import { ArrowDown, Music } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ScrollSequence from './ScrollSequence';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HTMLContent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray('.fade-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: containerRef });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(e => console.log("Autoplay prevented", e));
        } else {
          videoRef.current?.pause();
        }
      });
    }, { threshold: 0.5 }); // Play when 50% visible

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div id="main-content" ref={containerRef} style={{ position: 'relative', zIndex: 10 }}>
      {/* Audio Element */}
      <audio ref={audioRef} loop src="https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg" />
      
      {/* Fixed UI */}
      <div style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 50 }}>
        <button 
          onClick={toggleAudio}
          className={!isPlaying ? 'music-pulse' : ''}
          style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            border: '1px solid rgba(255, 255, 255, 0.2)', 
            borderRadius: '50%', 
            padding: '1rem', 
            color: 'white',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
        >
          <Music size={20} color={isPlaying ? '#FF6B6B' : 'white'} />
        </button>
      </div>

      {/* Section 1: The Landing */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Dreamy Memory Backdrop */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5vh 10vw', overflow: 'hidden' }}>
          
          {/* Left Side (Image 1) */}
          <div style={{ width: '35%' }}>
            <img src="/Images/1.jpeg" alt="Memory 1" style={{ width: '100%', height: 'auto', borderRadius: '1vw', opacity: 0.7, animation: 'float1 8s ease-in-out infinite' }} />
          </div>

          {/* Right Side (Images 2 and 3 stacked) */}
          <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '4vh' }}>
            <img src="/Images/2.png" alt="Memory 2" style={{ width: '100%', height: 'auto', borderRadius: '1vw', opacity: 0.7, animation: 'float2 10s ease-in-out infinite' }} />
            <img src="/Images/3.png" alt="Memory 3" style={{ width: '100%', height: 'auto', borderRadius: '1vw', opacity: 0.7, animation: 'float3 12s ease-in-out infinite' }} />
          </div>

          {/* Vignette Overlay to blend seamlessly */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(11,12,16,0.3) 0%, rgba(11,12,16,1) 85%)', pointerEvents: 'none' }}></div>
        </div>

        <h1 className="fade-up" style={{ fontSize: '4vw', textAlign: 'center', textShadow: '0 4px 20px rgba(0,0,0,0.8)', zIndex: 1, position: 'relative' }}>
          A year ago, one text changed everything...
        </h1>
        <div className="fade-up" style={{ position: 'absolute', bottom: '10vh', animation: 'pulse 2s infinite', zIndex: 1 }}>
          <ArrowDown size={32} color="#FF6B6B" />
        </div>
      </section>

      {/* Section 2: Image Sequence Scroll */}
      <ScrollSequence />

      {/* Section 3: My Treasures of You */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10vh 5vw' }}>
        <h2 className="fade-up" style={{ fontSize: '3.5rem', color: '#FF6B6B', marginBottom: '4rem', textAlign: 'center', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>my treasures of you</h2>
        
        {/* Treasures Gallery */}
        <div className="fade-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3vw', width: '100%', maxWidth: '1000px' }}>
           <img src="/Images/4.png" alt="Treasure 1" style={{ width: '200px', height: '280px', objectFit: 'cover', borderRadius: '1rem', transform: 'rotate(-4deg)', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
           <img src="/Images/5.png" alt="Treasure 2" style={{ width: '200px', height: '280px', objectFit: 'cover', borderRadius: '1rem', transform: 'rotate(3deg)', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', marginTop: '2rem' }} />
           <img src="/Images/6.png" alt="Treasure 3" style={{ width: '200px', height: '280px', objectFit: 'cover', borderRadius: '1rem', transform: 'rotate(-2deg)', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
           <img src="/Images/7.png" alt="Treasure 4" style={{ width: '200px', height: '280px', objectFit: 'cover', borderRadius: '1rem', transform: 'rotate(4deg)', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', marginTop: '2rem' }} />
        </div>
      </section>

      {/* Section 7: Behaving Like Us */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="fade-up" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Behaving Like Us</h2>
        <div className="fade-up" style={{ width: '60vw', maxWidth: '800px', aspectRatio: '16/9', background: 'black', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
          <video ref={videoRef} src="/Images/roblox.mp4" controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} playsInline></video>
        </div>
        <p className="fade-up" style={{ marginTop: '1.5rem', fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
          our first robolox game by the way
        </p>
      </section>

      {/* Section 8: Full Bloom */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '10vh 5vw', zIndex: 10, position: 'relative' }}>
        <h1 className="fade-up" style={{ fontSize: '3.5vw', color: '#FF6B6B', marginBottom: '2rem', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          🎉🎂 Happiesstttttt Birthday Bujjussssss 🥳💖
        </h1>
        
        <div className="fade-up" style={{ fontSize: '1.3rem', maxWidth: '800px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.8)', background: 'rgba(11,12,16,0.5)', padding: '3rem', borderRadius: '2rem', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,107,107,0.2)' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Whenever I wake up, I check for your texts. 🥹💕 You are such a beautiful soul. ✨ I just wish we were living together physically. 🫂❤️
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            I still remember last year when me and Snek 🐍 were shopping, and I was busy putting your images on a cat video template 😭🐱 hehehe. But this time, I decided to increase the effortttt because that's what you deserve. 💖✨ I just wish I could gift you something on your birthday. 🎁🥺 Evalo try panniyum, I can't 😭, maybe God is planning to gift you physically instead? 👀💝
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            I cherish the moments I was with you. 🌸💕
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            I loved it when you kept the DP of my drawing as your PFP. 🥹🎨❤️ I love everything about you, myruuuu. 💖
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Especially your voice when you're mad and angry. 😤❤️ I love it far, far more than your normal tone 😂💕. It almost makes me wanna come and apologize immediately... 🏃‍♂️💨🥺
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Sending that <strong>"Heyyy Moni, it's Krish"</strong> 💬✨ is one of the best decisions I've ever made. 💖 You deserve the worlddd, sweetheart. 🌎💕 Love you loadssss di myruuuuu. 😘💞
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            I stayyyyy with yewwwwwww no matter whattttttt. 🫂❤️✨
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Cutieee patoootieeeee, woookieeee, cooookieeee 🍪🐻💕, happy 26! 🎂🥳🎉
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            May your standards double 📈✨, wealth prosper 💰💖, and health multiply 🌿💪❤️.<br />
            May you get anything and everything you deserveeeee. 🌟🎁💕
          </p>
          <p style={{ marginTop: '3rem', fontSize: '1.6rem', color: '#FF6B6B', fontStyle: 'italic' }}>
            <strong>– Your pookieeeee Krishhhhh</strong> 💖🫶🥹✨
          </p>
        </div>
      </section>
      
      <style>{`
        @keyframes pulse {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes float1 {
          0% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(-3deg); }
          100% { transform: translateY(0) rotate(-5deg); }
        }
        @keyframes float2 {
          0% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0) rotate(3deg); }
        }
        @keyframes float3 {
          0% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-25px) rotate(0deg); }
          100% { transform: translateY(0) rotate(-2deg); }
        }
        .music-pulse {
          animation: glowPulse 2s infinite;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(255, 107, 107, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
        }
      `}</style>
    </div>
  );
}
