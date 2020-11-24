import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import terraingltf from '../assets/models/dem_amva_qgis.glb';

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
    scenegraph: terraingltf,
    getPosition: d => d.coordinates,
    getOrientation: d => [0, 0, 90],
    getColor: d => [0, 0, 0, 175],
    _animations: {
        '*': { speed: 5 }
    },
    sizeScale: 1530,
    _lighting: 'pbr',
});

export default layer;
