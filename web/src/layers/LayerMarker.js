import {IconLayer} from '@deck.gl/layers';
import IconMarker from '../assets/images/icon-atlas.png';

const ICON_MAPPING = {
    marker: {
        x: 0,
        y: 0, 
        width: 128,
        height: 128,
        mask: false,
    },
};

const data = [
    { coordinates: [-75.579658, 6.244070] },
];

const LayerMarker = new IconLayer({
    id: 'layer_marker',
    data,
    pickable: true,
    iconAtlas: IconMarker,
    iconMapping:ICON_MAPPING,
    sizeScale: 100,
    getPosition: d => d.coordinates,
    getIcon: d => 'marker',
});

export default LayerMarker;