import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import terraingltf from '../assets/models/CapsulaSimplificada.glb';

// Register the proper loader for scenegraph.gltf
registerLoaders(GLTFLoader);

const layer = new ScenegraphLayer({
    id: 'capsula-layer',
    data: [{
        name: 'Colma (COLM)', 
        address: '365 D Street, Colma CA 94014', 
        exits: 4214, 
        coordinates: [-75.59464, 6.366047]
    }],
    pickable: true,
    scenegraph: terraingltf,//'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb',
    getPosition: d => d.coordinates,
    getOrientation: d => [0, Math.random() * 180, 90],
    _animations: {
      '*': {speed: 5}
    },
    sizeScale: 1000,
    _lighting: 'pbr',
  });

  export default layer;