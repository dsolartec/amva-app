import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import terraingltf from '../assets/models/CapsulaSimplificada.glb';

registerLoaders(GLTFLoader);

const LayerCapsule = new ScenegraphLayer({
    id: 'layer_capsule',
    data: [
        { coordinates: [-75.579658, 6.244070] }
    ],
    scenegraph: terraingltf,
    getPosition: d => d.coordinates,
    getOrientation: d => [0, 108, 90],
    _animations: {
        '*': { speed: 5 }
    },
    sizeScale: 2.5,
    _lighting: 'pbr',
});

export default LayerCapsule;
