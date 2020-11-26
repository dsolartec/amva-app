import React from 'react';
import { INITIAL_STATE } from './states';
import Loader from './components/Loader';
import DeckGL from '@deck.gl/react';
import ReactMapGL from 'react-map-gl';
import Header from './components/Header';

// A.M.V.A. Layers
import LayerAMVAPoints from './layers/LayerAMVAPoints';
import LayerDEM from './layers/LayerDEM';
import LayerDelanauyAMVA from './layers/LayerDelanauyAMVA';

// Capsule Layers
import LayerCapsule from './layers/LayerCapsule';
import LayerPlants from './layers/LayerPlants';

const INITIAL_MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

function App() {
    const [viewState, setViewState] = React.useState(INITIAL_STATE.view_state);
    const [layers, setLayers] = React.useState(INITIAL_STATE.layers);
    const [mapLoaded, setMapLoaded] = React.useState(false);

    return (
        <>
            <Loader isActive={!mapLoaded} />
            <div style={{ opacity: mapLoaded ? 1 : 0 }}>
                <DeckGL 
                    initialViewState={viewState}
                    layers={[
                        LayerAMVAPoints,
                        LayerDEM,
                        LayerDelanauyAMVA,
                        LayerCapsule,
                        LayerPlants,
                    ]}
                    layerFilter={({ layer }) => layers.includes(layer.id)}
                    controller={true}
                >
                    <ReactMapGL
                        reuseMaps
                        mapStyle={INITIAL_MAP_STYLE}
                        preventStyleDiffing={true}
                        onLoad={() => setMapLoaded(true)}
                    />
                </DeckGL>
            </div>
            {mapLoaded && <Header setViewState={setViewState} setLayers={setLayers} />}
        </>
    );
}

export default App;
