/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import ReactMapGL from 'react-map-gl';
// import {TerrainLayer} from '@deck.gl/geo-layers';
// import {SolidPolygonLayer, PathLayer, PointCloudLayer} from '@deck.gl/layers';

import Countdown from './Countdown';

import LayerDelanauyAMVA from './DelanauyAMVA';
import LayerCapsula from './CapsulaLayer';
import LayerDEM from './DEMLayer';
import LayerP2P from './P2PLayer';

// window.deck.log.disable()
// window.deck.log.level = 2
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

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

function App({
  texture = null,
  wireframe = true,
  initialViewState = INITIAL_VIEW_STATE,
  mapStyle = MAP_STYLE
}) {
  return (
    <>
      <DeckGL 
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[/*LayerCapsula,*/ LayerDEM, LayerP2P /*, LayerDelanauyAMVA*/]} 
      >
        <ReactMapGL reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
      </DeckGL> 
      <Countdown />
    </>
  );
}

export default App