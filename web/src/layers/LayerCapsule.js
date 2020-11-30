import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import capsule from '../assets/models/capsule/capsule_render.glb';

registerLoaders(GLTFLoader);

const LayerCapsule = new ScenegraphLayer({
    id: 'layer_capsule',
    data: [
        {
            id: 'layer_capsule',
            coordinates: [-75.579658, 6.244070]
        }
    ],
    pickable: true,
    scenegraph: capsule,
    getPosition: d => d.coordinates,
    getOrientation: d => [0, 107.5, 90],
    _animations: {
        '*': { speed: 5 }
    },
    sizeScale: 7,
    _lighting: 'pbr',
});

export default LayerCapsule;
