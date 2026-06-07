import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import Tulip from './Tulip';
import Petals from './Petals';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function Scene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#FF6B6B" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#C06C84" />
        <Environment preset="city" />
        
        <Petals count={150} />
        <Tulip />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
        
        <Preload all />
      </Canvas>
    </div>
  );
}
