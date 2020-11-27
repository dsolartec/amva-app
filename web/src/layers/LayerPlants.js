import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import plant from '../assets/models/capsule/plant.glb';

registerLoaders(GLTFLoader);

const data = [{"coordinates":[-75.57965693284845,6.244010093743495]},{"coordinates":[-75.57966445384305,6.244065162998839]},{"coordinates":[-75.57968704691798,6.244049305738825]},{"coordinates":[-75.57967673396388,6.244056103757559]},{"coordinates":[-75.57965338393187,6.244072852984307]},{"coordinates":[-75.57962000231855,6.244039347108528]},{"coordinates":[-75.5796567558477,6.244033110120732]},{"coordinates":[-75.5796685413082,6.24402463840476]},{"coordinates":[-75.57964624663853,6.244040203427249]},{"coordinates":[-75.57963365095773,6.244026939044902]},{"coordinates":[-75.57964523680576,6.244019315828189]},{"coordinates":[-75.57963122194371,6.244052613006397]},{"coordinates":[-75.57965493312653,6.244052177409241]},{"coordinates":[-75.5796647303996,6.244045002587278]},{"coordinates":[-75.57967808871152,6.244036725853935]},{"coordinates":[-75.57964207014388,6.244062977939834]},{"coordinates":[-75.5796143117959,6.243962273082499]},{"coordinates":[-75.5796218327905,6.244017342337843]},{"coordinates":[-75.57964442586542,6.244001485077828]},{"coordinates":[-75.57963411291132,6.244008283096562]},{"coordinates":[-75.57961076287931,6.244025032323311]},{"coordinates":[-75.57957738126599,6.243991526447532]},{"coordinates":[-75.57961413479514,6.243985289459736]},{"coordinates":[-75.57962592025564,6.243976817743763]},{"coordinates":[-75.57960362558597,6.243992382766253]},{"coordinates":[-75.57959102990517,6.243979118383906]},{"coordinates":[-75.5796026157532,6.243971495167193]},{"coordinates":[-75.57958860089116,6.2440047923454]},{"coordinates":[-75.57961231207398,6.244004356748245]},{"coordinates":[-75.57962210934704,6.243997181926281]},{"coordinates":[-75.57963546765896,6.243988905192938]},{"coordinates":[-75.57959944909132,6.244015157278837]}];

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
