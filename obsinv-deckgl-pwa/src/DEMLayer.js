import {ScenegraphLayer} from '@deck.gl/mesh-layers';
import {registerLoaders} from '@loaders.gl/core';
import {GLTFLoader} from '@loaders.gl/gltf';
import {default as terraingltf} from './models/dem_amva_qgis.glb';

// Register the proper loader for scenegraph.gltf
registerLoaders(GLTFLoader);

const layer = new ScenegraphLayer({
    id: 'dem-layer',
    data: [{
        name: 'Colma (COLM)', 
        address: '365 D Street, Colma CA 94014', 
        exits: 4214, 
        coordinates: [-75.37464, 6.1697]
    }],
    pickable: true,
    scenegraph: terraingltf,//'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb',
    getPosition: d => d.coordinates,
    getOrientation: d => [0, 0, 90],
    _animations: {
      '*': {speed: 5}
    },
    sizeScale: 1530,
    _lighting: 'pbr',
  });

  export default layer;