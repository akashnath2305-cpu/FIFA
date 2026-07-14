"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text3D, Center, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function SoccerBall() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 32, 32]}>
        <MeshDistortMaterial 
          color="#D4AF37" 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.8}
          roughness={0.2}
          distort={0.2}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="canvas-container" style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#15803d" />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} color="#D4AF37" castShadow />
        
        <SoccerBall />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
