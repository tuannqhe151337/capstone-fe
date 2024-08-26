import React from "react";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface Props {
  inView?: boolean;
}

export const DesktopModel: React.FC<Props> = ({ inView }) => {
  const gltf = useLoader(GLTFLoader, "/3d/desktop/scene.gltf");

  const meshRef =
    React.useRef<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);

  // Rotate the object on each frame
  useFrame(({ clock }) => {
    if (inView && meshRef.current) {
      // Rotate based on time
      meshRef.current.rotation.y =
        -Math.PI / 2 - 0.5 + clock.getElapsedTime() * 0.05; // Slow rotation speed
    }
  });

  return (
    <>
      {inView && (
        <>
          <PerspectiveCamera position={[0, 0, 0]} />
          <ambientLight color={"#f0f9ff"} intensity={7.5} />
          <hemisphereLight color={"#f0f9ff"} intensity={7.5} />
          <mesh
            ref={meshRef}
            position={[0, -2.05, 0]}
            rotation={[0, -Math.PI / 2 - 0.5, 0]}
            scale={3.15}
          >
            <primitive object={gltf.scene} />
          </mesh>
          <OrbitControls enablePan={false} enableZoom={false} />
        </>
      )}
    </>
  );
};
