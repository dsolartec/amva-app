import { GeoJsonLayer } from '@deck.gl/layers';
import data from '../assets/models/p2p_municipios_amva.geojson';

const color = [0, 109, 182, 255];

const LayerAMVAPoints = new GeoJsonLayer({
    id: 'layer_amva_points',
    data,
    stroked: true,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: color,
    getLineColor: d => color,
    getRadius: 100,
    getLineWidth: 5,
    getElevation: d => 1400,
});

export default LayerAMVAPoints;
