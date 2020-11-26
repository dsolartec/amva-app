import { GeoJsonLayer } from '@deck.gl/layers';

import data from '../assets/models/municipios_amva.geojson';

const LayerDelanauyAMVA = new GeoJsonLayer({
    id: 'layer_delanauy_amva',
    data,
    stroked: true,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [0, 0, 0, 150],
    getLineColor: d => [255, 255, 255, 255],
    getRadius: 100,
    getLineWidth: 5,
    getElevation: d => 2800
});

export default LayerDelanauyAMVA;
