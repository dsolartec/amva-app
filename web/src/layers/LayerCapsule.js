import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import terraingltf from '../assets/models/CapsulaSimplificada.glb';

registerLoaders(GLTFLoader);

const LayerCapsule = new ScenegraphLayer({
    id: 'layer_capsule',
    data: [
        { coordinates: [-75.579734, 6.243583] }
    ],
    pickable: true,
    scenegraph: terraingltf,
    getPosition: d => d.coordinates,
    getOrientation: d => [0, Math.random() * 180, 90],
    _animations: {
        '*': { speed: 5 }
    },
    sizeScale: 10,
    _lighting: 'pbr',
});

export default LayerCapsule;
