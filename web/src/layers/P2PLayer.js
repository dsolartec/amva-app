import { GeoJsonLayer } from '@deck.gl/layers';
import data from '../assets/models/p2p_municipios_amva.geojson';

const layer = new GeoJsonLayer({
    id: 'p2p-layer',
    data,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [185, 185, 185, 105],
    getLineColor: d => [100, 0, 255, 250],
    getRadius: 100,
    getLineWidth: 5,
    getElevation: d => 1400,
});

export default layer;
