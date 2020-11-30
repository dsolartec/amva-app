import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import plant from '../assets/models/capsule/plant.glb';
import locations from '../assets/models/layer_plants.json';

registerLoaders(GLTFLoader);

const data =  locations && locations.features.map((e) => ({ coordinates: e.geometry.coordinates, }));

const LayerPlants = new ScenegraphLayer({
    id: 'layer_plants',
    data,
    scenegraph: plant,
    getPosition: d => d.coordinates,
    getOrientation: d => [0, Math.random() * 180, 90],
    _animations: {
        '*': { speed: 5 }
    },
    sizeScale: 7,
    _lighting: 'pbr',
});

export default LayerPlants;
