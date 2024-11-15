import { OrbitControls, useFBO } from "@react-three/drei";
import { Canvas, useFrame, extend, createPortal } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { OrthographicCamera, Scene, FloatType, RGBAFormat, NearestFilter, LinearFilter, AdditiveBlending } from "three";

import SimulationMaterial from './SimulationMaterial';

import vertexShader from './vertexShader.glsl';
import fragmentShaderLight from './FragmentShaderLight.glsl';
import fragmentShaderDark from './FragmentShaderDark.glsl';

extend({ SimulationMaterial: SimulationMaterial });

const FBOParticles = ({darkMode}) => {
  const size = 110;

  const points = useRef();
  const simulationMaterialRef = useRef();

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);
  const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
  const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

  const renderTarget = useFBO(size, size, {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    format: RGBAFormat,
    stencilBuffer: false,
    type: FloatType,
  });

  const particlesPosition = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

  const uniforms = useMemo(() => ({
    uPositions: {
      value: null,
    }
  }), [])

  useFrame((state) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    points.current.material.uniforms.uPositions.value = renderTarget.texture;

    simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <>
      {createPortal(
        <mesh>
          <simulationMaterial ref={simulationMaterialRef} args={[size]} />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={AdditiveBlending}
          depthWrite={false}
          fragmentShader={darkMode ? fragmentShaderDark : fragmentShaderLight}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    </>
  );
};

const SimScene = ({ darkMode }) => {
  return (
    <Canvas camera={{ position: [1.5, 1.5, 1.22] }}>
      <ambientLight intensity={0.5} />
      <FBOParticles darkMode={darkMode} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default SimScene;
