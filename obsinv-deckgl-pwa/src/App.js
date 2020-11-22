/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {TerrainLayer} from '@deck.gl/geo-layers';
import {SolidPolygonLayer, PathLayer, PointCloudLayer} from '@deck.gl/layers';

import Countdown from './Countdown';

import LayerDelanauyAMVA from './DelanauyAMVA'

// window.deck.log.disable()
// window.deck.log.level = 2
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

//Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidmVjaW5vc2RlbDgwIiwiYSI6ImNrM2VuOTl1MDAwMG8zZG50ZzY3b3RsaDQifQ.d4QqM-y9G-d8ixGbICsz0Q';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -75.552464,
  latitude: 6.326047,
  zoom: 11,
  pitch: 60,
  bearing: -60
};

const TERRAIN_IMAGE = `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.png?access_token=${MAPBOX_ACCESS_TOKEN}`;
const SURFACE_IMAGE = `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}@2x.png?access_token=${MAPBOX_ACCESS_TOKEN}`;
const ELEVATION_DECODER = {
  rScaler: 6553.6,
  gScaler: 25.6,
  bScaler: 0.1,
  offset: -10000
};

// USE PLAIN JSON OBJECTS
const POLYGON_DATA = [
  {
     contour: [[-75.552464, 6.326047], [-75.552464, 6.426047], [-75.652464, 6.426047], [-75.652464, 6.326047], [-75.552464, 6.326047]],
     population: 46599
  }
];

function App({
  texture = null, //SURFACE_IMAGE,
  wireframe = true,
  initialViewState = INITIAL_VIEW_STATE,
  mapStyle = MAP_STYLE
}) {
  const layer1 = new SolidPolygonLayer({
    /*
     * Data format:
     * [
     *   {polygon: [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]},   // Simple polygon (array of coords)
     *   {polygon: [                                            // Complex polygon with one hole
     *     [[0, 0], [0, 2], [2, 2], [2, 0], [0, 0]],            // (array of array of coords)
     *     [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]
     *   ]}
     * ]
     */
    data: POLYGON_DATA,
    getPolygon: d => d.contour,
    getElevation: d => 2000,
    getFillColor: [0, 100, 60, 160],
    extrude: true
  });
  // https://deck.gl/docs/api-reference/geo-layers/terrain-layer
  const layer = new TerrainLayer({
    id: 'terrain',
    minZoom: 11,
    maxZoom: 11,
    strategy: 'no-overlap',
    elevationDecoder: ELEVATION_DECODER,
    elevationData: TERRAIN_IMAGE,
    texture,
    wireframe,
    color: [255, 0, 180]
  });

  return (
    <>
      <DeckGL 
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[LayerDelanauyAMVA, layer1]} 
      >
        <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
      </DeckGL> 
      <Countdown />
    </>
  );
}

export default App