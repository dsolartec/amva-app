import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import { randomPoint } from '@turf/turf';
import mataGLB from '../assets/models/Matas.glb';

registerLoaders(GLTFLoader);

const data = randomPoint(75, {
    bbox: [
        -75.580053, 6.243873,
        -75.579404, 6.243281,
    ]
}).features.map((e) => ({ coordinates: e.geometry.coordinates, }));

const LayerPlants = new ScenegraphLayer({
    id: 'layer_plants',
    data,
    pickable: true,
    scenegraph: mataGLB,
    getPosition: d => d.coordinates,
    getOrientation: d => [0, Math.random() * 180, 90],
    _animations: {
        '*': { speed: 5 }
    },
    sizeScale: 10,
    _lighting: 'pbr',
});

export default LayerPlants;
