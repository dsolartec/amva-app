import {GeoJsonLayer} from '@deck.gl/layers';

import {default as data} from './delanauy_amva.geojson';

const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [0, 100, 100, 255],
    getLineColor: d => [0, 255, 255, 255],
    getRadius: 100,
    getLineWidth: 1,
    getElevation: d => +d.properties.ELEVACION*10
  });

export default layer;
