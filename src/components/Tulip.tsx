import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Tulip() {
  const groupRef = useRef<THREE.Group>(null);
  const petalsRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useGSAP(() => {
    if (!groupRef.current || !petalsRef.current || !materialRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Section 1 -> 2: Spark (opens slightly)
    tl.to(petalsRef.current.scale, { x: 1.1, y: 1.1, z: 1.1 }, 0);
    
    // Section 2 -> 3: Growth (moves left)
    tl.to(groupRef.current.position, { x: -2, z: -1 }, 0.25);
    tl.to(petalsRef.current.scale, { x: 1.3, y: 1.3, z: 1.3 }, 0.25);

    // Section 3 -> 4: Video (moves center background)
    tl.to(groupRef.current.position, { x: 0, y: 1, z: -3 }, 0.5);
    tl.to(materialRef.current, { opacity: 0.2, transparent: true }, 0.5);

    // Section 4 -> 5: Full Bloom
    tl.to(groupRef.current.position, { x: 0, y: 0, z: 2 }, 0.75);
    tl.to(materialRef.current, { opacity: 1, transparent: false }, 0.75);
    
    // Tulip blooming (petals open outwards slightly)
    tl.to(petalsRef.current.scale, { x: 2, y: 2, z: 2 }, 0.75);
  });

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Stem */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 3, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.7} />
      </mesh>

      {/* Long leaves */}
      <mesh position={[0.1, -1.5, 0]} rotation={[0, 0, -0.2]}>
         <cylinderGeometry args={[0.02, 0.1, 1.5, 8]} />
         <meshStandardMaterial color="#2d5a27" roughness={0.7} />
      </mesh>
      <mesh position={[-0.1, -1.0, 0]} rotation={[0, 0, 0.3]}>
         <cylinderGeometry args={[0.02, 0.1, 1.2, 8]} />
         <meshStandardMaterial color="#2d5a27" roughness={0.7} />
      </mesh>
      
      {/* Tulip Flower Head */}
      <group ref={petalsRef} position={[0, 0, 0]}>
        {/* Core base of the flower */}
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.25, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial ref={materialRef} color="#FF6B6B" roughness={0.3} emissive="#C06C84" emissiveIntensity={0.2} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Petals forming a cup (Tulips usually have 6 petals) */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 3, 0.15]} position={[Math.sin((i * Math.PI) / 3) * 0.15, 0.2, Math.cos((i * Math.PI) / 3) * 0.15]}>
            <cylinderGeometry args={[0.05, 0.15, 0.8, 16]} />
            <meshStandardMaterial color="#FF6B6B" roughness={0.3} emissive="#C06C84" emissiveIntensity={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
