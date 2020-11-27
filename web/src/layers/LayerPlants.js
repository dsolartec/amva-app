import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import { randomPoint } from '@turf/turf';
import plant from '../assets/models/capsule/plant.glb';

registerLoaders(GLTFLoader);

const data = randomPoint(15, {
    bbox: [
        -75.57965911924839,6.244065942560088,
        -75.57965744286776,6.244073608164196
    ]
}).features.map((e) => ({ coordinates: e.geometry.coordinates, }));

const LayerPlants = new ScenegraphLayer({
    id: 'layer_plants',
    data,
    scenegraph: plant,
    getPosition: d => d.coordinates,
    getOrientation: d => [0, Math.random() * 180, 90],
    _animations: {
        '*': { speed: 5 }
    },
    sizeScale: 5,
    _lighting: 'pbr',
});

export default LayerPlants;
