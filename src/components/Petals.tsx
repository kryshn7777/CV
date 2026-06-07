import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Petals({ count = 100 }) {
  const petals = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        Math.random() * 20 - 5, // Start higher up
        (Math.random() - 0.5) * 10 - 2 // Mostly in background
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.5,
      spinX: (Math.random() - 0.5) * 2,
      spinY: (Math.random() - 0.5) * 2,
      spinZ: (Math.random() - 0.5) * 2
    }));
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child: any, i) => {
        // Fall down gently
        child.position.y -= delta * petals[i].speed;
        // Sway sideways gently
        child.position.x += Math.sin(state.clock.elapsedTime + i) * 0.005;
        
        // Spin
        child.rotation.x += delta * petals[i].spinX;
        child.rotation.y += delta * petals[i].spinY;
        child.rotation.z += delta * petals[i].spinZ;
        
        // Loop back up when they fall too low
        if (child.position.y < -10) {
          child.position.y = 15;
          child.position.x = (Math.random() - 0.5) * 20;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {petals.map((petal, i) => (
        <mesh key={i} position={petal.position} rotation={petal.rotation} scale={[petal.scale * 1, petal.scale * 2, petal.scale * 0.1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.5} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}
