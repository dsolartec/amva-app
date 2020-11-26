import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import terraingltf from '../assets/models/dem_amva_qgis.glb';

registerLoaders(GLTFLoader);

const LayerDEM = new ScenegraphLayer({
    id: 'layer_dem',
    data: [
        { coordinates: [-75.37464, 6.1697] }
    ],
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

export default LayerDEM;
