import { useFrame } from "@react-three/fiber";
import {
  BakeShadows,
  useHelper,
  OrbitControls,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  Sky,
  Environment,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { Leva, useControls } from "leva";

export default function Experience() {
  const directionalLightRef = useRef();
  const cube = useRef();

  const controlsLight = useControls("Light", {
    intensity: { value: 4.5, min: 0, max: 10, step: 0.1 },
    positionX: { value: 1, min: -5, max: 5, step: 0.1 },
    positionY: { value: 2, min: -5, max: 5, step: 0.1 },
    positionZ: { value: 3, min: -5, max: 5, step: 0.1 },
    color: "#ffffff",
  });

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "hotpink");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <Environment
        background
        files={["/environmentMaps/the_sky_is_on_fire_2k.hdr"]}
      />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        ref={directionalLightRef}
        position={[
          controlsLight.positionX,
          controlsLight.positionY,
          controlsLight.positionZ,
        ]}
        intensity={controlsLight.intensity}
        color={controlsLight.color}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
