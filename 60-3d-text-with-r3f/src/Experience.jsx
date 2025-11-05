import {
  Center,
  Text3D,
  OrbitControls,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";

export default function Experience() {
  const [boxGeometry, setBoxGeometry] = useState();
  const [material, setMaterial] = useState();

  const [matcapTexture] = useMatcapTexture("9F1A27_F1AF7F_CD5845_D08441", 256);

  const cubes = useRef([]);

  useFrame((state, delta) => {
    for (const cube of cubes.current) {
      cube.rotation.x += delta * 0.2;
      cube.rotation.y += delta * 0.4;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font={"/fonts/helvetiker_regular.typeface.json"}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          Hello R3F!
        </Text3D>
      </Center>

      <boxGeometry ref={setBoxGeometry} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />

      {Array.from({ length: 100 }, (_, i) => (
        <mesh
          ref={(element) => (cubes.current[i] = element)}
          key={i}
          position={[
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 16,
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          scale={0.2 + Math.random() * 0.8}
          geometry={boxGeometry}
          material={material}
        />
      ))}
    </>
  );
}
