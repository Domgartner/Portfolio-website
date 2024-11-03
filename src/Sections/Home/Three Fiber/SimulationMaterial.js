import simulationVertexShader from './SimulationVertexShader.glsl';
import simulationFragmentShader from './SimulationFragmentShader.glsl';
import {RGBAFormat, FloatType, DataTexture, MathUtils, ShaderMaterial} from "three";

const getRandomData = (width, height) => {
  // need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = width * height * 4 
  const data = new Float32Array(length);
    
  for (let i = 0; i < length; i++) {
    const stride = i * 4;

    const distance = Math.sqrt(Math.random()) * 2.0;
    const theta = MathUtils.randFloatSpread(360); 
    const phi = MathUtils.randFloatSpread(360); 

    data[stride] =  distance * Math.sin(theta) * Math.cos(phi)
    data[stride + 1] =  distance * Math.sin(theta) * Math.sin(phi);
    data[stride + 2] =  distance * Math.cos(theta);
    data[stride + 3] =  1.0; // this value will not have any impact
  }
  
  return data;
}

class SimulationMaterial extends ShaderMaterial {
  constructor(size) {
    const positionsTexture = new DataTexture(
      getRandomData(size, size),
      size,
      size,
      RGBAFormat,
      FloatType
    );
    positionsTexture.needsUpdate = true;

    const simulationUniforms = {
      positions: { value: positionsTexture },
      uFrequency: { value: 0.28 },
      uTime: { value: 0 },
    };

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }
}

export default SimulationMaterial;
