import { GeoJsonLayer } from '@deck.gl/layers';

import data from '../assets/models/municipios_amva.geojson';

const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [0, 0, 0, 150],
    getLineColor: d => [255, 255, 255, 255],
    getRadius: 100,
    getLineWidth: 5,
    getElevation: d => 1400//+Math.log(d.properties.ELEV)*10
});

export default layer;
